import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, RotateCcw } from 'lucide-react';

export default function DemoVideo({ isOpen, onClose, videoType = 'demo' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const videoContent = {
    demo: {
      title: "Why Choose SIKKORA?",
      description: "Discover the premium features that make SIKKORA your perfect companion for exploring Sikkim's sacred heritage",
      fallbackContent: [
        "🏔️ Premium Heritage Experience",
        "🏛️ 6 Sacred Monasteries with 360° Tours",
        "🤖 AI-Powered Smart Planning",
        "📱 Offline Mode for Remote Areas",
        "🗣️ Multi-Language Audio Guides",
        "🌟 Cultural Immersion & Authenticity",
        "🛎️ Complete Travel Services",
        "👥 Spiritual Community Platform"
      ]
    },
    startup: {
      title: "Welcome to SIKKORA",
      description: "Your journey to Sikkim's sacred heritage begins here",
      fallbackContent: [
        "✨ SIKKORA",
        "🏔️ Sacred Land of the Himalayas",
        "🙏 Premium Heritage Experience",
        "🏛️ Ancient Monasteries Await",
        "🌟 Begin Your Spiritual Journey"
      ]
    }
  };

  const currentContent = videoContent[videoType];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setVideoLoaded(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    const handleError = () => {
      console.log('Video failed to load, showing fallback content');
      setVideoLoaded(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video && videoLoaded) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video && videoLoaded) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    if (video && duration && videoLoaded) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (video && videoLoaded) {
      video.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
      if (!isPlaying) {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-400/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{currentContent.title}</h2>
                  <p className="text-white/80">{currentContent.description}</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-white hover:text-yellow-300 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoLoaded(false)}
              >
                <source src="/videos/demo.mp4" type="video/mp4" />
              </video>

              {/* Fallback Content (always visible as overlay) */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-amber-900/80 to-yellow-800/80 flex items-center justify-center">
                <div className="text-center max-w-4xl px-6">
                  <motion.div
                    className="mb-8"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <h3 className="text-6xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent mb-4">
                      SIKKORA
                    </h3>
                    <p className="text-2xl text-yellow-200 font-light">Premium Heritage Experience</p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {currentContent.fallbackContent.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-yellow-400/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02, borderColor: 'rgba(255,215,0,0.5)' }}
                      >
                        <span className="text-white font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {videoType === 'demo' && (
                    <motion.div
                      className="mt-8 p-6 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-2xl border border-yellow-400/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <h4 className="text-xl font-bold text-white mb-3">🌟 Experience Sikkim Like Never Before</h4>
                      <p className="text-white/80 leading-relaxed">
                        Journey through the sacred monasteries of Sikkim with our premium platform. 
                        From offline-enabled monastery tours to AI-powered trip planning, SIKKORA offers 
                        the most comprehensive and authentic way to explore the spiritual heart of the Himalayas.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Video Controls Overlay (only show if video is loaded) */}
              {videoLoaded && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Progress Bar */}
                    <div 
                      className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={togglePlay}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </motion.button>

                        <motion.button
                          onClick={restart}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <RotateCcw size={16} />
                        </motion.button>

                        <motion.button
                          onClick={toggleMute}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </motion.button>

                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <motion.button
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Maximize size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Play Button Overlay (only show if video is loaded and not playing) */}
              {videoLoaded && !isPlaying && (
                <motion.button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </motion.button>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gradient-to-r from-red-950/50 to-amber-950/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                    🏔️
                  </div>
                  <div>
                    <h4 className="text-white font-bold">SIKKORA Platform</h4>
                    <p className="text-white/60 text-sm">Premium Heritage Experience</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Exploring
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}