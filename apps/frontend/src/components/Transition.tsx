import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { useRouter } from "next/router";

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

export const Transition = ({ children }) => {
  const { asPath } = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={asPath}
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
