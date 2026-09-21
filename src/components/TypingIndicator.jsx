import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles } from 'lucide-react';

/**
 * TypingIndicator Component
 * Features rhythmic bouncing dots, subtle glowing pulse, and dynamic status text.
 */
export default function TypingIndicator({ 
  text = 'Formulating livestock advice based on farm records...' 
}) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      id="ai-typing-indicator"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -5, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex items-start gap-2.5 max-w-[90%] sm:max-w-[80%] mr-auto"
      aria-live="polite"
      aria-label="AI Farm Advisor is typing"
    >
      {/* Bot Avatar with pulse glow */}
      <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/60 relative">
        <Bot className="w-4 h-4" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </div>

      {/* Typing Bubble */}
      <div className="p-3.5 px-4 rounded-2xl rounded-tl-sm bg-neutral-850 border border-emerald-500/20 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          {/* Animated 3-dot wave */}
          <div className="flex items-center gap-1.5 py-1">
            <motion.span
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0 }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <motion.span
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <motion.span
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
          </div>

          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>AI Advisor is thinking{dots}</span>
          </span>
        </div>

        <p className="text-[11px] text-neutral-400 font-medium leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
