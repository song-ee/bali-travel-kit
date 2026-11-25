'use client';
import {useState} from 'react';
import {days,type TripData} from './data';

type ViewId='route'|'ubud'|'seminyak'|'plan'|'prep';
type ClusterId='ubud'|'kinta'|'semi'|'apt';

const COBALT='#2b5ce6',VIOLET='#6e5bd6',PERI='#9b86ec',PEACH='#f39a86';
const PAPER='#eff1f6';

/* Bali, drawn as a pixel mosaic: outline → grid cells → cluster colours. */
const OUTLINE:[number,number][]=[[86,268],[112,238],[144,224],[182,214],[222,206],[262,196],[300,184],[338,172],[374,158],[410,146],[444,134],[478,126],[510,120],[540,126],[566,138],[592,132],[620,122],[650,116],[680,120],[708,134],[734,152],[758,174],[778,200],[792,228],[800,258],[796,288],[784,316],[766,340],[744,360],[720,376],[694,390],[668,400],[644,410],[622,418],[604,430],[590,444],[578,458],[566,470],[552,474],[540,466],[532,452],[520,448],[508,458],[498,472],[484,478],[470,470],[460,456],[448,442],[434,430],[418,418],[400,408],[382,400],[362,394],[340,388],[316,382],[292,376],[266,370],[240,362],[214,352],[188,340],[162,326],[136,308],[112,290],[96,278]];
const CELL=13;

const CLUSTERS:{id:ClusterId;label:string;color:string;x:number;y:number;r:number}[]=[
 {id:'kinta',label:'킨타마니',color:VIOLET,x:626,y:168,r:92},
 {id:'ubud',label:'우붓',color:COBALT,x:452,y:252,r:112},
 {id:'semi',label:'스미냑',color:PERI,x:396,y:372,r:80},
 {id:'apt',label:'꾸따 · 공항',color:PEACH,x:512,y:414,r:92},
];

function inPoly(px:number,py:number){
 let inside=false;
 for(let i=0,j=OUTLINE.length-1;i<OUTLINE.length;j=i++){
  const xi=OUTLINE[i][0],yi=OUTLINE[i][1],xj=OUTLINE[j][0],yj=OUTLINE[j][1];
  if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi))inside=!inside;
 }
 return inside;
}
function hash2(x:number,y:number){
 let h=Math.imul(x,374761393)+Math.imul(y,668265263);
 h=Math.imul(h^(h>>>13),1274126177);
 return ((h^(h>>>16))>>>0)/4294967295;
}
type Pixel={k:string;x:number;y:number;w:number;h:number;cl:ClusterId|null;edge:boolean;d:number;r:number};
function clusterAt(x:number,y:number){let cl:ClusterId|null=null,ratio=9;
 for(const c of CLUSTERS){
  const dist=Math.hypot(x-c.x,y-c.y),limit=c.r*(0.78+0.42*hash2(x,y));
  if(dist<limit&&dist/limit<ratio){ratio=dist/limit;cl=c.id}
 }
 return cl;
}
function buildPixels(){
 const out:Pixel[]=[];const used=new Set<string>();
 for(let gy=6;gy<42;gy++)for(let gx=5;gx<70;gx++){
  if(used.has(gx+'-'+gy))continue;
  const x=gx*CELL+CELL/2,y=gy*CELL+CELL/2;
  if(!inPoly(x,y))continue;
  const edge=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].some(([a,b])=>!inPoly(x+a*CELL,y+b*CELL));
  const rnd=hash2(gx,gy);
  const cl=clusterAt(x,y);
  if(!edge&&!cl&&rnd<0.3)continue;
  const d=cl?Math.hypot(x-CLUSTERS.find(c=>c.id===cl)!.x,y-CLUSTERS.find(c=>c.id===cl)!.y):0;
  let w=1;
  if(!edge&&rnd>0.87){
   const nx=x+CELL;
   if(inPoly(nx+CELL/2,y)&&clusterAt(nx,y)===cl&&!used.has((gx+1)+'-'+gy)){w=2;used.add((gx+1)+'-'+gy)}
  }
  out.push({k:gx+'-'+gy,x:+x.toFixed(1),y:+y.toFixed(1),w,h:rnd,cl,edge,d,r:rnd});
 }
 return out;
}
const PIXELS=buildPixels();
const DRIPS:{k:string;x:number;y:number;o:number}[]=[];
for(let gx=6;gx<68;gx++){
 if(hash2(gx,3)<0.8)continue;
 let last=-1;
 for(let gy=6;gy<44;gy++)if(inPoly(gx*CELL+CELL/2,gy*CELL+CELL/2))last=gy;
 if(last<0)continue;
 const n=1+Math.floor(hash2(gx,4)*4);
 for(let i=1;i<=n;i++)DRIPS.push({k:gx+'d'+i,x:gx*CELL+CELL/2+2,y:(last+i)*CELL,o:+(0.4-0.09*i).toFixed(2)});
}

