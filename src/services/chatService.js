/* eslint-disable no-unused-vars */
import { buildSystemPrompt, personality } from '../config/personality';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function sendMessage(userMessage, conversationHistory = []) {
  try {
    // Detect if message indicates sadness or distress
    const sadKeywords = /(sad|tired|stress|depress|anxious|overwhelm|hurt|alone|lost|give up)/i;
    const isSad = sadKeywords.test(userMessage);
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt()
          },
          ...conversationHistory.slice(-5).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: isSad ? 200 : 120,
        temperature: isSad ? 0.8 : 0.7,
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