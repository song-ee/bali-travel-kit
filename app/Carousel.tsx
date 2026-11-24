'use client';
import {useRef,useState,useEffect,type ReactNode} from 'react';
export function Carousel({children,className}:{children:ReactNode;className:string}){
 const track=useRef<HTMLDivElement>(null);const [edge,setEdge]=useState({start:true,end:false,overflow:false});
 useEffect(()=>{const el=track.current;if(!el)return;const sync=()=>setEdge({start:el.scrollLeft<2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2,overflow:el.scrollWidth>el.clientWidth+2});sync();el.addEventListener('scroll',sync,{passive:true});const ro=new ResizeObserver(sync);ro.observe(el);return()=>{ro.disconnect();el.removeEventListener('scroll',sync)}},[children]);
 const move=(dir:number)=>{const el=track.current;if(el)el.scrollBy({left:dir*el.clientWidth*.85,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
 return <section className="carousel-shell">{edge.overflow&&<div className="carousel-controls"><button aria-label="이전 카드 보기" disabled={edge.start} onClick={()=>move(-1)}>←</button><button aria-label="다음 카드 보기" disabled={edge.end} onClick={()=>move(1)}>→</button></div>}<div ref={track} className={className} tabIndex={0} aria-label="장소 카드 캐로셀" onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}}>{children}</div></section>
}
