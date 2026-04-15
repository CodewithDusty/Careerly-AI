"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useRewards } from "@/lib/rewards-context";
import { getLevelTitle } from "@/lib/rewards";
import { SkillsRadarChart } from "@/components/dashboard/skills-radar";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { ForgeCoinIcon } from "@/components/ui/coin-animation";

// Animation Variants


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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Mock data (will be replaced with API calls)

const mockStats = {
  overall_progress: 34,
  streak: 7,
  steps_completed: 12,
  total_steps: 35,
  hours_this_week: 14,
};

const mockDailySuggestion = {
  title: "Complete React Hooks Deep Dive",
  description:
    "Master useEffect, useRef, and custom hooks through a hands-on project building a data-fetching library.",
  type: "course" as const,
  estimated_time: "45 min",
  difficulty: "intermediate" as const,
};

const mockSkills = [
  { skill: "Technical", current: 65, target: 90 },
  { skill: "Problem Solving", current: 70, target: 85 },
  { skill: "Communication", current: 50, target: 80 },
  { skill: "Leadership", current: 30, target: 70 },
  { skill: "Creativity", current: 55, target: 75 },
  { skill: "Domain Knowledge", current: 45, target: 90 },
];

// Dashboard Page

export default function DashboardPage() {
  const { user } = useAuth();
  const { totalCoins, level, levelProgress } = useRewards();
  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

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
          Welcome back,{" "}
          <span className="text-gradient-cyan">{firstName}</span> 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s your career progress overview. Keep the momentum going!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {/* Forge Coins Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-amber-500/[0.02] p-6"
        >
          <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-amber-500/10 blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-amber-300/70">Forge Coins</p>
              <ForgeCoinIcon size={18} />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-amber-300">
                {totalCoins.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-md bg-amber-500/[0.12] px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                Lv.{level}
              </span>
              <span className="text-xs text-amber-400/60">
                {getLevelTitle(level)}
              </span>
            </div>
            {/* Mini level progress */}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <TrendingUp className="h-4 w-4 text-cyan-accent" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-bold text-gradient-cyan">
                {mockStats.overall_progress}%
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mockStats.overall_progress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-accent to-cyan-glow"
              />
            </div>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-orange-400">
                {mockStats.streak}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">days</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              🔥 Keep going! Your best is 14 days.
            </p>
          </div>
        </motion.div>

        {/* Steps Completed */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Steps Done</p>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-emerald-400">
                {mockStats.steps_completed}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">
                / {mockStats.total_steps}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {mockStats.total_steps - mockStats.steps_completed} steps remaining
            </p>
          </div>
        </motion.div>

        {/* Hours This Week */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Hours This Week</p>
              <Clock className="h-4 w-4 text-purple-accent" />
            </div>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-3xl font-bold text-purple-accent">
                {mockStats.hours_this_week}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">hrs</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              +3 hrs compared to last week
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Skills Radar — takes 3 cols */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Skills Overview</h2>
              <p className="text-sm text-muted-foreground">
                Current vs. target skill levels
              </p>
            </div>
          </div>
          <SkillsRadarChart data={mockSkills} />
        </motion.div>

        {/* Right column — Progress Ring + Daily Suggestion */}
        <div className="space-y-6 lg:col-span-2">
          {/* Progress Ring */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <h2 className="mb-4 text-lg font-semibold">Roadmap Progress</h2>
            <ProgressRing progress={mockStats.overall_progress} size={160} />
            <p className="mt-4 text-sm text-muted-foreground">
              {mockStats.steps_completed} of {mockStats.total_steps} steps complete
            </p>
            <Link href="/dashboard/roadmap" className="mt-3">
              <Button
                variant="ghost"
                className="text-sm text-cyan-accent hover:text-cyan-glow hover:bg-cyan-accent/[0.06]"
              >
                View Roadmap
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>

          {/* Daily Suggestion */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-accent/[0.04] to-cyan-accent/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-accent/[0.1]">
                  <Lightbulb className="h-4 w-4 text-purple-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Today&apos;s Suggestion</h3>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-cyan-accent" />
                    <span className="text-xs text-cyan-accent">AI Recommended</span>
                  </div>
                </div>
              </div>

              <h4 className="font-medium">{mockDailySuggestion.title}</h4>
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                {mockDailySuggestion.description}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-muted-foreground">
                  {mockDailySuggestion.estimated_time}
                </span>
                <span className="rounded-full bg-purple-accent/[0.1] px-2.5 py-1 text-xs capitalize text-purple-accent">
                  {mockDailySuggestion.difficulty}
                </span>
                {/* Coin reward badge */}
                <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-500/[0.1] px-2 py-1 text-xs text-amber-400">
                  <ForgeCoinIcon size={12} />
                  +25
                </span>
              </div>

              <Link href="/dashboard/suggestions" className="mt-4 block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-cyan-accent hover:text-cyan-glow hover:bg-cyan-accent/[0.06] px-0"
                >
                  View All Suggestions
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
