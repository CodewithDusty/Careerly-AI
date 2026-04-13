// Careerly AI — Core Type Definitions
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  target_role?: string;
  created_at: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
  estimated_hours: number;
  /** Forge Coins awarded on completion */
  coin_reward?: number;
}

export interface Resource {
  title: string;
  url: string;
  type: "course" | "article" | "video" | "tool" | "book";
}

export interface Roadmap {
  id: string;
  user_id: string;
  target_role: string;
  phases: RoadmapPhase[];
  created_at: string;
  updated_at: string;
  overall_progress: number;
}

export interface DailySuggestion {
  id: string;
  title: string;
  description: string;
  type: "course" | "practice" | "reading" | "networking" | "project";
  estimated_time: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  url?: string;
  completed: boolean;
  /** Forge Coins awarded on completion */
  coin_reward?: number;
  tags?: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: "internship" | "full-time" | "part-time" | "freelance";
  location: string;
  match_percentage: number;
  skills_matched: string[];
  skills_missing: string[];
  url: string;
  posted_date: string;
  ai_insight: string;
}

export interface ProgressEntry {
  date: string;
  steps_completed: number;
  hours_spent: number;
  streak: number;
}

export interface SkillData {
  skill: string;
  current: number;
  target: number;
}
/** The reason/action that earned coins */
export type RewardAction =
  | "daily_suggestion"
  | "roadmap_step"
  | "roadmap_phase"
  | "streak_7day"
  | "streak_bonus"
  | "course_complete"
  | "resource_complete"
  | "milestone"
  | "welcome_bonus";

/** A single transaction in the reward ledger */
export interface RewardTransaction {
  id: string;
  action: RewardAction;
  coins: number;
  description: string;
  timestamp: string;
  /** Optional — which step/phase/suggestion it relates to */
  related_id?: string;
}

/** User's overall reward state */
export interface UserRewards {
  total_coins: number;
  level: number;
  coins_toward_next_level: number;
  transactions: RewardTransaction[];
}

/** Level unlock / perk definition */
export interface LevelUnlock {
  level: number;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  unlocked: boolean;
}
