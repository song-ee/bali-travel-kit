'use client';
import {useState} from 'react';
import {days,type TripData} from './data';

type NodeId='airport'|'ubud'|'seminyak'|'depart'|'plan'|'prep'|'saved';
type Detail={kicker:string;title:string;big:string|number;unit:string;rows:[string,string][];progress?:number;go?:{tab:string;label:string}};

const COBALT='#2b5ce6',PERI='#8a76d6',LAV='#ae94ee',PEACH='#e27a63';

const NODES:{id:NodeId;x:number;y:number;label:string;accent:string;lx:number;ly:number;anchor:'middle'|'start'|'end'}[]=[
 {id:'airport',x:62,y:268,label:'도착',accent:COBALT,lx:62,ly:312,anchor:'middle'},
 {id:'ubud',x:186,y:186,label:'우붓',accent:COBALT,lx:186,ly:142,anchor:'middle'},
 {id:'seminyak',x:330,y:224,label:'스미냑',accent:PERI,lx:330,ly:180,anchor:'middle'},
 {id:'depart',x:470,y:146,label:'귀국',accent:PEACH,lx:470,ly:104,anchor:'middle'},
 {id:'plan',x:198,y:66,label:'일정',accent:LAV,lx:198,ly:38,anchor:'middle'},
 {id:'prep',x:352,y:64,label:'준비',accent:PEACH,lx:352,ly:36,anchor:'middle'},
 {id:'saved',x:472,y:296,label:'후보',accent:LAV,lx:472,ly:340,anchor:'middle'},
];
const EDGES:[NodeId,NodeId][]=[['airport','ubud'],['ubud','seminyak'],['seminyak','depart'],['ubud','plan'],['plan','prep'],['prep','depart'],['seminyak','saved']];

function edgePath(a:{x:number;y:number},b:{x:number;y:number}){
 const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,nx=-(b.y-a.y)*.14,ny=(b.x-a.x)*.14;
 return `M${a.x} ${a.y}Q${mx+nx} ${my+ny} ${b.x} ${b.y}`;
}
const areaColor=(area:string)=>area==='우붓'||area==='우붓 근교'?COBALT:area==='킨타마니'?'#7c5fe0':area==='스미냑'?LAV:'#e08a72';

