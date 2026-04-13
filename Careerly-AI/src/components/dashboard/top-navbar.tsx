"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CoinBalanceDisplay } from "@/components/ui/coin-animation";
import { useRewards } from "@/lib/rewards-context";
import { getLevelTitle } from "@/lib/rewards";

// ============================================
// Top Navbar — displays page title + Forge Coins
// ============================================

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/roadmap": "Career Roadmap",
  "/dashboard/progress": "Progress Tracker",
  "/dashboard/suggestions": "Daily Suggestions",
  "/dashboard/opportunities": "Market Opportunities",
  "/dashboard/rewards": "Forge Rewards",
  "/dashboard/profile": "Profile & Settings",
};

export function TopNavbar() {
  const pathname = usePathname();
  const { level } = useRewards();
  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-background/80 backdrop-blur-xl px-4 py-3 lg:px-8"
    >
      {/* Left — Page context */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-accent/60" />
          <span className="text-sm text-muted-foreground">
            {getLevelTitle(level)}
          </span>
        </div>
      </div>

      {/* Right — Coin balance */}
      <div className="flex items-center gap-3">
        <CoinBalanceDisplay />
      </div>
    </motion.header>
  );
}
