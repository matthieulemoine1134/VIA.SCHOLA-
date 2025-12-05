import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant virtuel de Via Schola. Une question sur nos tarifs, le crédit d\'impôt ou nos stages ?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
        // Fallback handled in service, but just in case
        setMessages(prev => [...prev, { role: 'model', text: "Désolé, une erreur est survenue.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-navy-800 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300 h-[500px]">
          {/* Header - Navy */}
          <div className="bg-navy-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full border border-white/20">
                <Bot size={18} />
              </div>
              <div>
                <p className="font-bold text-sm font-serif">Conseiller Via Schola</p>
                <p className="text-[10px] opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> En ligne (IA)
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-cream dark:bg-navy-950">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-violet-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 text-navy-800 dark:text-navy-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white dark:bg-navy-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-navy-700 shadow-sm">
                   <div className="flex gap-1">
                     <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce delay-100"></span>
                     <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce delay-200"></span>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-navy-800 flex gap-2">
            <input 
              type="text" 
              placeholder="Posez votre question..." 
              className="flex-grow bg-gray-50 dark:bg-navy-950 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none dark:text-white"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="bg-navy-900 hover:bg-navy-800 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-xl transition-all duration-300 flex items-center justify-center rounded-full border border-white/20 ${isOpen ? 'bg-navy-700 w-12 h-12' : 'bg-violet-600 w-14 h-14 hover:scale-110'}`}
      >
        {isOpen ? <X color="white" /> : <MessageCircle color="white" size={28} />}
      </button>
    </div>
  );
};

export default AiAdvisor;