export function TripDataNetwork({data,onNavigate}:{data:TripData;onNavigate:(tab:string)=>void}){
 const [active,setActive]=useState<NodeId>('ubud');
 const [hover,setHover]=useState<NodeId|null>(null);
 const shown=hover??active;

 const places=data.places;
 const isUbud=(a:string)=>a==='우붓'||a==='우붓 근교'||a==='킨타마니';
 const ubud=places.filter(p=>isUbud(p.area));
 const seminyak=places.filter(p=>p.area==='스미냑'||p.area==='꾸따');
 const favU=ubud.filter(p=>p.favorite).length, favS=seminyak.filter(p=>p.favorite).length;
 const favs=places.filter(p=>p.favorite).length;
 const dining=seminyak.filter(p=>p.category==='식당·카페').length;
 const slots=data.slotChoices||{};
 const chosen=Object.values(slots).reduce((n,s)=>n+Object.keys(s||{}).length,0);
 const chosenDays=Object.values(slots).filter(s=>Object.keys(s||{}).length>0).length;
 const total=data.checklist.length, done=data.checklist.filter(c=>c.done).length;
 const pct=total?Math.round(done/total*100):0;

 const dayBars=days.map(d=>{const extra=Object.keys((data.slotChoices||{})[d.date]||{}).length;return {label:d.label,n:d.ids.length+extra,move:d.area.includes('→'),sem:d.area.startsWith('스미냑')}});
 const maxBar=Math.max(1,...dayBars.map(b=>b.n));

 const details:Record<NodeId,Detail>={
  airport:{kicker:'ARRIVAL / 02.03',title:'덴파사르 도착',big:'23:55',unit:'현지 시각',rows:[['인천 출발 · KE433','17:50'],['공항 → 우붓','약 90분'],['차량','8인 · 밴 1대 또는 2대']]},
  ubud:{kicker:'STAY 01 / 02.03–06',title:'우붓 3박',big:ubud.length,unit:'곳 후보',rows:[['담아둔 후보',`${favU}곳`],['일정 반영',`${chosen}개`],['우천 대안','미술관 · 바틱 · 스파']],go:{tab:'places',label:'우붓 후보 보기'}},
  seminyak:{kicker:'STAY 02 / 02.06–08',title:'스미냑 2박',big:seminyak.length,unit:'곳 후보',rows:[['식당·카페',`${dining}곳`],['담아둔 후보',`${favS}곳`],['이동','2/6 우붓 → 스미냑']],go:{tab:'places',label:'스미냑 후보 보기'}},
  depart:{kicker:'DEPARTURE / 02.08',title:'귀국',big:'02.09',unit:'인천 도착',rows:[['일정','5박 6일'],['공항 이동','출발 3시간 전'],['재확인','항공 · 픽업']]},
  plan:{kicker:'PLANNER / LIVE',title:'일정 선택',big:chosen,unit:'개 슬롯 확정',rows:[['선택한 날',`${chosenDays}일`],['바꾸기','내 코스 → 옵션 교체'],['전체 후보',`${places.length}곳`]],go:{tab:'days',label:'내 코스 열기'}},
  prep:{kicker:'BEFORE YOU FLY',title:'준비 체크',big:`${pct}%`,unit:`${done} / ${total} 완료`,rows:[['e-VOA','IDR 500,000'],['관광세','IDR 150,000 / 인'],['입국신고','도착 3일 전부터']],progress:pct,go:{tab:'info',label:'준비 항목 열기'}},
  saved:{kicker:'SHORTLIST / LIVE',title:'담아둔 후보',big:favs,unit:'곳',rows:[['우붓',`${favU}곳`],['스미냑',`${favS}곳`],['코스 반영',`${chosen}개`]],go:{tab:'saved',label:'북마크 열기'}},
 };
 const d=details[shown];
 const isLive=(a:NodeId,b:NodeId)=>a===shown||b===shown;

 return <section className="data-net" aria-label="여행 데이터 네트워크">
  <div className="data-net-head">
   <div><span className="eyebrow">TRIP DATA / LIVE</span><h2>지금 여행 데이터</h2></div>
   <span className="data-net-hint">노드를 눌러 연결된 상태 보기</span>
  </div>
  <div className="data-net-body">
   <div className="data-net-graph">
    <svg viewBox="0 0 560 360" role="group" aria-label="도착 · 우붓 · 스미냑 · 귀국과 일정·준비·후보의 연결 상태">
     <defs>
      <pattern id="dn-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e3e8f6" strokeWidth="1"/></pattern>
      <radialGradient id="dn-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffffff" stopOpacity=".9"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0"/></radialGradient>
     </defs>
     <rect width="560" height="360" fill="#f6f8fe"/>
     <rect width="560" height="360" fill="url(#dn-grid)" opacity=".7"/>
     <circle cx={NODES.find(n=>n.id===shown)!.x} cy={NODES.find(n=>n.id===shown)!.y} r="78" fill="url(#dn-glow)"/>
     {EDGES.map(([a,b],i)=>{const na=NODES.find(n=>n.id===a)!,nb=NODES.find(n=>n.id===b)!;const live=isLive(a,b);
      return <path key={i} d={edgePath(na,nb)} className={'dn-edge'+(live?' live':'')}/>})}
     {EDGES.map(([a,b],i)=>{const na=NODES.find(n=>n.id===a)!,nb=NODES.find(n=>n.id===b)!;const live=isLive(a,b);
      return live?<path key={'f'+i} d={edgePath(na,nb)} className="dn-flow"/>:null})}
     {NODES.map(n=>{const on=shown===n.id;const near=EDGES.some(([a,b])=>(a===n.id&&b===shown)||(b===n.id&&a===shown));
      return <g key={n.id} className={'dn-node'+(on?' on':'')+(near?' near':'')} role="button" tabIndex={0} aria-pressed={on} aria-label={`${n.label} 상태 보기`}
        onMouseEnter={()=>setHover(n.id)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(n.id)} onBlur={()=>setHover(null)}
        onClick={()=>setActive(n.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(n.id)}}}>
       <circle className="dn-halo" cx={n.x} cy={n.y} r={on?30:24} fill={n.accent}/>
       {on&&<circle className="dn-pulse" cx={n.x} cy={n.y} r="20" fill="none" stroke={n.accent} strokeWidth="1.5"/>}
       <circle className="dn-ring" cx={n.x} cy={n.y} r="12" fill="#ffffff" stroke={n.accent} strokeWidth="2"/>
       <circle className="dn-core" cx={n.x} cy={n.y} r={on?5.5:4.5} fill={n.accent}/>
       <text className="dn-label" x={n.lx} y={n.ly} textAnchor={n.anchor} fill={on?n.accent:'#4e5a7e'}>{n.label}</text>
      </g>})}
     <g aria-hidden="true" opacity=".5">
      {[[24,330],[34,330],[44,330],[24,340],[44,340],[506,262],[516,262],[506,272],[516,272],[526,272]].map(([x,y],i)=><rect key={i} x={x} y={y} width="6" height="6" rx="1.5" fill={i%3===0?LAV:i%3===1?COBALT:'#f1b3a3'}/>)}
     </g>
     <text x="18" y="26" fontSize="9" letterSpacing="1.6" fill="#7e89ac">BALI / 8 PEOPLE · 5 NIGHTS</text>
     <text x="542" y="26" fontSize="9" letterSpacing="1.6" fill="#7e89ac" textAnchor="end">LIVE</text>
    </svg>
   </div>
   <div className="data-net-panel" aria-live="polite">
    <span className="data-net-kicker">{d.kicker}</span>
    <h3>{d.title}</h3>
    <p className="data-net-big"><b>{d.big}</b><span>{d.unit}</span></p>
    {typeof d.progress==='number'&&<div className="data-net-progress" role="progressbar" aria-valuenow={d.progress} aria-valuemin={0} aria-valuemax={100}><i style={{width:d.progress+'%'}}/></div>}
    <dl className="data-net-rows">{d.rows.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    <div className="data-net-days" aria-hidden="true">
     {dayBars.map(b=><span key={b.label}><i className={b.move?'move':b.sem?'sem':''} style={{height:Math.max(7,Math.round(b.n/maxBar*44))+'px'}}/><em>2/{b.label}</em></span>)}
    </div>
    <p className="data-net-days-cap">일자별 반영 장소 · 우붓 <i/> 스미냑 <i className="sem"/></p>
    <div className="data-net-pixels" aria-hidden="true">
     {places.map(p=><i key={p.id} className={p.favorite?'fav':''} style={{background:areaColor(p.area)}}/>)}
    </div>
    <p className="data-net-legend"><span><i style={{background:COBALT}}/>우붓</span><span><i style={{background:'#7c5fe0'}}/>근교</span><span><i style={{background:LAV}}/>스미냑</span><span><i style={{background:'#e08a72'}}/>꾸따</span><span className="dim">{places.length}곳 · 찜 {favs}</span></p>
    {d.go&&<button className="data-net-go" onClick={()=>onNavigate(d.go!.tab)}>{d.go.label} ↗</button>}
   </div>
  </div>
 </section>;
}
