import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { X, Send, Sparkles, Mountain, MessageCircle, Wifi, WifiOff, Languages } from "lucide-react";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! Welcome to SIKKORA 🌄. I'm your premium AI guide for exploring Sikkim's sacred heritage. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const languages = {
    en: { name: 'English', placeholder: 'Type a sacred message...' },
    hi: { name: 'हिंदी', placeholder: 'एक पवित्र संदेश टाइप करें...' },
    ne: { name: 'नेपाली', placeholder: 'एक पवित्र सन्देश टाइप गर्नुहोस्...' },
    bh: { name: 'भूटिया', placeholder: 'Type a sacred message...' }
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getGeminiResponse = async (message) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDq2nCHUJZ55_YGRTdZiI4zBtk_9xAAif4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are SIKKORA AI, an expert premium guide for Sikkim tourism and Buddhist monastery exploration.
              
              CONTEXT: You help tourists explore Sikkim's sacred monasteries:
              - Rumtek Monastery (Dharma Chakra Centre, seat of Karmapa, established 1966)
              - Pemayangtse Monastery (Perfect Sublime Lotus, Nyingma order, established 1705)
              - Enchey Monastery (The Solitary Temple, famous for Cham dance, established 1909)
              - Tashiding Monastery (Most sacred in Sikkim, Bumchu festival, established 1717)
              - Dubdi Monastery (First monastery in Sikkim, established 1701)
              - Lingdum Monastery (Modern spiritual haven, established 1999)
              
              SERVICES AVAILABLE:
              - 360° Google Earth virtual tours
              - Hotel bookings (Elgin Nor-Khill, Mayfair Resort, Hotel Tashidelek)
              - Activity bookings (Monastery tours ₹2,500, Tsomgo Lake ₹3,500, Nathula Pass ₹4,000)
              - Transport services (Taxis ₹12-18/km, Airport transfers ₹1500-2000)
              - Trekking packages (Goecha La ₹15,000, Dzongri ₹12,000)
              - Local dining (Taste of Tibet, The Square Restaurant)
              
              USER MESSAGE: "${message}"
              
              Provide helpful, specific information about:
              ✅ Monastery details, history, significance
              ✅ Booking assistance with exact prices
              ✅ Transport options with contact numbers
              ✅ Cultural insights and festival information
              ✅ Weather and best visiting times
              ✅ Local cuisine recommendations
              ✅ Trekking and adventure activities
              
              Keep responses informative, friendly, and include relevant emojis. Mention specific prices and contact details when relevant.`
            }]
          }]
        })
      });
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Namaste! I'm here to help you explore Sikkim's sacred monasteries and plan your perfect spiritual journey! 🏔️🙏";
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback responses based on keywords
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes('book') || lowerMsg.includes('hotel')) {
        return "🏨 I can help you book accommodations! Try The Elgin Nor-Khill (₹8,500/night) for luxury or Hotel Tashidelek (₹4,500/night) for budget stays. Visit our Services section for direct booking links!";
      }
      if (lowerMsg.includes('monastery') || lowerMsg.includes('temple')) {
        return "🏛️ Sikkim has amazing monasteries! Rumtek (seat of Karmapa), Pemayangtse (oldest), Enchey (Cham dances), and Tashiding (most sacred). Each has unique 360° virtual tours available!";
      }
      if (lowerMsg.includes('transport') || lowerMsg.includes('taxi')) {
        return "🚗 Local transport options: Sikkim Taxi Service (₹15/km, +91-9832123456), Mountain Cab (₹12/km), Airport transfers (₹1500-2000). Check our Services hub for more details!";
      }
      return "🙏 I'm here to help you explore Sikkim's sacred heritage! Ask me about monasteries, bookings, transport, or cultural experiences!";
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(userMessage);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response },
      ]);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I'm here to help you discover Sikkim's sacred heritage! Ask me about monasteries, culture, or travel tips! 🏔️" },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <MessageCircle size={28} />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 h-[85vh] w-[400px] bg-gradient-to-br from-amber-900/95 via-orange-800/95 to-yellow-900/95 shadow-2xl rounded-l-3xl border border-amber-400/30 backdrop-blur-xl flex flex-col z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 text-white p-5 rounded-tl-3xl shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center border border-white/20">
                    <Mountain size={20} />
                  </div>
                  <h3 className="font-bold text-lg">SIKKORA AI</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl hover:text-yellow-300 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
              
              {/* Status and Language Bar */}
              <div className="flex items-center justify-between text-sm">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  isOffline ? 'bg-red-500/20' : 'bg-green-500/20'
                }`}>
                  {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
                  <span>{isOffline ? 'Offline Mode' : 'Online'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Languages size={14} />
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-white/10 rounded px-2 py-1 text-xs focus:outline-none"
                  >
                    {Object.entries(languages).map(([code, lang]) => (
                      <option key={code} value={code} className="bg-red-900">
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <motion.div
                className="absolute top-3 right-12 text-white/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} />
              </motion.div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-amber-400/50 scrollbar-track-transparent flex flex-col">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-md backdrop-blur-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-white self-end border border-amber-400/30"
                      : "bg-white/15 text-amber-100 border border-amber-400/25 self-start"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex self-start p-3 rounded-2xl bg-white/15 border border-amber-400/25 shadow-md backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                    <span className="text-sm text-amber-200 font-medium">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-amber-400/20 flex items-center bg-gradient-to-r from-amber-900/50 to-yellow-900/50">
              <input
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-yellow-400/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/60 transition-all resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={languages[selectedLanguage].placeholder}
              />
              <motion.button
                onClick={sendMessage}
                whileTap={{ scale: 0.95 }}
                className="ml-3 px-5 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-2xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-amber-500/40 transition-all flex items-center gap-2"
              >
                <Send size={16} /> Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollbar */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.5);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}



