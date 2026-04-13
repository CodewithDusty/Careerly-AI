"use client";

import { motion } from "framer-motion";

// ============================================
// Opportunities Loading Skeleton
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

export default function OpportunitiesLoading() {
  return (
    <div className="space-y-8">
      <div>
        <SkeletonPulse className="h-9 w-60" />
        <SkeletonPulse className="mt-3 h-5 w-80" />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonPulse key={i} className="h-8 w-24 rounded-lg" />
        ))}
      </div>

      {/* Cards */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <SkeletonPulse className="h-10 w-10 rounded-xl" />
                <div>
                  <SkeletonPulse className="h-5 w-48" />
                  <SkeletonPulse className="mt-1 h-4 w-24" />
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <SkeletonPulse className="h-6 w-20 rounded-full" />
                <SkeletonPulse className="h-6 w-24 rounded-full" />
                <SkeletonPulse className="h-6 w-20 rounded-full" />
              </div>
              <div className="mt-3 flex gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <SkeletonPulse key={j} className="h-5 w-16 rounded-md" />
                ))}
              </div>
              <SkeletonPulse className="mt-4 h-16 w-full rounded-xl" />
            </div>
            <div className="flex flex-col items-end gap-3">
              <SkeletonPulse className="h-16 w-16 rounded-2xl" />
              <SkeletonPulse className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
