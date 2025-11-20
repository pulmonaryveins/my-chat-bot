import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputArea from './InputArea';
import { sendMessage } from '../services/chatService';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function SpotifyChatInterface() {
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

  // Load messages from Firebase
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSend = async (userMessage) => {
    await saveMessage(userMessage, 'user');
    setIsTyping(true);

    try {
      const response = await sendMessage(userMessage, messages);
      await saveMessage(response, 'assistant');
    } catch (error) {
      console.error('Error getting response:', error);
      await saveMessage('Sorry, I had trouble processing that. Try again?', 'assistant');
    } finally {
      setIsTyping(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-spotify-gray-dark flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-spotify-black dark:to-spotify-gray-dark transition-colors">
      <ChatHeader 
        botName="Vince" 
        avatarUrl="/avatar.png" // Replace with your actual avatar path
      />

      {/* Main Chat Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-32"
      >
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.content}
                isUser={msg.role === 'user'}
                timestamp={msg.timestamp?.toDate()}
              />
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </motion.main>

      <InputArea onSend={handleSend} disabled={isTyping} />
    </div>
  );
}