/* Network: stay & transport hubs, hairlines between them, satellites per cluster. */
const HUBS:{id:ClusterId;label:string;meta:string;x:number;y:number;color:string;view:ViewId;lx:number;ly:number;anchor:'start'|'middle'|'end'}[]=[
 {id:'apt',label:'공항 DPS',meta:'02.03 · 02.08',x:518,y:438,color:PEACH,view:'route',lx:518,ly:494,anchor:'middle'},
 {id:'ubud',label:'우붓',meta:'3 NIGHTS',x:452,y:252,color:COBALT,view:'ubud',lx:452,ly:206,anchor:'middle'},
 {id:'kinta',label:'킨타마니',meta:'DAY TRIP',x:626,y:168,color:VIOLET,view:'ubud',lx:626,ly:126,anchor:'middle'},
 {id:'semi',label:'스미냑',meta:'2 NIGHTS',x:396,y:372,color:PERI,view:'seminyak',lx:396,ly:336,anchor:'middle'},
];
const EDGES:{a:ClusterId;b:ClusterId;label:string}[]=[
 {a:'apt',b:'ubud',label:'02.03 심야 이동'},
 {a:'ubud',b:'kinta',label:'데이 트립'},
 {a:'ubud',b:'semi',label:'02.06 이동'},
 {a:'semi',b:'apt',label:'02.08 귀국'},
];
const SATELLITES:{x:number;y:number;hub:ClusterId;s:number}[]=(()=>{
 const out:{x:number;y:number;hub:ClusterId;s:number}[]=[];
 for(const c of CLUSTERS){
  const n=c.id==='kinta'?4:6;
  for(let i=0;i<n;i++){
   const a=hash2(c.x+i*7,c.y+i*13)*Math.PI*2;
   const rad=c.r*(0.42+hash2(c.y+i,c.x+i)*0.5);
   out.push({x:+(c.x+Math.cos(a)*rad).toFixed(1),y:+(c.y+Math.sin(a)*rad*0.86).toFixed(1),hub:c.id,s:2.4+hash2(i,c.x)*2.2});
  }
 }
 return out;
})();

const edgePath=(a:{x:number;y:number},b:{x:number;y:number})=>{
 const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,nx=-(b.y-a.y)*0.16,ny=(b.x-a.x)*0.16;
 return `M${a.x} ${a.y}Q${+(mx+nx).toFixed(1)} ${+(my+ny).toFixed(1)} ${b.x} ${b.y}`;
};
const hubOf=(id:ClusterId)=>HUBS.find(h=>h.id===id)!;

const VIEWS:{id:ViewId;label:string}[]=[
 {id:'route',label:'전체 동선'},
 {id:'ubud',label:'우붓 3박'},
 {id:'seminyak',label:'스미냑 2박'},
 {id:'plan',label:'일정 반영'},
 {id:'prep',label:'준비 체크'},
];
const ACTIVE:Record<ViewId,ClusterId[]>={route:['apt','ubud','kinta','semi'],ubud:['ubud','kinta'],seminyak:['semi','apt'],plan:['apt','ubud','kinta','semi'],prep:[]};
const DIM_OPACITY:Record<ViewId,number>={route:0.94,ubud:0.94,seminyak:0.94,plan:0.94,prep:0.34};

