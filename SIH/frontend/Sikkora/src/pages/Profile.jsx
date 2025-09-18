import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Star, Phone, Shield, Settings, LogOut, Camera, Edit3, Award, Clock, Navigation } from 'lucide-react';

export default function Profile({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const mockTrips = [
    {
      id: 1,
      name: 'Sacred Monastery Circuit',
      date: '2024-03-15',
      status: 'completed',
      monasteries: ['Rumtek', 'Pemayangtse', 'Enchey'],
      rating: 5,
      photos: 24
    },
    {
      id: 2,
      name: 'Spiritual Retreat Weekend',
      date: '2024-04-20',
      status: 'upcoming',
      monasteries: ['Tashiding', 'Dubdi'],
      guide: 'Pemba Sherpa'
    }
  ];

  const mockBookings = [
    {
      id: 1,
      type: 'hotel',
      name: 'The Elgin Nor-Khill',
      date: '2024-04-18',
      status: 'confirmed',
      amount: '₹17,000'
    },
    {
      id: 2,
      type: 'activity',
      name: 'Goecha La Trek',
      date: '2024-05-10',
      status: 'pending',
      amount: '₹15,000'
    }
  ];

  const emergencyContacts = [
    { name: 'Sikkim Police', number: '100', type: 'emergency' },
    { name: 'Tourist Helpline', number: '+91-3592-202033', type: 'support' },
    { name: 'Medical Emergency', number: '108', type: 'medical' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'trips', name: 'My Trips', icon: MapPin },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'safety', name: 'Safety', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          className="bg-gradient-to-r from-red-600/20 via-amber-600/20 to-yellow-600/20 backdrop-blur-md rounded-3xl p-8 border-2 border-yellow-400/30 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <motion.button
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <motion.button
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 className="w-4 h-4 text-yellow-400" />
                </motion.button>
              </div>
              <p className="text-yellow-200 mb-4">{user.email}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">Premium Member</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">Joined March 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">3 Monasteries Visited</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-600/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-600/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex gap-2 mb-8 bg-black/20 backdrop-blur-md rounded-2xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">3</h3>
                    <p className="text-white/60 text-sm">Monasteries Visited</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">2</h3>
                    <p className="text-white/60 text-sm">Upcoming Trips</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">4.9</h3>
                    <p className="text-white/60 text-sm">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="space-y-6">
              {mockTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{trip.name}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{trip.date}</span>
                        </div>
                        {trip.guide && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-yellow-400" />
                            <span className="text-white">{trip.guide}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'completed' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.monasteries.map((monastery) => (
                      <span key={monastery} className="px-3 py-1 bg-yellow-500/20 text-yellow-200 rounded-full text-sm">
                        {monastery}
                      </span>
                    ))}
                  </div>

                  {trip.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < trip.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                        ))}
                      </div>
                      <span className="text-white/60 text-sm">{trip.photos} photos</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {mockBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{booking.name}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{booking.date}</span>
                        </div>
                        <span className="text-green-400 font-medium">{booking.amount}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-orange-500/20 text-orange-300'
                      }`}>
                        {booking.status}
                      </span>
                      <p className="text-white/60 text-sm mt-2 capitalize">{booking.type}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-400" />
                  Emergency Contacts
                </h3>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/20 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <h4 className="text-white font-medium">{contact.name}</h4>
                        <p className="text-white/60 text-sm capitalize">{contact.type}</p>
                      </div>
                      <motion.a
                        href={`tel:${contact.number}`}
                        className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Call {contact.number}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Safety Features
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-600/20 border border-green-400/30 rounded-xl">
                    <h4 className="text-green-300 font-medium mb-2">Location Sharing</h4>
                    <p className="text-white/80 text-sm">Share your real-time location with emergency contacts</p>
                  </div>
                  <div className="p-4 bg-blue-600/20 border border-blue-400/30 rounded-xl">
                    <h4 className="text-blue-300 font-medium mb-2">Medical Info</h4>
                    <p className="text-white/80 text-sm">Store medical conditions and emergency medications</p>
                  </div>
                  <div className="p-4 bg-purple-600/20 border border-purple-400/30 rounded-xl">
                    <h4 className="text-purple-300 font-medium mb-2">Travel Insurance</h4>
                    <p className="text-white/80 text-sm">Comprehensive coverage for your spiritual journey</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Email Notifications</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Location Services</span>
                    <div className="w-12 h-6 bg-green-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Offline Downloads</span>
                    <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-bold text-white mb-6">Account</h3>
                <div className="space-y-4">
                  <motion.button
                    className="w-full p-4 bg-blue-600/20 border border-blue-400/30 text-blue-300 rounded-xl hover:bg-blue-600/30 transition-all text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Change Password
                  </motion.button>
                  <motion.button
                    className="w-full p-4 bg-purple-600/20 border border-purple-400/30 text-purple-300 rounded-xl hover:bg-purple-600/30 transition-all text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Privacy Settings
                  </motion.button>
                  <motion.button
                    className="w-full p-4 bg-red-600/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-600/30 transition-all text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete Account
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}