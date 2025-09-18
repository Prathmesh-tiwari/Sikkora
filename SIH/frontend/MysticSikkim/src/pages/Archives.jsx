import { motion } from "framer-motion";
import { useState } from "react";
import { Book, Image, Video, Headphones, Download, Search, Filter, Play } from "lucide-react";

export default function Archives() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const archiveItems = [
    {
      id: 1,
      title: "History of Rumtek Monastery",
      type: "document",
      category: "history",
      description: "Complete historical documentation of Sikkim's largest monastery with rare photographs and manuscripts",
      image: "/images/rumtek.jpg",
      size: "2.5 MB",
      duration: null,
      downloadable: true,
      content: "Rumtek Monastery, also known as the Dharma Chakra Centre, was built in the 1960s under the direction of the 16th Karmapa, Rangjung Rigpe Dorje. This magnificent monastery serves as the main seat of the Karma Kagyu lineage in exile and is an exact replica of the original Tsurphu Monastery in Tibet. The monastery houses precious relics including the Black Crown of the Karmapa, ancient manuscripts, and sacred statues. The main shrine hall features intricate Tibetan architecture with colorful murals depicting Buddhist deities and the life of Buddha. The monastery complex includes meditation halls, a library, a museum, and residential quarters for monks. Daily rituals include morning and evening prayers, butter lamp offerings, and meditation sessions. The monastery is famous for its annual festivals including Losar (Tibetan New Year) and the sacred Cham dance performances.",
      detailedHistory: "The construction of Rumtek began in 1961 and was completed in 1966. The 16th Karmapa fled Tibet in 1959 and was offered refuge in Sikkim by the Chogyal (King) Tashi Namgyal. The monastery was built with donations from devotees worldwide and represents the continuation of the Karma Kagyu lineage outside Tibet. The monastery has faced political challenges regarding the recognition of the 17th Karmapa, but continues to serve as an important center for Buddhist learning and practice.",
      architecture: "The monastery follows traditional Tibetan architecture with a three-story main building. The ground floor houses the main shrine hall with a 16-foot statue of Buddha Shakyamuni. The second floor contains the Karmapa's throne and private chambers. The third floor serves as a meditation hall and library. The exterior features traditional Tibetan design elements including golden roofs, colorful prayer flags, and intricate woodwork.",
      culturalSignificance: "Rumtek is considered one of the most important monasteries outside Tibet. It serves as a bridge between traditional Tibetan Buddhism and the modern world. The monastery has trained hundreds of monks and has established centers worldwide. It plays a crucial role in preserving Tibetan Buddhist culture and teachings.",
      images: ["/images/rumtek.jpg", "/images/rumtek.jpg", "/images/rumtek.jpg"],
      festivals: ["Losar (Tibetan New Year)", "Saga Dawa", "Cham Dance Festival", "Butter Lamp Festival"],
      dailySchedule: "4:30 AM - Morning prayers, 6:00 AM - Meditation, 8:00 AM - Breakfast, 10:00 AM - Study sessions, 12:00 PM - Lunch, 2:00 PM - Debate sessions, 6:00 PM - Evening prayers, 8:00 PM - Rest",
      fileUrl: "#rumtek-history"
    },
    {
      id: 2,
      title: "360° Cham Dance Performance",
      type: "360video",
      category: "culture",
      description: "Immersive 360° view of traditional masked dance from Enchey Monastery festival",
      image: "/images/enchey.jpg",
      size: "145 MB",
      duration: "12:30",
      downloadable: true,
      content: "Experience the sacred Cham dance in full 360° immersion as monks perform this ancient ritual dance wearing elaborate masks and colorful costumes. The Cham dance is a form of meditation in motion, representing the victory of good over evil. Each movement has symbolic meaning, and the dance serves to purify the environment and bring blessings to all beings. The 360° experience allows you to witness every detail of this sacred performance, from the intricate mask designs to the rhythmic movements of the dancers. The dance is accompanied by traditional Tibetan instruments including long horns, drums, and cymbals. This immersive experience captures the spiritual energy and cultural richness of this ancient Buddhist tradition.",
      performance: "The Cham dance is performed during major Buddhist festivals, particularly during Pang Lhabsol in Sikkim. The dancers, who are trained monks, undergo years of preparation to master the complex choreography. Each mask represents different Buddhist deities, demons, or protective spirits. The dance serves multiple purposes: spiritual purification, entertainment, and cultural preservation.",
      masks: "The masks used in Cham dance are works of art, hand-carved and painted by skilled artisans. Each mask has specific colors and features that represent different aspects of Buddhist cosmology. The masks are considered sacred and are blessed before each performance.",
      music: "Traditional Tibetan instruments accompany the dance, creating a hypnotic rhythm that enhances the spiritual atmosphere. The music includes deep horn sounds, rhythmic drumming, and the clash of cymbals, all synchronized with the dancers' movements.",
      fileUrl: "#cham-dance-360"
    },
    {
      id: 3,
      title: "Buddhist Chanting Audio Collection",
      type: "audio",
      category: "spiritual",
      description: "Morning prayers and mantras from Pemayangtse Monastery in multiple languages",
      image: "/images/pemayagtse.jpg",
      size: "18 MB",
      duration: "45:30",
      downloadable: true,
      content: "Sacred Buddhist chants and prayers recorded at dawn in the serene atmosphere of Pemayangtse Monastery. These ancient mantras have been passed down through generations of monks and carry profound spiritual significance. The collection includes morning prayers (Shakyamuni Buddha prayers), Tara mantras for protection and compassion, Medicine Buddha mantras for healing, Guru Rinpoche mantras for spiritual transformation, and evening dedication prayers. Each chant is performed in traditional Tibetan style with proper pronunciation and rhythm. The recordings capture the natural acoustics of the monastery halls, creating an authentic spiritual experience. These chants are used for meditation, healing, and spiritual practice by Buddhists worldwide.",
      mantras: ["Om Mani Padme Hum (Compassion)", "Om Tare Tuttare Ture Soha (Protection)", "Tayata Om Bekandze Bekandze Maha Bekandze (Healing)", "Om Ah Hum Vajra Guru Padma Siddhi Hum (Transformation)"],
      benefits: "Regular listening to these chants can reduce stress, improve concentration, promote inner peace, enhance spiritual awareness, and create positive mental states. The vibrations of these sacred sounds are believed to purify negative karma and bring blessings.",
      usage: "These recordings can be used for daily meditation practice, background music for yoga or relaxation, spiritual ceremonies, or simply for creating a peaceful atmosphere at home.",
      fileUrl: "#buddhist-chanting"
    },
    {
      id: 4,
      title: "Ancient Murals 360° Gallery",
      type: "360gallery",
      category: "art",
      description: "Interactive 360° exploration of monastery wall paintings and sacred art",
      image: "/images/tashiding.jpg",
      size: "85 MB",
      duration: null,
      downloadable: true,
      content: "Explore ancient Buddhist murals in stunning 360° detail, revealing centuries-old artwork that adorns the walls of Sikkim's sacred monasteries. These murals depict the life of Buddha, various Buddhist deities, the Wheel of Life (Bhavachakra), Jataka tales (stories of Buddha's previous lives), and Tibetan Buddhist cosmology. The 360° gallery allows you to examine every brushstroke and symbolic detail of these masterpieces. The murals were created using traditional techniques with natural pigments and gold leaf, ensuring their vibrant colors have lasted for centuries. Each mural tells a story and serves as a teaching tool for Buddhist philosophy and practice.",
      artisticTechniques: "The murals were created using traditional Tibetan painting techniques called 'thangka' style. Artists used natural pigments made from minerals, plants, and precious stones. Gold and silver were used for highlighting important figures and creating luminous effects.",
      symbolism: "Every element in the murals has symbolic meaning. Colors represent different aspects of enlightenment, hand gestures (mudras) convey specific meanings, and the positioning of figures follows strict iconographic rules established over centuries.",
      preservation: "These ancient artworks face challenges from humidity, temperature changes, and age. Conservation efforts are ongoing to preserve these cultural treasures for future generations using modern techniques while respecting traditional methods.",
      fileUrl: "#murals-360"
    },
    {
      id: 5,
      title: "Monastery Architecture VR Guide",
      type: "document",
      category: "architecture",
      description: "Comprehensive study of Tibetan Buddhist architecture with 3D models and blueprints",
      image: "/images/rumtek.jpg",
      size: "12.8 MB",
      duration: null,
      downloadable: true,
      content: "Comprehensive architectural analysis of Sikkimese monasteries showcasing the unique blend of Tibetan, Nepalese, and local Lepcha architectural styles. This guide covers structural elements including foundation techniques adapted to Himalayan terrain, traditional timber frame construction methods, roof designs that withstand heavy snowfall, ventilation systems for high-altitude conditions, and earthquake-resistant building techniques. The document includes detailed blueprints, 3D models, construction materials analysis, and comparative studies with Tibetan monasteries. Special attention is given to the symbolic aspects of monastery architecture, where every element from the orientation to the decorative details has spiritual significance.",
      constructionMethods: "Traditional monasteries use stone foundations, wooden frames, and clay brick walls. The construction follows ancient techniques passed down through generations of master builders. No nails are used in the wooden joints, relying instead on precise carpentry and wooden pegs.",
      materials: "Local materials include stone from nearby quarries, timber from Himalayan forests (mainly deodar and pine), clay for bricks and plaster, and slate for roofing. Decorative elements use gold leaf, natural pigments, and precious stones.",
      spiritualAspects: "The architecture follows Vastu principles and Buddhist cosmology. The main hall represents the universe, with the central Buddha statue as Mount Meru (the cosmic mountain). The layout facilitates meditation and spiritual practice.",
      fileUrl: "#architecture-guide"
    },
    {
      id: 6,
      title: "Festival Celebrations 360° Experience",
      type: "360video",
      category: "culture",
      description: "Immersive 360° coverage of Losar, Bumchu, and Pang Lhabsol festivals",
      image: "/images/pemayagtse.jpg",
      size: "267 MB",
      duration: "28:45",
      downloadable: true,
      content: "Experience Sikkimese festivals like never before through immersive 360° coverage of Losar (Tibetan New Year), Bumchu (Sacred Water Ceremony), and Pang Lhabsol (Guardian Deity Festival). This comprehensive documentation captures the vibrant colors, traditional costumes, sacred rituals, community participation, and spiritual atmosphere of these ancient celebrations. The 360° experience includes ceremonial preparations, ritual performances, traditional music and dance, community feasts, and the deep spiritual significance behind each festival. Witness how these festivals strengthen community bonds, preserve cultural traditions, and maintain the spiritual connection between the people and their heritage.",
      festivals: {
        losar: "Tibetan New Year celebrated with family gatherings, traditional foods, monastery visits, and prayers for the coming year. The celebration lasts for 15 days with different rituals each day.",
        bumchu: "Sacred water ceremony at Tashiding Monastery where holy water is distributed to predict the year's fortune. The water level in the sacred pot indicates prosperity or challenges ahead.",
        pangLhabsol: "Festival honoring Mount Kanchenjunga and the guardian deities of Sikkim. Features elaborate Cham dances, traditional archery, and community celebrations."
      },
      culturalImpact: "These festivals play a crucial role in preserving Sikkimese culture, strengthening community bonds, and passing traditions to younger generations. They also attract tourists, contributing to the local economy while sharing cultural heritage with the world.",
      fileUrl: "#festivals-360"
    },
    {
      id: 7,
      title: "Sacred Relics Documentation",
      type: "gallery",
      category: "history",
      description: "High-resolution images of ancient Buddhist artifacts and sacred objects",
      image: "/images/dubdi.jpg",
      size: "25 MB",
      duration: null,
      downloadable: true,
      content: "Rare collection of sacred Buddhist relics and artifacts including ancient statues, ritual objects, manuscripts, thangka paintings, and personal belongings of great masters. This comprehensive documentation features the Black Crown of the Karmapa, ancient Buddha statues made of precious metals, hand-written manuscripts on palm leaves, ritual implements used in ceremonies, traditional musical instruments, prayer wheels and malas, sacred masks used in Cham dances, and historical photographs of great lamas. Each artifact is accompanied by detailed descriptions of its history, significance, and cultural importance. The collection represents centuries of Buddhist heritage and provides insight into the spiritual practices and artistic achievements of Himalayan Buddhism.",
      artifacts: {
        blackCrown: "The sacred Black Crown of the Karmapa, made from the hair of dakinis (female Buddhist deities) and worn during special ceremonies to benefit all beings.",
        manuscripts: "Ancient texts written on palm leaves and traditional paper, containing Buddhist teachings, prayers, and philosophical treatises in Tibetan script.",
        statues: "Buddha statues and deity figures made from bronze, gold, and silver, some dating back several centuries and blessed by great masters.",
        ritualObjects: "Vajras (thunderbolt scepters), bells, offering bowls, and other implements used in Buddhist ceremonies and meditation practices."
      },
      preservation: "These precious artifacts are carefully preserved using climate-controlled environments, traditional conservation methods, and modern preservation techniques to ensure they remain intact for future generations.",
      fileUrl: "#sacred-relics"
    },
    {
      id: 8,
      title: "Meditation Guidance Audio",
      type: "audio",
      category: "spiritual",
      description: "Guided meditation sessions by senior monks in English, Hindi, Nepali, and Bhutia",
      image: "/images/ralang.jpg",
      size: "32 MB",
      duration: "60:00",
      downloadable: true,
      content: "Learn authentic Buddhist meditation techniques through guided sessions led by senior monks from Sikkim's monasteries. This comprehensive audio guide covers Shamatha (calm abiding meditation), Vipassana (insight meditation), Loving-kindness meditation, Tonglen (giving and receiving), Mahamudra (great seal meditation), and Dzogchen (great perfection). Each technique is explained in detail with step-by-step instructions, proper posture guidance, breathing techniques, and methods for dealing with common obstacles. The sessions are available in multiple languages and include both beginner and advanced practices. The teachings are based on centuries-old traditions passed down through lineages of realized masters.",
      techniques: {
        shamatha: "Concentration meditation focusing on a single object (usually the breath) to develop mental stability and clarity.",
        vipassana: "Insight meditation that develops wisdom by observing the true nature of mind and phenomena.",
        lovingKindness: "Meditation to cultivate unconditional love and compassion for all beings.",
        tonglen: "Advanced practice of taking on others' suffering and giving happiness, developing ultimate compassion."
      },
      benefits: "Regular meditation practice reduces stress and anxiety, improves concentration and memory, develops emotional stability, increases compassion and wisdom, and leads to greater life satisfaction and inner peace.",
      guidance: "Each session includes preliminary instructions, the main meditation practice, and concluding dedication. Practitioners are guided through common challenges and provided with methods to deepen their practice.",
      fileUrl: "#meditation-guide"
    }
  ];

  const categories = [
    { id: "all", name: "All Archives", icon: Book },
    { id: "history", name: "History", icon: Book },
    { id: "culture", name: "Culture", icon: Video },
    { id: "spiritual", name: "Spiritual", icon: Headphones },
    { id: "art", name: "Art", icon: Image },
    { id: "architecture", name: "Architecture", icon: Book }
  ];

  const typeIcons = {
    document: Book,
    video: Video,
    '360video': Video,
    audio: Headphones,
    gallery: Image,
    '360gallery': Image
  };

  const downloadFile = (item) => {
    // Create downloadable content
    const content = {
      title: item.title,
      description: item.description,
      content: item.content,
      metadata: {
        size: item.size,
        duration: item.duration,
        category: item.category,
        downloadDate: new Date().toISOString()
      }
    };
    
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const [selectedContent, setSelectedContent] = useState(null);

  const viewContent = (item) => {
    setSelectedContent(item);
  };

  const closeContentViewer = () => {
    setSelectedContent(null);
  };

  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent">
            Cultural Archives
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
            Explore Sikkim's rich heritage through our comprehensive digital archive of documents, videos, audio recordings, and images
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="relative max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50" />
          <input
            type="text"
            placeholder="Search archives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-md border-2 border-yellow-400/30 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-yellow-400/60"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-5 h-5" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Archives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const TypeIcon = typeIcons[item.type];
            return (
              <motion.div
                key={item.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full">
                    <TypeIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-white text-sm capitalize">{item.type}</span>
                  </div>

                  {/* Play Button for Media */}
                  {(item.type === 'video' || item.type === 'audio') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>{item.size}</span>
                      {item.duration && <span>{item.duration}</span>}
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-400/30 rounded-full text-xs text-yellow-300 capitalize">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => viewContent(item)}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {item.type.includes('360') ? '360° View' : 'View'}
                    </button>
                    {item.downloadable && (
                      <button 
                        onClick={() => downloadFile(item)}
                        className="px-4 py-3 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Book className="w-16 h-16 text-yellow-400/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white/70 mb-2">No archives found</h3>
            <p className="text-white/50">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Content Viewer Modal */}
        {selectedContent && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={closeContentViewer}
          >
            <motion.div
              className="bg-gradient-to-br from-red-900 to-amber-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-yellow-300">{selectedContent.title}</h2>
                  <button
                    onClick={closeContentViewer}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                {/* Content Display */}
                {selectedContent.type === '360video' && (
                  <div className="space-y-6 mb-6">
                    <div className="relative">
                      <iframe
                        className="w-full h-96 rounded-2xl"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="360° Virtual Experience"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 rounded-full px-4 py-2 text-white text-sm">
                        🔄 360° Experience - Use controls to navigate
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white/10 rounded-2xl">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3">About This Experience</h4>
                      <p className="text-white/80 leading-relaxed mb-4">{selectedContent.content}</p>
                      
                      {selectedContent.performance && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-white mb-2">Performance Details</h5>
                          <p className="text-white/70 text-sm">{selectedContent.performance}</p>
                        </div>
                      )}
                      
                      {selectedContent.masks && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-white mb-2">Sacred Masks</h5>
                          <p className="text-white/70 text-sm">{selectedContent.masks}</p>
                        </div>
                      )}
                      
                      {selectedContent.music && (
                        <div>
                          <h5 className="font-semibold text-white mb-2">Traditional Music</h5>
                          <p className="text-white/70 text-sm">{selectedContent.music}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedContent.type === '360gallery' && (
                  <div className="space-y-6 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="relative group">
                          <img 
                            src={selectedContent.image}
                            alt={`Gallery ${i}`}
                            className="w-full h-32 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <span className="text-white text-sm">🔄 360° View</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-6 bg-white/10 rounded-2xl">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3">Ancient Art Gallery</h4>
                      <p className="text-white/80 leading-relaxed mb-4">{selectedContent.content}</p>
                      
                      {selectedContent.artisticTechniques && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-white mb-2">Artistic Techniques</h5>
                          <p className="text-white/70 text-sm">{selectedContent.artisticTechniques}</p>
                        </div>
                      )}
                      
                      {selectedContent.symbolism && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-white mb-2">Symbolism & Meaning</h5>
                          <p className="text-white/70 text-sm">{selectedContent.symbolism}</p>
                        </div>
                      )}
                      
                      {selectedContent.preservation && (
                        <div>
                          <h5 className="font-semibold text-white mb-2">Preservation Efforts</h5>
                          <p className="text-white/70 text-sm">{selectedContent.preservation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedContent.type === 'audio' && (
                  <div className="space-y-6 mb-6">
                    <div className="p-6 bg-white/10 rounded-2xl">
                      <audio controls className="w-full mb-4">
                        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
                        Your browser does not support audio playback.
                      </audio>
                      
                      <h4 className="text-lg font-bold text-yellow-300 mb-3">Sacred Audio Collection</h4>
                      <p className="text-white/80 leading-relaxed mb-4">{selectedContent.content}</p>
                      
                      {selectedContent.mantras && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-white mb-2">Featured Mantras</h5>
                          <ul className="text-white/70 text-sm space-y-1">
                            {selectedContent.mantras.map((mantra, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                {mantra}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedContent.benefits && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-white mb-2">Spiritual Benefits</h5>
                          <p className="text-white/70 text-sm">{selectedContent.benefits}</p>
                        </div>
                      )}
                      
                      {selectedContent.usage && (
                        <div>
                          <h5 className="font-semibold text-white mb-2">How to Use</h5>
                          <p className="text-white/70 text-sm">{selectedContent.usage}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedContent.type === 'document' && (
                  <div className="mb-6 space-y-6">
                    <div className="p-6 bg-white/10 rounded-2xl">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3">Overview</h4>
                      <p className="text-white/80 leading-relaxed">{selectedContent.content}</p>
                    </div>
                    
                    {selectedContent.detailedHistory && (
                      <div className="p-6 bg-white/10 rounded-2xl">
                        <h4 className="text-lg font-bold text-yellow-300 mb-3">Historical Background</h4>
                        <p className="text-white/80 leading-relaxed">{selectedContent.detailedHistory}</p>
                      </div>
                    )}
                    
                    {selectedContent.architecture && (
                      <div className="p-6 bg-white/10 rounded-2xl">
                        <h4 className="text-lg font-bold text-yellow-300 mb-3">Architecture & Design</h4>
                        <p className="text-white/80 leading-relaxed">{selectedContent.architecture}</p>
                      </div>
                    )}
                    
                    {selectedContent.culturalSignificance && (
                      <div className="p-6 bg-white/10 rounded-2xl">
                        <h4 className="text-lg font-bold text-yellow-300 mb-3">Cultural Significance</h4>
                        <p className="text-white/80 leading-relaxed">{selectedContent.culturalSignificance}</p>
                      </div>
                    )}
                    
                    {selectedContent.festivals && (
                      <div className="p-6 bg-white/10 rounded-2xl">
                        <h4 className="text-lg font-bold text-yellow-300 mb-3">Festivals & Celebrations</h4>
                        {Array.isArray(selectedContent.festivals) ? (
                          <ul className="text-white/80 space-y-2">
                            {selectedContent.festivals.map((festival, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                {festival}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-white/80 leading-relaxed">{selectedContent.festivals}</p>
                        )}
                      </div>
                    )}
                    
                    {selectedContent.dailySchedule && (
                      <div className="p-6 bg-white/10 rounded-2xl">
                        <h4 className="text-lg font-bold text-yellow-300 mb-3">Daily Schedule</h4>
                        <p className="text-white/80 leading-relaxed">{selectedContent.dailySchedule}</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                    <p className="text-white/80">{selectedContent.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Details</h3>
                    <div className="space-y-2 text-white/70">
                      <p>Size: {selectedContent.size}</p>
                      {selectedContent.duration && <p>Duration: {selectedContent.duration}</p>}
                      <p>Category: {selectedContent.category}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => downloadFile(selectedContent)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Content
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Download All Section */}
        <motion.div
          className="mt-16 p-8 bg-gradient-to-r from-yellow-600/10 to-amber-600/10 backdrop-blur-md rounded-3xl border-2 border-yellow-400/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">Offline Archive Package</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Download the complete SIKKORA archive package for offline access to all cultural content, 
            perfect for remote areas with limited connectivity.
          </p>
          <button 
            onClick={() => {
              const completeArchive = {
                title: "SIKKORA Complete Archive",
                items: archiveItems,
                downloadDate: new Date().toISOString(),
                totalSize: "850 MB",
                description: "Complete offline archive of Sikkim's cultural heritage"
              };
              const blob = new Blob([JSON.stringify(completeArchive, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'SIKKORA_Complete_Archive.json';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-3 mx-auto"
          >
            <Download className="w-6 h-6" />
            Download Complete Archive (850 MB)
          </button>
        </motion.div>
      </div>
    </div>
  );
}