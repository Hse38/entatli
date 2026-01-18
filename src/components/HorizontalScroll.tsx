 "use client";
 
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
 
 type HorizontalItem = {
   readonly id: number;
   readonly title: string;
   readonly description: string;
 };
 
type HorizontalScrollProps = {
  items: readonly HorizontalItem[];
};
 
 const DRAG_THRESHOLD = 3;
 const SCROLL_STEP_RATIO = 0.75;
 const PARALLAX_Y = 16;
 
 export default function HorizontalScroll({ items }: HorizontalScrollProps) {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const [isDragging, setIsDragging] = useState(false);
   const dragStartX = useRef(0);
   const dragStartScroll = useRef(0);
 
   const { scrollXProgress } = useScroll({ container: containerRef });
   const parallax = useTransform(scrollXProgress, [0, 1], [0, -PARALLAX_Y]);
   const fade = useTransform(scrollXProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
 
   useEffect(() => {
     const container = containerRef.current;
     if (!container) return;
 
     const onWheel = (event: WheelEvent) => {
       if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
       event.preventDefault();
       container.scrollBy({ left: event.deltaY, behavior: "auto" });
     };
 
     container.addEventListener("wheel", onWheel, { passive: false });
     return () => container.removeEventListener("wheel", onWheel);
   }, []);
 
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
     const container = containerRef.current;
     if (!container) return;
     setIsDragging(true);
     dragStartX.current = event.pageX;
     dragStartScroll.current = container.scrollLeft;
   };
 
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
     if (!isDragging) return;
     const container = containerRef.current;
     if (!container) return;
     const distance = event.pageX - dragStartX.current;
     if (Math.abs(distance) < DRAG_THRESHOLD) return;
     container.scrollLeft = dragStartScroll.current - distance;
   };
 
   const stopDragging = () => {
     setIsDragging(false);
   };
 
   const scrollByStep = (direction: number) => {
     const container = containerRef.current;
     if (!container) return;
     const step = Math.round(container.clientWidth * SCROLL_STEP_RATIO);
     container.scrollBy({ left: step * direction, behavior: "smooth" });
   };
 
   return (
     <div className="relative">
       <div className="group relative">
         <div
           ref={containerRef}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={stopDragging}
           onMouseLeave={stopDragging}
           className={`hide-scrollbar flex gap-6 overflow-x-auto pb-6 pt-2 ${
             isDragging ? "cursor-grabbing" : "cursor-grab"
           } snap-x snap-mandatory md:snap-none`}
         >
           {items.map((item) => (
             <motion.article
               key={item.id}
               style={{ y: parallax, opacity: fade }}
               whileHover={{ scale: 1.03 }}
               transition={{ type: "spring", stiffness: 220, damping: 24 }}
               className="snap-start flex-none rounded-3xl border border-dark/5 bg-white p-8 shadow-[0_18px_40px_rgba(17,17,17,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(17,17,17,0.12)] w-[280px] sm:w-[320px] lg:w-[360px]"
             >
               <div className="mb-6 h-32 rounded-2xl bg-gradient-to-br from-lilac/10 via-soft-lavender/10 to-transparent" />
               <h3 className="text-lg font-semibold text-dark">{item.title}</h3>
               <p className="mt-3 text-sm text-dark/70">{item.description}</p>
             </motion.article>
           ))}
         </div>
 
         <button
           type="button"
           aria-label="Scroll left"
           onClick={() => scrollByStep(-1)}
           className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-dark/10 bg-white/80 text-dark/70 opacity-0 shadow-sm transition hover:text-dark group-hover:opacity-100 md:flex"
         >
           ←
         </button>
         <button
           type="button"
           aria-label="Scroll right"
           onClick={() => scrollByStep(1)}
           className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-dark/10 bg-white/80 text-dark/70 opacity-0 shadow-sm transition hover:text-dark group-hover:opacity-100 md:flex"
         >
           →
         </button>
       </div>
 
       <div className="mt-4 h-px w-full bg-dark/10">
         <motion.div
           className="h-px origin-left bg-dark/40"
           style={{ scaleX: scrollXProgress }}
         />
       </div>
     </div>
   );
 }
