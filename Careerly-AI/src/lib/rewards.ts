// Careerly AI — Forge Coins Rewarding System
// Constants, utilities, and level definitions

import type { RewardAction, LevelUnlock } from "./types";

// Coin reward values for each action type


export const COIN_REWARDS: Record<RewardAction, number> = {
  daily_suggestion: 25,
  roadmap_step: 75,          
  roadmap_phase: 500,        
  streak_7day: 200,          
  streak_bonus: 50,          
  course_complete: 100,
  resource_complete: 100,
  milestone: 250,
  welcome_bonus: 100,
};

/**
 * Returns the coin reward for a roadmap step based on estimated hours.
 * Harder steps (more hours) earn more coins.
 */
export function getStepCoinReward(estimatedHours: number): number {
  if (estimatedHours <= 10) return 50;
  if (estimatedHours <= 25) return 75;
  if (estimatedHours <= 35) return 100;
  return 150;
}


// Level System — 20 levels, 2000 coins each

export const MAX_LEVEL = 20;
export const COINS_PER_LEVEL = 2000;

/** Calculate level from total coins earned */
export function calculateLevel(totalCoins: number): number {
  const level = Math.floor(totalCoins / COINS_PER_LEVEL) + 1;
  return Math.min(level, MAX_LEVEL);
}

/** Calculate coins earned toward the next level */
export function coinsTowardNextLevel(totalCoins: number): number {
  return totalCoins % COINS_PER_LEVEL;
}

/** Calculate coins needed to reach the next level */
export function coinsToNextLevel(totalCoins: number): number {
  return COINS_PER_LEVEL - coinsTowardNextLevel(totalCoins);
}

/** Get level progress as a percentage (0-100) */
export function getLevelProgress(totalCoins: number): number {
  const current = coinsTowardNextLevel(totalCoins);
  return Math.round((current / COINS_PER_LEVEL) * 100);
}


// Level Unlocks / Perks


export const LEVEL_UNLOCKS: LevelUnlock[] = [
  {
    level: 1,
    title: "Career Explorer",
    description: "Welcome! You've started your career journey.",
    icon: "Compass",
    unlocked: false,
  },
  {
    level: 3,
    title: "Daily Streak Badges",
    description: "Unlock streak badges to show your consistency.",
    icon: "Flame",
    unlocked: false,
  },
  {
    level: 5,
    title: "AI Chat Pro",
    description: "Unlock extended AI conversations per roadmap step.",
    icon: "MessageSquare",
    unlocked: false,
  },
  {
    level: 7,
    title: "Custom Themes",
    description: "Unlock custom color themes for your dashboard.",
    icon: "Palette",
    unlocked: false,
  },
  {
    level: 10,
    title: "Premium Roadmap Templates",
    description: "Access exclusive AI-crafted roadmap templates.",
    icon: "Crown",
    unlocked: false,
  },
  {
    level: 12,
    title: "Priority AI Responses",
    description: "Get faster, more detailed AI-generated guidance.",
    icon: "Zap",
    unlocked: false,
  },
  {
    level: 15,
    title: "Mentor Network Access",
    description: "Connect with industry mentors in your field.",
    icon: "Users",
    unlocked: false,
  },
  {
    level: 18,
    title: "Career Analytics Pro",
    description: "Unlock advanced market analytics and salary insights.",
    icon: "BarChart3",
    unlocked: false,
  },
  {
    level: 20,
    title: "ForgeForge Master",
    description: "Maximum level achieved! You are a legend.",
    icon: "Trophy",
    unlocked: false,
  },
];

// Level Titles


export function getLevelTitle(level: number): string {
  if (level <= 2) return "Novice";
  if (level <= 4) return "Apprentice";
  if (level <= 6) return "Rising Star";
  if (level <= 8) return "Pathfinder";
  if (level <= 10) return "Trailblazer";
  if (level <= 12) return "Strategist";
  if (level <= 14) return "Architect";
  if (level <= 16) return "Visionary";
  if (level <= 18) return "Pioneer";
  return "Forge Master";
}
