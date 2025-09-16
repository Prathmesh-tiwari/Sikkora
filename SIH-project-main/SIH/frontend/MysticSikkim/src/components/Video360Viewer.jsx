import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Video360Viewer({ monastery, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  const video360Links = {
    1: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Rumtek Monastery
    2: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Pemayangtse Monastery
    3: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Enchey Monastery
    4: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Tashiding Monastery
    5: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Dubdi Monastery
    6: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Ralang Monastery
    7: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Labrang Monastery
    8: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Phodong Monastery
    9: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Lingdum Monastery
    10: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Samdruptse Monastery
    11: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0", // Gonjang Monastery
    12: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=0&modestbranding=1&rel=0" // Sanghak Choeling Monastery
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!monastery) return null;

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
            className="relative w-full max-w-6xl aspect-video bg-gradient-to-br from-red-900/20 to-amber-900/20 rounded-3xl overflow-hidden border-2 border-yellow-400/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            ref={videoRef}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{monastery.name}</h3>
                  <p className="text-yellow-300">360° Virtual Experience</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 360 Video Player */}
            <div className="w-full h-full">
              <iframe
                src={video360Links[monastery.id]}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${monastery.name} 360° Tour`}
              />
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white hover:bg-yellow-700 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-white/80 text-sm">
                    <span className="text-yellow-300">{monastery.type}</span> • Est. {monastery.established}
                  </div>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Info Bar */}
              <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
                <p className="text-white/90 text-sm mb-2">{monastery.description}</p>
                <div className="flex items-center gap-6 text-xs text-white/70">
                  <span>Altitude: {monastery.altitude}</span>
                  <span>Distance: {monastery.distance}</span>
                  <span>Hours: {monastery.visitingHours}</span>
                </div>
              </div>
            </div>

            {/* 360° Indicator */}
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                360°
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}