"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRewards } from "@/lib/rewards-context";

// Forge Coin Icon — shiny golden coin with "F" emblem
export function ForgeCoinIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="12" cy="12" r="11" stroke="url(#coinGrad)" strokeWidth="1.5" fill="url(#coinFill)" />
      {/* Inner ring */}
      <circle cx="12" cy="12" r="8.5" stroke="url(#coinGrad)" strokeWidth="0.75" fill="none" opacity="0.4" />
      {/* F letter */}
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="url(#coinTextGrad)"
        fontSize="11"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        F
      </text>
      {/* Shine effect */}
      <ellipse cx="8" cy="7" rx="3" ry="1.5" fill="white" opacity="0.15" transform="rotate(-30, 8, 7)" />
      <defs>
        <linearGradient id="coinFill" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="coinTextGrad" x1="0" y1="4" x2="0" y2="20">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Flying Coin Particle
interface FlyingCoin {
  id: number;
  startX: number;
  startY: number;
  delay: number;
}
// Coin Collection Animation
// Shows coins flying to the balance counter
export function CoinCollectionAnimation() {
  const { lastEarnEvent, isAnimating } = useRewards();
  const [coins, setCoins] = useState<FlyingCoin[]>([]);
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    if (!lastEarnEvent || !isAnimating) return;

    // Generate 6-10 flying coin particles
    const count = Math.min(Math.max(Math.floor(lastEarnEvent.amount / 15), 4), 12);
    const newCoins: FlyingCoin[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: (Math.random() - 0.5) * 300,
      startY: (Math.random() - 0.5) * 200 + 100,
      delay: i * 0.06,
    }));
    setCoins(newCoins);
    setShowAmount(true);

    const timer = setTimeout(() => {
      setCoins([]);
      setShowAmount(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [lastEarnEvent, isAnimating]);

  if (!isAnimating || coins.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {/* Flying coins */}
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{
              x: `calc(50vw + ${coin.startX}px)`,
              y: `calc(50vh + ${coin.startY}px)`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              // Fly to the top-right where the coin counter is
              x: "calc(100vw - 120px)",
              y: "32px",
              scale: [0, 1.2, 0.8, 0.3],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: coin.delay,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="absolute"
          >
            <ForgeCoinIcon size={24} />
          </motion.div>
        ))}

        {/* Amount earned popup */}
        {showAmount && lastEarnEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8], y: -40 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-2 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 px-5 py-2.5 shadow-xl shadow-amber-500/10">
              <ForgeCoinIcon size={22} />
              <span className="text-lg font-bold text-amber-300">
                +{lastEarnEvent.amount}
              </span>
            </div>
          </motion.div>
        )}

        {/* Sparkle burst */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{
              x: "50vw",
              y: "50vh",
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `calc(50vw + ${Math.cos((i * Math.PI) / 4) * 150}px)`,
              y: `calc(50vh + ${Math.sin((i * Math.PI) / 4) * 150}px)`,
              scale: [0, 1, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-400"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
// Coin Balance Display — animated counter
// Used in the top navbar


export function CoinBalanceDisplay({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { totalCoins, level, isAnimating } = useRewards();
  const [displayCoins, setDisplayCoins] = useState(totalCoins);

  // Animate the coin counter when coins change
  useEffect(() => {
    if (displayCoins === totalCoins) return;

    const diff = totalCoins - displayCoins;
    const step = Math.ceil(diff / 20);
    const interval = setInterval(() => {
      setDisplayCoins((prev) => {
        const next = prev + step;
        if (next >= totalCoins) {
          clearInterval(interval);
          return totalCoins;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [totalCoins, displayCoins]);

  return (
    <motion.div
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.4 }}
      className={`flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] ${
        compact ? "px-2.5 py-1" : "px-3.5 py-1.5"
      }`}
    >
      <motion.div
        animate={isAnimating ? { rotate: [0, 15, -15, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <ForgeCoinIcon size={compact ? 16 : 18} />
      </motion.div>
      <span
        className={`font-bold text-amber-300 tabular-nums ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {displayCoins.toLocaleString()}
      </span>
      {!compact && (
        <span className="rounded-md bg-amber-500/[0.12] px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
          Lv.{level}
        </span>
      )}
    </motion.div>
  );
}
