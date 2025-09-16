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
      description: "Complete historical documentation of Sikkim's largest monastery",
      image: "/images/rumtek.jpg",
      size: "2.5 MB",
      duration: null,
      downloadable: true
    },
    {
      id: 2,
      title: "Cham Dance Performance",
      type: "video",
      category: "culture",
      description: "Traditional masked dance from Enchey Monastery festival",
      image: "/images/enchey.jpg",
      size: "45 MB",
      duration: "12:30",
      downloadable: true
    },
    {
      id: 3,
      title: "Buddhist Chanting Audio",
      type: "audio",
      category: "spiritual",
      description: "Morning prayers from Pemayangtse Monastery",
      image: "/images/pemayagtse.jpg",
      size: "8 MB",
      duration: "25:45",
      downloadable: true
    },
    {
      id: 4,
      title: "Ancient Murals Gallery",
      type: "gallery",
      category: "art",
      description: "High-resolution images of monastery wall paintings",
      image: "/images/tashiding.jpg",
      size: "15 MB",
      duration: null,
      downloadable: true
    },
    {
      id: 5,
      title: "Monastery Architecture Guide",
      type: "document",
      category: "architecture",
      description: "Detailed study of Tibetan Buddhist architecture in Sikkim",
      image: "/images/rumtek.jpg",
      size: "5.2 MB",
      duration: null,
      downloadable: true
    },
    {
      id: 6,
      title: "Festival Celebrations",
      type: "video",
      category: "culture",
      description: "Losar and Bumchu festival celebrations",
      image: "/images/pemayagtse.jpg",
      size: "67 MB",
      duration: "18:20",
      downloadable: true
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
    audio: Headphones,
    gallery: Image
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
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      View
                    </button>
                    {item.downloadable && (
                      <button className="px-4 py-3 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center justify-center">
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
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-3 mx-auto">
            <Download className="w-6 h-6" />
            Download Complete Archive (250 MB)
          </button>
        </motion.div>
      </div>
    </div>
  );
}