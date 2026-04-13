"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Video,
  Wrench,
  FileText,
  BookMarked,
  Sparkles,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ConfettiBurst, getRandomMilestoneMessage } from "@/components/ui/confetti";
import { ForgeCoinIcon } from "@/components/ui/coin-animation";
import { useRewards } from "@/lib/rewards-context";
import { getStepCoinReward, COIN_REWARDS } from "@/lib/rewards";
import { toast } from "sonner";
import type { RoadmapPhase, Resource } from "@/lib/types";

// ============================================
// Mock Roadmap Data — with coin rewards
// ============================================

const mockRoadmap: RoadmapPhase[] = [
  {
    id: "phase-1",
    title: "Foundation",
    description: "Build strong fundamentals in web development and programming.",
    duration: "4-6 weeks",
    order: 1,
    steps: [
      {
        id: "step-1-1",
        title: "HTML & CSS Mastery",
        description: "Learn semantic HTML5, modern CSS3, Flexbox, Grid, and responsive design principles.",
        resources: [
          { title: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "article" },
          { title: "CSS Grid Complete Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", type: "article" },
          { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn", type: "course" },
        ],
        completed: true,
        estimated_hours: 20,
        coin_reward: 50,
      },
      {
        id: "step-1-2",
        title: "JavaScript Fundamentals",
        description: "Master variables, functions, DOM manipulation, ES6+ features, async/await, and error handling.",
        resources: [
          { title: "JavaScript.info", url: "https://javascript.info", type: "article" },
          { title: "Traversy Media JS Crash Course", url: "https://youtube.com", type: "video" },
        ],
        completed: true,
        estimated_hours: 30,
        coin_reward: 100,
      },
      {
        id: "step-1-3",
        title: "Git & Version Control",
        description: "Learn Git basics, branching, merging, and GitHub collaboration workflows.",
        resources: [
          { title: "Git Handbook", url: "https://guides.github.com", type: "article" },
          { title: "GitHub Skills", url: "https://skills.github.com", type: "course" },
        ],
        completed: true,
        estimated_hours: 8,
        coin_reward: 50,
      },
    ],
  },
  {
    id: "phase-2",
    title: "Intermediate",
    description: "Dive into modern frameworks, APIs, and application architecture.",
    duration: "6-8 weeks",
    order: 2,
    steps: [
      {
        id: "step-2-1",
        title: "React.js Deep Dive",
        description: "Components, hooks, state management, context API, and performance optimization.",
        resources: [
          { title: "React Official Docs", url: "https://react.dev", type: "article" },
          { title: "React - The Complete Guide (Udemy)", url: "https://udemy.com", type: "course" },
        ],
        completed: true,
        estimated_hours: 40,
        coin_reward: 150,
      },
      {
        id: "step-2-2",
        title: "Node.js & Express",
        description: "Build REST APIs, middleware, authentication, and database integration.",
        resources: [
          { title: "Node.js Official Docs", url: "https://nodejs.org/docs", type: "article" },
          { title: "Express.js Crash Course", url: "https://youtube.com", type: "video" },
        ],
        completed: false,
        estimated_hours: 35,
        coin_reward: 100,
      },
      {
        id: "step-2-3",
        title: "Database Fundamentals",
        description: "SQL and NoSQL databases — PostgreSQL, MongoDB, data modeling, and ORMs.",
        resources: [
          { title: "PostgreSQL Tutorial", url: "https://postgresql.org/docs", type: "article" },
          { title: "Prisma ORM Guide", url: "https://prisma.io/docs", type: "tool" },
        ],
        completed: false,
        estimated_hours: 25,
        coin_reward: 75,
      },
    ],
  },
  {
    id: "phase-3",
    title: "Advanced",
    description: "System design, cloud services, testing, and production-ready patterns.",
    duration: "6-8 weeks",
    order: 3,
    steps: [
      {
        id: "step-3-1",
        title: "Next.js & Full-Stack Development",
        description: "App Router, RSC, server actions, API routes, and deployment strategies.",
        resources: [
          { title: "Next.js Official Docs", url: "https://nextjs.org/docs", type: "article" },
          { title: "Next.js 15 Course", url: "https://youtube.com", type: "video" },
        ],
        completed: false,
        estimated_hours: 40,
        coin_reward: 150,
      },
      {
        id: "step-3-2",
        title: "Testing & CI/CD",
        description: "Unit testing with Jest, integration tests with Playwright, CI/CD with GitHub Actions.",
        resources: [
          { title: "Testing Library Docs", url: "https://testing-library.com", type: "article" },
          { title: "GitHub Actions Documentation", url: "https://docs.github.com/actions", type: "article" },
        ],
        completed: false,
        estimated_hours: 20,
        coin_reward: 75,
      },
    ],
  },
  {
    id: "phase-4",
    title: "Specialization",
    description: "Choose your niche and build expertise.",
    duration: "4-6 weeks",
    order: 4,
    steps: [
      {
        id: "step-4-1",
        title: "Cloud & DevOps",
        description: "AWS/GCP/Azure fundamentals, Docker, Kubernetes, and infrastructure as code.",
        resources: [
          { title: "AWS Free Tier Labs", url: "https://aws.amazon.com/free", type: "tool" },
          { title: "Docker Getting Started", url: "https://docker.com/get-started", type: "article" },
        ],
        completed: false,
        estimated_hours: 30,
        coin_reward: 100,
      },
    ],
  },
  {
    id: "phase-5",
    title: "Industry Ready",
    description: "Portfolio, resume, interview prep, and job applications.",
    duration: "2-4 weeks",
    order: 5,
    steps: [
      {
        id: "step-5-1",
        title: "Portfolio & Resume",
        description: "Build a stunning portfolio site and craft an ATS-friendly resume.",
        resources: [
          { title: "Portfolio Inspiration", url: "https://dribbble.com", type: "article" },
        ],
        completed: false,
        estimated_hours: 15,
        coin_reward: 75,
      },
      {
        id: "step-5-2",
        title: "Interview Preparation",
        description: "LeetCode, system design, behavioral questions, and mock interviews.",
        resources: [
          { title: "LeetCode", url: "https://leetcode.com", type: "tool" },
          { title: "NeetCode Roadmap", url: "https://neetcode.io", type: "course" },
        ],
        completed: false,
        estimated_hours: 40,
        coin_reward: 150,
      },
    ],
  },
];

// ============================================
// Resource type icon mapping
// ============================================

const resourceIcons: Record<Resource["type"], React.ComponentType<{ className?: string }>> = {
  course: BookOpen,
  article: FileText,
  video: Video,
  tool: Wrench,
  book: BookMarked,
};

// ============================================
// Phase colors
// ============================================

const phaseColors = [
  "from-cyan-accent/20 to-cyan-accent/5",
  "from-purple-accent/20 to-purple-accent/5",
  "from-emerald-400/20 to-emerald-400/5",
  "from-amber-400/20 to-amber-400/5",
  "from-pink-400/20 to-pink-400/5",
];

// ============================================
// Roadmap Page Component
// ============================================

export default function RoadmapPage() {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set(["phase-1", "phase-2"])
  );
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(
    new Set(
      mockRoadmap
        .flatMap((p) => p.steps)
        .filter((s) => s.completed)
        .map((s) => s.id)
    )
  );
  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatResponses, setChatResponses] = useState<Record<string, string>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const { awardCoins } = useRewards();

  const togglePhase = (id: string) => {
    const next = new Set(expandedPhases);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedPhases(next);
  };

  const toggleStep = (stepId: string, step: { title: string; estimated_hours: number; coin_reward?: number }) => {
    const wasCompleted = completedSteps.has(stepId);
    const next = new Set(completedSteps);
    if (wasCompleted) {
      next.delete(stepId);
    } else {
      next.add(stepId);

      // Award coins for completing a step
      const coinAmount = step.coin_reward ?? getStepCoinReward(step.estimated_hours);
      awardCoins(
        "roadmap_step",
        `Completed: ${step.title}`,
        coinAmount,
        stepId
      );

      // Check if a phase is now fully completed
      for (const phase of mockRoadmap) {
        const allDone = phase.steps.every(
          (s) => next.has(s.id)
        );
        const wasDone = phase.steps.every(
          (s) => completedSteps.has(s.id)
        );
        if (allDone && !wasDone) {
          // Phase completion bonus!
          awardCoins(
            "roadmap_phase",
            `Phase completed: ${phase.title}! 🎉`,
            COIN_REWARDS.roadmap_phase,
            phase.id
          );
        }
      }

      // Trigger confetti + motivational toast
      setShowConfetti(true);
      toast.success(getRandomMilestoneMessage());
    }
    setCompletedSteps(next);
  };

  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
  }, []);

  const totalSteps = mockRoadmap.reduce((acc, p) => acc + p.steps.length, 0);
  const doneSteps = completedSteps.size;
  const overallProgress = Math.round((doneSteps / totalSteps) * 100);

  const handleAIChat = async (stepId: string) => {
    if (!chatMessage.trim()) return;
    setChatLoading(true);
    // Simulate AI response (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));
    const mockResponse = `Great question! For this step, I'd recommend starting with the fundamentals and gradually building up. Focus on hands-on practice — build small projects to reinforce each concept. The resources linked above are excellent starting points. Don't rush through them; understanding deeply is more valuable than speed.`;
    setChatResponses((prev) => ({ ...prev, [stepId]: mockResponse }));
    setChatLoading(false);
    setChatMessage("");
  };

  return (
    <>
    <ConfettiBurst trigger={showConfetti} onComplete={handleConfettiComplete} />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Your <span className="text-gradient-cyan">Career Roadmap</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Full-Stack Developer · {totalSteps} steps · {overallProgress}% complete
        </p>

        {/* Overall progress bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-accent to-purple-accent"
          />
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {mockRoadmap.map((phase, phaseIndex) => {
          const isExpanded = expandedPhases.has(phase.id);
          const phaseCompleted = phase.steps.every((s) =>
            completedSteps.has(s.id)
          );
          const phaseDone = phase.steps.filter((s) =>
            completedSteps.has(s.id)
          ).length;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIndex * 0.1, duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                {/* Phase number */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${phaseColors[phaseIndex]} text-sm font-bold`}
                >
                  {String(phase.order).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{phase.title}</h2>
                    {phaseCompleted && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    )}
                    {phaseCompleted && (
                      <span className="flex items-center gap-1 rounded-md bg-amber-500/[0.1] px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                        <ForgeCoinIcon size={10} />
                        +500 earned
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                    <Clock className="h-3.5 w-3.5" />
                    {phase.duration}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/[0.06] text-muted-foreground"
                  >
                    {phaseDone}/{phase.steps.length}
                  </Badge>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </div>
              </button>

              {/* Phase Steps */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-t border-white/[0.06] px-5 py-3 space-y-1">
                      {phase.steps.map((step, stepIndex) => {
                        const isDone = completedSteps.has(step.id);
                        const isChatOpen = chatOpen === step.id;
                        const coinReward = step.coin_reward ?? getStepCoinReward(step.estimated_hours);

                        return (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: stepIndex * 0.05,
                              duration: 0.3,
                            }}
                          >
                            <div
                              className={`rounded-xl p-4 transition-colors ${
                                isDone
                                  ? "bg-emerald-500/[0.04]"
                                  : "hover:bg-white/[0.02]"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {/* Checkbox */}
                                <div className="mt-0.5">
                                  <Checkbox
                                    checked={isDone}
                                    onCheckedChange={() => toggleStep(step.id, step)}
                                    className="border-white/20 data-[state=checked]:bg-cyan-accent data-[state=checked]:border-cyan-accent"
                                  />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3
                                      className={`font-medium ${
                                        isDone
                                          ? "text-muted-foreground line-through"
                                          : ""
                                      }`}
                                    >
                                      {step.title}
                                    </h3>
                                    {/* Coin reward badge */}
                                    {!isDone && (
                                      <span className="flex items-center gap-1 rounded-full bg-amber-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-amber-400">
                                        <ForgeCoinIcon size={10} />
                                        +{coinReward}
                                      </span>
                                    )}
                                    {isDone && (
                                      <span className="flex items-center gap-1 text-[11px] text-emerald-400/60">
                                        <CheckCircle2 className="h-3 w-3" />
                                        +{coinReward} earned
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {step.description}
                                  </p>

                                  {/* Resources */}
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {step.resources.map((resource) => {
                                      const Icon = resourceIcons[resource.type];
                                      return (
                                        <a
                                          key={resource.title}
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-white/[0.08]"
                                        >
                                          <Icon className="h-3 w-3" />
                                          {resource.title}
                                          <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                                        </a>
                                      );
                                    })}
                                  </div>

                                  {/* Actions */}
                                  <div className="mt-3 flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground/60">
                                      ~{step.estimated_hours}h
                                    </span>
                                    <button
                                      onClick={() =>
                                        setChatOpen(isChatOpen ? null : step.id)
                                      }
                                      className="flex items-center gap-1 text-xs text-cyan-accent/70 hover:text-cyan-accent transition-colors"
                                    >
                                      <MessageSquare className="h-3 w-3" />
                                      Ask AI
                                    </button>
                                  </div>

                                  {/* AI Chat */}
                                  <AnimatePresence>
                                    {isChatOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-3 overflow-hidden"
                                      >
                                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="h-3.5 w-3.5 text-purple-accent" />
                                            <span className="text-xs text-purple-accent font-medium">
                                              AI Assistant
                                            </span>
                                          </div>
                                          <div className="flex gap-2">
                                            <Textarea
                                              value={chatMessage}
                                              onChange={(e) =>
                                                setChatMessage(e.target.value)
                                              }
                                              placeholder={`Ask about "${step.title}"...`}
                                              className="min-h-[60px] resize-none border-white/[0.06] bg-white/[0.03] text-sm focus:border-purple-accent/30 focus:ring-purple-accent/10"
                                              rows={2}
                                            />
                                            <Button
                                              size="sm"
                                              onClick={() => handleAIChat(step.id)}
                                              disabled={chatLoading || !chatMessage.trim()}
                                              className="self-end bg-purple-accent hover:bg-purple-accent/80 text-white"
                                            >
                                              {chatLoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <Send className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </div>
                                          {/* AI Response */}
                                          {chatResponses[step.id] && (
                                            <motion.div
                                              initial={{ opacity: 0, y: 5 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              className="mt-3 rounded-lg bg-purple-accent/[0.06] border border-purple-accent/[0.1] p-3"
                                            >
                                              <div className="flex items-center gap-1.5 mb-1.5">
                                                <Sparkles className="h-3 w-3 text-purple-accent" />
                                                <span className="text-[11px] font-medium text-purple-accent">AI Response</span>
                                              </div>
                                              <p className="text-sm text-muted-foreground leading-relaxed">
                                                {chatResponses[step.id]}
                                              </p>
                                            </motion.div>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
    </>
  );
}
