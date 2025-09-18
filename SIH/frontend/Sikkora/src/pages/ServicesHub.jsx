import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Car, Calendar, MapPin, Sparkles } from 'lucide-react';
import GoogleEarth360 from '../components/GoogleEarth360';
import TransportTourism from '../components/TransportTourism';
import BookingSystem from '../components/BookingSystem';

export default function ServicesHub() {
  const [activeSection, setActiveSection] = useState('earth360');

  const sections = {
    earth360: {
      name: '360° Earth View',
      icon: Globe,
      component: GoogleEarth360,
      description: 'Explore monasteries with accurate Google Earth 360° views'
    },
    transport: {
      name: 'Transport & Tourism',
      icon: Car,
      component: TransportTourism,
      description: 'Local transport services and tourism operators'
    },
    booking: {
      name: 'Booking & Reservations',
      icon: Calendar,
      component: BookingSystem,
      description: 'Book hotels, activities, and dining experiences'
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-6">
      {/* Hero Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent"
          animate={{ 
            textShadow: [
              '0 0 40px rgba(255,215,0,0.9)',
              '0 0 80px rgba(255,215,0,1)',
              '0 0 40px rgba(255,215,0,0.9)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Premium Services Hub
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Complete travel solutions for your Sikkim monastery exploration journey
        </motion.p>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {Object.entries(sections).map(([key, section]) => (
          <motion.button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 ${
              activeSection === key
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white border-yellow-400 shadow-2xl'
                : 'bg-white/10 backdrop-blur-md text-white border-yellow-400/30 hover:border-yellow-400/60 hover:bg-white/20'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: activeSection === key 
                ? '0 25px 50px rgba(255,215,0,0.4)' 
                : '0 15px 30px rgba(255,215,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <section.icon className="w-6 h-6" />
            <div className="text-left">
              <div>{section.name}</div>
              <div className="text-sm opacity-80 font-normal">{section.description}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Active Section Content */}
      <motion.div
        key={activeSection}
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-600/20 via-amber-600/20 to-red-600/20 rounded-3xl blur-xl" />
          
          {/* Content */}
          <div className="relative">
            {React.createElement(sections[activeSection].component)}
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="mt-20 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose Our Premium Services?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: 'Accurate Locations',
              description: 'Google Earth integration provides precise monastery locations and 360° views for authentic exploration'
            },
            {
              icon: Car,
              title: 'Local Connections',
              description: 'Direct contact with verified local transport and tourism services for seamless travel experience'
            },
            {
              icon: Calendar,
              title: 'Easy Booking',
              description: 'Integrated booking system with Google search for hotels, activities, and dining reservations'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255,215,0,0.2)'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
              <p className="text-white/80 text-center leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <div className="bg-gradient-to-r from-red-600/20 via-amber-600/20 to-yellow-600/20 backdrop-blur-md rounded-3xl p-12 border-2 border-yellow-400/30 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h3 className="text-3xl font-bold text-white">Ready to Explore?</h3>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your spiritual journey through Sikkim's sacred monasteries with our comprehensive service platform
          </p>
          
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold text-lg rounded-2xl shadow-2xl border-2 border-yellow-400/50"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 25px 50px rgba(255,215,0,0.4)',
              borderColor: 'rgba(255,215,0,1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Explore All Services
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}