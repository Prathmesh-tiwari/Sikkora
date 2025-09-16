import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Play loading sound with delay to ensure it works
    const playLoadingSound = () => {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance("Sikkora a premium heritage site");
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';
        
        // Ensure speech synthesis is ready
        if (speechSynthesis.getVoices().length === 0) {
          speechSynthesis.addEventListener('voiceschanged', () => {
            speechSynthesis.speak(utterance);
          }, { once: true });
        } else {
          speechSynthesis.speak(utterance);
        }
      }, 1000);
    };

    playLoadingSound();

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
        >
          <img 
            src="/images/premium logo design .png" 
            alt="SIKKORA Logo" 
            className="w-32 h-32 mx-auto object-contain filter drop-shadow-2xl"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          SIKKORA
        </motion.h1>

        <motion.p
          className="text-xl text-yellow-200 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          a premium heritage site
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          className="w-80 h-2 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 320 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <motion.p
          className="text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
}