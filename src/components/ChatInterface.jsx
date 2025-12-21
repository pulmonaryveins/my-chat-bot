/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputArea from './InputArea';
import { sendMessage } from '../services/chatService';
import { personality } from '../config/personality';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import GridBackground from './GridBackground';
import Navigation from './Navigation';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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
      <div className="min-h-screen bg-spotify-black">
        <Navigation />
        <GridBackground className="flex items-center justify-center h-screen">
          <div className="text-gray-500 text-sm">Loading messages...</div>
        </GridBackground>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black">
      <Navigation />
      <GridBackground className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
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
        <footer className="bg-spotify-gray-dark/80 backdrop-blur-sm border-t border-spotify-gray-medium shadow-lg">
          <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
            <InputArea onSend={handleSend} disabled={isTyping} />
          </div>
        </footer>
      </GridBackground>
    </div>
  );
}