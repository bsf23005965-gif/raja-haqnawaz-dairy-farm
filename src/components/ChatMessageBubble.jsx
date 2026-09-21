import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, User, Sparkles, Copy, Check, Clock } from 'lucide-react';

/**
 * ChatMessageBubble Component
 * Smoothly fades in and glides into position when mounted.
 * Styled with distinct avatar badges, contrast colors, timestamp, and quick-copy action.
 */
export default function ChatMessageBubble({ message, index }) {
  const isAI = message.sender === 'ai';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <motion.div
      id={`chat-message-${message.id}`}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.32, 
        ease: [0.16, 1, 0.3, 1], // snappy easing
        delay: Math.min(index * 0.04, 0.2) 
      }}
      className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%] group ${
        isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'
      }`}
    >
      {/* Sender Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md transition-transform group-hover:scale-105 ${
          isAI
            ? 'bg-emerald-950 border border-emerald-600/50 text-emerald-400 shadow-emerald-950/40'
            : 'bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-neutral-950/40'
        }`}
      >
        {isAI ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Bubble Box */}
      <div
        className={`relative p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed transition-all shadow-lg ${
          isAI
            ? 'bg-neutral-850 border border-neutral-800 text-neutral-200 rounded-tl-sm hover:border-neutral-700'
            : 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white font-medium rounded-tr-sm shadow-emerald-950/40'
        }`}
      >
        {/* Author Tag for AI */}
        {isAI && (
          <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-1.5 mb-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <Bot className="w-3 h-3" />
              <span>Raja Haqnawaz Advisor</span>
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        )}

        {/* Message Content */}
        <p className="whitespace-pre-line break-words">{message.text}</p>

        {/* Timestamp */}
        <div
          className={`flex items-center justify-end gap-1 text-[10px] mt-2 ${
            isAI ? 'text-neutral-400' : 'text-emerald-200/80'
          }`}
        >
          <Clock className="w-2.5 h-2.5 opacity-60" />
          <span>{formattedTime}</span>
        </div>
      </div>
    </motion.div>
  );
}
