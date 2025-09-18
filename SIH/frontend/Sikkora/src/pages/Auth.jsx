import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Mountain, Sparkles } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    const userData = {
      id: 1,
      name: formData.name || 'Spiritual Traveler',
      email: formData.email,
      avatar: '/images/avatar.jpg',
      joinDate: new Date().toISOString(),
      trips: [],
      bookings: []
    };
    localStorage.setItem('sikkora_user', JSON.stringify(userData));
    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Mountain className="w-12 h-12 text-yellow-400" />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent">
              SIKKORA
            </h1>
          </div>
          <p className="text-yellow-200 text-sm">Premium Sikkim Heritage Experience</p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-yellow-400/20 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-black/20 rounded-2xl p-1">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                isLogin 
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                !isLogin 
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-yellow-400/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-yellow-400/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-yellow-400/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-yellow-400/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold text-lg rounded-2xl shadow-2xl border-2 border-yellow-400/50 hover:from-yellow-700 hover:to-amber-700 transition-all"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(255,215,0,0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                {isLogin ? 'Begin Sacred Journey' : 'Join SIKKORA Premium'}
              </div>
            </motion.button>
          </form>

          {isLogin && (
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button className="text-yellow-300 hover:text-yellow-200 text-sm transition-colors">
                Forgot your password?
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-yellow-200/80 text-sm mb-4">Join thousands of spiritual travelers</p>
          <div className="flex justify-center gap-6 text-xs text-white/60">
            <span>✓ Premium Tours</span>
            <span>✓ AI Itinerary</span>
            <span>✓ 360° Experiences</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}