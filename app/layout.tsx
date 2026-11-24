import type { Metadata } from 'next';
import './globals.css';
import './biotic.css';
import './butter.css';
export const metadata: Metadata={title:'Bali 2027 · 여행 계획',description:'우붓·스미냑 일정, 장소, 이동, 예약 상태 관리.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="ko"><body>{children}</body></html>}
