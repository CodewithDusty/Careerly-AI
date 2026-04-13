"use client";

import { motion } from "framer-motion";

// ============================================
// Roadmap Loading Skeleton
// ============================================

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-lg bg-white/[0.04] ${className}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function RoadmapLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <SkeletonPulse className="h-9 w-64" />
        <SkeletonPulse className="mt-3 h-5 w-80" />
        <SkeletonPulse className="mt-4 h-2 w-full" />
      </div>

      {/* Phase skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          <div className="flex items-center gap-4">
            <SkeletonPulse className="h-10 w-10 rounded-xl" />
            <div className="flex-1">
              <SkeletonPulse className="h-6 w-40" />
              <SkeletonPulse className="mt-2 h-4 w-64" />
            </div>
            <SkeletonPulse className="h-6 w-12 rounded-full" />
            <SkeletonPulse className="h-5 w-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
