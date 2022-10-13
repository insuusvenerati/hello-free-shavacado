import { useLocation } from "@remix-run/react";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.2,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
};

export const Transition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={location.pathname}
        variants={!shouldReduceMotion ? variants : undefined}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
