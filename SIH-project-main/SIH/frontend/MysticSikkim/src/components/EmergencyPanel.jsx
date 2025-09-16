import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, MapPin, AlertTriangle, Heart, Navigation, Clock, User } from 'lucide-react';

export default function EmergencyPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const emergencyContacts = [
    { name: 'Police Emergency', number: '100', type: 'police', color: 'bg-red-600' },
    { name: 'Medical Emergency', number: '108', type: 'medical', color: 'bg-green-600' },
    { name: 'Fire Emergency', number: '101', type: 'fire', color: 'bg-orange-600' },
    { name: 'Tourist Helpline', number: '+91-3592-202033', type: 'tourist', color: 'bg-blue-600' },
    { name: 'Sikkim Police Control', number: '+91-3592-202033', type: 'control', color: 'bg-purple-600' }
  ];

  const medicalFacilities = [
    { name: 'STNM Hospital', location: 'Gangtok', distance: '2.3 km', phone: '+91-3592-202951' },
    { name: 'District Hospital', location: 'Namchi', distance: '15 km', phone: '+91-3595-264205' },
    { name: 'Central Referral Hospital', location: 'Tadong', distance: '5.1 km', phone: '+91-3592-231635' }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Location access denied')
      );
    }
  }, []);

  const handleEmergencyCall = (number) => {
    if (emergencyMode) {
      // Send location data along with call
      const locationData = location ? `Location: ${location.lat}, ${location.lng}` : 'Location unavailable';
      console.log(`Emergency call to ${number} with ${locationData}`);
    }
    window.open(`tel:${number}`, '_self');
  };

  const shareLocation = () => {
    if (location) {
      const message = `Emergency! I need help. My location: https://maps.google.com/?q=${location.lat},${location.lng}`;
      if (navigator.share) {
        navigator.share({ text: message });
      } else {
        navigator.clipboard.writeText(message);
        alert('Location copied to clipboard');
      }
    }
  };

  const activateEmergencyMode = () => {
    setEmergencyMode(true);
    // Flash screen red
    document.body.style.backgroundColor = '#dc2626';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 500);
  };

  return (
    <>
      {/* Emergency Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-24 right-6 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white z-50 ${
          emergencyMode ? 'bg-red-600' : 'bg-gradient-to-r from-red-600 to-red-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={emergencyMode ? { 
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 20px rgba(220,38,38,0.5)',
            '0 0 40px rgba(220,38,38,0.8)',
            '0 0 20px rgba(220,38,38,0.5)'
          ]
        } : {}}
        transition={{ duration: 0.5, repeat: emergencyMode ? Infinity : 0 }}
      >
        <Shield className="w-6 h-6" />
      </motion.button>

      {/* Emergency Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-40 right-6 w-96 bg-gradient-to-br from-red-900/95 to-orange-900/95 backdrop-blur-xl rounded-3xl border-2 border-red-400/30 shadow-2xl z-40 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-red-400/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-red-400" />
                  <h3 className="text-white font-bold text-lg">Emergency & Safety</h3>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white text-xl"
                  whileHover={{ scale: 1.1 }}
                >
                  ×
                </motion.button>
              </div>

              {/* Emergency Mode Toggle */}
              <motion.button
                onClick={activateEmergencyMode}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  emergencyMode 
                    ? 'bg-red-600 text-white' 
                    : 'bg-red-600/20 border-2 border-red-400/50 text-red-300 hover:bg-red-600/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {emergencyMode ? 'EMERGENCY MODE ACTIVE' : 'ACTIVATE EMERGENCY MODE'}
                </div>
              </motion.button>
            </div>

            {/* Emergency Contacts */}
            <div className="p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                Emergency Contacts
              </h4>
              <div className="space-y-3 mb-6">
                {emergencyContacts.map((contact, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleEmergencyCall(contact.number)}
                    className={`w-full p-4 ${contact.color} rounded-xl text-white font-medium hover:opacity-90 transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-bold">{contact.name}</div>
                        <div className="text-sm opacity-90">{contact.number}</div>
                      </div>
                      <Phone className="w-5 h-5" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Location Sharing */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Location Services
                </h4>
                <div className="space-y-3">
                  <motion.button
                    onClick={shareLocation}
                    disabled={!location}
                    className="w-full p-3 bg-blue-600/20 border border-blue-400/30 text-blue-300 rounded-xl hover:bg-blue-600/30 transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Share My Location
                    </div>
                  </motion.button>
                  
                  {location && (
                    <div className="bg-green-600/20 border border-green-400/30 rounded-xl p-3">
                      <div className="text-green-300 text-sm">
                        📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Medical Facilities */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-400" />
                  Nearby Medical Facilities
                </h4>
                <div className="space-y-2">
                  {medicalFacilities.map((facility, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium text-sm">{facility.name}</div>
                          <div className="text-white/60 text-xs">{facility.location} • {facility.distance}</div>
                        </div>
                        <motion.a
                          href={`tel:${facility.phone}`}
                          className="px-3 py-1 bg-green-600 text-white rounded-full text-xs hover:bg-green-700 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Call
                        </motion.a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-xl p-4">
                <h4 className="text-yellow-300 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Safety Tips
                </h4>
                <div className="space-y-1 text-yellow-200 text-xs">
                  <p>• Always inform someone about your monastery visits</p>
                  <p>• Carry emergency contacts and medical information</p>
                  <p>• Stay hydrated at high altitudes</p>
                  <p>• Respect local customs and photography rules</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}