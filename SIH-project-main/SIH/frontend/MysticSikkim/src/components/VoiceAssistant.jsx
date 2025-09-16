import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Zap } from 'lucide-react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          handleVoiceCommand(transcript);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = async (command) => {
    const lowerCommand = command.toLowerCase();
    let response = '';

    if (lowerCommand.includes('hey sikkora') || lowerCommand.includes('hello sikkora')) {
      response = 'Namaste! I am your SIKKORA voice assistant. How can I help you explore Sikkim today?';
    } else if (lowerCommand.includes('monastery') || lowerCommand.includes('temple')) {
      response = 'Sikkim has beautiful monasteries like Rumtek, Pemayangtse, Enchey, and Tashiding. Which one would you like to know about?';
    } else if (lowerCommand.includes('book') || lowerCommand.includes('hotel')) {
      response = 'I can help you book accommodations. Try The Elgin Nor-Khill for luxury or Hotel Tashidelek for budget stays. Should I open the booking page?';
      setTimeout(() => window.location.href = '/services', 2000);
    } else if (lowerCommand.includes('weather') || lowerCommand.includes('climate')) {
      response = 'The best time to visit Sikkim is March to May and September to November for clear mountain views and pleasant weather.';
    } else if (lowerCommand.includes('plan') || lowerCommand.includes('itinerary')) {
      response = 'Let me help you create a perfect itinerary. Opening the AI Smart Planner for you.';
      setTimeout(() => window.location.href = '/planner', 2000);
    } else if (lowerCommand.includes('emergency') || lowerCommand.includes('help')) {
      response = 'For emergencies, call 100 for police, 108 for medical emergency, or contact tourist helpline at +91-3592-202033. Stay safe!';
    } else if (lowerCommand.includes('navigate') || lowerCommand.includes('directions')) {
      response = 'Opening the interactive map to help you navigate to monasteries and attractions.';
      setTimeout(() => window.location.href = '/map', 2000);
    } else {
      response = 'I can help you with monastery information, bookings, weather, planning trips, emergencies, and navigation. What would you like to know?';
    }

    speak(response);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript('');
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Voice Assistant Toggle */}
      <motion.button
        onClick={() => setIsActive(!isActive)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl flex items-center justify-center text-white z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isListening ? { 
          boxShadow: [
            '0 0 20px rgba(147,51,234,0.5)',
            '0 0 40px rgba(147,51,234,0.8)',
            '0 0 20px rgba(147,51,234,0.5)'
          ]
        } : {}}
        transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
      >
        <Zap className="w-6 h-6" />
      </motion.button>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed bottom-44 right-6 w-80 bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl border-2 border-purple-400/30 shadow-2xl z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-purple-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">SIKKORA Voice</h3>
                  <p className="text-purple-200 text-sm">Say "Hey SIKKORA" to start</p>
                </div>
                <motion.button
                  onClick={() => setIsActive(false)}
                  className="text-white/60 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  ×
                </motion.button>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="p-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold transition-all ${
                    isListening 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isListening ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
                >
                  {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </motion.button>

                <motion.button
                  onClick={isSpeaking ? stopSpeaking : () => speak('Voice assistant is ready to help you explore Sikkim')}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isSpeaking 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>
              </div>

              {/* Status */}
              <div className="text-center mb-4">
                {isListening && (
                  <motion.div
                    className="text-green-400 text-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🎤 Listening...
                  </motion.div>
                )}
                {isSpeaking && (
                  <motion.div
                    className="text-blue-400 text-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🔊 Speaking...
                  </motion.div>
                )}
                {!isListening && !isSpeaking && (
                  <div className="text-white/60 text-sm">Ready to assist</div>
                )}
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="bg-black/20 rounded-xl p-3 mb-4">
                  <p className="text-white text-sm">{transcript}</p>
                </div>
              )}

              {/* Quick Commands */}
              <div className="space-y-2">
                <h4 className="text-white font-medium text-sm mb-3">Quick Commands:</h4>
                {[
                  '"Book a hotel"',
                  '"Plan my trip"',
                  '"Show monasteries"',
                  '"Emergency help"',
                  '"Weather info"'
                ].map((command, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleVoiceCommand(command.replace(/"/g, ''))}
                    className="w-full text-left p-2 bg-white/10 rounded-lg text-white/80 text-xs hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {command}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}