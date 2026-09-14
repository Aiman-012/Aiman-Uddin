import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Aiman's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userMessage } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          history: newMessages.slice(0, -1) // all except the one we just added
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const fullText = data.text;
      
      setIsLoading(false);
      setIsTyping(true);
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let currentIndex = 0;
      const charsPerTick = 3; // Adjust this value to make typing faster or slower
      
      const interval = setInterval(() => {
        currentIndex += charsPerTick;
        
        if (currentIndex >= fullText.length) {
          currentIndex = fullText.length;
          clearInterval(interval);
          setIsTyping(false);
        }
        
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { 
            ...updated[updated.length - 1], 
            text: fullText.slice(0, currentIndex) 
          };
          return updated;
        });
      }, 15);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please reach out via WhatsApp instead: +8801538288739" }]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const formatText = (text: string) => {
    // If the text has raw phone numbers not in markdown format, convert them
    // This is a simple regex that checks for +880... and wraps it in a markdown tel: link
    let processed = text.replace(/(?<!\]\(tel:)(\+880\d{10})(?!\])/g, '[$1](tel:$1)');
    return processed;
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xl border border-neutral-800 dark:border-neutral-200 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-white dark:bg-[#0d0e12] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neutral-900 dark:bg-white rounded-lg text-white dark:text-neutral-900">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Aiman's AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-neutral-500">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div 
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-tr-sm' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="markdown-body prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-a:text-blue-500">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{formatText(msg.text)}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-neutral-50 dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-neutral-800">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Aiman's work..."
                  className="flex-1 bg-white dark:bg-[#0d0e12] border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isTyping}
                  className="p-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
