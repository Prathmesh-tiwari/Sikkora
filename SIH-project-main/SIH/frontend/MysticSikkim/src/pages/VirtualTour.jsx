import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Languages, MapPin, Clock, Users } from "lucide-react";

export default function VirtualTour() {
  const [selectedMonastery, setSelectedMonastery] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      title: "The Dharma Chakra Centre",
      image: "/images/rumtek.jpg",
      description: "The largest monastery in Sikkim, Rumtek is the seat of the Karmapa and a center of the Kagyu lineage of Tibetan Buddhism.",
      established: "1966",
      visitors: "50,000+ annually",
      highlights: ["Golden Stupa", "Prayer Wheels", "Monastery Museum", "Sacred Relics"],
      audioGuide: "Available in 4 languages with premium narration"
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      title: "Perfect Sublime Lotus",
      image: "/images/pemayagtse.jpg",
      description: "One of the oldest and most important monasteries in Sikkim, built for the 'ta-tshang' (pure monks) of the Nyingma order.",
      established: "1705",
      visitors: "30,000+ annually",
      highlights: ["Wooden Sculpture", "Ancient Murals", "Sacred Texts", "Mountain Views"],
      audioGuide: "Detailed historical commentary with cultural insights"
    },
    {
      id: 3,
      name: "Enchey Monastery",
      title: "The Solitary Temple",
      image: "/images/enchey.jpg",
      description: "Built on the site blessed by Lama Druptob Karpo, this monastery is famous for its annual Cham dance during Pang Lhabsol.",
      established: "1909",
      visitors: "25,000+ annually",
      highlights: ["Cham Dance Ground", "Prayer Hall", "Sacred Masks", "City Views"],
      audioGuide: "Interactive tour with dance demonstrations"
    },
    {
      id: 4,
      name: "Tashiding Monastery",
      title: "The Devoted Central Glory",
      image: "/images/tashiding.jpg",
      description: "Located on a hilltop between Rathong and Rangeet rivers, it's considered the holiest monastery in Sikkim.",
      established: "1717",
      visitors: "40,000+ annually",
      highlights: ["Sacred Chorten", "Holy Water", "Bumchu Festival", "Panoramic Views"],
      audioGuide: "Spiritual journey with meditation guidance"
    }
  ];

  const languages = {
    en: "English",
    hi: "हिंदी", 
    ne: "नेपाली",
    bh: "भूटिया"
  };

  const currentMonastery = monasteries[selectedMonastery];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <img 
          src={currentMonastery.image}
          alt={currentMonastery.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Premium Overlay Effects */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.h1 
            className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent premium-text-glow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Virtual Heritage Tours
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Immerse yourself in Sikkim's sacred monasteries through premium 360° virtual tours, 
            professional narration, and interactive cultural experiences.
          </motion.p>

          {/* Tour Controls */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isPlaying ? 'Pause Tour' : 'Start Virtual Tour'}
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-yellow-400/30 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              Audio
            </button>
            
            <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-yellow-400/30 rounded-full">
              <Languages className="w-5 h-5" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white focus:outline-none"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code} className="bg-red-900 text-white">
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monastery Selection */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your Sacred Journey
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {monasteries.map((monastery, index) => (
              <motion.div
                key={monastery.id}
                className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ${
                  selectedMonastery === index 
                    ? 'ring-4 ring-yellow-400 scale-105 shadow-2xl shadow-yellow-400/25' 
                    : 'hover:scale-102'
                }`}
                onClick={() => setSelectedMonastery(index)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <img 
                  src={monastery.image}
                  alt={monastery.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-lg mb-2">{monastery.name}</h3>
                  <p className="text-yellow-200 text-sm mb-3">{monastery.title}</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full" />
                </div>
                {selectedMonastery === index && (
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Play className="w-4 h-4 text-black" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monastery Details */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-950/60 to-amber-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={selectedMonastery}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-4xl font-bold text-yellow-300 mb-4">{currentMonastery.name}</h2>
              <h3 className="text-2xl text-white/80 mb-6">{currentMonastery.title}</h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8">{currentMonastery.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-md">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-sm text-white/60">Established</p>
                    <p className="text-white font-semibold">{currentMonastery.established}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-md">
                  <Users className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-sm text-white/60">Annual Visitors</p>
                    <p className="text-white font-semibold">{currentMonastery.visitors}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-md">
                  <Volume2 className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-sm text-white/60">Audio Guide</p>
                    <p className="text-white font-semibold">Premium</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-yellow-300 mb-4">Tour Highlights</h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentMonastery.highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      className="flex items-center gap-2 text-white/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
                      {highlight}
                    </motion.div>
                  ))}
                </div>
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
                Start Premium Tour Experience
              </button>
            </div>

            <div className="relative">
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={currentMonastery.image}
                  alt={currentMonastery.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-yellow-200 text-sm mb-2">{currentMonastery.audioGuide}</p>
                </div>
                
                {/* Virtual Tour Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1 }}
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
                    <Maximize className="w-8 h-8 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}