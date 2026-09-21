import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  messages: [
    {
      id: 'msg_init',
      sender: 'ai',
      text: 'Assalam-o-Alaikum! Welcome to Raja Haqnawaz Dairy Farm. I am your specialized Dairy & Livestock AI Consultant. With over 30 years of elite dairy breeding experience, I can assist you with breed selection, milk productivity estimates, feeding management, veterinary guidance, and animal purchases. How may I help your dairy business today?',
      timestamp: new Date().toISOString()
    }
  ],
  isThinking: false,

  addMessage: (message) => {
    set({ messages: [...get().messages, message] });
  },

  sendMessage: async (userText) => {
    if (!userText.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString()
    };

    set({
      messages: [...get().messages, userMessage],
      isThinking: true
    });

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: get().messages.slice(-6)
        })
      });

      const data = await response.json();
      const aiReply = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Thank you for contacting Raja Haqnawaz Dairy Farm. Please call us at 0300 6072070 or WhatsApp 0345 2923974 for direct assistance.',
        timestamp: new Date().toISOString()
      };

      set({
        messages: [...get().messages, aiReply],
        isThinking: false
      });
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: 'Assalam-o-Alaikum! Raja Haqnawaz Dairy Farm guarantees healthy, pedigree-certified dairy cows and buffaloes with 30+ years of trust. You can reach Raja Haqnawaz directly on WhatsApp at 0345 2923974 or Call 0300 6072070 for immediate live guidance.',
        timestamp: new Date().toISOString()
      };
      set({
        messages: [...get().messages, fallbackReply],
        isThinking: false
      });
    }
  },

  clearChat: () => {
    set({
      messages: [
        {
          id: 'msg_init',
          sender: 'ai',
          text: 'Assalam-o-Alaikum! Welcome to Raja Haqnawaz Dairy Farm AI Advisor. How may I assist your livestock inquiries today?',
          timestamp: new Date().toISOString()
        }
      ]
    });
  }
}));
