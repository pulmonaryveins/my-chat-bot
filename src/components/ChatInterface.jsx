/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputArea from './InputArea';
import { sendMessage } from '../services/chatService';
import { personality } from '../config/personality';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import GridBackground from './GridBackground';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = [];
      snapshot.forEach((doc) => {
        loadedMessages.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        });
      });
      setMessages(loadedMessages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveMessage = async (content, role) => {
    try {
      await addDoc(collection(db, 'messages'), {
        content,
        role,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSend = async (userMessage) => {
    await saveMessage(userMessage, 'user');
    setIsTyping(true);

    try {
      const conversationHistory = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendMessage(userMessage, conversationHistory);
      await new Promise(resolve => setTimeout(resolve, 800));
      await saveMessage(response, 'assistant');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  if (isLoading) {
    return (
      <GridBackground className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-sm">Loading messages...</div>
      </GridBackground>
    );
  }

  return (
    <GridBackground className="flex flex-col h-screen">
      {/* Header - Fully Responsive */}
      <header className="bg-white/80 dark:bg-spotify-gray-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-spotify-gray-medium shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md">
              {personality.name.charAt(0)}
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate">
                {personality.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Active now
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area - Fully Responsive */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-16 sm:mt-24 md:mt-32 px-4">
              <p className="text-sm md:text-base">Send a message to start the conversation</p>
            </div>
          )}
          
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isUser={message.role === 'user'}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area - Fully Responsive */}
      <footer className="bg-white/80 dark:bg-spotify-gray-dark/80 backdrop-blur-sm border-t border-gray-200 dark:border-spotify-gray-medium shadow-lg sticky bottom-0">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <InputArea onSend={handleSend} disabled={isTyping} />
        </div>
      </footer>
    </GridBackground>
  );
}