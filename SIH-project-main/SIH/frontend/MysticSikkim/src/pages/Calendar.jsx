import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Users, Star } from "lucide-react";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const festivals = [
    {
      id: 1,
      name: "Losar Festival",
      date: "February 10-12, 2024",
      month: 1,
      location: "All Monasteries",
      description: "Tibetan New Year celebration with traditional dances, prayers, and feasts",
      image: "/images/rumtek.jpg",
      type: "Religious",
      duration: "3 days"
    },
    {
      id: 2,
      name: "Bumchu Festival",
      date: "March 15, 2024",
      month: 2,
      location: "Tashiding Monastery",
      description: "Sacred water ceremony predicting the year's fortune",
      image: "/images/tashiding.jpg",
      type: "Sacred Ceremony",
      duration: "1 day"
    },
    {
      id: 3,
      name: "Saga Dawa",
      date: "May 23, 2024",
      month: 4,
      location: "All Buddhist Sites",
      description: "Buddha's birth, enlightenment, and death commemoration",
      image: "/images/pemayagtse.jpg",
      type: "Religious",
      duration: "1 day"
    },
    {
      id: 4,
      name: "Hemis Festival",
      date: "July 8-9, 2024",
      month: 6,
      location: "Enchey Monastery",
      description: "Masked dance festival celebrating Guru Padmasambhava",
      image: "/images/enchey.jpg",
      type: "Cultural Dance",
      duration: "2 days"
    },
    {
      id: 5,
      name: "Pang Lhabsol",
      date: "August 15, 2024",
      month: 7,
      location: "Gangtok & Monasteries",
      description: "Guardian deity worship with traditional Cham dances",
      image: "/images/rumtek.jpg",
      type: "Guardian Worship",
      duration: "1 day"
    },
    {
      id: 6,
      name: "Drupka Teshi",
      date: "September 2, 2024",
      month: 8,
      location: "All Monasteries",
      description: "First sermon of Buddha celebration",
      image: "/images/pemayagtse.jpg",
      type: "Religious",
      duration: "1 day"
    }
  ];

  const filteredFestivals = festivals.filter(festival => festival.month === selectedMonth);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent">
            Sikkim Festival Calendar
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
            Experience the sacred festivals and cultural celebrations of Sikkim's monasteries throughout the year
          </p>
        </motion.div>

        {/* Month Selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedMonth === index
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {month}
            </button>
          ))}
        </motion.div>

        {/* Festivals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredFestivals.map((festival, index) => (
            <motion.div
              key={festival.id}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-yellow-400/20 hover:border-yellow-400/40 cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedEvent(festival)}
            >
              <img 
                src={festival.image}
                alt={festival.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full text-xs font-medium">
                    {festival.type}
                  </span>
                  <span className="text-yellow-300 text-sm">{festival.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{festival.name}</h3>
                <p className="text-white/70 text-sm mb-4">{festival.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-yellow-200 text-sm">
                    <CalendarIcon className="w-4 h-4" />
                    {festival.date}
                  </div>
                  <div className="flex items-center gap-2 text-yellow-200 text-sm">
                    <MapPin className="w-4 h-4" />
                    {festival.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Events Message */}
        {filteredFestivals.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CalendarIcon className="w-16 h-16 text-yellow-400/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white/70 mb-2">No festivals this month</h3>
            <p className="text-white/50">Select another month to explore more festivals</p>
          </motion.div>
        )}

        {/* Festival Details Modal */}
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-red-900 to-amber-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedEvent.image}
                alt={selectedEvent.name}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full text-sm font-medium">
                    {selectedEvent.type}
                  </span>
                  <span className="text-yellow-300">{selectedEvent.duration}</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedEvent.name}</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-sm text-white/60">Date</p>
                      <p className="text-white font-semibold">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-sm text-white/60">Location</p>
                      <p className="text-white font-semibold">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}