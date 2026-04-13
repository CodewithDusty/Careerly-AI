"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Lightbulb,
  Briefcase,
  User,
  Zap,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useRewards } from "@/lib/rewards-context";
import { getLevelTitle } from "@/lib/rewards";
import { ForgeCoinIcon, CoinBalanceDisplay } from "@/components/ui/coin-animation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ============================================
// Sidebar navigation items
// ============================================

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Roadmap", href: "/dashboard/roadmap", icon: Map },
  { label: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { label: "Daily Suggestions", href: "/dashboard/suggestions", icon: Lightbulb },
  { label: "Opportunities", href: "/dashboard/opportunities", icon: Briefcase },
  { label: "Rewards", href: "/dashboard/rewards", icon: Award },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

// ============================================
// Sidebar Component
// ============================================

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { totalCoins, level } = useRewards();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-accent to-purple-accent">
          <Zap className="h-5 w-5 text-black" />
        </div>
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="truncate text-base font-bold tracking-tight"
            >
              Careerly <span className="text-cyan-accent">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const isRewards = item.label === "Rewards";
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "text-cyan-accent"
                  : isRewards
                  ? "text-amber-400/80 hover:text-amber-300"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Active indicator glow */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className={`absolute inset-0 rounded-xl border ${
                    isRewards
                      ? "bg-amber-500/[0.08] border-amber-500/[0.12]"
                      : "bg-cyan-accent/[0.08] border-cyan-accent/[0.12]"
                  }`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}

              <item.icon
                className={`relative z-10 h-[18px] w-[18px] shrink-0 transition-colors ${
                  active
                    ? isRewards
                      ? "text-amber-400"
                      : "text-cyan-accent"
                    : isRewards
                    ? "text-amber-400/60 group-hover:text-amber-300"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />

              <AnimatePresence>
                {(!collapsed || mobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Coin badge for Rewards item */}
              {isRewards && (!collapsed || mobile) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 ml-auto flex items-center gap-1 rounded-md bg-amber-500/[0.1] px-1.5 py-0.5"
                >
                  <ForgeCoinIcon size={12} />
                  <span className="text-[10px] font-semibold text-amber-400 tabular-nums">
                    {totalCoins.toLocaleString()}
                  </span>
                </motion.div>
              )}

              {active && !isRewards && (!collapsed || mobile) && (
                <ChevronRight className="relative z-10 ml-auto h-3.5 w-3.5 text-cyan-accent/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Sign Out */}
      <div className="border-t border-white/[0.06] px-3 py-4">
        {/* Level badge */}
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 mx-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-amber-400">
                  Level {level} — {getLevelTitle(level)}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-accent/20 to-purple-accent/20 text-xs font-semibold text-cyan-accent">
            {user?.email?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium">
                  {user?.user_metadata?.full_name ?? "User"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email ?? "user@example.com"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="mt-3 w-full justify-start gap-3 rounded-xl px-3 text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/[0.06] transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 border-r border-white/[0.06] bg-sidebar"
      >
        <SidebarContent />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.1] bg-background text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight
            className={`h-3 w-3 transition-transform ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </motion.aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-background lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[280px] border-r border-white/[0.06] bg-sidebar lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for desktop content offset */}
      <motion.div
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block shrink-0"
      />
    </>
  );
}
