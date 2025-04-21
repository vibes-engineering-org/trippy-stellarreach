import React from "react";
import { motion } from "framer-motion";

interface Profile {
  username: string;
  avatar: string;
  followers: number;
  registeredAt: string;
}

interface ScoreCardProps {
  profile: Profile;
  warpScore: number;
}

export default function ScoreCard({ profile, warpScore }: ScoreCardProps) {
  const tier =
    warpScore >= 9000
      ? "Elite Tier"
      : warpScore >= 5000
      ? "Social Reactor 🔥"
      : "Ascendant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphic-card p-6 rounded-2xl text-white max-w-sm mx-auto"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="text-lg font-semibold">
            {profile.username}
          </div>
          <div className="text-sm opacity-75">{tier}</div>
        </div>
      </div>
      <div className="text-center mb-6">
        <div className="text-6xl font-bold">{warpScore}</div>
      </div>
      <p className="text-center opacity-60 mb-6">
        Some signals travel farther than others. Warp resonance is being
        observed.
      </p>
      <div className="flex gap-4">
        <button className="flex-1 neon-button py-2 rounded-lg">
          Mint Your WarpScore
        </button>
        <button className="flex-1 neon-button-outline py-2 rounded-lg">
          Share to Farcaster
        </button>
      </div>
    </motion.div>
  );
}
