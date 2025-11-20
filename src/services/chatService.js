/* eslint-disable no-unused-vars */
import { buildSystemPrompt, personality } from '../config/personality';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function sendMessage(userMessage, conversationHistory = []) {
  try {
    const systemPrompt = buildSystemPrompt();
    
    // Detect if she's sad/stressed to adjust response length
    const sadKeywords = /(sad|depressed|down|upset|tired|exhausted|stressed|giving up|can't|hard|heavy|painful|hurt|alone|anxious|overwhelmed)/i;
    const isSad = sadKeywords.test(userMessage.toLowerCase());
    
    // Only use last 4 messages for context
    const recentHistory = conversationHistory.slice(-4).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        max_tokens: isSad ? 200 : 80, // Longer response when she's sad
        temperature: isSad ? 0.8 : 0.7, // More warmth when comforting
        top_p: 0.85,
        frequency_penalty: 0.5,
        presence_penalty: 0.4,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API Error:', errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    let text = data.choices[0].message.content.trim();
    
    // Clean up overly AI-like responses
    text = text.replace(/Let me know.*/gi, '');
    text = text.replace(/Feel free.*/gi, '');
    text = text.replace(/I'm here for you.*/gi, '');
    text = text.replace(/Don't hesitate.*/gi, '');
    
    return text.trim();
  } catch (error) {
    console.error('Chat error:', error);
    
    const fallbacks = [
      "connection issue, try again?",
      "hmm, try again?",
      "technical problem, resend?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}