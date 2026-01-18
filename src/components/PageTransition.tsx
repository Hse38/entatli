"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -2 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1], // Custom easing for smooth feel
              }
        }
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
