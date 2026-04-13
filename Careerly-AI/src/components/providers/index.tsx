"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
import { RewardsProvider } from "@/lib/rewards-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CoinCollectionAnimation } from "@/components/ui/coin-animation";

// ============================================
// Root Providers — wraps the entire app tree
// ============================================

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RewardsProvider>
        <TooltipProvider>
          {children}
          {/* Global coin collection animation overlay */}
          <CoinCollectionAnimation />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#F1F5F9",
              },
            }}
          />
        </TooltipProvider>
      </RewardsProvider>
    </AuthProvider>
  );
}
