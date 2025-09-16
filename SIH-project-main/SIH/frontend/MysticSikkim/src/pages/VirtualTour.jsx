import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Languages, MapPin, Clock, Users, Star, Download, Video, Globe, Camera, Phone } from "lucide-react";
import GoogleEarth360 from '../components/GoogleEarth360';

export default function VirtualTour() {
  const [selectedMonastery, setSelectedMonastery] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showPremiumTour, setShowPremiumTour] = useState(false);
  const [show360View, setShow360View] = useState(false);

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      title: "The Dharma Chakra Centre",
      image: "/images/rumtek.jpg",
      video: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      video360: "https://www.youtube.com/embed/2MpUj-Aua48",
      virtualTour360: "https://www.google.com/maps/embed?pb=!4v1609459200000!6m8!1m7!1sCAoSLEFGMVFpcE1NX1pIeUcwVkR6WjBjMkZuYjJSMGFHVnlhWFJoWjJVdVkyOXQ!2m2!1d27.3389!2d88.5583!3f0!4f0!5f0.7820865974627469",
      description: "The largest monastery in Sikkim, Rumtek is the seat of the Karmapa and a center of the Kagyu lineage of Tibetan Buddhism. Built in the 1960s, it houses precious relics and serves as the main seat of the Karma Kagyu lineage.",
      established: "1966",
      visitors: "50,000+ annually",
      highlights: ["Golden Stupa", "Prayer Wheels", "Monastery Museum", "Sacred Relics", "Karmapa's Throne", "Ancient Manuscripts"],
      audioGuide: "Available in 4 languages with premium narration",
      detailedInfo: {
        history: "Rumtek Monastery was built under the direction of the 16th Karmapa, Rangjung Rigpe Dorje, as the main seat of the Karma Kagyu lineage in exile. The monastery is an exact replica of the original Tsurphu Monastery in Tibet.",
        architecture: "The monastery features traditional Tibetan architecture with intricate woodwork, colorful murals, and golden roofs. The main shrine hall houses a magnificent statue of Buddha Shakyamuni.",
        significance: "As the seat of the Karmapa, Rumtek holds immense spiritual significance for Tibetan Buddhists worldwide. It serves as a center for Buddhist learning and meditation practices.",
        festivals: "Major festivals include Losar (Tibetan New Year), Saga Dawa, and the annual Cham dance performances during Tibetan calendar celebrations."
      }
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      title: "Perfect Sublime Lotus",
      image: "/images/pemayagtse.jpg",
      video: "https://www.youtube.com/embed/M7lc1UVf-VE",
      video360: "https://www.youtube.com/embed/hFZFjoX2cGg",
      virtualTour360: "https://www.google.com/maps/embed?pb=!4v1609459200000!6m8!1m7!1sCAoSLEFGMVFpcE1NX1pIeUcwVkR6WjBjMkZuYjJSMGFHVnlhWFJoWjJVdVkyOXQ!2m2!1d27.2167!2d88.2167!3f0!4f0!5f0.7820865974627469",
      description: "One of the oldest and most important monasteries in Sikkim, built for the 'ta-tshang' (pure monks) of the Nyingma order. It offers breathtaking views of the Kanchenjunga range and houses ancient artifacts.",
      established: "1705",
      visitors: "30,000+ annually",
      highlights: ["Wooden Sculpture", "Ancient Murals", "Sacred Texts", "Mountain Views", "Guru Rinpoche Statue", "Meditation Halls"],
      audioGuide: "Detailed historical commentary with cultural insights",
      detailedInfo: {
        history: "Founded by Lama Lhatsun Chempo, Pemayangtse was built to house only the 'ta-tshang' or pure monks of the Nyingma order. It played a crucial role in Sikkim's political and religious history.",
        architecture: "The three-story monastery features exquisite woodwork and houses a seven-tiered wooden sculpture depicting the heavenly palace of Guru Rinpoche, crafted by Dungzin Rimpoche.",
        significance: "Pemayangtse served as the headquarters of the Nyingma order in Sikkim and was closely associated with the Sikkimese royal family. The head lama traditionally served as the state oracle.",
        festivals: "The monastery celebrates Chaam dances during the 28th and 29th days of the 12th Tibetan month, attracting devotees from across the region."
      }
    },
    {
      id: 3,
      name: "Enchey Monastery",
      title: "The Solitary Temple",
      image: "/images/enchey.jpg",
      video: "https://www.youtube.com/embed/YQHsXMglC9A",
      video360: "https://www.youtube.com/embed/9bZkp7q19f0",
      virtualTour360: "https://www.google.com/maps/embed?pb=!4v1609459200000!6m8!1m7!1sCAoSLEFGMVFpcE1NX1pIeUcwVkR6WjBjMkZuYjJSMGFHVnlhWFJoWjJVdVkyOXQ!2m2!1d27.3314!2d88.6138!3f0!4f0!5f0.7820865974627469",
      description: "Built on the site blessed by Lama Druptob Karpo, this monastery is famous for its annual Cham dance during Pang Lhabsol. It offers panoramic views of Gangtok city and the surrounding mountains.",
      established: "1909",
      visitors: "25,000+ annually",
      highlights: ["Cham Dance Ground", "Prayer Hall", "Sacred Masks", "City Views", "Tantric Deities", "Prayer Flags"],
      audioGuide: "Interactive tour with dance demonstrations",
      detailedInfo: {
        history: "Enchey Monastery was established by Lama Druptob Karpo, who was believed to have the power to fly. The site was chosen for its spiritual significance and commanding views over Gangtok.",
        architecture: "The monastery follows traditional Sikkimese architecture with a blend of Tibetan and local influences. The main prayer hall houses statues of Buddha, Guru Rinpoche, and other Buddhist deities.",
        significance: "Enchey is particularly famous for its Cham dance performances during the Pang Lhabsol festival, which celebrates the guardian deities of Sikkim. The monastery serves as an important center for Nyingma teachings.",
        festivals: "The annual Pang Lhabsol festival in August/September features elaborate masked dances and attracts thousands of visitors. Other celebrations include Losar and Buddha Jayanti."
      }
    },
    {
      id: 4,
      name: "Tashiding Monastery",
      title: "The Devoted Central Glory",
      image: "/images/tashiding.jpg",
      video: "https://www.youtube.com/embed/adLGHcj_fmA",
      video360: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      virtualTour360: "https://www.google.com/maps/embed?pb=!4v1609459200000!6m8!1m7!1sCAoSLEFGMVFpcE1NX1pIeUcwVkR6WjBjMkZuYjJSMGFHVnlhWFJoWjJVdVkyOXQ!2m2!1d27.2833!2d88.2667!3f0!4f0!5f0.7820865974627469",
      description: "Located on a hilltop between Rathong and Rangeet rivers, it's considered the holiest monastery in Sikkim. The sacred Bumchu ceremony held here is believed to predict the year's fortune for Sikkim.",
      established: "1717",
      visitors: "40,000+ annually",
      highlights: ["Sacred Chorten", "Holy Water", "Bumchu Festival", "Panoramic Views", "Ancient Stupas", "Meditation Caves"],
      audioGuide: "Spiritual journey with meditation guidance",
      detailedInfo: {
        history: "Founded by Ngadak Sempa Chempo Phunshok Rigzing, Tashiding is built on a heart-shaped hill considered sacred by both Buddhists and Lepchas. Legend says that Guru Rinpoche blessed this site.",
        architecture: "The monastery complex includes the main temple, numerous chortens (stupas), and meditation retreats. The sacred Thongwa Rangdol chorten is believed to cleanse sins by mere sight.",
        significance: "Tashiding is revered as the holiest monastery in Sikkim. The annual Bumchu festival draws pilgrims from across the Himalayan region, and the sacred water ceremony is considered highly auspicious.",
        festivals: "The Bumchu festival on the 14th and 15th days of the first Tibetan month is the most important celebration, where sacred water is distributed to devotees as a blessing."
      }
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      title: "The First Monastery of Sikkim",
      image: "/images/dubdi.jpg",
      video: "https://www.youtube.com/embed/hFZFjoX2cGg",
      video360: "https://www.youtube.com/embed/2MpUj-Aua48",
      virtualTour360: "https://www.google.com/maps/embed?pb=!4v1609459200000!6m8!1m7!1sCAoSLEFGMVFpcE1NX1pIeUcwVkR6WjBjMkZuYjJSMGFHVnlhWFJoWjJVdVkyOXQ!2m2!1d27.2500!2d88.2500!3f0!4f0!5f0.7820865974627469",
      description: "The first monastery built in Sikkim, Dubdi holds immense historical significance as the foundation of Buddhism in the region. Built by Lhatsun Chempo, it marks the beginning of Sikkim's spiritual journey.",
      established: "1701",
      visitors: "15,000+ annually",
      highlights: ["Historical Significance", "Ancient Architecture", "Sacred Relics", "Meditation Caves", "Mountain Views", "Pilgrimage Site"],
      audioGuide: "Historical journey with spiritual insights",
      detailedInfo: {
        history: "Dubdi Monastery was the first monastery established in Sikkim by Lhatsun Chempo in 1701. It marked the beginning of Buddhism's formal establishment in Sikkim and served as the spiritual foundation for the kingdom.",
        architecture: "The monastery features traditional Sikkimese architecture with stone walls and wooden structures. Despite its age, it maintains the original design elements that reflect early Buddhist architectural principles in the region.",
        significance: "As the first monastery in Sikkim, Dubdi holds unparalleled historical importance. It represents the roots of Sikkimese Buddhism and the spiritual transformation of the region under the guidance of Lhatsun Chempo.",
        festivals: "The monastery celebrates traditional Buddhist festivals with special emphasis on commemorating Lhatsun Chempo's contributions to Sikkimese Buddhism."
      }
    },
    {
      id: 6,
      name: "Lingdum Monastery",
      title: "The Modern Spiritual Haven",
      image: "/images/lingdim.jpg",
      video: "https://www.youtube.com/embed/9bZkp7q19f0",
      video360: "https://www.youtube.com/embed/YQHsXMglC9A",
      virtualTour360: "https://www.google.com/maps/embed?pb=!4v1609459200000!6m8!1m7!1sCAoSLEFGMVFpcE1NX1pIeUcwVkR6WjBjMkZuYjJSMGFHVnlhWFJoWjJVdVkyOXQ!2m2!1d27.2800!2d88.5200!3f0!4f0!5f0.7820865974627469",
      description: "A relatively modern monastery that beautifully blends traditional Tibetan architecture with contemporary elements. Known for its peaceful ambiance and stunning valley views.",
      established: "1999",
      visitors: "20,000+ annually",
      highlights: ["Modern Architecture", "Valley Views", "Peaceful Environment", "Traditional Arts", "Meditation Programs", "Cultural Center"],
      audioGuide: "Contemporary Buddhist practices with traditional wisdom",
      detailedInfo: {
        history: "Lingdum Monastery is one of the newer monasteries in Sikkim, established in 1999. Despite its recent construction, it has quickly become an important center for Buddhist learning and meditation practices.",
        architecture: "The monastery showcases modern construction techniques while maintaining traditional Tibetan architectural elements. The buildings are designed to harmonize with the natural landscape and provide optimal conditions for meditation and study.",
        significance: "Lingdum represents the continuation of Buddhist tradition in modern times. It serves as a bridge between ancient wisdom and contemporary spiritual needs, attracting both traditional practitioners and modern seekers.",
        festivals: "The monastery hosts various Buddhist celebrations and also organizes modern spiritual programs, meditation retreats, and cultural events that appeal to diverse audiences."
      }
    }
  ];

  const languages = {
    en: { name: 'English', code: 'en-US' },
    hi: { name: 'हिंदी', code: 'hi-IN' }, 
    ne: { name: 'नेपाली', code: 'ne-NP' },
    bh: { name: 'भूटिया', code: 'en-US' } // Fallback to English for Bhutia
  };

  const currentMonastery = monasteries[selectedMonastery];

  const startAudioTour = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      
      let text = "";
      switch(selectedLanguage) {
        case 'hi':
          text = `नमस्ते! ${currentMonastery.name} में आपका स्वागत है। ${currentMonastery.description}`;
          break;
        case 'ne':
          text = `नमस्कार! ${currentMonastery.name} मा तपाईंलाई स्वागत छ। ${currentMonastery.description}`;
          break;
        default:
          text = `Welcome to ${currentMonastery.name}. ${currentMonastery.description}. This sacred monastery was established in ${currentMonastery.established} and welcomes over ${currentMonastery.visitors}. Key highlights include ${currentMonastery.highlights.join(', ')}.`;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languages[selectedLanguage].code;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = isMuted ? 0 : 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const downloadTourContent = () => {
    const tourData = {
      monastery: currentMonastery,
      language: selectedLanguage,
      timestamp: new Date().toISOString(),
      content: {
        images: [currentMonastery.image],
        audio: `${currentMonastery.name}_audio_${selectedLanguage}.mp3`,
        video: currentMonastery.video,
        information: currentMonastery.detailedInfo
      }
    };
    
    const blob = new Blob([JSON.stringify(tourData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentMonastery.name.replace(/\s+/g, '_')}_tour_content.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            professional multi-language narration, and interactive cultural experiences.
          </motion.p>

          {/* Tour Controls */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button
              onClick={startAudioTour}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isPlaying ? 'Pause Audio Tour' : 'Start Audio Tour'}
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
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code} className="bg-red-900 text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShow360View(true)}
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300"
            >
              <Globe className="w-5 h-5" />
              Google Earth 360°
            </button>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Detailed Monastery Information */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-950/60 to-amber-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={selectedMonastery}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-4xl font-bold text-yellow-300 mb-4">{currentMonastery.name}</h2>
              <h3 className="text-2xl text-white/80 mb-6">{currentMonastery.title}</h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8">{currentMonastery.description}</p>
              
              {/* Stats Grid */}
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
                    <p className="text-white font-semibold">4 Languages</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
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
                      <Star className="w-4 h-4 text-yellow-400" />
                      {highlight}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowPremiumTour(true)}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  Premium Tour Experience
                </button>
                <button 
                  onClick={downloadTourContent}
                  className="px-6 py-4 bg-white/10 border-2 border-yellow-400/30 rounded-2xl text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Content
                </button>
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={currentMonastery.image}
                  alt={currentMonastery.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-yellow-200 text-sm">{currentMonastery.audioGuide}</p>
                </div>
                
                {/* Virtual Tour Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    onClick={() => setShow360View(true)}
                    className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Maximize className="w-8 h-8 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Interactive Gallery */}
              <div className="bg-gradient-to-br from-yellow-600/20 to-amber-700/20 rounded-2xl p-6 border border-yellow-400/30">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Virtual Experience
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    className="p-4 bg-blue-600/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-600/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Interactive Map</span>
                  </motion.button>
                  <motion.button
                    className="p-4 bg-purple-600/20 border border-purple-400/30 rounded-xl text-purple-300 hover:bg-purple-600/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Photo Gallery</span>
                  </motion.button>
                  <motion.button
                    className="p-4 bg-green-600/20 border border-green-400/30 rounded-xl text-green-300 hover:bg-green-600/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Get Directions</span>
                  </motion.button>
                  <motion.button
                    className="p-4 bg-orange-600/20 border border-orange-400/30 rounded-xl text-orange-300 hover:bg-orange-600/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Contact Info</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Tour Modal */}
      {showPremiumTour && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowPremiumTour(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-red-900 to-amber-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold text-yellow-300 mb-6">Premium Heritage Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Historical Significance</h3>
                  <p className="text-white/80 mb-6">{currentMonastery.detailedInfo.history}</p>
                  
                  <h3 className="text-xl font-bold text-white mb-4">Architecture</h3>
                  <p className="text-white/80 mb-6">{currentMonastery.detailedInfo.architecture}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Cultural Significance</h3>
                  <p className="text-white/80 mb-6">{currentMonastery.detailedInfo.significance}</p>
                  
                  <h3 className="text-xl font-bold text-white mb-4">Festivals & Celebrations</h3>
                  <p className="text-white/80 mb-6">{currentMonastery.detailedInfo.festivals}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPremiumTour(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
              >
                Close Premium Tour
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Google Earth 360° View Modal */}
      {show360View && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShow360View(false)}
        >
          <motion.div
            className="relative w-full h-full max-w-7xl bg-gradient-to-br from-red-950 to-amber-900 rounded-3xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-bold text-lg">Google Earth 360° View</h3>
                  <p className="text-white/80 text-sm">{currentMonastery.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShow360View(false)}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Google Earth 360 Component */}
            <div className="h-full">
              <GoogleEarth360 />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}