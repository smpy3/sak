/* Simple “reveal on scroll” wrapper so sections feel alive without being noisy. */
"use client";

import { motion, type MotionProps } from "framer-motion";

export default function Reveal({
  children,
  className,
  ...props
}: MotionProps & { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      // We avoid animating CSS `filter` (blur) because it can cause a “black flash” on first load on some GPUs.
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
