"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CurvedArrow({
  color = "#2E75B6",
  label,
  className,
}: {
  color?: string;
  label?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dashOffset = useTransform(scrollYProgress, [0, 0.5], [200, 0]);

  return (
    <div ref={ref} className={`relative mx-auto w-fit ${className ?? ""}`}>
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        <motion.path
          d="M30 0 C30 30, 50 40, 30 80"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="200"
          style={{ strokeDashoffset: dashOffset }}
        />
        <motion.polygon
          points="24,72 30,82 36,72"
          fill={color}
          style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
        />
      </svg>
      {label && (
        <span className="absolute -right-20 top-1/2 -translate-y-1/2 text-xs font-medium tracking-wider text-[#9CA3AF]">
          {label}
        </span>
      )}
    </div>
  );
}
