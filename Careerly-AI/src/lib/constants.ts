// Careerly AI — App-wide constants

export const APP_NAME = "Careerly AI";
export const APP_DESCRIPTION =
  "AI-powered career guidance platform that generates personalized roadmaps, tracks progress, and discovers opportunities.";
export const APP_TAGLINE = "Build Your Dream Career with AI";

// Navigation items for the dashboard sidebar
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Roadmap", href: "/dashboard/roadmap", icon: "Map" },
  { label: "Progress", href: "/dashboard/progress", icon: "TrendingUp" },
  { label: "Daily Suggestions", href: "/dashboard/suggestions", icon: "Lightbulb" },
  { label: "Opportunities", href: "/dashboard/opportunities", icon: "Briefcase" },
  { label: "Rewards", href: "/dashboard/rewards", icon: "Coins" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
] as const;

// Skill categories for radar chart
export const SKILL_CATEGORIES = [
  "Technical",
  "Problem Solving",
  "Communication",
  "Leadership",
  "Creativity",
  "Domain Knowledge",
] as const;

// Phase labels for roadmaps
export const ROADMAP_PHASES = [
  "Foundation",
  "Intermediate",
  "Advanced",
  "Specialization",
  "Industry Ready",
] as const;
