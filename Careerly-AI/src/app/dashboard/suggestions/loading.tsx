"use client";

import { motion } from "framer-motion";

// ============================================
// Suggestions Loading Skeleton
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

export default function SuggestionsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div>
          <SkeletonPulse className="h-9 w-56" />
          <SkeletonPulse className="mt-3 h-5 w-80" />
        </div>
        <SkeletonPulse className="h-10 w-24 rounded-xl" />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonPulse key={i} className="h-8 w-20 rounded-lg" />
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex items-start gap-3">
              <SkeletonPulse className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="flex-1">
                <SkeletonPulse className="h-5 w-4/5" />
                <SkeletonPulse className="mt-3 h-4 w-full" />
                <SkeletonPulse className="mt-1 h-4 w-3/4" />
                <div className="mt-3 flex gap-2">
                  <SkeletonPulse className="h-5 w-14 rounded-md" />
                  <SkeletonPulse className="h-5 w-16 rounded-md" />
                </div>
                <div className="mt-3 flex gap-3">
                  <SkeletonPulse className="h-5 w-16 rounded-full" />
                  <SkeletonPulse className="h-5 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
