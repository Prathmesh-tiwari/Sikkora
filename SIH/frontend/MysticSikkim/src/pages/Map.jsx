import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Navigation, Wifi, WifiOff, Download, Search, Filter, Route, Clock, Car, Video } from "lucide-react";
import Video360Viewer from "../components/Video360Viewer";

export default function Map() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [videoViewerOpen, setVideoViewerOpen] = useState(false);
  const [selectedVideoMonastery, setSelectedVideoMonastery] = useState(null);

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      type: "Kagyu",
      lat: 27.3389,
      lng: 88.5583,
      description: "The largest monastery in Sikkim, seat of the Karmapa",
      image: "/images/rumtek.jpg",
      distance: "24 km from Gangtok",
      established: "1966",
      altitude: "1547m",
      visitingHours: "6:00 AM - 6:00 PM",
      video360: "https://www.youtube.com/embed/K2gELS_3zws?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      type: "Nyingma",
      lat: 27.2167,
      lng: 88.2167,
      description: "One of the oldest and most important monasteries",
      image: "/images/pemayagtse.jpg",
      distance: "110 km from Gangtok",
      established: "1705",
      altitude: "2085m",
      visitingHours: "7:00 AM - 5:00 PM",
      video360: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 3,
      name: "Enchey Monastery",
      type: "Nyingma",
      lat: 27.3314,
      lng: 88.6138,
      description: "Famous for Cham dance performances",
      image: "/images/enchey.jpg",
      distance: "3 km from Gangtok",
      established: "1909",
      altitude: "1840m",
      visitingHours: "5:00 AM - 7:00 PM",
      video360: "https://www.youtube.com/embed/jNQXAC9IVRw?enablejsapi=1&controls=1&modestbranding=1&rel=0"
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
      established: "1717",
      altitude: "1465m",
      visitingHours: "6:00 AM - 6:00 PM",
      video360: "https://www.youtube.com/embed/Me-VhC9ieh0?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      type: "Nyingma",
      lat: 27.2500,
      lng: 88.2500,
      description: "First monastery built in Sikkim",
      image: "/images/dubdi.jpg",
      distance: "45 km from Gangtok",
      established: "1701",
      altitude: "2100m",
      visitingHours: "6:00 AM - 5:00 PM",
      video360: "https://www.youtube.com/embed/QH2-TGUlwu4?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 6,
      name: "Ralang Monastery",
      type: "Kagyu",
      lat: 27.2200,
      lng: 88.2800,
      description: "Sacred Kagyu monastery with ancient relics",
      image: "/images/ralang.jpg",
      distance: "65 km from Gangtok",
      established: "1768",
      altitude: "1600m",
      visitingHours: "6:30 AM - 6:00 PM",
      video360: "https://www.youtube.com/embed/nfWlot6h_JM?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 7,
      name: "Labrang Monastery",
      type: "Nyingma",
      lat: 27.2400,
      lng: 88.2600,
      description: "Ancient monastery with stunning mountain views",
      image: "/images/labrang.webp",
      distance: "70 km from Gangtok",
      established: "1814",
      altitude: "1950m",
      visitingHours: "6:00 AM - 6:00 PM",
      video360: "https://www.youtube.com/embed/xvFZjo5PgG0?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 8,
      name: "Phodong Monastery",
      type: "Kagyu",
      lat: 27.4000,
      lng: 88.5500,
      description: "Beautiful monastery known for its festivals",
      image: "/images/phodong.webp",
      distance: "38 km from Gangtok",
      established: "1721",
      altitude: "1500m",
      visitingHours: "5:30 AM - 7:00 PM",
      video360: "https://www.youtube.com/embed/Ks-_Mh1QhMc?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 9,
      name: "Lingdum Monastery",
      type: "Kagyu",
      lat: 27.2800,
      lng: 88.5200,
      description: "Modern monastery with traditional architecture",
      image: "/images/lingdim.jpg",
      distance: "17 km from Gangtok",
      established: "1999",
      altitude: "1200m",
      visitingHours: "6:00 AM - 8:00 PM",
      video360: "https://www.youtube.com/embed/LQCU36pkH7k?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 10,
      name: "Samdruptse Monastery",
      type: "Kagyu",
      lat: 27.1800,
      lng: 88.3200,
      description: "Monastery with giant Guru Padmasambhava statue",
      image: "/images/samdruptse.jpg",
      distance: "75 km from Gangtok",
      established: "1998",
      altitude: "2134m",
      visitingHours: "6:00 AM - 6:00 PM",
      video360: "https://www.youtube.com/embed/kJQP7kiw5Fk?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 11,
      name: "Gonjang Monastery",
      type: "Nyingma",
      lat: 27.3200,
      lng: 88.4800,
      description: "Peaceful monastery in serene surroundings",
      image: "/images/Gonjang.jpg",
      distance: "12 km from Gangtok",
      established: "1981",
      altitude: "1400m",
      visitingHours: "6:00 AM - 7:00 PM",
      video360: "https://www.youtube.com/embed/LXb3EKWsInQ?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    },
    {
      id: 12,
      name: "Sanghak Choeling Monastery",
      type: "Nyingma",
      lat: 27.2600,
      lng: 88.2400,
      description: "Second oldest monastery in Sikkim",
      image: "/images/sanghak.jpg",
      distance: "147 km from Gangtok",
      established: "1697",
      altitude: "2100m",
      visitingHours: "6:00 AM - 5:00 PM",
      video360: "https://www.youtube.com/embed/EE-xtCF3T94?enablejsapi=1&controls=1&modestbranding=1&rel=0"
    }
  ];

  const getUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
          alert(`Location found: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Location access denied. ";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Please allow location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out.";
              break;
          }
          alert(errorMessage + " Using Gangtok as default location.");
          // Default to Gangtok coordinates
          setUserLocation({ lat: 27.3389, lng: 88.6065 });
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Using Gangtok as default location.");
      setUserLocation({ lat: 27.3389, lng: 88.6065 });
      setIsLocating(false);
    }
  };

  const calculateRoute = (monastery) => {
    if (!userLocation) return;
    
    // Calculate route with detailed information
    const distance = Math.sqrt(
      Math.pow(monastery.lat - userLocation.lat, 2) + 
      Math.pow(monastery.lng - userLocation.lng, 2)
    ) * 111; // Rough km conversion
    
    // Generate route steps
    const routeSteps = [
      "Head northeast from your current location",
      "Continue on main road for 5.2 km",
      "Turn right towards monastery road",
      "Follow signs to " + monastery.name,
      "Arrive at destination - " + monastery.name
    ];
    
    setRouteInfo({
      distance: Math.round(distance),
      duration: Math.round(distance * 2), // Rough time estimate
      monastery: monastery,
      steps: routeSteps,
      mapUrl: `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${monastery.lat},${monastery.lng}`
    });
  };

  const startNavigation = () => {
    if (routeInfo && routeInfo.mapUrl) {
      window.open(routeInfo.mapUrl, '_blank');
    }
  };

  const downloadOfflineMap = () => {
    // Simulate offline map download
    const mapData = {
      monasteries: monasteries,
      userLocation: userLocation,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sikkora-offline-map.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const open360Video = (monastery) => {
    setSelectedVideoMonastery(monastery);
    setVideoViewerOpen(true);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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
            Interactive Heritage Map
          </h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8">
            Navigate Sikkim's sacred monasteries with GPS routing and offline maps
          </p>

          {/* Status Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md border-2 ${
              isOffline ? 'bg-red-500/20 border-red-400/50' : 'bg-green-500/20 border-green-400/50'
            }`}>
              {isOffline ? <WifiOff className="w-5 h-5 text-red-300" /> : <Wifi className="w-5 h-5 text-green-300" />}
              <span className="text-white font-medium">
                {isOffline ? 'Offline Maps Available' : 'Online Mode Active'}
              </span>
            </div>

            <button
              onClick={getUserLocation}
              disabled={isLocating}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-medium hover:scale-105 transition-transform duration-300 disabled:opacity-50"
            >
              <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
              {isLocating ? 'Locating...' : 'Find My Location'}
            </button>
          </div>
        </motion.div>

        {/* Search and Controls */}
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
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-yellow-400/30 rounded-2xl text-white focus:outline-none focus:border-yellow-400/60"
          >
            <option value="all" className="bg-red-900">All Types</option>
            <option value="Kagyu" className="bg-red-900">Kagyu Tradition</option>
            <option value="Nyingma" className="bg-red-900">Nyingma Tradition</option>
          </select>

          <button 
            onClick={downloadOfflineMap}
            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Map
          </button>
        </motion.div>

        {/* Route Info */}
        {routeInfo && (
          <div className="mb-8 space-y-4">
            <motion.div
              className="p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-3xl border-2 border-green-400/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Route className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Route to {routeInfo.monastery.name}</h3>
                    <div className="flex items-center gap-6 text-white/70">
                      <span className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {routeInfo.distance} km
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {routeInfo.duration} mins
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={startNavigation}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    Start Navigation
                  </button>
                  <button 
                    onClick={() => setRouteInfo({...routeInfo, showSteps: !routeInfo.showSteps})}
                    className="px-4 py-3 bg-white/10 border-2 border-green-400/30 rounded-xl text-white hover:bg-white/20 transition-colors"
                  >
                    {routeInfo.showSteps ? 'Hide' : 'Show'} Steps
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Route Steps */}
            {routeInfo.showSteps && (
              <motion.div
                className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl border-2 border-blue-400/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-bold text-blue-300 mb-4">Turn-by-Turn Directions</h4>
                <div className="space-y-3">
                  {routeInfo.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Map and Monastery List */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl border-2 border-yellow-400/20 overflow-hidden h-96 lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-blue-900/50">
                <img 
                  src="/sikkim_bg.webp" 
                  alt="Sikkim Map" 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              
              {/* User Location */}
              {userLocation && (
                <motion.div
                  className="absolute"
                  style={{ left: '50%', top: '50%' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                    <motion.div
                      className="absolute inset-0 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Monastery Markers */}
              {filteredMonasteries.map((monastery, index) => (
                <motion.div
                  key={monastery.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${20 + index * 12}%`,
                    top: `${25 + index * 8}%`
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => {
                    setSelectedMonastery(monastery);
                    calculateRoute(monastery);
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {monastery.name}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <Navigation className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors text-xl font-bold">
                  +
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors text-xl font-bold">
                  -
                </button>
              </div>
            </div>
          </div>

          {/* Monastery List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-300 mb-6">Sacred Heritage Sites</h3>
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
                onClick={() => {
                  setSelectedMonastery(monastery);
                  calculateRoute(monastery);
                }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={monastery.image}
                  alt={monastery.name}
                  className="w-full h-32 object-cover rounded-xl mb-4"
                />
                <h4 className="text-lg font-bold text-white mb-2">{monastery.name}</h4>
                <p className="text-yellow-300 text-sm mb-2">{monastery.type} • Est. {monastery.established}</p>
                <p className="text-white/70 text-sm mb-3">{monastery.description}</p>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{monastery.altitude}</span>
                  <span>{monastery.visitingHours}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      calculateRoute(monastery);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    Get Directions
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      open360Video(monastery);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    360°
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}