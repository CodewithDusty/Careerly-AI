"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// ============================================
// Auth Context — manages Supabase auth state
// ============================================

interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // If Supabase URL is missing, we use a mock mode for UI preview
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    if (isMockMode) {
      // Setup mock user for local demo immediately
      const savedUser = localStorage.getItem("careerly_mock_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isMockMode]);

  const signInWithEmail = async (email: string, password: string) => {
    if (isMockMode) {
      await new Promise((resolve) => setTimeout(resolve, 800)); // fake delay
      const mockUser = { id: "mock-123", email, user_metadata: { full_name: "Demo User" } } as any;
      setUser(mockUser);
      localStorage.setItem("careerly_mock_user", JSON.stringify(mockUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (isMockMode) {
      await new Promise((resolve) => setTimeout(resolve, 800)); // fake delay
      const mockUser = { id: "mock-123", email, user_metadata: { full_name: fullName } } as any;
      setUser(mockUser);
      localStorage.setItem("careerly_mock_user", JSON.stringify(mockUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (isMockMode) {
      setUser(null);
      localStorage.removeItem("careerly_mock_user");
      return;
    }
    
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
