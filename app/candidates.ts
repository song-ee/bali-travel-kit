import {curatedPlaces} from './curated';
import type {Place} from './data';
const item=(id:string,name:string,area:string,category:string,description:string,duration:string,price:string,source:string,tags:string[],note=''):Place=>({id,name,area,category,description,duration,price,source,tags,note,status:'후보',favorite:false});
export const candidateAdditions:Place[]=[
item('monkey-forest','몽키 포레스트','우붓','랜드마크','원숭이가 서식하는 보호구역·사원 단지. 선택 방문만 고려하며 기본 일정에 포함하지 않음. 동물 접근이 부담스러우면 생략.','선택 방문','입장료 별도 확인','https://monkeyforestubud.com/',['옵션만','기본 일정 제외'],'반야생 원숭이 행동은 예측하기 어려움. 방문 시 공식 행동 수칙 확인.'),
item('pison','Pison Ubud','우붓','식당·카페','논 전망의 식당·카페. 실내·야외 공간. 단체 좌석과 예약 가능 여부는 별도 문의.','식사·카페 60–90분 계획','메뉴·단체 조건 확인','https://pisonindonesia.com/pison-ubud/',['논 전망','실내·야외','단체 문의'],'공식 문의: https://pisonindonesia.com/contact-pison/ · 사진은 2020년 자료사진.'),
item('greenkubu','Greenkubu Café','우붓','식당·카페','논 전망·지붕 있는 좌석. 8명 초과 그룹은 사전 문의. 마지막 진입로가 좁아 차량 접근 확인 필요.','식사·카페 60–90분 계획','메뉴·좌석 조건 확인','https://greenkubu.com/',['논 전망','단체 문의','차량 접근 확인'],'스윙 시설의 어린이 이용 조건은 미확인. 식사 후보와 스윙 이용 가능 여부를 구분.'),
item('montana','Montana Del Café','킨타마니','식당·카페','바투르산·호수 전망 카페. 우붓에서 편도 약 1시간15분–1시간45분 이동 예상. 단체 좌석·계단 동선 확인 필요.','이동 포함 반나절 계획','메뉴·단체 조건 확인','https://ellagohotelkintamani.com/restaurants',['산·호수 전망','장거리 이동','우천 대체 필요'],'차량 시간은 교통에 따른 추정. 기존 관광 반나절을 대체하는 후보이며 기본 일정에 추가하지 않음.'),
item('seasalt','Seasalt · Alila Seminyak','스미냑','식당·카페','바다·선셋 전망 식사 후보. 실내·데크 좌석과 어린이 메뉴. 전체 인원 좌석·선셋 시간대 예약 가능 여부 미확인.','식사 90–120분 계획','메뉴·단체 조건 확인','https://www.hyatt.com/alila-hotels-and-resorts/en-US/dpsas-alila-seminyak/seasalt',['바다 전망','어린이 메뉴','예약 문의']),
item('sidan-swing','Bali Swing · Sidan Eco Park','우붓','체험','스윙·사진 촬영 후보. 일반 안내 연령 범위는 5–75세이나 개별 놀이기구의 신체 조건·이용 적합성 별도 확인 필요. 비탑승 입장과 레스토랑 이용 가능.','체험·대기 시간 확인','패키지·비탑승 요금 확인','https://baliswing.com/attraction/bali-swing-ubud-swing/',['스윙','조건 확인 필수','비탑승 대안'],'이용 수칙: https://baliswing.com/sidan-eco-park-rules/ · 연령 범위가 모든 기구의 탑승 가능을 보장하지 않음.'),
item('alas-harum','Alas Harum · 스윙','우붓','체험','스윙 이용 후보. 표준 스윙 최소 체중 35kg 조건 확인 필요. 어린이의 나이만으로 이용 가능 여부 판단 불가.','체험·대기 시간 확인','기구별 요금·조건 확인','https://alasharum.com/en/alas-harum-bali/ride-attraction',['스윙','최소 체중 확인','Cretya 제외'],'인접 Cretya는 18세 이상 기준이므로 가족 동반 이용 후보에서 제외. 실제 기구별 조건 재확인.'),
item('batur-sunset-jeep','바투르산 일몰 지프 투어','킨타마니','체험','산 전망대까지 지프로 이동하는 체험. 정상 등반이 아님. 비포장 구간 진동이 크므로 참여자별 적합성 확인 필요.','우붓 14:30 출발–20:00 복귀 예시 · 약5–6시간','차량·보험·연령 조건 확인','https://www.bagusbalisunrise.com/mount-batur-sunset-jeep.html',['전망대','장시간 이동','노면 진동'],'운영사 예시 일정이며 확정 시간 아님. 기상·보험·연령 조건 확인 후 선택. 기존 반나절 일정과 교체.')
];
const aliases:Record<string,string[]>={
'monkey-forest':['몽키포레스트','monkeyforest'],pison:['pison','피손'],greenkubu:['greenkubu','그린쿠부'],montana:['montana','몬타나'],seasalt:['seasalt','시솔트','씨솔트'],'sidan-swing':['sidan','시단'],'alas-harum':['alasharum','알라스하룸'],'batur-sunset-jeep':['바투르선셋지프','batursunsetjeep']};
const norm=(s:string)=>s.toLowerCase().replace(/[\s·.,()\-]/g,'');
export function addMissingCandidates(existing:Place[]):Place[]{const merged=[...existing];for(const p of [...candidateAdditions,...curatedPlaces]){if(!merged.some(x=>x.id===p.id||norm(x.name)===norm(p.name)||(aliases[p.id]||[]).some(a=>norm(x.name).includes(norm(a)))))merged.push({...p,tags:[...p.tags]})}return merged}
