import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../stores/chatStore.js';
import { Sparkles, Send, Trash2, Bot, User, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import ChatMessageBubble from '../../components/ChatMessageBubble.jsx';
import TypingIndicator from '../../components/TypingIndicator.jsx';

export default function AIChatTab() {
  const { messages, isThinking, sendMessage, clearChat } = useChatStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Which cow breed is best for high butterfat in Punjab?',
    'What are the care requirements for newborn Sahiwal calves?',
    'How do I verify daily milk yield before purchasing?',
    'What is Raja Haqnawaz Dairy Farm’s vaccination schedule?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isThinking) return;
    const text = inputText;
    setInputText('');
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-[650px] max-h-[75vh] rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="p-3.5 px-4 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-700/50 text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Raja Haqnawaz AI Farm Advisor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[10px] text-neutral-400">Powered by Gemini AI • 30+ Years Farm Expertise</p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
          title="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <ChatMessageBubble key={msg.id} message={msg} index={index} />
          ))}

          {isThinking && (
            <TypingIndicator 
              key="ai-thinking-typing-state" 
              text="Consulting Raja Haqnawaz Dairy Farm 30+ years breeding records & veterinary guidelines..." 
            />
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="p-2 px-3 border-t border-neutral-800/80 bg-neutral-900/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="px-2.5 py-1 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-[11px] text-neutral-300 border border-neutral-800 whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything about cattle breeds, milk, feeding, or prices..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
