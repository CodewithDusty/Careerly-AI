"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// Confetti Burst Component
// Shows celebratory particles when a milestone is completed
// ============================================

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  scale: number;
  velocityX: number;
  velocityY: number;
  shape: "circle" | "square" | "star";
}

const COLORS = [
  "#22D3EE", // Cyan accent
  "#67E8F9", // Cyan glow
  "#A855F7", // Purple accent
  "#C084FC", // Purple glow
  "#34D399", // Emerald
  "#FBBF24", // Amber
  "#F472B6", // Pink
  "#818CF8", // Indigo
];

const SHAPES: Particle["shape"][] = ["circle", "square", "star"];

interface ConfettiProps {
  /** Set to true to trigger the confetti burst */
  trigger: boolean;
  /** Called after the animation finishes */
  onComplete?: () => void;
  /** Number of particles (default: 40) */
  count?: number;
}

export function ConfettiBurst({
  trigger,
  onComplete,
  count = 40,
}: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [active, setActive] = useState(false);

  const createParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        rotation: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        scale: 0.5 + Math.random() * 1,
        velocityX: (Math.random() - 0.5) * 400,
        velocityY: -(100 + Math.random() * 300),
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      });
    }
    return newParticles;
  }, [count]);

  useEffect(() => {
    if (trigger && !active) {
      setActive(true);
      setParticles(createParticles());

      const timer = setTimeout(() => {
        setActive(false);
        setParticles([]);
        onComplete?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [trigger, active, createParticles, onComplete]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: "50vw",
              y: "50vh",
              scale: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              x: `calc(50vw + ${particle.velocityX}px)`,
              y: `calc(50vh + ${particle.velocityY + 500}px)`,
              scale: particle.scale,
              rotate: particle.rotation + 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 0.5,
              ease: [0.2, 0.8, 0.4, 1] as const,
            }}
            className="absolute"
            style={{ color: particle.color }}
          >
            {particle.shape === "circle" && (
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: particle.color }}
              />
            )}
            {particle.shape === "square" && (
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: particle.color }}
              />
            )}
            {particle.shape === "star" && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={particle.color}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Flash overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-cyan-accent"
      />
    </div>
  );
}

// ============================================
// Motivational Toast Messages
// ============================================

export const MILESTONE_MESSAGES = [
  "🎉 Amazing progress! Keep crushing it!",
  "🚀 One step closer to your dream career!",
  "⚡ You're on fire! Unstoppable momentum!",
  "🌟 Milestone unlocked! You're a star!",
  "💪 Hard work pays off! Great job!",
  "🏆 Another step conquered! Legendary!",
  "✨ Brilliant work! The future is yours!",
  "🎯 Bullseye! Perfect execution!",
];

export function getRandomMilestoneMessage() {
  return MILESTONE_MESSAGES[
    Math.floor(Math.random() * MILESTONE_MESSAGES.length)
  ];
}
