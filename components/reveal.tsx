"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

type Direction = "left" | "right" | "up" | "down";

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  left: { x: -70 },
  right: { x: 70 },
  up: { y: 50 },
  down: { y: -50 },
};

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

function useDisableReveal() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const update = () => setDisabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return disabled;
}

export function Reveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const disabled = useDisableReveal();

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...OFFSET[direction] },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
