"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { SkillData } from "@/lib/types";

// ============================================
// Skills Radar Chart Component
// ============================================

interface SkillsRadarChartProps {
  data: SkillData[];
}

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
          />
          {/* Target area */}
          <Radar
            name="Target"
            dataKey="target"
            stroke="#A855F7"
            fill="#A855F7"
            fillOpacity={0.08}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          {/* Current area */}
          <Radar
            name="Current"
            dataKey="current"
            stroke="#22D3EE"
            fill="#22D3EE"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-accent" />
          <span className="text-xs text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-purple-accent" />
          <span className="text-xs text-muted-foreground">Target</span>
        </div>
      </div>
    </div>
  );
}
