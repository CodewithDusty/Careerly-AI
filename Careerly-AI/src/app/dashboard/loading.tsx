"use client";

import { motion } from "framer-motion";

// ============================================
// Dashboard Loading Skeleton
// Matches the exact layout of the dashboard page
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

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div>
        <SkeletonPulse className="h-9 w-72" />
        <SkeletonPulse className="mt-3 h-5 w-96" />
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex items-center justify-between">
              <SkeletonPulse className="h-4 w-24" />
              <SkeletonPulse className="h-4 w-4 rounded-full" />
            </div>
            <SkeletonPulse className="mt-4 h-8 w-20" />
            <SkeletonPulse className="mt-3 h-1.5 w-full" />
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Radar chart area */}
        <div className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <SkeletonPulse className="h-6 w-40" />
          <SkeletonPulse className="mt-2 h-4 w-56" />
          <SkeletonPulse className="mt-6 mx-auto h-[280px] w-[280px] rounded-full" />
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Progress ring */}
          <div className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <SkeletonPulse className="h-6 w-36" />
            <SkeletonPulse className="mt-6 h-[160px] w-[160px] rounded-full" />
            <SkeletonPulse className="mt-4 h-4 w-40" />
          </div>

          {/* Daily suggestion */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 mb-4">
              <SkeletonPulse className="h-8 w-8 rounded-lg" />
              <div>
                <SkeletonPulse className="h-4 w-28" />
                <SkeletonPulse className="mt-1 h-3 w-20" />
              </div>
            </div>
            <SkeletonPulse className="h-5 w-full" />
            <SkeletonPulse className="mt-2 h-4 w-4/5" />
            <div className="mt-4 flex gap-2">
              <SkeletonPulse className="h-6 w-16 rounded-full" />
              <SkeletonPulse className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
