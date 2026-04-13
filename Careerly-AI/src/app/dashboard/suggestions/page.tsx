"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Code2,
  FileText,
  Users,
  Wrench,
  Clock,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ForgeCoinIcon } from "@/components/ui/coin-animation";
import { useRewards } from "@/lib/rewards-context";
import { COIN_REWARDS } from "@/lib/rewards";
import { toast } from "sonner";

// ============================================
// Mock Daily Suggestions
// ============================================

const mockSuggestions = [
  {
    id: "s1",
    title: "Build a REST API with Express.js",
    description:
      "Create a complete CRUD API with authentication, input validation, and error handling. This project will strengthen your backend development skills.",
    type: "project" as const,
    estimated_time: "2-3 hours",
    difficulty: "intermediate" as const,
    url: "https://expressjs.com/en/starter/hello-world.html",
    completed: false,
    tags: ["Node.js", "Express", "REST API"],
    coin_reward: 25,
  },
  {
    id: "s2",
    title: "React Performance Optimization Patterns",
    description:
      "Learn useMemo, useCallback, React.memo, and code splitting techniques to build blazing-fast React applications.",
    type: "course" as const,
    estimated_time: "45 min",
    difficulty: "advanced" as const,
    url: "https://react.dev/reference/react",
    completed: false,
    tags: ["React", "Performance"],
    coin_reward: 25,
  },
  {
    id: "s3",
    title: "Read: Designing Data-Intensive Applications",
    description:
      "Chapter 5: Replication — understand how databases replicate data for reliability, scalability, and latency.",
    type: "reading" as const,
    estimated_time: "30 min",
    difficulty: "advanced" as const,
    completed: false,
    tags: ["System Design", "Databases"],
    coin_reward: 25,
  },
  {
    id: "s4",
    title: "Contribute to an Open Source Project",
    description:
      "Find a beginner-friendly issue on GitHub, fork the repo, make your fix, and submit a pull request. Great for networking and real-world experience.",
    type: "networking" as const,
    estimated_time: "1-2 hours",
    difficulty: "intermediate" as const,
    url: "https://github.com/topics/good-first-issue",
    completed: false,
    tags: ["Open Source", "GitHub"],
    coin_reward: 25,
  },
  {
    id: "s5",
    title: "CSS Grid Layout Challenge",
    description:
      "Complete 10 CSS Grid puzzles to master grid-template-areas, auto-fit, minmax, and responsive layouts without media queries.",
    type: "practice" as const,
    estimated_time: "30 min",
    difficulty: "beginner" as const,
    url: "https://cssgridgarden.com",
    completed: false,
    tags: ["CSS", "Layout"],
    coin_reward: 25,
  },
  {
    id: "s6",
    title: "TypeScript Generics Deep Dive",
    description:
      "Understand generic types, constraints, conditional types, and mapped types to write type-safe, reusable code.",
    type: "course" as const,
    estimated_time: "1 hour",
    difficulty: "intermediate" as const,
    completed: false,
    tags: ["TypeScript", "Generics"],
    coin_reward: 25,
  },
];

// ============================================
// Type icon/color mapping
// ============================================

const typeConfig = {
  course: { icon: BookOpen, color: "text-cyan-accent", bg: "bg-cyan-accent/[0.1]" },
  practice: { icon: Code2, color: "text-emerald-400", bg: "bg-emerald-400/[0.1]" },
  reading: { icon: FileText, color: "text-amber-400", bg: "bg-amber-400/[0.1]" },
  networking: { icon: Users, color: "text-purple-accent", bg: "bg-purple-accent/[0.1]" },
  project: { icon: Wrench, color: "text-pink-400", bg: "bg-pink-400/[0.1]" },
};

const difficultyConfig = {
  beginner: { color: "text-emerald-400", bg: "bg-emerald-400/[0.1]" },
  intermediate: { color: "text-amber-400", bg: "bg-amber-400/[0.1]" },
  advanced: { color: "text-red-400", bg: "bg-red-400/[0.1]" },
};

// ============================================
// Suggestions Page
// ============================================

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [filter, setFilter] = useState<string | null>(null);
  const { awardCoins } = useRewards();

  const toggleCompleted = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (!suggestion) return;

    const wasCompleted = suggestion.completed;

    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );

    // Award coins when completing (not uncompleting)
    if (!wasCompleted) {
      awardCoins(
        "daily_suggestion",
        `Completed: ${suggestion.title}`,
        suggestion.coin_reward ?? COIN_REWARDS.daily_suggestion,
        id
      );
      toast.success(`+${suggestion.coin_reward ?? 25} Forge Coins earned! 🪙`);
    }
  };

  const types = ["course", "practice", "reading", "networking", "project"];
  const filtered = filter
    ? suggestions.filter((s) => s.type === filter)
    : suggestions;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Daily <span className="text-gradient-purple">Suggestions</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-curated learning tasks personalized for your roadmap phase.
            <span className="ml-2 inline-flex items-center gap-1 text-amber-400/70">
              <ForgeCoinIcon size={14} />
              +25 coins each
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          className="self-start border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter(null)}
          className={
            filter === null
              ? "bg-cyan-accent text-black hover:bg-cyan-accent/80"
              : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
          }
        >
          <Filter className="mr-1.5 h-3.5 w-3.5" />
          All
        </Button>
        {types.map((type) => {
          const config = typeConfig[type as keyof typeof typeConfig];
          const Icon = config.icon;
          return (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filter === type ? null : type)}
              className={
                filter === type
                  ? "bg-cyan-accent text-black hover:bg-cyan-accent/80"
                  : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
              }
            >
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              <span className="capitalize">{type}</span>
            </Button>
          );
        })}
      </div>

      {/* Suggestion Cards */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((suggestion, i) => {
            const config = typeConfig[suggestion.type];
            const diffConfig = difficultyConfig[suggestion.difficulty];
            const Icon = config.icon;

            return (
              <motion.div
                key={suggestion.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors ${
                  suggestion.completed
                    ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Type Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-semibold leading-snug ${
                          suggestion.completed
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {suggestion.title}
                      </h3>
                      <Checkbox
                        checked={suggestion.completed}
                        onCheckedChange={() => toggleCompleted(suggestion.id)}
                        className="mt-0.5 shrink-0 border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {suggestion.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {suggestion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.estimated_time}
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] capitalize ${diffConfig.bg} ${diffConfig.color}`}
                      >
                        {suggestion.difficulty}
                      </span>

                      {/* Coin reward badge */}
                      {!suggestion.completed ? (
                        <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-amber-400">
                          <ForgeCoinIcon size={10} />
                          +{suggestion.coin_reward ?? 25}
                        </span>
                      ) : (
                        <div className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Done · +{suggestion.coin_reward ?? 25}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1 text-[10px] text-cyan-accent/50">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
