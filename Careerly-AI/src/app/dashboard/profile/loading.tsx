"use client";

import { motion } from "framer-motion";

// ============================================
// Profile Loading Skeleton
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

export default function ProfileLoading() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <SkeletonPulse className="h-9 w-56" />
        <SkeletonPulse className="mt-3 h-5 w-72" />
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <div className="flex items-center gap-4 mb-6">
          <SkeletonPulse className="h-16 w-16 rounded-2xl" />
          <div>
            <SkeletonPulse className="h-6 w-32" />
            <SkeletonPulse className="mt-2 h-4 w-44" />
          </div>
        </div>
        <SkeletonPulse className="h-px w-full" />
        <div className="mt-6 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonPulse className="h-4 w-20" />
              <SkeletonPulse className="h-11 w-full rounded-xl" />
            </div>
          ))}
          <SkeletonPulse className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <SkeletonPulse className="h-6 w-28 mb-5" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <SkeletonPulse className="h-9 w-9 rounded-lg" />
              <div>
                <SkeletonPulse className="h-4 w-36" />
                <SkeletonPulse className="mt-1 h-3 w-52" />
              </div>
            </div>
            <SkeletonPulse className="h-6 w-11 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
