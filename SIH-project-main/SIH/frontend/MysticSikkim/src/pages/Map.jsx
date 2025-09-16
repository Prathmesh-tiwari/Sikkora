import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Navigation, Wifi, WifiOff, Download, Search, Filter } from "lucide-react";

export default function Map() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      type: "Kagyu",
      lat: 27.3389,
      lng: 88.5583,
      description: "The largest monastery in Sikkim",
      image: "/images/rumtek.jpg",
      distance: "24 km from Gangtok",
      established: "1966"
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      type: "Nyingma",
      lat: 27.2167,
      lng: 88.2167,
      description: "One of the oldest monasteries",
      image: "/images/pemayagtse.jpg",
      distance: "110 km from Gangtok",
      established: "1705"
    },
    {
      id: 3,
      name: "Enchey Monastery",
      type: "Nyingma",
      lat: 27.3314,
      lng: 88.6138,
      description: "Famous for Cham dance",
      image: "/images/enchey.jpg",
      distance: "3 km from Gangtok",
      established: "1909"
    },
    {
      id: 4,
      name: "Tashiding Monastery",
      type: "Nyingma",
      lat: 27.2833,
      lng: 88.2667,
      description: "Holiest monastery in Sikkim",
      image: "/images/tashiding.jpg",
      distance: "40 km from Pelling",
      established: "1717"
    }
  ];

  const filteredMonasteries = monasteries.filter(monastery => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || monastery.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent">
            Interactive Map
          </h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8">
            Navigate Sikkim's sacred monasteries with offline maps and GPS guidance
          </p>

          {/* Offline Status */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md border-2 ${
            isOffline ? 'bg-red-500/20 border-red-400/50' : 'bg-green-500/20 border-green-400/50'
          }`}>
            {isOffline ? <WifiOff className="w-5 h-5 text-red-300" /> : <Wifi className="w-5 h-5 text-green-300" />}
            <span className="text-white font-medium">
              {isOffline ? 'Offline Maps Available' : 'Online Mode Active'}
            </span>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search monasteries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-yellow-400/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/60"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-12 pr-8 py-4 bg-white/10 backdrop-blur-md border-2 border-yellow-400/30 rounded-2xl text-white focus:outline-none focus:border-yellow-400/60"
            >
              <option value="all" className="bg-red-900">All Types</option>
              <option value="Kagyu" className="bg-red-900">Kagyu</option>
              <option value="Nyingma" className="bg-red-900">Nyingma</option>
            </select>
          </div>

          <button className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Offline Maps
          </button>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl border-2 border-yellow-400/20 overflow-hidden h-96 lg:h-[600px]">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-blue-900/50">
                <img 
                  src="/sikkim_bg.webp" 
                  alt="Sikkim Map" 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              
              {/* Map Markers */}
              {filteredMonasteries.map((monastery, index) => (
                <motion.div
                  key={monastery.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedMonastery(monastery)}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <Navigation className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  +
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  -
                </button>
              </div>
            </div>
          </div>

          {/* Monastery List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-300 mb-6">Sacred Locations</h3>
            {filteredMonasteries.map((monastery, index) => (
              <motion.div
                key={monastery.id}
                className={`p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedMonastery?.id === monastery.id 
                    ? 'border-yellow-400/60 bg-yellow-400/10' 
                    : 'border-yellow-400/20 hover:border-yellow-400/40'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMonastery(monastery)}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={monastery.image}
                  alt={monastery.name}
                  className="w-full h-32 object-cover rounded-xl mb-4"
                />
                <h4 className="text-lg font-bold text-white mb-2">{monastery.name}</h4>
                <p className="text-yellow-300 text-sm mb-2">{monastery.type} Tradition</p>
                <p className="text-white/70 text-sm mb-3">{monastery.description}</p>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{monastery.distance}</span>
                  <span>Est. {monastery.established}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Monastery Details */}
        {selectedMonastery && (
          <motion.div
            className="mt-12 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl border-2 border-yellow-400/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">{selectedMonastery.name}</h3>
                <p className="text-white/80 text-lg mb-6">{selectedMonastery.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">{selectedMonastery.distance}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-black font-bold">
                      {selectedMonastery.type[0]}
                    </span>
                    <span className="text-white">{selectedMonastery.type} Tradition</span>
                  </div>
                </div>
                <button className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-semibold hover:scale-105 transition-transform duration-300">
                  Get Directions
                </button>
              </div>
              <img 
                src={selectedMonastery.image}
                alt={selectedMonastery.name}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}