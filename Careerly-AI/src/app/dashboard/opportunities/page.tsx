"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Clock,
  Filter,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Opportunity } from "@/lib/types";

// ============================================
// Mock Opportunities Data
// ============================================

const mockOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Full-Stack Developer Intern",
    company: "Vercel",
    type: "internship",
    location: "Remote",
    match_percentage: 92,
    skills_matched: ["React", "Next.js", "TypeScript", "Node.js"],
    skills_missing: ["CI/CD"],
    url: "#",
    posted_date: "2 days ago",
    ai_insight:
      "Strong match! Your React & Next.js skills align perfectly. Focus on CI/CD to maximize your chances.",
  },
  {
    id: "opp-2",
    title: "Junior Software Engineer",
    company: "Stripe",
    type: "full-time",
    location: "San Francisco, CA",
    match_percentage: 78,
    skills_matched: ["JavaScript", "TypeScript", "REST APIs"],
    skills_missing: ["Ruby", "System Design"],
    url: "#",
    posted_date: "5 days ago",
    ai_insight:
      "Good fit for growth. Stripe values strong fundamentals. Complete system design module to boost your match.",
  },
  {
    id: "opp-3",
    title: "Frontend Developer",
    company: "Linear",
    type: "full-time",
    location: "Remote",
    match_percentage: 85,
    skills_matched: ["React", "CSS", "Framer Motion", "TypeScript"],
    skills_missing: ["GraphQL"],
    url: "#",
    posted_date: "1 day ago",
    ai_insight:
      "Excellent match with your frontend expertise! Linear uses a similar tech stack to your current skill set.",
  },
  {
    id: "opp-4",
    title: "Backend Engineering Intern",
    company: "Supabase",
    type: "internship",
    location: "Remote",
    match_percentage: 65,
    skills_matched: ["PostgreSQL", "Node.js"],
    skills_missing: ["Go", "Elixir", "Docker"],
    url: "#",
    posted_date: "1 week ago",
    ai_insight:
      "Partial match. Strong in databases but need cloud/DevOps skills. Focus on Docker module in your roadmap.",
  },
  {
    id: "opp-5",
    title: "React Native Developer",
    company: "Figma",
    type: "full-time",
    location: "New York, NY",
    match_percentage: 58,
    skills_matched: ["React", "JavaScript"],
    skills_missing: ["React Native", "Mobile Dev", "Swift"],
    url: "#",
    posted_date: "3 days ago",
    ai_insight:
      "Your React skills transfer well. Consider adding React Native to your roadmap to unlock mobile opportunities.",
  },
  {
    id: "opp-6",
    title: "DevOps Intern",
    company: "GitHub",
    type: "part-time",
    location: "Remote",
    match_percentage: 45,
    skills_matched: ["Git"],
    skills_missing: ["Kubernetes", "Terraform", "AWS", "CI/CD"],
    url: "#",
    posted_date: "4 days ago",
    ai_insight:
      "Low match currently. Complete the Cloud & DevOps specialization phase to qualify for this role.",
  },
];

// ============================================
// Match color helper
// ============================================

function getMatchColor(percentage: number) {
  if (percentage >= 80) return { text: "text-emerald-400", bg: "bg-emerald-400/[0.1]", ring: "ring-emerald-400/30" };
  if (percentage >= 60) return { text: "text-amber-400", bg: "bg-amber-400/[0.1]", ring: "ring-amber-400/30" };
  return { text: "text-red-400", bg: "bg-red-400/[0.1]", ring: "ring-red-400/30" };
}

const typeLabels: Record<string, string> = {
  internship: "Internship",
  "full-time": "Full-time",
  "part-time": "Part-time",
  freelance: "Freelance",
};

// ============================================
// Opportunities Page
// ============================================

export default function OpportunitiesPage() {
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = typeFilter
    ? mockOpportunities.filter((o) => o.type === typeFilter)
    : mockOpportunities;

  const sorted = [...filtered].sort(
    (a, b) => b.match_percentage - a.match_percentage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Market <span className="text-gradient-cyan">Opportunities</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Internships and jobs matched to your skills with AI-powered insights.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={typeFilter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setTypeFilter(null)}
          className={
            typeFilter === null
              ? "bg-cyan-accent text-black hover:bg-cyan-accent/80"
              : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
          }
        >
          <Filter className="mr-1.5 h-3.5 w-3.5" />
          All
        </Button>
        {Object.entries(typeLabels).map(([key, label]) => (
          <Button
            key={key}
            variant={typeFilter === key ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter(typeFilter === key ? null : key)}
            className={
              typeFilter === key
                ? "bg-cyan-accent text-black hover:bg-cyan-accent/80"
                : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
            }
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-4">
        {sorted.map((opp, i) => {
          const matchColor = getMatchColor(opp.match_percentage);

          return (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-colors"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left: Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-snug">{opp.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {opp.company}
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/[0.06] text-muted-foreground capitalize"
                    >
                      <Briefcase className="mr-1 h-3 w-3" />
                      {typeLabels[opp.type]}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {opp.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {opp.posted_date}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mt-4 space-y-2">
                    {opp.skills_matched.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        {opp.skills_matched.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-emerald-400/[0.08] px-2 py-0.5 text-[11px] text-emerald-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    {opp.skills_missing.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <XCircle className="h-3.5 w-3.5 text-red-400/60 shrink-0" />
                        {opp.skills_missing.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-red-400/[0.06] px-2 py-0.5 text-[11px] text-red-400/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* AI Insight */}
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-purple-accent/[0.04] border border-purple-accent/[0.08] p-3">
                    <Sparkles className="h-4 w-4 shrink-0 text-purple-accent mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {opp.ai_insight}
                    </p>
                  </div>
                </div>

                {/* Right: Match % + Action */}
                <div className="flex flex-row items-center gap-4 md:flex-col md:items-end md:gap-3">
                  {/* Match percentage ring */}
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ring-2 ${matchColor.ring} ${matchColor.bg}`}
                  >
                    <div className="text-center">
                      <span className={`text-xl font-bold ${matchColor.text}`}>
                        {opp.match_percentage}
                      </span>
                      <span className={`text-xs ${matchColor.text}`}>%</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] gap-1.5"
                  >
                    Apply
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
