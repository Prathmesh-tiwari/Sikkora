import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState('video');

  useEffect(() => {
    // Play loading sound effects
    const playLoadingSounds = () => {
      // Create multiple audio contexts for layered sound effects
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Startup chime sound
      const playChime = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
      };

      // Ambient loading sound
      const playAmbient = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime + 1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
        
        oscillator.start(audioContext.currentTime + 0.5);
        oscillator.stop(audioContext.currentTime + 3.5);
      };

      // Play sounds
      setTimeout(playChime, 500);
      setTimeout(playAmbient, 1000);
    };

    // Start with video for 4 seconds, then show loading
    const videoTimer = setTimeout(() => {
      setShowVideo(false);
      setLoadingPhase('loading');
      playLoadingSounds();
      startLoading();
    }, 4000);

    const startLoading = () => {
      // Play loading sound
      const utterance = new SpeechSynthesisUtterance("Welcome to SIKKORA - Premium Heritage Experience");
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      utterance.lang = 'en-US';
      
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          speechSynthesis.speak(utterance);
        }, { once: true });
      } else {
        speechSynthesis.speak(utterance);
      }

      // Animate progress from 0 to 100
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoadingPhase('complete');
            
            // Completion sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            setTimeout(() => onLoadingComplete(), 1000);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
    };

    return () => {
      clearTimeout(videoTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Startup Video */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => {
                setShowVideo(false);
                setLoadingPhase('loading');
              }}
              onError={() => {
                setShowVideo(false);
                setLoadingPhase('loading');
              }}
            >
              <source src="/videos/startup.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <motion.h1
                  className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent mb-4"
                  animate={{ 
                    textShadow: [
                      '0 0 40px rgba(255,215,0,0.9)',
                      '0 0 80px rgba(255,215,0,1)',
                      '0 0 40px rgba(255,215,0,0.9)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  SIKKORA
                </motion.h1>
                <motion.p
                  className="text-2xl text-yellow-200 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Premium Heritage Experience
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute w-32 h-16 bg-white/5 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <AnimatePresence>
        {!showVideo && (
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 200 }}
            >
              <motion.img 
                src="/images/premium logo design .png" 
                alt="SIKKORA Logo" 
                className="w-40 h-40 mx-auto object-contain filter drop-shadow-2xl"
                animate={{ 
                  filter: [
                    'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
                    'drop-shadow(0 0 40px rgba(255,215,0,0.8))',
                    'drop-shadow(0 0 20px rgba(255,215,0,0.5))'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1
              className="text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    '0 0 40px rgba(255,215,0,0.9)',
                    '0 0 80px rgba(255,215,0,1)',
                    '0 0 40px rgba(255,215,0,0.9)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SIKKORA
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-2xl text-yellow-200 mb-12 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Premium Heritage Experience
            </motion.p>

            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <motion.div
                className="text-6xl font-bold text-white mb-4"
                key={progress}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                {progress}%
              </motion.div>
              
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    transition={{ duration: 0.1 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="text-white/70 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {progress < 30 && "Initializing premium experience..."}
              {progress >= 30 && progress < 60 && "Loading sacred monasteries..."}
              {progress >= 60 && progress < 90 && "Preparing cultural content..."}
              {progress >= 90 && "Almost ready for your journey..."}
            </motion.div>

            <motion.div
              className="w-96 h-3 bg-white/10 rounded-full mx-auto mt-8 overflow-hidden backdrop-blur-sm border border-yellow-400/30"
              initial={{ width: 0 }}
              animate={{ width: 384 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 rounded-full relative overflow-hidden"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Animation */}
      <AnimatePresence>
        {loadingPhase === 'complete' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center justify-center h-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="text-8xl text-yellow-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
              >
                ✨
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}