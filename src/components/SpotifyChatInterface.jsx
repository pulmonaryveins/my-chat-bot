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
        className="flex-1 overflow-y-auto relative"
      >
        {/* Animated Background Pattern - Only shows when no messages */}
        {messages.length === 0 && !isTyping && (
          <>
            <div className="fixed inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(29, 185, 84) 1px, transparent 0)',
                backgroundSize: '48px 48px'
              }} />
            </div>
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-spotify-green/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
          </>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-full flex flex-col relative z-10">
          {/* Welcome Card - Shows when no messages */}
          {messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center py-12 sm:py-20"
            >
              <div className="max-w-2xl w-full space-y-8">
                {/* Floating Icon */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex justify-center mb-8"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-spotify-green/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-spotify-green/20">
                      <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-spotify-green" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-spotify-green/20 rounded-full blur-xl"
                    />
                  </motion.div>
                </motion.div>

                {/* Hero Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                    Ello newb! 👋
                  </h1>
                  <p className="text-xl sm:text-2xl text-spotify-gray-light font-light">
                    Lemme know if you need anything 
                  </p>
                </motion.div>

                {/* Main Welcome Card */}
                <div className="bg-spotify-gray-medium/30 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-spotify-gray-light/10">

                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-center">
                      Welcome to Vi-bot, Cyn!

                    Remember when we were eating and watching MSA videos, then you said, “Himo-e daw ko ana” since the video is all about chat-bot. Well… here it is.
                    </p>

                    <p className="text-gray-300 leading-relaxed text-center">
                    Vi-bot is a chatbot about me—it knows a lot about me and you. Dili pa siya 100% accurate, but he know a lot of things about you. I still need to train it more though. Enjoy po!                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-spotify-green/10 backdrop-blur-sm rounded-2xl p-5 border border-spotify-green/20 hover:border-spotify-green/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-5 h-5 text-spotify-green" />
                          <h3 className="font-semibold text-white">
                            Always Supportive
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400">
                          I understand you and care about your wellbeing
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          <h3 className="font-semibold text-white">
                            Natural Conversations
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400">
                          Talk to me in Bisaya, English, or mix both
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Quick Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-3 justify-center"
                >
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
                      className="px-5 py-2.5 bg-spotify-gray-medium/50 backdrop-blur-sm rounded-full text-sm font-medium text-gray-300 hover:bg-spotify-green/20 hover:text-white border border-spotify-gray-light/20 hover:border-spotify-green/30 transition-all duration-300"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <div className="space-y-4 sm:space-y-6 flex-1 pb-4">
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