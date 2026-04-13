"use client";

import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Flame,
  Star,
  Crown,
  Zap,
  Trophy,
  Users,
  MessageSquare,
  Palette,
  BarChart3,
  Compass,
  Lock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useRewards } from "@/lib/rewards-context";
import {
  calculateLevel,
  getLevelProgress,
  coinsToNextLevel,
  getLevelTitle,
  LEVEL_UNLOCKS,
  COINS_PER_LEVEL,
  MAX_LEVEL,
} from "@/lib/rewards";
import { ForgeCoinIcon } from "@/components/ui/coin-animation";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { format } from "date-fns";
import type { RewardAction } from "@/lib/types";

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================
// Icon mapping for level unlocks
// ============================================

const unlockIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Flame,
  MessageSquare,
  Palette,
  Crown,
  Zap,
  Users,
  BarChart3,
  Trophy,
};

// ============================================
// Action colors/labels
// ============================================

const actionConfig: Record<RewardAction, { label: string; color: string }> = {
  daily_suggestion: { label: "Daily Suggestion", color: "text-emerald-400" },
  roadmap_step: { label: "Roadmap Step", color: "text-cyan-accent" },
  roadmap_phase: { label: "Phase Complete", color: "text-purple-accent" },
  streak_7day: { label: "Streak Bonus", color: "text-orange-400" },
  streak_bonus: { label: "Streak Bonus", color: "text-orange-400" },
  course_complete: { label: "Course Done", color: "text-blue-400" },
  resource_complete: { label: "Resource Done", color: "text-teal-400" },
  milestone: { label: "Milestone", color: "text-amber-400" },
  welcome_bonus: { label: "Welcome", color: "text-pink-400" },
};

// ============================================
// Rewards Page Component
// ============================================

export default function RewardsPage() {
  const { totalCoins, level, coinsTowardNext, levelProgress, transactions } =
    useRewards();

  const remaining = coinsToNextLevel(totalCoins);
  const levelTitle = getLevelTitle(level);

  // Stats
  const totalEarned = transactions.reduce((sum, t) => sum + t.coins, 0);
  const biggestEarn = Math.max(...transactions.map((t) => t.coins), 0);
  const stepsEarned = transactions.filter(
    (t) => t.action === "roadmap_step"
  ).length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">
          Forge{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
            Rewards
          </span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Earn Forge Coins, level up, and unlock exclusive perks.
        </p>
      </motion.div>

      {/* Hero Stats Row */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Total Coins */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-amber-500/[0.02] p-6"
        >
          <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-amber-500/10 blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-amber-300/70">Total Forge Coins</p>
              <ForgeCoinIcon size={20} />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="text-3xl font-bold text-amber-300"
              >
                {totalCoins.toLocaleString()}
              </motion.span>
            </div>
            <p className="mt-2 text-xs text-amber-400/50">
              Keep earning to level up!
            </p>
          </div>
        </motion.div>

        {/* Current Level */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.06] to-purple-500/[0.02] p-6"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-purple-300/70">Current Level</p>
              <Star className="h-4 w-4 text-purple-accent" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-bold text-purple-300">
                {level}
              </span>
              <span className="mb-1 text-sm text-purple-400">
                {levelTitle}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-purple-accent to-purple-glow"
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {remaining.toLocaleString()} coins to Level {Math.min(level + 1, MAX_LEVEL)}
            </p>
          </div>
        </motion.div>

        {/* Biggest Earn */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Biggest Earn</p>
              <TrendingUp className="h-4 w-4 text-cyan-accent" />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-cyan-accent">
                +{biggestEarn}
              </span>
              <ForgeCoinIcon size={16} className="mb-1" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              From a single action
            </p>
          </div>
        </motion.div>

        {/* Steps Rewarded */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Steps Rewarded</p>
              <Award className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-emerald-400">
                {stepsEarned}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Roadmap steps completed
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Level Progress Visual — 2 cols */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <h2 className="mb-2 text-lg font-semibold">Level Progress</h2>
          <p className="mb-6 text-sm text-muted-foreground text-center">
            Level {level} → Level {Math.min(level + 1, MAX_LEVEL)}
          </p>
          <ProgressRing progress={levelProgress} size={180} strokeWidth={12} />
          <div className="mt-6 text-center">
            <p className="text-sm text-amber-300 font-medium">
              {coinsTowardNext.toLocaleString()} / {COINS_PER_LEVEL.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              coins toward next level
            </p>
          </div>
        </motion.div>

        {/* Level Unlocks — 3 cols */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <h2 className="mb-1 text-lg font-semibold">Level Unlocks</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Perks and features unlocked at each level milestone.
          </p>

          <div className="space-y-2">
            {LEVEL_UNLOCKS.map((unlock, i) => {
              const isUnlocked = level >= unlock.level;
              const isCurrent = level >= unlock.level && (i === LEVEL_UNLOCKS.length - 1 || level < LEVEL_UNLOCKS[i + 1].level);
              const Icon = unlockIcons[unlock.icon] || Star;

              return (
                <motion.div
                  key={unlock.level}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`flex items-center gap-4 rounded-xl p-3 transition-colors ${
                    isUnlocked
                      ? "bg-amber-500/[0.04]"
                      : "opacity-60 hover:bg-white/[0.02]"
                  } ${isCurrent ? "ring-1 ring-amber-500/30" : ""}`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isUnlocked
                        ? "bg-amber-500/[0.12]"
                        : "bg-white/[0.04]"
                    }`}
                  >
                    {isUnlocked ? (
                      <Icon className="h-5 w-5 text-amber-400" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground/50" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-medium ${
                          isUnlocked ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {unlock.title}
                      </h3>
                      {isUnlocked && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {unlock.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                      isUnlocked
                        ? "bg-amber-500/[0.1] text-amber-400"
                        : "bg-white/[0.04] text-muted-foreground"
                    }`}
                  >
                    Lv.{unlock.level}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold">Coin History</h2>
          <span className="text-xs text-muted-foreground">
            {transactions.length} transactions
          </span>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Your complete Forge Coin earning history.
        </p>

        <div className="space-y-1">
          {transactions.map((tx, i) => {
            const config = actionConfig[tx.action];
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/[0.08]">
                  <ForgeCoinIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">{tx.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-[11px] font-medium ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {format(new Date(tx.timestamp), "MMM d, h:mm a")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                  <span className="text-sm font-semibold text-amber-300 tabular-nums">
                    +{tx.coins}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
