"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedProps = {
  children: ReactNode;
  delay?: number;
  as?: "section" | "div" | "article";
  className?: string;
};

export function FadeIn({
  children,
  as = "div",
  className,
}: AnimatedProps) {
  const animationProps = {
    initial: false,
    className,
  } as const;

  if (as === "section") {
    return <motion.section {...animationProps}>{children}</motion.section>;
  }

  if (as === "article") {
    return <motion.article {...animationProps}>{children}</motion.article>;
  }

  return (
    <motion.div {...animationProps}>
      {children}
    </motion.div>
  );
}

export function FloatIn({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      className={className}
    >
      {children}
    </motion.div>
  );
}
