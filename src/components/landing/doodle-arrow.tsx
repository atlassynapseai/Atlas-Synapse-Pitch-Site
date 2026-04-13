"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

export interface DoodleArrowProps {
  path: string;
  arrowheadPath: string;
  stroke: string;
  strokeWidth: number;
  label?: string;
  labelAngle?: number;
  labelOffset?: { x: number; y: number };
  viewBox: string;
  width: number;
  height: number;
  delay?: number;
  glowColor?: string;
  className?: string;
}

export function DoodleArrow({
  path,
  arrowheadPath,
  stroke,
  strokeWidth,
  label,
  labelAngle = 0,
  labelOffset,
  viewBox,
  width,
  height,
  delay = 0,
  glowColor,
  className,
}: DoodleArrowProps) {
  const ref = React.useRef<SVGSVGElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [len, setLen] = React.useState(400);

  React.useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [path]);

  const lx = labelOffset?.x ?? 0;
  const ly = labelOffset?.y ?? 0;

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      className={className}
      style={glowColor ? { filter: `drop-shadow(0 0 8px ${glowColor})` } : undefined}
      aria-hidden="true"
    >
      <g filter="url(#doodle)">
        <motion.path
          ref={pathRef}
          d={path}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.82}
          strokeDasharray={len}
          initial={{ strokeDashoffset: len }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay }}
        />
        <motion.path
          d={arrowheadPath}
          stroke={stroke}
          strokeWidth={Math.max(2, strokeWidth - 0.5)}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.85}
          fill="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: delay + 0.9 }}
        />
      </g>
      {label && (
        <motion.text
          x={lx}
          y={ly}
          fontSize="14"
          fill={stroke}
          fillOpacity={0.65}
          fontFamily="Inter, sans-serif"
          fontStyle="italic"
          fontWeight="400"
          transform={`rotate(${labelAngle}, ${lx}, ${ly})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.7 }}
        >
          {label}
        </motion.text>
      )}
    </svg>
  );
}
