"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Save,
  Loader2,
  Shield,
  Bell,
  Palette,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";

// ============================================
// Profile / Settings Page
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name ?? "",
    email: user?.email ?? "",
    targetRole: "Full-Stack Developer",
    location: "San Francisco, CA",
    bio: "Aspiring full-stack developer passionate about building beautiful, performant web applications.",
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">
          Profile & <span className="text-gradient-cyan">Settings</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account, preferences, and career profile.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-accent/20 to-purple-accent/20 text-2xl font-bold text-cyan-accent">
            {formData.fullName.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{formData.fullName || "User"}</h2>
            <p className="text-sm text-muted-foreground">{formData.email}</p>
          </div>
        </div>

        <Separator className="mb-6 bg-white/[0.06]" />

        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm text-muted-foreground flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="h-11 rounded-xl border-white/[0.08] bg-white/[0.03] focus:border-cyan-accent/40 focus:ring-2 focus:ring-cyan-accent/20"
            />
          </div>

          {/* Email (readonly) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              Email
            </Label>
            <Input
              id="email"
              value={formData.email}
              readOnly
              className="h-11 rounded-xl border-white/[0.08] bg-white/[0.02] text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* Target Role */}
          <div className="space-y-2">
            <Label htmlFor="targetRole" className="text-sm text-muted-foreground flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" />
              Target Role
            </Label>
            <Input
              id="targetRole"
              value={formData.targetRole}
              onChange={(e) =>
                setFormData({ ...formData, targetRole: e.target.value })
              }
              className="h-11 rounded-xl border-white/[0.08] bg-white/[0.03] focus:border-cyan-accent/40 focus:ring-2 focus:ring-cyan-accent/20"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="h-11 rounded-xl border-white/[0.08] bg-white/[0.03] focus:border-cyan-accent/40 focus:ring-2 focus:ring-cyan-accent/20"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-cyan-accent to-cyan-glow text-black font-semibold hover:opacity-90 transition-opacity gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <h2 className="text-lg font-semibold mb-5">Preferences</h2>

        <div className="space-y-4">
          {[
            {
              icon: Bell,
              title: "Email Notifications",
              description: "Get daily suggestions and opportunity alerts",
              enabled: true,
            },
            {
              icon: Shield,
              title: "Two-Factor Authentication",
              description: "Add an extra layer of security",
              enabled: false,
            },
            {
              icon: Palette,
              title: "Dark Mode",
              description: "Always-on dark theme",
              enabled: true,
            },
            {
              icon: Globe,
              title: "Public Profile",
              description: "Allow recruiters to see your progress",
              enabled: false,
            },
          ].map((pref) => (
            <div
              key={pref.title}
              className="flex items-center justify-between rounded-xl p-3 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
                  <pref.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{pref.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {pref.description}
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <button
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  pref.enabled
                    ? "bg-cyan-accent"
                    : "bg-white/[0.1]"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    pref.enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-6"
      >
        <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data.
        </p>
        <Button
          variant="outline"
          className="border-red-500/30 text-red-400 hover:bg-red-500/[0.1] hover:text-red-300"
        >
          Delete Account
        </Button>
      </motion.div>
    </motion.div>
  );
}
