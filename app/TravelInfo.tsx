'use client';
import {useEffect,useRef,useState} from 'react';
import {X,ChevronRight,ArrowUpRight} from 'lucide-react';
type Info={icon:string;title:string;subtitle:string;lines:string[];links?:{label:string;url:string}[]};
const maps=(q:string)=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q+' Bali');
const info:Info[]=[
{icon:'✈️',title:'항공',subtitle:'출국 · 귀국',lines:['가는 편 · KE433','2/3 인천 17:50 → 발리 23:55','오는 편 · KE432','2/8 발리 23:50 → 2/9 인천 07:45','모든 항공 시각은 해당 공항 현지 시각 기준.'],links:[{label:'대한항공 예약 조회',url:'https://www.koreanair.com/'}]},
{icon:'🛂',title:'입국 비자 (e-VOA)',subtitle:'IDR 500,000 · 30일 · 1회 연장',lines:['한국 여권은 무비자 대상이 아니므로 도착비자(B1) 필요. 30일 체류, 1회 연장 가능.','공식 사이트 evisa.imigrasi.go.id에서 온라인 신청. 한 번에 최대 5명까지 함께 신청할 수 있어 8명은 두 번에 나눠 접수.','준비물: 여권 사진면 스캔, 최근 사진, 귀국 항공권, 결제 카드. 여권은 입국일 기준 6개월 이상 유효해야 함.','승인 후 90일 안에 사용. 2026년 8월 인상(750,000) 제안이 있었으나 2026-11 기준 시행 확정 안내는 없음 — 결제 전 공식 사이트에서 금액 확인.'],links:[{label:'공식 e-Visa 사이트',url:'https://evisa.imigrasi.go.id/'}]},
{icon:'🎫',title:'발리 관광세',subtitle:'IDR 150,000 / 인',lines:['발리주 외국인 관광세. 1인 1회, 체류 중 한 번 결제.','Love Bali 웹사이트 또는 앱에서 카드·가상계좌·QRIS로 미리 결제하고 QR 바우처를 저장.','도착 전 결제를 권장. 공항 카운터에서도 결제할 수 있지만 심야 도착에서는 줄이 길어질 수 있음.','QR 바우처는 가족 모두 한 휴대폰에 모아 두면 확인이 빠름.'],links:[{label:'Love Bali 관광세',url:'https://lovebali.baliprov.go.id/'}]},
{icon:'📱',title:'All Indonesia 입국신고',subtitle:'무료 · 도착 3일 전부터',lines:['입국·세관·건강 신고가 하나로 합쳐진 무료 신고. 종이 세관 신고서는 따로 쓰지 않음.','도착 3일 전(D-3)부터 도착일까지 제출 가능. 2/3 도착이면 1/31부터 입력.','한 사람이 가족 전체를 단체 제출할 수 있으나 각자 여권 정보를 직접 입력해야 함. 검사 때는 대표(리드) QR을 보여주면 되지만, 성인은 각자 QR을 저장해 두는 편이 안전.','비행기 탑승 전에 제출하면 입국장에서의 입력 지연을 피할 수 있음.'],links:[{label:'All Indonesia 공식 사이트',url:'https://allindonesia.imigrasi.go.id/'}]},
{icon:'🏡',title:'숙소',subtitle:'우붓 3박 · 스미냑 2박',lines:['2/3–2/6 · 우붓 프라이빗 빌라','2/4 새벽 도착 예정. 심야 입실 방법과 픽업 기사에게 전달할 위치를 미리 준비.','2/6–2/8 · Hotel Indigo Bali Seminyak Beach','마지막 날 체크아웃 후 짐 보관·샤워 가능 여부 확인. 8명 짐이 한 번에 들어갈 공간인지도 함께 확인.'],links:[{label:'우붓 빌라',url:'https://www.airbnb.co.kr/rooms/1393990005053564210'},{label:'호텔 인디고',url:'https://www.ihg.com/hotelindigo/hotels/us/en/bali/dpsin/hoteldetail'}]},
{icon:'🚐',title:'8인 이동',subtitle:'2대 vs 10–12인승 밴',lines:['앱택시(Grab·Gojek)는 일반 승용차가 4인승 기준이라 8명이면 2대가 필요. 짐이 많으면 트렁크가 부족할 수 있음.','기사 포함 10–12인승 밴 1대는 함께 이동하고 짐을 한 번에 실을 수 있어 공항 픽업·숙소 이동에 유리.','공항 → 우붓 약 90분(심야에는 더 짧을 수 있음), 우붓 → 스미냑 약 60–80분(약 30km).','차량 업체·기사 연락처와 확정 시간은 여행 노트에 기록.'],links:[{label:'공항 위치 지도',url:maps('Ngurah Rai International Airport')}]},
{icon:'🌧️',title:'2월 우기',subtitle:'오전 야외 · 오후 실내',lines:['2월은 우기 한복판. 남부 기준 평균 강우일 16–18일, 우붓은 비가 조금 더 많음.','오전은 대체로 맑고, 오후에 소나기·저녁에 집중 호우가 잦음.','그래서 야외 관광은 오전, 오후에는 수영·스파·실내 체험을 두는 순서가 안전.','비가 오면 기존 일정 한 곳과 교체 — 일정에 추가하지 않음.']},
{icon:'🕒',title:'현지 시각',subtitle:'한국보다 1시간 느림',lines:['한국 10:00 = 발리 09:00','날짜별 코스는 발리 현지 시각 기준.','인천 출발·도착 시각은 한국 시각 기준.']},
{icon:'🧳',title:'출발 전 준비',subtitle:'바로 챙길 물건',lines:['여권·항공·숙소 예약서와 픽업 연락처 오프라인 저장','여행자보험 가입 내역(서핑 등 활동 보장 범위 확인)','수영복·래시가드·아쿠아슈즈·방수팩','자외선 차단제·모자·우비 또는 접이식 우산','개인 복용약·상비약·모기 기피제·충전기·보조배터리','eSIM 또는 로밍, 소액 현금(IDR 50,000·100,000권)']}
];
const steps=[
{title:'e-VOA 신청',body:'공식 사이트에서 8명을 5명+3명으로 나눠 신청하고 승인 메일·PDF를 저장.'},
{title:'관광세 결제',body:'Love Bali에서 8명 각각 IDR 150,000 결제. QR 바우처를 가족 휴대폰에 저장.'},
{title:'All Indonesia',body:'출발 3일 전부터 단체 제출. 각자 여권으로 입력하고 리드 QR을 캡처.'},
{title:'픽업·차량 확정',body:'8명+짐 기준 차량 1대(밴) 또는 2대를 정하고, 심야 도착 시간을 기사에게 전달.'}
];
const moveOptions=[
{tag:'OPTION A',title:'앱택시 2대',cost:'Grab · Gojek · 일반 승용차 4인승 기준',points:['가까운 거리·짧은 이동에 유연','8명이면 2대, 짐이 많으면 트렁크 부족','심야·우천에는 배차가 늦어질 수 있음','요금은 앱에 표시된 금액 기준'],when:'낮 시간 시내 이동, 2–3명씩 나눠 움직일 때'},
{tag:'OPTION B',title:'10–12인승 밴 + 기사',cost:'기사 포함 차터 · 업체·차종별 견적',points:['가족이 한 차로 이동, 짐 한 번에 적재','공항 픽업·숙소 이동·반나절 외출에 적합','주차·골목 진입로가 좁은 숙소는 사전 확인','10시간 차터로 하루 동선을 묶으면 대기 시간이 줄어듦'],when:'공항 픽업, 우붓↔스미냑 이동, 짐이 많은 날'}
];
const rainUbud=[['푸리 루키산 미술관','실내 전시 · 우붓 중심',maps('Puri Lukisan Museum Ubud')],['Neka Art Museum','발리 회화 · 상깅안',maps('Neka Art Museum Ubud')],['Widya Batik 색칠 체험','약 2시간 · 예약 확인',maps('Widya Batik Class Ubud')],['Karsa Spa · Tjampuhan Spa','예약 후 방문 · 차량 대기 확인',maps('Karsa Spa Ubud')],['빌라 수영 · 실내 휴식','이동 없이 회복',maps('Ubud Bali villa')]];
const rainSeminyak=[['Seminyak Village','실내 쇼핑 · 호텔 셔틀 확인',maps('Seminyak Village')],['Beachwalk 쿠타','실내 몰 · 차로 15–25분',maps('Beachwalk Shopping Center Kuta')],['Sava Spa · Bodyworks','호텔 안/차량 이동 스파',maps('Sava Spa Hotel Indigo Seminyak')],['Bintang Supermarket','간식·선물·생필품',maps('Bintang Supermarket Seminyak')],['호텔 라운지 · 수영장','비 그칠 때 짧게',maps('Hotel Indigo Bali Seminyak Beach')]];
const practical=['우붓 → 스미냑 이동은 오전 10시 전 출발. 오후에는 정체와 소나기가 겹침.','공항 귀국편은 3시간 전 도착 기준. 2/8은 20:30 공항 도착 목표.','단체 식당 예약 시 인원·아이 의자·좌석 위치를 함께 요청.','카시트는 기본 제공되지 않음. 필요하면 차량 업체에 사전 요청.','우붓 계곡·논 계단은 비 온 뒤 미끄러움. 미끄럼 적은 신발.','결제는 카드·QRIS가 흔하지만 소액 현금도 준비.','수영 후 샤워·물놀이 후 젖은 옷 파우치를 따로.','예약 변경·취소 조건은 결제 전에 확인.'];
export function TravelInfo(){
 const [active,setActive]=useState<Info|null>(null);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(active)dialog.current?.showModal();else dialog.current?.close()},[active]);
 return <>
  <div className="prep-lead"><span>2027.02.03–08 · 5박 6일</span><span>가족 8명</span><span>우붓 3박 + 스미냑 2박</span><span>정보 확인 2026-11</span></div>
  <div className="info-grid">{info.map(x=><button className="info-tile" key={x.title} onClick={()=>setActive(x)}><span className="info-icon" aria-hidden="true">{x.icon}</span><span><strong>{x.title}</strong><small>{x.subtitle}</small></span><ChevronRight size={20}/></button>)}</div>
  <section className="info-section"><span className="eyebrow">BEFORE YOU FLY</span><h3>출발 전에 끝내둘 4가지</h3><p className="section-intro">순서대로 처리하면 공항에서 다시 확인할 일이 줄어듭니다.</p><div className="arrival-steps">{steps.map((s,i)=><article className="arrival-step" key={s.title}><b>{String(i+1).padStart(2,'0')}</b><h4>{s.title}</h4><p>{s.body}</p></article>)}</div></section>
  <section className="info-section"><span className="eyebrow">8 PEOPLE ON THE MOVE</span><h3>8인 이동, 무엇이 편할까</h3><p className="section-intro">짐 8인분과 이동 시간을 함께 보면 선택이 갈립니다. 두 방식을 용도별로 나눠 쓰는 것도 방법입니다.</p><div className="move-compare">{moveOptions.map(o=><article className="move-card" key={o.title}><span className="move-tag">{o.tag}</span><h4>{o.title}</h4><p className="move-cost">{o.cost}</p><ul>{o.points.map(p=><li key={p}>{p}</li>)}</ul><p className="move-when">이럴 때 · {o.when}</p></article>)}</div></section>
  <section className="info-section" id="rain-plan"><span className="eyebrow">FEBRUARY RAIN PLAN</span><h3>비가 오면 이렇게 바꿉니다</h3><p className="section-intro">2월은 오후 소나기가 잦습니다. 야외 일정 한 곳을 아래 실내 후보와 교체하는 방식으로 운영하세요.</p><div className="rain-plan"><article className="rain-card"><h4>우붓 🌾</h4><ul>{rainUbud.map(([name,note,url])=><li key={name}><a href={url} target="_blank" rel="noreferrer">{name}</a> — {note}</li>)}</ul></article><article className="rain-card"><h4>스미냑 🌊</h4><ul>{rainSeminyak.map(([name,note,url])=><li key={name}><a href={url} target="_blank" rel="noreferrer">{name}</a> — {note}</li>)}</ul></article></div><p className="rain-note">비가 그친 뒤 해변·계단 코스는 노면이 미끄럽습니다. 서핑·러닝은 현장 기상과 깃발 안내를 먼저 확인하세요.</p></section>
  <section className="info-section"><span className="eyebrow">FIELD NOTES</span><h3>현장에서 바로 쓰는 팁</h3><ul className="practical-list">{practical.map(p=><li key={p}>{p}</li>)}</ul><p className="source-note">요금·규정·운영 시간은 2026-11-24 기준 공식 안내로 확인한 값입니다. 2027년 출발 전 e-Visa·Love Bali·All Indonesia·항공사 안내에서 한 번 더 확인하세요. 지도 링크는 장소명 검색 기준이며 정확한 픽업 지점은 별도 확인이 필요합니다. <a href="https://evisa.imigrasi.go.id/" target="_blank" rel="noreferrer">공식 안내 <ArrowUpRight size={11}/></a></p></section>
  <dialog ref={dialog} className="info-dialog" aria-label={active?.title||'여행 정보'} onCancel={()=>setActive(null)} onClose={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null)}}><div className="place-dialog-toolbar"><b>{active?.title}</b><button aria-label="여행 정보 닫기" onClick={()=>setActive(null)}><X/></button></div><div className="info-dialog-content">{active?.lines.map((line,i)=><p key={i}>{line}</p>)}{active?.links?.map(l=><a className="secondary" key={l.url} href={l.url} target={l.url.startsWith('#')?undefined:'_blank'} rel="noreferrer">{l.label} ↗</a>)}</div></dialog>
 </>;
}
