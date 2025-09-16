import { motion } from "framer-motion";
import { Mountain, Globe, Wifi, WifiOff, Languages, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);

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

  const languages = {
    en: { name: 'English', subtitle: 'Discover the Sacred Land of the Himalayas' },
    hi: { name: 'हिंदी', subtitle: 'हिमालय की पवित्र भूमि की खोज करें' },
    ne: { name: 'नेपाली', subtitle: 'हिमालयको पवित्र भूमिको खोज गर्नुहोस्' },
    bh: { name: 'भूटिया', subtitle: 'Discover the Sacred Land of the Himalayas' }
  };

  const sikkimImages = [
    { src: '/images/rumtek.jpg', title: 'Rumtek Monastery', desc: 'The Dharma Chakra Centre' },
    { src: '/images/pemayagtse.jpg', title: 'Pemayangtse Monastery', desc: 'Perfect Sublime Lotus' },
    { src: '/images/enchey.jpg', title: 'Enchey Monastery', desc: 'The Solitary Temple' },
    { src: '/images/tashiding.jpg', title: 'Tashiding Monastery', desc: 'The Devoted Central Glory' }
  ];

  const startNarration = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Create audio narration
      const utterance = new SpeechSynthesisUtterance(
        `Welcome to SIKKORA, your premium guide to Sikkim's sacred heritage. 
        Discover ancient monasteries, rich Buddhist culture, and breathtaking Himalayan landscapes. 
        Our offline-enabled platform provides multi-language narration and immersive virtual tours 
        of Rumtek, Pemayangtse, Enchey, and Tashiding monasteries. 
        Experience the spiritual journey of Sikkim's sacred sites with professional audio guides 
        available in English, Hindi, Nepali, and Bhutia languages.`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Sikkim Background */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-amber-800/80 to-yellow-700/70" />
        <img 
          src="/sikkim_bg.webp" 
          alt="Sikkim Mountains" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        
        {/* Premium Golden Particles */}
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

        {/* Status Indicators */}
        <motion.div 
          className={`absolute top-24 right-6 px-6 py-3 rounded-full backdrop-blur-md border-2 ${
            isOffline ? 'bg-red-500/20 border-red-400/50' : 'bg-green-500/20 border-green-400/50'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            {isOffline ? <WifiOff className="w-5 h-5 text-red-300" /> : <Wifi className="w-5 h-5 text-green-300" />}
            <span className="text-white font-medium">
              {isOffline ? 'Offline Mode Active' : 'Online'}
            </span>
          </div>
        </motion.div>

        {/* Language Selector */}
        <motion.div 
          className="absolute top-24 left-6 backdrop-blur-md bg-white/10 rounded-2xl border-2 border-yellow-400/30 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255,215,0,0.3)' }}
        >
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-yellow-400" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code} className="bg-red-900 text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Main Hero Content */}
        <motion.div 
          className="text-center z-10 px-6 max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent premium-text-glow"
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
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-4xl text-white/95 mb-6 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {languages[selectedLanguage].subtitle}
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-yellow-200/90 mb-12 font-medium max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Experience Sikkim's sacred monasteries with premium offline guides and multi-language narration
          </motion.p>

          {/* Audio Narration Control */}
          <motion.button
            onClick={startNarration}
            className="mb-12 px-10 py-5 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 rounded-full text-white font-bold text-lg shadow-2xl border-2 border-yellow-400/30"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 25px 50px rgba(255,215,0,0.4)',
              borderColor: 'rgba(255,215,0,0.8)'
            }}
            whileTap={{ scale: 0.95 }}
            animate={isPlaying ? { 
              boxShadow: [
                '0 0 20px rgba(255,215,0,0.5)',
                '0 0 40px rgba(255,215,0,0.8)',
                '0 0 20px rgba(255,215,0,0.5)'
              ]
            } : {}}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          >
            <div className="flex items-center gap-4">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              <span>{isPlaying ? 'Playing Audio Guide...' : 'Start Narrated Walkthrough'}</span>
            </div>
          </motion.button>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center items-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <NavLink to="/virtualtour">
              <motion.button 
                className="px-8 py-3 bg-white/15 backdrop-blur-md border-2 border-yellow-400/40 rounded-2xl text-white font-semibold hover:bg-white/25 transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,215,0,0.8)' }}
                whileTap={{ scale: 0.95 }}
              >
                🏛️ Explore Monasteries
              </motion.button>
            </NavLink>
            <NavLink to="/planner">
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold shadow-xl border-2 border-purple-400/50"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 20px 40px rgba(147,51,234,0.3)',
                  borderColor: 'rgba(147,51,234,1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                🧠 AI Smart Planner
              </motion.button>
            </NavLink>
            <NavLink to="/social">
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl text-white font-bold shadow-xl border-2 border-green-400/50"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 20px 40px rgba(34,197,94,0.3)',
                  borderColor: 'rgba(34,197,94,1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                👥 Join Community
              </motion.button>
            </NavLink>
            <NavLink to="/services">
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white font-bold shadow-xl border-2 border-blue-400/50"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 20px 40px rgba(59,130,246,0.3)',
                  borderColor: 'rgba(59,130,246,1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                🛎️ Premium Services
              </motion.button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Monasteries Gallery */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-red-950/30">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Sacred Monasteries of Sikkim
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {sikkimImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900/30 to-amber-900/30 backdrop-blur-sm border-2 border-yellow-400/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: '0 25px 50px rgba(255,215,0,0.2)',
                borderColor: 'rgba(255,215,0,0.5)'
              }}
            >
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                <p className="text-yellow-200 text-sm mb-3">{image.desc}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Offline Features Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-red-950/60 to-amber-950/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-5xl font-bold mb-8 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Premium Features for Remote Exploration
          </motion.h2>
          <motion.p 
            className="text-2xl text-white/80 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Experience the complete cultural journey even in the most remote areas of Sikkim, 
            with offline capabilities and multi-language narration.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: Globe, 
                title: 'Offline Mode', 
                desc: 'Complete monastery information, maps, and audio guides available without internet connection',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Languages, 
                title: 'Multi-Language Narration', 
                desc: 'Professional narrated walkthroughs in English, Hindi, Nepali, and Bhutia languages',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                icon: Mountain, 
                title: 'Cultural Immersion', 
                desc: 'Rich historical content, Buddhist teachings, and local traditions with premium audio quality',
                color: 'from-amber-500 to-orange-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(255,215,0,0.2)'
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}