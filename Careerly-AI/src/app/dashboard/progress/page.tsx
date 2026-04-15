"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  CheckCircle2,
  Clock,
  Flame,
  TrendingUp,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { ForgeCoinIcon } from "@/components/ui/coin-animation";
import { useRewards } from "@/lib/rewards-context";

// ============================================
// Mock Data
// ============================================

const weeklyData = [
  { day: "Mon", hours: 2.5, steps: 1 },
  { day: "Tue", hours: 3.0, steps: 2 },
  { day: "Wed", hours: 1.5, steps: 0 },
  { day: "Thu", hours: 4.0, steps: 3 },
  { day: "Fri", hours: 2.0, steps: 1 },
  { day: "Sat", hours: 5.0, steps: 2 },
  { day: "Sun", hours: 1.0, steps: 1 },
];

const monthlyProgress = [
  { week: "Week 1", progress: 8 },
  { week: "Week 2", progress: 15 },
  { week: "Week 3", progress: 22 },
  { week: "Week 4", progress: 28 },
  { week: "Week 5", progress: 34 },
];

const recentActivity = [
  { date: "Apr 13", action: "Completed React Hooks Deep Dive", type: "completed", coins: 150 },
  { date: "Apr 12", action: "Started Node.js & Express module", type: "started", coins: 0 },
  { date: "Apr 12", action: "Finished CSS Grid challenge", type: "completed", coins: 25 },
  { date: "Apr 11", action: "Watched System Design video", type: "activity", coins: 0 },
  { date: "Apr 10", action: "Completed JavaScript ES6+ quiz", type: "completed", coins: 100 },
  { date: "Apr 9", action: "7-day streak bonus earned!", type: "completed", coins: 200 },
  { date: "Apr 8", action: "Started Git & Version Control", type: "started", coins: 0 },
];

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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ============================================
// Custom Tooltip
// ============================================

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#161616] px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-foreground">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs text-muted-foreground">
          {p.name}: <span className="text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ============================================
// Progress Page
// ============================================

export default function ProgressPage() {
  const { totalCoins } = useRewards();

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
          <span className="text-gradient-cyan">Progress</span> Tracker
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your learning journey, stay consistent, and watch your coins grow.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {[
          { label: "Total Progress", value: "34%", icon: TrendingUp, color: "text-cyan-accent" },
          { label: "Current Streak", value: "7 days", icon: Flame, color: "text-orange-400" },
          { label: "Steps Completed", value: "12/35", icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Total Hours", value: "87h", icon: Clock, color: "text-purple-accent" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className={`mt-2 text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}

        {/* Coins Earned stat */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-amber-500/[0.02] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-amber-300/70">Coins Earned</p>
            <ForgeCoinIcon size={18} />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-300">
            {totalCoins.toLocaleString()}
          </p>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Weekly Hours Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <h2 className="mb-1 text-lg font-semibold">Weekly Learning Hours</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Hours spent learning this week
          </p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="hours"
                  name="Hours"
                  fill="#22D3EE"
                  radius={[6, 6, 0, 0]}
                  fillOpacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Progress Ring */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <h2 className="mb-6 text-lg font-semibold">Overall Completion</h2>
          <ProgressRing progress={34} size={180} strokeWidth={12} />
          <p className="mt-6 text-sm text-muted-foreground">
            12 of 35 roadmap steps completed
          </p>
        </motion.div>
      </div>

      {/* Monthly Progress Area Chart */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <h2 className="mb-1 text-lg font-semibold">Monthly Progress Trend</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Cumulative progress over the past month
        </p>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProgress}>
              <defs>
                <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="progress"
                name="Progress"
                stroke="#22D3EE"
                fill="url(#progressFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Activity Log */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <h2 className="mb-1 text-lg font-semibold">Recent Activity</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Your latest learning milestones, actions, and coin earnings
        </p>

        <div className="space-y-1">
          {recentActivity.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                {item.type === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : item.type === "started" ? (
                  <TrendingUp className="h-4 w-4 text-cyan-accent" />
                ) : (
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm">{item.action}</p>
              </div>

              {/* Coin earnings */}
              {item.coins > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  <ForgeCoinIcon size={14} />
                  <span className="text-xs font-semibold text-amber-400 tabular-nums">
                    +{item.coins}
                  </span>
                </div>
              )}

              <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
