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
    en: { 
      name: 'English', 
      placeholder: 'Type a sacred message...',
      voice: 'en-US',
      greeting: "Namaste! Welcome to SIKKORA 🌄. I'm your premium AI guide for exploring Sikkim's sacred heritage. How can I assist you today?"
    },
    hi: { 
      name: 'हिंदी', 
      placeholder: 'एक पवित्र संदेश टाइप करें...',
      voice: 'hi-IN',
      greeting: "नमस्ते! सिक्कोरा में आपका स्वागत है 🌄। मैं सिक्किम की पवित्र विरासत की खोज के लिए आपका प्रीमियम AI गाइड हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?"
    },
    ne: { 
      name: 'नेपाली', 
      placeholder: 'एक पवित्र सन्देश टाइप गर्नुहोस्...',
      voice: 'ne-NP',
      greeting: "नमस्ते! सिक्कोरामा तपाईंलाई स्वागत छ 🌄। म सिक्किमको पवित्र सम्पदाको अन्वेषणका लागि तपाईंको प्रिमियम AI गाइड हुँ। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु?"
    },
    bh: { 
      name: 'भूटिया', 
      placeholder: 'Type a sacred message...',
      voice: 'en-US', // Fallback to English for Bhutia
      greeting: "Kuzu zangpo! Welcome to SIKKORA 🌄. I'm your premium AI guide for exploring Sikkim's sacred heritage. How can I assist you today?"
    }
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

  // Update greeting when language changes
  useEffect(() => {
    setMessages([{
      sender: "bot",
      text: languages[selectedLanguage].greeting,
    }]);
  }, [selectedLanguage]);

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
              
              LANGUAGE: Respond in ${languages[selectedLanguage].name} language.
              
              CONTEXT: You help tourists explore Sikkim's sacred monasteries:
              - Rumtek Monastery (Dharma Chakra Centre, seat of Karmapa, established 1966)
              - Pemayangtse Monastery (Perfect Sublime Lotus, Nyingma order, established 1705)
              - Enchey Monastery (The Solitary Temple, famous for Cham dance, established 1909)
              - Tashiding Monastery (Most sacred in Sikkim, Bumchu festival, established 1717)
              - Dubdi Monastery (First monastery in Sikkim, established 1701)
              - Lingdum Monastery (Modern spiritual haven, established 1999)
              
              USER MESSAGE: "${message}"
              
              Provide helpful, specific information about monasteries, booking, transport, culture, and festivals. Keep responses informative and include relevant emojis.`
            }]
          }]
        })
      });
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || getLanguageSpecificFallback(message);
    } catch (error) {
      console.error('Gemini API Error:', error);
      return getLanguageSpecificFallback(message);
    }
  };

  const getLanguageSpecificFallback = (message) => {
    const lowerMsg = message.toLowerCase();
    
    const responses = {
      en: {
        booking: "🏨 I can help you book accommodations! Try The Elgin Nor-Khill (₹8,500/night) for luxury or Hotel Tashidelek (₹4,500/night) for budget stays. Visit our Services section for direct booking links!",
        monastery: "🏛️ Sikkim has amazing monasteries! Rumtek (seat of Karmapa), Pemayangtse (oldest), Enchey (Cham dances), and Tashiding (most sacred). Each has unique 360° virtual tours available!",
        transport: "🚗 Local transport options: Sikkim Taxi Service (₹15/km, +91-9832123456), Mountain Cab (₹12/km), Airport transfers (₹1500-2000). Check our Services hub for more details!",
        default: "🙏 I'm here to help you explore Sikkim's sacred heritage! Ask me about monasteries, bookings, transport, or cultural experiences!"
      },
      hi: {
        booking: "🏨 मैं आपको आवास बुक करने में मदद कर सकता हूं! लक्जरी के लिए द एल्गिन नोर-खिल (₹8,500/रात) या बजट स्टे के लिए होटल ताशीदेलेक (₹4,500/रात) आज़माएं।",
        monastery: "🏛️ सिक्किम में अद्भुत मठ हैं! रुमटेक (कर्मापा की गद्दी), पेमायांग्त्से (सबसे पुराना), एन्चे (चाम नृत्य), और ताशीदिंग (सबसे पवित्र)। प्रत्येक के पास अनूठे 360° वर्चुअल टूर उपलब्ध हैं!",
        transport: "🚗 स्थानीय परिवहन विकल्प: सिक्किम टैक्सी सेवा (₹15/किमी), माउंटेन कैब (₹12/किमी), एयरपोर्ट ट्रांसफर (₹1500-2000)।",
        default: "🙏 मैं सिक्किम की पवित्र विरासत का पता लगाने में आपकी मदद करने के लिए यहां हूं! मुझसे मठों, बुकिंग, परिवहन या सांस्कृतिक अनुभवों के बारे में पूछें!"
      },
      ne: {
        booking: "🏨 म तपाईंलाई बास बुक गर्न मद्दत गर्न सक्छु! लक्जरीका लागि द एल्गिन नोर-खिल (₹8,500/रात) वा बजेट स्टेका लागि होटल ताशीदेलेक (₹4,500/रात) प्रयास गर्नुहोस्।",
        monastery: "🏛️ सिक्किममा अद्भुत गुम्बाहरू छन्! रुमटेक (कर्मापाको गद्दी), पेमायांग्त्से (सबैभन्दा पुरानो), एन्चे (चाम नृत्य), र ताशीदिंग (सबैभन्दा पवित्र)।",
        transport: "🚗 स्थानीय यातायात विकल्पहरू: सिक्किम ट्याक्सी सेवा (₹15/किमी), माउन्टेन क्याब (₹12/किमी), एयरपोर्ट ट्रान्सफर (₹1500-2000)।",
        default: "🙏 म सिक्किमको पवित्र सम्पदाको अन्वेषण गर्न तपाईंलाई मद्दत गर्न यहाँ छु! मलाई गुम्बाहरू, बुकिङ, यातायात, वा सांस्कृतिक अनुभवहरूको बारेमा सोध्नुहोस्!"
      },
      bh: {
        booking: "🏨 I can help you book accommodations! Try The Elgin Nor-Khill (₹8,500/night) for luxury or Hotel Tashidelek (₹4,500/night) for budget stays.",
        monastery: "🏛️ Sikkim has amazing monasteries! Rumtek (seat of Karmapa), Pemayangtse (oldest), Enchey (Cham dances), and Tashiding (most sacred).",
        transport: "🚗 Local transport options: Sikkim Taxi Service (₹15/km), Mountain Cab (₹12/km), Airport transfers (₹1500-2000).",
        default: "🙏 Kuzu zangpo! I'm here to help you explore Sikkim's sacred heritage! Ask me about monasteries, bookings, transport, or cultural experiences!"
      }
    };

    const langResponses = responses[selectedLanguage] || responses.en;

    if (lowerMsg.includes('book') || lowerMsg.includes('hotel')) return langResponses.booking;
    if (lowerMsg.includes('monastery') || lowerMsg.includes('temple')) return langResponses.monastery;
    if (lowerMsg.includes('transport') || lowerMsg.includes('taxi')) return langResponses.transport;
    
    return langResponses.default;
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
      
      // Add text-to-speech for bot response
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = languages[selectedLanguage].voice;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.7;
      
      // Speak the response
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          speechSynthesis.speak(utterance);
        }, { once: true });
      } else {
        speechSynthesis.speak(utterance);
      }
      
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response },
      ]);
    } catch (error) {
      setIsTyping(false);
      const fallbackResponse = getLanguageSpecificFallback(userMessage);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: fallbackResponse },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button with Premium Animation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
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

      {/* Chat Container with Enhanced Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ x: "100%", opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "100%", opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 h-[85vh] w-[400px] bg-gradient-to-br from-amber-900/95 via-orange-800/95 to-yellow-900/95 shadow-2xl rounded-l-3xl border border-amber-400/30 backdrop-blur-xl flex flex-col z-40 overflow-hidden"
          >
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 text-white p-5 rounded-tl-3xl shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center border border-white/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Mountain size={20} />
                  </motion.div>
                  <h3 className="font-bold text-lg">SIKKORA AI</h3>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl hover:text-yellow-300 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={22} />
                </motion.button>
              </div>
              
              {/* Status and Language Bar */}
              <div className="flex items-center justify-between text-sm">
                <motion.div 
                  className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    isOffline ? 'bg-red-500/20' : 'bg-green-500/20'
                  }`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
                  <span>{isOffline ? 'Offline Mode' : 'Online'}</span>
                </motion.div>
                
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

            {/* Messages with Enhanced Animations */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-amber-400/50 scrollbar-track-transparent flex flex-col">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
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
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div 
                  className="flex self-start p-3 rounded-2xl bg-white/15 border border-amber-400/25 shadow-md backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
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
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <div className="p-4 border-t border-amber-400/20 flex items-center bg-gradient-to-r from-amber-900/50 to-yellow-900/50">
              <motion.input
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-yellow-400/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/60 transition-all resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={languages[selectedLanguage].placeholder}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                onClick={sendMessage}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="ml-3 px-5 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-amber-500/40 transition-all flex items-center gap-2"
              >
                <Send size={16} /> Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Scrollbar */}
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