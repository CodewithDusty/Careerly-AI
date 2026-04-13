import { Zap } from "lucide-react";
import Link from "next/link";

// ============================================
// Auth Layout — shared layout for login/signup
// ============================================

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[300px] left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />
        <div className="absolute -bottom-[200px] right-1/4 h-[500px] w-[500px] rounded-full bg-purple-accent/[0.04] blur-[80px]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-accent to-purple-accent">
            <Zap className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Careerly <span className="text-gradient-cyan">AI</span>
          </span>
        </Link>

        {children}
      </div>
    </div>
  );
}
