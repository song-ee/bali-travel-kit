import {curatedPlaces} from './curated';
import {candidateAdditions} from './candidates';
export type Place={id:string;name:string;area:string;category:string;description:string;duration:string;price:string;source:string;status:string;note:string;favorite?:boolean;tags:string[]};
const p=(id:string,name:string,area:string,category:string,description:string,duration:string,price:string,source:string,tags:string[]=[]):Place=>({id,name,area,category,description,duration,price,source,status:'후보',note:'',tags});
export const places:Place[]=[
p('palace','우붓 왕궁 · 아트 마켓','우붓','랜드마크','왕궁과 맞은편 시장을 묶은 짧은 도심 코스. 라탄 가방·기념품 쇼핑 가능.','60–90분','입장·구매 비용 현장 확인','https://balitourismboard.or.id/destinasi-wisata/ubud-art-market-oleh-oleh/',['가벼운 산책','추천']),
p('tirta','띠르따 엠풀','우붓','랜드마크','발리의 성수 사원. 정화 의식 참여 없이 관람 가능. 종교 공간이며 수영 시설이 아님.','60–90분','입장료 재확인','https://www.indonesia.travel/id/en/explore-indonesia/bali-nusa-tenggara/bali/bali---the-holy-springs-of-tirta-empul',['추천','문화']),
p('terrace','뜨갈랄랑 라이스 테라스','우붓','랜드마크','논 전망 카페와 짧은 산책 중심. 계단이 많은 구간은 생략 가능.','45–60분','카페·구역별 상이','https://www.indonesia.travel/gb/en/destination/bali-nusa-tenggara/bali/ubud---tegallalang-rice-terrace-a-charm-of-the-green-in-ubud',['전망','우천 대체 필요']),
p('campuhan','짬뿌한 능선 산책','우붓','러닝·서핑','아침 러닝·산책 후보. 피로하거나 비가 오면 생략.','30–45분','별도 확인','https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/bukit-campuhan',['선택','야외']),
p('museum','푸리 루키산 미술관','우붓','체험','발리 회화·조각 전시. 우천 시 기존 관광 한 곳을 대체하는 실내 코스.','60–90분','현재 성인 IDR 95,000 · 재확인','https://www.purilukisanmuseum.com/museum-puri-lukisan.html',['비 오는 날']),
p('batik','Widya Batik 색칠 체험','우붓','체험','약 2시간의 바틱 색칠 체험. 어린이 참여 시 뜨거운 왁스 공정 제외 여부 확인.','약 2시간','프로그램 견적 확인','https://widyabatikclass.com/batik-coloring-session/',['가족','예약 확인']),
p('cooking','빌라 방문 쿠킹 클래스','우붓','체험','빌라 방문 요리 체험 후보. 조리시설과 전체 인원 참여 가능 여부 확인 필요.','약 2시간','9인 방문 견적 미확인','https://cookinglessonbali.com/kids-cooking-class-ubud',['가족','사전 확인']),
p('karsa','Karsa Spa','우붓','마사지','논 전망의 우붓 마사지 우선 후보. 귀가 차량·기사 대기 또는 스파 이동편 확인 필요.','60 / 90분','60분 IDR 276,000 · 90분 402,500 (15% 포함, 카드 추가 별도)','https://karsaspa.com/',['추천','논 전망']),
p('tjampuhan','Tjampuhan Spa','우붓','마사지','계곡과 돌 조각 공간의 스파 대안. 예약 전 계단·이동 동선 확인.','60분부터','최신 개별 시술가 확인','https://tjampuhan-bali.com/spa/',['분위기','계단 확인']),
p('sava','Sava Spa · 호텔 인디고','스미냑','마사지','호텔 내 마사지 우선 후보. 수영장 보호자와 마사지 이용 인원을 교대로 배정.','60 / 90분','60분 IDR 840,000 · 90분 1,250,000 (세금·서비스 별도)','https://seminyak.hotelindigo.com/en/wellness/sava-spa',['추천','숙소 내']),
p('bodyworks','Bodyworks','스미냑','마사지','쁘띠뜽읏 소재 스파. 별도 차량 이동 필요. Sava 대신 선택 가능한 대안.','70분 + 샤워','발리 마사지 IDR 650,000 · 세금 포함 여부 확인','https://www.bodyworksbali.com/treatments',['차량 이동']),
p('spring','Spring Spa · Seminyak Village','스미냑','마사지','Seminyak Village 쇼핑과 함께 이용 가능한 스파.','메뉴별 상이','최신 메뉴 확인','https://www.springspa.com/locations/bali/seminyak-village',['쇼핑 연계']),
p('surf','호텔 인디고 서핑','스미냑','러닝·서핑','조수·파도에 따라 시간 확정. 비참여 인원은 호텔 수영장·카페 이용.','약 2시간','현재 IDR 450,000부터 · 추가 요금 재확인','https://seminyak.hotelindigo.com/id/offers/seminyak-is-surfing',['선택','날씨 확인']),
p('pool','호텔 인디고 수영장','스미냑','물놀이','키즈 풀·메인 풀 이용. 어린이는 보호자 동반.','원하는 만큼','숙박 혜택 범위 확인','https://www.ihg.com/hotelindigo/hotels/us/en/bali/dpsin/hoteldetail/amenities',['추천','숙소 내']),
p('beach','스미냑 해변 산책','스미냑','물놀이','해변 산책·모래놀이 후보. 입수는 현장 깃발·라이프가드 안내 준수. 수영은 호텔 풀 우선.','30–60분','자유 산책','https://seminyak.hotelindigo.com/en/news/seminyak-beach-guide',['노을','바다 상태 확인']),
p('waterbom','Waterbom Bali','꾸따','물놀이','반나절 워터파크 대안. 기존 반나절 일정과 교체해 이용.','4–5시간','날짜별 공식 티켓 확인','https://www.waterbom-bali.com/general',['대체 일정','차량 이동']),
p('threads','Threads of Life','우붓','쇼핑','인도네시아 직물·공예품 매장. 시장 쇼핑의 대안. Jl. Kajeng 24.','30–45분','구매 예산별','https://threadsoflife.com/pages/contact',['공예','현재 10–18시']),
p('bintang','Bintang Supermarket','스미냑','쇼핑','커피·간식·선물·생필품 구매. 구매량이 많으면 차량 이동 권장.','30–60분','구매 예산별','https://www.bintangsupermarket.com/store',['추천','간식·선물']),
p('village','Seminyak Village','스미냑','쇼핑','패션·기념품·카페 입점. 호텔 무료 셔틀 현재 11시·16시. 인원·복귀편 별도 확인.','60–90분','구매 예산별','https://seminyakvillage.com/',['현재 10–22시','셔틀 확인']),
p('biasa','BIASA','스미냑','쇼핑','리조트웨어 매장. 선택 방문. Jl. Raya Seminyak 36.','30–45분','구매 예산별','https://biasagroup.com/pages/store-information',['리조트웨어','현재 09–21시'])];
export const days=[
{date:'2027-02-03',label:'03',weekday:'수',area:'이동 → 우붓',title:'발리 도착 · 우붓 이동',mood:'도착일 이동 전용',events:[['17:50','인천 출발 · KE433','항공편 예약 정보 기준 · 인천 현지 시각'],['23:55','덴파사르 도착','발리 현지 시각 · 수하물 수령 후 차량 이동'],['심야','우붓 빌라 체크인','2/4 새벽 02–04시 도착 예상. 입국·교통 상황에 따른 변동 가능.']],ids:[]},
{date:'2027-02-04',label:'04',weekday:'목',area:'우붓',title:'우붓 시내 · 빌라 수영',mood:'도심 외출 1회',events:[['늦은 오전','휴식 · 늦은 조식','심야 도착 다음 날. 오전 일정 비움.'],['점심 전후','우붓 왕궁 & 아트 마켓','짧은 산책과 점심. 컨디션에 따라 생략 가능.'],['오후','빌라 수영 · 자유시간','수영·휴식. 저녁은 숙소 인근.']],ids:['palace','threads']},
{date:'2027-02-05',label:'05',weekday:'금',area:'우붓',title:'사원 · 라이스 테라스',mood:'관광 1–2곳 · 오후 휴식',events:[['오전','띠르따 엠풀','관람 중심. 정화 의식 참여는 선택.'],['점심','뜨갈랄랑 전망 & 점심','계단 구간 최소화. 전망 카페에서 점심.'],['오후','빌라 수영 또는 Karsa Spa','마사지 선택 시 오전 관광 한 곳 생략.']],ids:['tirta','terrace','karsa']},
{date:'2027-02-06',label:'06',weekday:'토',area:'우붓 → 스미냑',title:'우붓 → 스미냑 이동',mood:'숙소 간 이동 우선',events:[['아침','선택 러닝 · 아침 식사','기상·컨디션이 양호하면 짬뿌한 선택 방문.'],['10:30–11:00','빌라 출발 · 점심 · 이동','예상 출발 시간. 중간 관광 없음.'],['15:00 이후','호텔 인디고 체크인','체크인 후 수영장·해변 산책.']],ids:['campuhan','pool','beach']},
{date:'2027-02-07',label:'07',weekday:'일',area:'스미냑',title:'서핑 · 수영 · 마사지',mood:'물놀이 + 마사지',events:[['오전','서핑 또는 호텔 수영','조수·기상 조건에 따른 서핑 예약 시각 확정.'],['점심','점심 식사','오전 활동 후 합류.'],['오후','수영 · 어른들 번갈아 스파','수영장 보호자와 마사지 이용자 교대.'],['해 질 무렵','해변 산책 & 저녁','숙소 인근에서 산책·저녁 식사.']],ids:['surf','pool','sava','beach']},
{date:'2027-02-08',label:'08',weekday:'월',area:'스미냑 → 공항',title:'쇼핑 · 귀국',mood:'쇼핑 1곳 선택',events:[['오전','마지막 수영 · 브런치','일반 체크아웃 12시. 샤워와 짐 보관 계획을 먼저 확인.'],['오후','Bintang 또는 Seminyak Village','두 곳 중 한 곳 선택.'],['약 20:30','공항 도착 목표','당일 교통 상황에 따라 출발 시간 조정.'],['23:50','KE432 발리 출발','2/9 07:45 인천 도착 · 각각 현지 시각']],ids:['bintang','village']}];
export const checklist=[
{id:'pickup',group:'이동·예약',title:'공항 → 우붓 심야 픽업 예약',detail:'9명과 실제 수하물이 모두 들어가는 차량 확인. 2/4 새벽 빌라 도착 안내.',done:false},
{id:'transfer',group:'이동·예약',title:'2/6 우붓 → 스미냑 차량 확정',detail:'짐 포함 좌석 수, 출발 시간, 점심 정차 가능 여부.',done:false},
{id:'checkout',group:'이동·예약',title:'2/8 체크아웃 후 샤워·짐 보관 계획',detail:'레이트 체크아웃 또는 데이룸 요금·가능 여부는 호텔에 확인.',done:false},
{id:'spa',group:'즐길 거리',title:'마사지 1–2회 선택 · 교대 시간 확정',detail:'Karsa / Sava 우선. 7인 동시 시술 가능 여부와 아이 돌봄 분담 확인.',done:false},
{id:'surf',group:'즐길 거리',title:'서핑 시간·수준·파도 조건 확인',detail:'2/7 우선 후보. 현지 컨디션에 따라 조정.',done:false},
{id:'rules',group:'출발 준비',title:'출발 전 공식 입국 요건 재확인',detail:'여권 유효기간, 비자·입국 신고·관광세 등 2027년 적용 규정은 공식 채널에서 확인.',done:false},
{id:'insurance',group:'출발 준비',title:'여행자보험과 서핑 보장 범위 확인',detail:'보험 약관·활동 보장 조건 확인 필요.',done:false},
{id:'poolbag',group:'짐 챙기기',title:'수영복 · 래시가드 · 수경 · 젖은 옷 파우치',detail:'물놀이 용품 준비.',done:false},
{id:'rain',group:'짐 챙기기',title:'우비 · 미끄럼 적은 신발 · 자외선 차단',detail:'우기 대비. 강우 시 일정 조정.',done:false},
{id:'essentials',group:'짐 챙기기',title:'개인 상비품 · 충전기 · 통신 준비',detail:'개인 복용약 필요량 준비. eSIM·로밍 선택.',done:false}];
export type TripData={schemaVersion:number;places:Place[];checklist:typeof checklist;dayNotes:Record<string,string>;dayEvents?:Record<string,string[][]>;slotChoices?:Record<string,Record<string,{placeId:string;original:string[]}>>;journal:string;budget:string};
export const initial:TripData={schemaVersion:1,places:[...places,...candidateAdditions,...curatedPlaces],checklist,dayNotes:{},dayEvents:{},journal:'',budget:''};