export function TripDataNetwork({data,onNavigate}:{data:TripData;onNavigate:(tab:string)=>void}){
 const [view,setView]=useState<ViewId>('route');
 const [hover,setHover]=useState<ClusterId|null>(null);

 const places=data.places;
 const isUbud=(a:string)=>a==='우붓'||a==='우붓 근교'||a==='킨타마니';
 const ubud=places.filter(p=>isUbud(p.area));
 const seminyak=places.filter(p=>p.area==='스미냑'||p.area==='꾸따');
 const favU=ubud.filter(p=>p.favorite).length,favS=seminyak.filter(p=>p.favorite).length;
 const favs=places.filter(p=>p.favorite).length;
 const dining=seminyak.filter(p=>p.category==='식당·카페').length;
 const slots=data.slotChoices||{};
 const chosen=Object.values(slots).reduce((n,s)=>n+Object.keys(s||{}).length,0);
 const chosenDays=Object.values(slots).filter(s=>Object.keys(s||{}).length>0).length;
 const totalSlots=days.reduce((n,d)=>n+d.events.filter(e=>!(/KE43|공항|체크인|빌라 출발/.test(e[1]))).length,0);
 const total=data.checklist.length,done=data.checklist.filter(c=>c.done).length;
 const pct=total?Math.round(done/total*100):0;
 const dayBars=days.map(d=>{const extra=Object.keys(slots[d.date]||{}).length;return{label:d.label,n:d.ids.length+extra,move:d.area.includes('→'),sem:d.area.startsWith('스미냑')}});
 const maxBar=Math.max(1,...dayBars.map(b=>b.n));

 type Panel={kicker:string;title:string;big:string|number;unit:string;rows:[string,string][]};
 const panels:Record<ViewId,Panel>={
  route:{kicker:'ROUTE / 02.03 — 02.08',title:'8명 · 5박 6일',big:places.length,unit:'곳 후보',
   rows:[['항공','인천 ↔ 덴파사르 · KE433 / KE432'],['동선','공항 → 우붓 → 스미냑 → 공항'],['숙소','우붓 3박 · 스미냑 2박']]},
  ubud:{kicker:'STAY 01 / 02.03 — 02.06',title:'우붓 3박',big:ubud.length,unit:'곳 후보',
   rows:[['담아둔 후보',favU+'곳'],['일정 반영',chosen+'개'],['우천 대안','미술관 · 바틱 · 스파']]},
  seminyak:{kicker:'STAY 02 / 02.06 — 02.08',title:'스미냑 2박',big:seminyak.length,unit:'곳 후보',
   rows:[['식당·카페',dining+'곳'],['담아둔 후보',favS+'곳'],['이동','2/6 우붓 → 스미냑']]},
  plan:{kicker:'PLANNER / LIVE',title:'일정 선택',big:chosen,unit:'개 슬롯 확정',
   rows:[['전체 슬롯',totalSlots+'개'],['선택한 날',chosenDays+'일'],['전체 후보',places.length+'곳']]},
  prep:{kicker:'BEFORE YOU FLY',title:'준비 체크',big:pct+'%',unit:done+' / '+total+' 완료',
   rows:[['e-VOA','IDR 500,000 · 8명'],['관광세','IDR 150,000 / 인'],['입국신고','도착 3일 전부터']]},
 };
 const goTab:Record<ViewId,{tab:string;label:string}>={
  route:{tab:'days',label:'일자별 일정 열기'},
  ubud:{tab:'places',label:'우붓 후보 보기'},
  seminyak:{tab:'places',label:'스미냑 후보 보기'},
  plan:{tab:'days',label:'내 코스 열기'},
  prep:{tab:'info',label:'준비 항목 열기'},
 };
 const p=panels[view];
 const active=ACTIVE[view];
 const focus=hover;
 const isOn=(cl:ClusterId|null)=>!!cl&&(active.includes(cl)||focus===cl);
 const isEdgeLive=(e:{a:ClusterId;b:ClusterId})=>view!=='prep'&&(active.includes(e.a)&&active.includes(e.b));

 return <section className="data-net" aria-label="여행 데이터 네트워크">
  <div className="data-net-head">
   <div className="data-net-title">
    <span className="eyebrow">TRIP DATA / LIVE</span>
    <h2>지금 여행 데이터</h2>
   </div>
   <div className="dn-views" role="tablist" aria-label="여행 데이터 보기">
    {VIEWS.map(v=><button key={v.id} role="tab" aria-selected={view===v.id} className={view===v.id?'on':''} onClick={()=>setView(v.id)}>{v.label}</button>)}
   </div>
  </div>
  <div className="data-net-body">
   <div className="dn-canvas">
    <svg viewBox="0 0 1000 560" role="group" aria-label="발리 픽셀 지도와 8명 여행 데이터 연결망">
     <defs>
      <pattern id="dn-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#e0e5f0" strokeWidth="1"/></pattern>
      <filter id="dn-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
     </defs>
     <rect width="1000" height="560" fill={PAPER}/>
     <rect width="1000" height="560" fill="url(#dn-grid)" opacity=".85"/>
     <text className="dn-artlabel" x="26" y="34">BALI / PIXEL MAP · 8 PEOPLE</text>
     <text className="dn-artlabel" x="974" y="34" textAnchor="end">5 NIGHTS · 6 DAYS</text>
     <text className="dn-artlabel dn-foot" x="26" y="534">PIXEL CLUSTER = AREA · RING NODE = STAY / ROUTE</text>
     <g transform="translate(-16 -63) scale(1.16)">
     <g className="dn-drips" aria-hidden="true">
      {DRIPS.map(d=><rect key={d.k} x={d.x} y={d.y} width="7" height="4" rx="1" fill={PERI} opacity={d.o}/>)}
     </g>
     <g className="dn-map" aria-hidden="true">
      {PIXELS.map(px=>{
       const on=isOn(px.cl);
       const color=px.cl?CLUSTERS.find(c=>c.id===px.cl)!.color:'#cdd4e4';
       const baseOpacity=px.cl?(px.edge?0.92:0.86):(px.edge?0.42:0.26);
       return <rect key={px.k} className="dn-px" x={px.x-CELL/2+1} y={px.y-CELL/2+1} width={px.w*CELL-2} height={px.h>0.93?CELL*2-2:CELL-2} rx="1.6"
        style={{fill:color,opacity:px.cl?(on?DIM_OPACITY[view]:baseOpacity*0.55):baseOpacity,transitionDelay:Math.min(240,Math.round(px.d*1.5))+'ms'}}/>;
      })}
     </g>
     <g className="dn-links" aria-hidden="true">
      {EDGES.map(e=>{const a=hubOf(e.a),b=hubOf(e.b),live=isEdgeLive(e);
       return <g key={e.a+e.b}>
        <path d={edgePath(a,b)} className={'dn-edge'+(live?' live':'')}/>
        {live&&<path d={edgePath(a,b)} className="dn-flow"/>}
        {live&&<circle r="3.4" fill={a.color} className="dn-travel"><animateMotion dur="5.2s" repeatCount="indefinite" path={edgePath(a,b)}/></circle>}
       </g>})}
     </g>
     <g className="dn-satellites" aria-hidden="true">
      {SATELLITES.map((s,i)=>{const h=hubOf(s.hub),on=isOn(s.hub)||(focus===s.hub);
       return <g key={i} className="dn-sat" style={{opacity:on?1:0.25,transition:'opacity .5s'}}>
        <line x1={s.x} y1={s.y} x2={h.x} y2={h.y} stroke={h.color} strokeWidth=".9" opacity=".55"/>
        <circle cx={s.x} cy={s.y} r={s.s} fill="#ffffff" stroke={h.color} strokeWidth="1.4"/>
        <circle cx={s.x} cy={s.y} r="1.2" fill={h.color}/>
       </g>})}
     </g>
     <g className="dn-hubs">
      {HUBS.map(h=>{const on=active.includes(h.id),foc=focus===h.id;
       return <g key={h.id} className={'dn-hub'+(on?' on':'')+(foc?' foc':'')} role="button" tabIndex={0} aria-pressed={view===h.view}
        aria-label={h.label+' 데이터 보기'}
        onMouseEnter={()=>setHover(h.id)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(h.id)} onBlur={()=>setHover(null)}
        onClick={()=>setView(h.view)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setView(h.view)}}}>
        <circle cx={h.x} cy={h.y} r="26" fill={h.color} opacity=".14"/>
        <circle className="dn-hub-ring" cx={h.x} cy={h.y} r="11" fill="#ffffff" stroke={h.color} strokeWidth="2"/>
        <circle cx={h.x} cy={h.y} r={on?5:4} fill={h.color}/>
        {on&&view!=='prep'&&<circle className="dn-pulse" cx={h.x} cy={h.y} r="13" fill="none" stroke={h.color} strokeWidth="1.4"/>}
        <text className="dn-hub-label" x={h.lx} y={h.ly} textAnchor={h.anchor} fill={on?'#141e3a':'#7e89ac'}>{h.label}</text>
       </g>})}
     </g>
     </g>
     <g className="dn-corner" aria-hidden="true">
      <path d="M18 34V18h16M982 34V18h-16M18 526v16h16M982 526v16h-16" fill="none" stroke="#c9d1e3" strokeWidth="1.4"/>
     </g>
    </svg>
   </div>
   <div className="dn-panel" aria-live="polite">
    <span className="dn-kicker">{p.kicker}</span>
    <h3>{p.title}</h3>
    <p className="dn-big"><b>{p.big}</b><span>{p.unit}</span></p>
    {view==='prep'&&<div className="dn-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{width:pct+'%'}}/></div>}
    <dl className="dn-rows">{p.rows.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    {view==='plan'&&<div className="dn-days" aria-hidden="true">
     {dayBars.map(b=><span key={b.label}><i className={b.move?'move':b.sem?'sem':''} style={{height:Math.max(6,Math.round(b.n/maxBar*46))+'px'}}/><em>2/{b.label}</em></span>)}
    </div>}
    <div className="dn-legend">
     <span><i style={{background:COBALT}}/>우붓</span><span><i style={{background:PERI}}/>스미냑</span><span><i style={{background:PEACH}}/>꾸따</span><span><i style={{background:VIOLET}}/>근교</span>
     <span className="dim">{places.length}곳 · 찜 {favs}</span>
    </div>
    <button className="dn-go" onClick={()=>onNavigate(goTab[view].tab)}>{goTab[view].label} <span aria-hidden="true">↗</span></button>
   </div>
  </div>
 </section>;
}
