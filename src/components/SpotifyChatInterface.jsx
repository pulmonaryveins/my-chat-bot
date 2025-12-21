import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputArea from './InputArea';
import ConfirmModal from './ConfirmModal';
import { sendMessage } from '../services/chatService';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, getDocs } from 'firebase/firestore';
import { Sparkles, Heart, MessageCircle } from 'lucide-react';

export default function SpotifyChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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

  const handleClearChat = async () => {
    try {
      const q = query(collection(db, 'messages'));
      const querySnapshot = await getDocs(q);
      
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      
      console.log('All messages cleared successfully');
    } catch (error) {
      console.error('Error clearing messages:', error);
      alert('Failed to clear messages. Please try again.');
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
      <div className="min-h-screen bg-spotify-gray-dark flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-spotify-black transition-colors">
      <ChatHeader 
        botName="Vince" 
        avatarUrl="/avatar.png"
        onClearChat={() => setShowClearModal(true)}
      />

      {/* Main Chat Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 min-h-full flex flex-col">
          {/* Welcome Card - Shows when no messages */}
          {messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="max-w-2xl w-full space-y-6">
                {/* Main Welcome Card */}
                <div className="bg-spotify-gray-medium rounded-3xl p-8 shadow-xl border border-spotify-gray-light/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-spotify-green flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Hi, Cyn! 👋
                      </h2>
                      <p className="text-spotify-gray-light">I'm here for you</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Welcome back! You can talk to me about anything—share what's on your mind, 
                      vent about your day, or just say hi. I'm here to listen and support you.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                      <div className="bg-spotify-green/20 rounded-xl p-4 border border-spotify-green/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-5 h-5 text-spotify-green" />
                          <h3 className="font-semibold text-white">
                            Always Supportive
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400">
                          I understand you and care about your wellbeing
                        </p>
                      </div>

                      <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="w-5 h-5 text-blue-500" />
                          <h3 className="font-semibold text-white">
                            Natural Conversations
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400">
                          Talk to me in Bisaya, English, or mix both
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Kumusta ka?",
                    "I'm feeling stressed",
                    "Tell me something nice",
                    "I need advice"
                  ].map((suggestion, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(suggestion)}
                      className="px-4 py-2 bg-spotify-gray-medium rounded-full text-sm text-gray-300 hover:bg-spotify-green/20 border border-spotify-gray-light/20 transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <div className="space-y-6 flex-1">
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
        </div>
      </motion.main>

      {/* Input Area - Fixed at bottom */}
      <InputArea onSend={handleSend} disabled={isTyping} />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearChat}
        title="Clear All Messages?"
        message="Are you sure you want to delete all messages? This action cannot be undone. The chatbot will still remember everything from its personality, but the conversation history will be cleared."
      />
    </div>
  );
}