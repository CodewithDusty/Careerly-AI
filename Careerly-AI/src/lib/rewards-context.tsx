"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { RewardTransaction, RewardAction, UserRewards } from "@/lib/types";
import {
  COIN_REWARDS,
  calculateLevel,
  coinsTowardNextLevel,
  COINS_PER_LEVEL,
} from "@/lib/rewards";

interface RewardsContextType {
  /** Current total coins */
  totalCoins: number;
  /** Current level */
  level: number;
  /** Coins earned toward next level */
  coinsTowardNext: number;
  /** Level progress percentage (0-100) */
  levelProgress: number;
  /** Full transaction history */
  transactions: RewardTransaction[];
  /** Award coins for an action. Returns the amount earned. */
  awardCoins: (
    action: RewardAction,
    description: string,
    customAmount?: number,
    relatedId?: string
  ) => number;
  /** Whether a coin animation is currently playing */
  isAnimating: boolean;
  /** The last coin earn event (for triggering animations) */
  lastEarnEvent: { amount: number; timestamp: number } | null;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: RewardTransaction[] = [
  {
    id: "t1",
    action: "welcome_bonus",
    coins: 100,
    description: "Welcome to Careerly AI! Here's your starter bonus.",
    timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "t2",
    action: "roadmap_step",
    coins: 50,
    description: "Completed: HTML & CSS Mastery",
    timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
    related_id: "step-1-1",
  },
  {
    id: "t3",
    action: "daily_suggestion",
    coins: 25,
    description: "Completed daily suggestion: CSS Grid Challenge",
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "t4",
    action: "roadmap_step",
    coins: 100,
    description: "Completed: JavaScript Fundamentals",
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
    related_id: "step-1-2",
  },
  {
    id: "t5",
    action: "roadmap_step",
    coins: 50,
    description: "Completed: Git & Version Control",
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    related_id: "step-1-3",
  },
  {
    id: "t6",
    action: "roadmap_phase",
    coins: 500,
    description: "Phase completed: Foundation! 🎉 Level up bonus!",
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    related_id: "phase-1",
  },
  {
    id: "t7",
    action: "streak_7day",
    coins: 200,
    description: "7-day streak maintained! Keep going! 🔥",
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "t8",
    action: "roadmap_step",
    coins: 100,
    description: "Completed: React.js Deep Dive",
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    related_id: "step-2-1",
  },
  {
    id: "t9",
    action: "course_complete",
    coins: 100,
    description: "Completed course: React - The Complete Guide",
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "t10",
    action: "daily_suggestion",
    coins: 25,
    description: "Completed daily suggestion: TypeScript Generics Deep Dive",
    timestamp: new Date().toISOString(),
  },
];

const INITIAL_TOTAL = INITIAL_TRANSACTIONS.reduce((sum, t) => sum + t.coins, 0);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [totalCoins, setTotalCoins] = useState(INITIAL_TOTAL);
  const [transactions, setTransactions] = useState<RewardTransaction[]>(
    INITIAL_TRANSACTIONS
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastEarnEvent, setLastEarnEvent] = useState<{
    amount: number;
    timestamp: number;
  } | null>(null);

  const level = useMemo(() => calculateLevel(totalCoins), [totalCoins]);
  const coinsTowardNext = useMemo(
    () => coinsTowardNextLevel(totalCoins),
    [totalCoins]
  );
  const levelProgress = useMemo(
    () => Math.round((coinsTowardNext / COINS_PER_LEVEL) * 100),
    [coinsTowardNext]
  );

  const awardCoins = useCallback(
    (
      action: RewardAction,
      description: string,
      customAmount?: number,
      relatedId?: string
    ): number => {
      const amount = customAmount ?? COIN_REWARDS[action];

      const transaction: RewardTransaction = {
        id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        action,
        coins: amount,
        description,
        timestamp: new Date().toISOString(),
        related_id: relatedId,
      };

      setTransactions((prev) => [transaction, ...prev]);
      setTotalCoins((prev) => prev + amount);

      // Trigger animation
      setIsAnimating(true);
      setLastEarnEvent({ amount, timestamp: Date.now() });
      setTimeout(() => setIsAnimating(false), 2500);

      return amount;
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      totalCoins,
      level,
      coinsTowardNext,
      levelProgress,
      transactions,
      awardCoins,
      isAnimating,
      lastEarnEvent,
    }),
    [
      totalCoins,
      level,
      coinsTowardNext,
      levelProgress,
      transactions,
      awardCoins,
      isAnimating,
      lastEarnEvent,
    ]
  );

  return (
    <RewardsContext.Provider value={contextValue}>
      {children}
    </RewardsContext.Provider>
  );
}
export function useRewards() {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error("useRewards must be used within a RewardsProvider");
  }
  return context;
}
