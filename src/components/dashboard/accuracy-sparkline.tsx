"use client";

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

export function AccuracySparkline({ values }: { values: number[] }) {
  const data = values.map((accuracy, i) => ({ i, accuracy }));
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <YAxis domain={["dataMin - 2", "dataMax + 2"]} hide />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2E75B6"
            strokeWidth={2}
            dot={false}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
