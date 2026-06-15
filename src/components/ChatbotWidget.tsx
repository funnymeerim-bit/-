import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, SendIcon, MessageCircle, ExternalLink, Instagram } from 'lucide-react';
import { Language } from '../types';
import { dictionaries } from '../dictionary';
import { TundukIcon } from './OrnamentDesigns';

interface ChatbotWidgetProps {
  language: Language;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ language }) => {
  const d = dictionaries[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: language === 'RU'
          ? 'Привет! Чем я могу вам помочь сегодня? 😊 \nСаламатсызбы! Кандай жардам керек?'
          : 'Саламатсызбы! Кандай жардам керек? 😊 \nПривет! Чем я могу вам помочь сегодня?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (text: string, isFromUser = true) => {
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isFromUser) {
      setMessages(prev => [...prev, { sender: 'user', text, time: timeStr }]);
      setInputValue('');

      // Auto-simulate bot answer based on text keyword matching
      setTimeout(() => {
        let botText = '';
        const norm = text.toLowerCase();

        if (norm.includes('цен') || norm.includes('баа')) {
          botText = d.botResponsePrices;
        } else if (norm.includes('дүн') || norm.includes('опт') || norm.includes('ишкана')) {
          botText = d.botResponseWholesale;
        } else if (norm.includes('кайдан') || norm.includes('где') || norm.includes('купить') || norm.includes('магазин')) {
          botText = d.botResponseWhereToBuy;
        } else {
          botText = language === 'RU'
            ? `Спасибо за ваше сообщение! Напишите нам напрямую в WhatsApp по номеру ${d.phoneNum} для мгновенной консультации со специалистом.`
            : `Сурооңуз үчүн рахмат! Толугураак жооп алуу үчүн ${d.phoneNum} номери аркылуу түз WhatsApp шилтемесине жазыңыз.`;
        }

        setMessages(prev => [...prev, { sender: 'bot', text: botText, time: timeStr }]);
      }, 700);
    }
  };

  const handleQuickReply = (type: 'prices' | 'wholesale' | 'where') => {
    let question = '';
    let answer = '';

    if (type === 'prices') {
      question = d.botAskPrices;
      answer = d.botResponsePrices;
    } else if (type === 'wholesale') {
      question = d.botAskWholesale;
      answer = d.botResponseWholesale;
    } else if (type === 'where') {
      question = d.botWhereToBuy;
      answer = d.botResponseWhereToBuy;
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: question, time: timeStr }
    ]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: answer, time: timeStr }
      ]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="floating-chatbot-root">
      
      {/* Floating Chat Bubble Indicator & Social Media Buttons */}
      <AnimatePresence>
        {!isOpen && (
          <div className="flex flex-col items-center gap-2 sm:gap-2.5" id="floating-actions-column">
            {/* WhatsApp Floating Button */}
            <motion.a
              initial={{ scale: 0.6, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 25 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              href="https://wa.me/996772458899?text=Здравствуйте!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-white/10 cursor-pointer"
              id="floating-whatsapp-action"
              title="WhatsApp"
            >
              <MessageCircle size={20} className="fill-current text-white" />
            </motion.a>

            {/* Telegram Floating Button */}
            <motion.a
              initial={{ scale: 0.6, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.05 }}
              href="https://t.me/ala_too_amir"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-white/10 cursor-pointer"
              id="floating-telegram-action"
              title="Telegram"
            >
              <Send size={18} className="text-white translate-x-[-1px] translate-y-[0.5px]" />
            </motion.a>

            {/* Instagram Floating Button */}
            <motion.a
              initial={{ scale: 0.6, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              href="https://instagram.com/ala_too_amir"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:opacity-95 text-white shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-white/10 cursor-pointer"
              id="floating-instagram-action"
              title="Instagram"
            >
              <Instagram size={20} className="text-white" />
            </motion.a>

            {/* Main Chatbot Button */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="p-4 rounded-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white shadow-2xl hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border-2 border-[#D4A017] group relative"
              id="open-chatbot-bubble"
              aria-label="Toggle Online Advisor"
            >
              <MessageSquare size={26} className="text-[#FDF6E3] animate-pulse" />
              <span className="absolute -top-1 -left-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border border-white"></span>
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Main Chat Widget Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[320px] sm:w-[360px] h-[460px] bg-[#FDF6E3] rounded-2xl shadow-2xl border-2 border-[#D4A017] overflow-hidden flex flex-col"
            id="chatbot-widget-panel"
            role="dialog"
          >
            
            {/* Header section styled in Mountain Blue */}
            <div className="bg-[#1A3A5C] text-white p-4 flex items-center justify-between border-b border-[#D4A017] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-white p-1 rounded-full border border-[#D4A017]">
                  <TundukIcon size={22} className="text-[#8B1A1A]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#FDF6E3]">Ала-Тоо Амир Көмөк</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 block" />
                    <span className="text-[10px] text-slate-300 font-sans font-medium">Онлайн / Live</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full cursor-pointer"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Middle Message Logs list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white shadow-inner">
              
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 shadow-xs text-xs whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1A3A5C] text-white rounded-tr-none'
                        : 'bg-[#FDF6E3] text-[#1A3A5C] border border-[#D4A017]/30 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[8px] opacity-60 text-right mt-1.5 font-medium">
                      {msg.sender === 'user' ? 'Вы ' : 'Амир '}• {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />

            </div>

            {/* Quick action triggers list (Primary Telegram, Secondary WhatsApp) */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex flex-col gap-1.5 shrink-0 select-none">
              
              {/* Quick option reply buttons */}
              {messages.length < 5 && (
                <div className="flex flex-wrap gap-1 mb-1.5">
                  <button
                    onClick={() => handleQuickReply('prices')}
                    className="text-[9px] font-bold bg-white hover:bg-slate-100 border border-slate-200 text-[#1A3A5C] py-1 px-2 rounded-full cursor-pointer shadow-xs"
                  >
                    💰 {d.botAskPrices}
                  </button>
                  <button
                    onClick={() => handleQuickReply('wholesale')}
                    className="text-[9px] font-bold bg-white hover:bg-slate-100 border border-slate-200 text-[#1A3A5C] py-1 px-2 rounded-full cursor-pointer shadow-xs"
                  >
                    📦 {d.botAskWholesale}
                  </button>
                  <button
                    onClick={() => handleQuickReply('where')}
                    className="text-[9px] font-bold bg-white hover:bg-slate-100 border border-slate-200 text-[#1A3A5C] py-1 px-2 rounded-full cursor-pointer shadow-xs"
                  >
                    📍 {d.botWhereToBuy}
                  </button>
                </div>
              )}

              {/* Secure actual redirects (Primary Telegram / Sec WhatsApp) */}
              <div className="grid grid-cols-2 gap-1.5">
                {/* Telegram Bot */}
                <a
                  href="https://t.me/ala_too_amir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-2 rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm"
                  id="bot-telegram-trigger"
                >
                  <SendIcon size={10} className="stroke-[2.5]" />
                  <span>Telegram Bot (Основной)</span>
                  <ExternalLink size={8} />
                </a>

                {/* WhatsApp Chat */}
                <a
                  href="https://wa.me/996772458899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-2 rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm"
                  id="bot-whatsapp-trigger"
                >
                  <MessageCircle size={10} className="stroke-[2.5]" />
                  <span>WhatsApp Chat</span>
                  <ExternalLink size={8} />
                </a>
              </div>

            </div>

            {/* Custom Input Field bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center shrink-0"
              id="chatbot-type-form"
            >
              <input
                type="text"
                placeholder={d.chatPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-slate-100 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-[#D4A017] focus:outline-none focus:bg-white text-slate-800 border border-transparent"
                id="chatbot-text-input"
              />
              <button
                type="submit"
                className="p-2 bg-[#8B1A1A] text-white hover:bg-[#8B1A1A]/90 rounded-lg cursor-pointer flex items-center justify-center shadow-md shrink-0 transition-transform hover:scale-105"
                id="chatbot-submit-msg"
                aria-label="Send message"
              >
                <Send size={12} className="stroke-[2.5]" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
