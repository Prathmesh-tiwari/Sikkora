import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Mountain, Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ setCurrentPage, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Virtual Tour", path: "/virtualtour" },
    { name: "Smart Planner", path: "/planner" },
    { name: "Social", path: "/social" },
    { name: "Services", path: "/services" },
    { name: "Map", path: "/map" },
    { name: "Archives", path: "/archives" },
    { name: "Calendar", path: "/calendar" }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-red-900/95 via-amber-900/95 to-yellow-800/95 backdrop-blur-xl border-b-2 border-yellow-400/30" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <img 
                src="/images/premium logo design .png" 
                alt="SIKKORA Logo" 
                className="w-14 h-14 object-contain filter drop-shadow-lg"
              />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                  boxShadow: [
                    '0 0 10px rgba(255,215,0,0.5)',
                    '0 0 20px rgba(255,215,0,0.8)',
                    '0 0 10px rgba(255,215,0,0.5)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent premium-text-glow">
                SIKKORA
              </h1>
              <p className="text-sm text-yellow-200/90 font-medium tracking-wide">Premium Heritage Experience</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center justify-between w-full max-w-4xl">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setCurrentPage && setCurrentPage(item.path)}
                    className={({ isActive }) =>
                      `relative px-3 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-300 whitespace-nowrap ${
                        isActive ? "text-yellow-300" : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10 text-sm">{item.name}</span>
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-lg border border-yellow-400/30"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent" />
            <NavLink to="/profile">
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <span className="text-white text-sm font-medium">{user?.name || 'User'}</span>
              </motion.div>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-lg flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-red-900/98 via-amber-900/98 to-yellow-800/98 backdrop-blur-xl border-b-2 border-yellow-400/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      setCurrentPage && setCurrentPage(item.path);
                    }}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-white font-medium rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-gradient-to-r from-yellow-600/30 to-amber-600/30 border border-yellow-400/40 text-yellow-300" 
                          : "hover:bg-white/10"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
              
              <motion.div
                className="pt-4 border-t border-yellow-400/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center space-x-2 text-yellow-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">SIKKORA - Premium Heritage</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}