import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState('video');
  const [userInteracted, setUserInteracted] = useState(false);
  const [showClickToStart, setShowClickToStart] = useState(false);

  useEffect(() => {
    // Show startup video first
    const videoTimer = setTimeout(() => {
      if (showVideo) {
        setShowVideo(false);
        setLoadingPhase('loading');
        startLoading();
      }
    }, 5000); // 5 seconds for video

    const startLoading = () => {

      // Much faster progress animation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoadingPhase('complete');
            
            // Completion sound with error handling
            try {
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime);
              oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.1);
              oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.2);
              
              gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.4);
            } catch (error) {
              console.log('Completion sound not available:', error);
            }
            
            setTimeout(() => onLoadingComplete(), 1000);
            return 100;
          }
          return prev + 2; // Smooth progress (2% per step)
        });
      }, 60);
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
      {/* Click to Start Overlay */}
      <AnimatePresence>
        {showClickToStart && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              setUserInteracted(true);
              setShowClickToStart(false);
              // Start video with sound after user interaction
              const video = document.querySelector('video');
              if (video) {
                video.muted = false;
                video.play();
              }
            }}
          >
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏔️
              </motion.div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent mb-4">
                SIKKORA
              </h1>
              <p className="text-xl text-yellow-200 mb-8">Premium Heritage Experience</p>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold rounded-full text-xl hover:from-yellow-500 hover:to-amber-500 transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
🎵 Click to Start SIKKORA Video
              </motion.button>
              <p className="text-sm text-white/60 mt-4">Click anywhere to begin your journey</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              muted={window.location.pathname !== '/'}
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onLoadedData={() => console.log('Video loaded successfully')}
              onCanPlay={() => {
                const video = document.querySelector('video');
                if (video) {
                  // Unmute only on home page
                  if (window.location.pathname === '/') {
                    video.muted = false;
                  }
                  video.play();
                }
              }}
              onEnded={() => {
                setShowVideo(false);
                setLoadingPhase('loading');
                startLoading();
              }}
              onError={(e) => {
                console.log('Video failed to load, skipping to loading screen');
                setShowVideo(false);
                setLoadingPhase('loading');
                startLoading();
              }}
            >
              <source src="./videos/startup.mp4" type="video/mp4" />
            </video>
            

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
              x: [0, 30, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}

        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
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
                    'drop-shadow(0 0 15px rgba(255,215,0,0.4))',
                    'drop-shadow(0 0 25px rgba(255,215,0,0.6))',
                    'drop-shadow(0 0 15px rgba(255,215,0,0.4))'
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
                    '0 0 20px rgba(255,215,0,0.6)',
                    '0 0 40px rgba(255,215,0,0.8)',
                    '0 0 20px rgba(255,215,0,0.6)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
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
              className="mb-12"
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="text-8xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent mb-6"
                key={progress}

              >
                {progress}%
              </motion.div>
              
              <div className="relative w-24 h-24 mx-auto">

                
                <svg className="w-24 h-24 transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#premiumGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.6))'
                    }}
                  />
                  <defs>
                    <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="25%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="75%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">🏔️</div>
                </div>
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
              className="w-96 h-4 bg-black/30 rounded-full mx-auto mt-8 overflow-hidden backdrop-blur-sm border-2 border-yellow-400/50 shadow-lg"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 384, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 via-orange-500 to-red-600 rounded-full relative overflow-hidden shadow-inner"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: [-150, 500] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
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