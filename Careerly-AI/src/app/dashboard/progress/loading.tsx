"use client";

import { motion } from "framer-motion";

// ============================================
// Progress Loading Skeleton
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

export default function ProgressLoading() {
  return (
    <div className="space-y-8">
      <div>
        <SkeletonPulse className="h-9 w-52" />
        <SkeletonPulse className="mt-3 h-5 w-72" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="mt-3 h-7 w-16" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <SkeletonPulse className="h-6 w-44" />
          <SkeletonPulse className="mt-6 h-[250px] w-full" />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <SkeletonPulse className="h-6 w-40" />
          <SkeletonPulse className="mt-6 h-[180px] w-[180px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
