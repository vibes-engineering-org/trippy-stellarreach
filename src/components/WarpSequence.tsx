import React from "react";
import { motion } from "framer-motion";

export default function WarpSequence() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a23] to-[#1a1a33] flex items-center justify-center">
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        animate={{ scale: [1, 12], opacity: [1, 0] }}
        transition={{ duration: 1.5, ease: "easeIn", repeat: Infinity }}
      />
    </div>
  );
}
