# Bali travel kit

가족 8명을 위한 2027년 발리 여행 탐색·일정 앱입니다. 우붓과 스미냑의 장소, 식당, 카페, 체험, 서핑, 러닝 코스를 지도와 카드로 살펴보고 북마크와 일정 선택을 관리합니다.

## 실행

Node.js 22.13.0 이상이 필요합니다.

```bash
npm run install:ci
npm run dev
```

```bash
npm run build
npm run start
```

React 19, TypeScript, Vinext/Vite, Tailwind CSS를 사용하며 Cloudflare Workers/D1 기반 서버 코드가 포함되어 있습니다. Cloudflare 배포에는 본인 환경의 D1 바인딩과 마이그레이션, 인증 설정이 필요합니다. 기존 Sites 프로젝트의 내부 호스팅 메타데이터와 로컬 빌드 캐시는 이 저장소에서 제외했습니다.

## 저장 방식

- 로그인하지 않은 방문자의 선택과 북마크는 브라우저 localStorage에 저장됩니다.
- 인증된 사용자는 Cloudflare D1의 사용자별 레코드로 저장합니다. 클라우드 저장 API는 인증이 필요합니다.
- 클라우드 업데이트는 revision 검사로 충돌을 감지합니다.
- 기존 사용자의 클라우드 저장 데이터는 이 소스에 포함되지 않습니다.

## 주요 파일

- `app/TripApp.tsx`: 앱 상태, 탐색, 일정, 저장
- `app/candidates.ts`, `app/curated.ts`, `app/dining.ts`: 추천 콘텐츠
- `app/DiscoveryMaps.tsx`, `app/RunningMap.tsx`: 지도와 코스
- `app/PlaceDetail.tsx`, `app/Carousel.tsx`: 상세 카드와 캐로셀
- `app/api/trip/route.ts`: 사용자별 클라우드 저장 API
- `db/`, `drizzle/`: 데이터베이스 스키마와 마이그레이션
- `public/photos/`: 사이트에서 사용하는 장소 사진

## 검증 및 소스

업로드 기준 Sites 소스 커밋: `f4bc3c0d1fcaebddc4b65bdaa6c4916e3b4b82c2`.

해당 사이트 버전은 TypeScript 검사와 프로덕션 빌드를 통과했습니다. 외부 환경에서의 인증·D1 설정과 배포는 별도입니다. 원래 사진과 출처 메타데이터를 포함하며, 제3자 사진에 대한 별도 이용 권한을 부여하지 않습니다.

## 사진 업로드 상태

장소 사진 86개는 공개 저장소 업로드 승인 대기 중으로 아직 포함되지 않았습니다. 현재 사진 경로가 남아 있으므로 사진 업로드 전에는 이미지가 표시되지 않을 수 있습니다.
