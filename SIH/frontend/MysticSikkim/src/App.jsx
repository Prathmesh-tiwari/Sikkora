import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";
import Map from "./pages/Map";
import Archives from "./pages/Archives";
import Calendar from "./pages/Calendar";
import ServicesHub from "./pages/ServicesHub";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import SmartPlanner from "./pages/SmartPlanner";
import Social from "./pages/Social";
import FloatingChatbot from "./components/chatbot";
import VoiceAssistant from "./components/VoiceAssistant";
import EmergencyPanel from "./components/EmergencyPanel";

import { useState, useEffect } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sikkora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('sikkora_user');
    setUser(null);
    setCurrentPage('/');
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 text-white overflow-x-hidden">
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.3),transparent_50%)]" />
        </div>
        
        <Navbar setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
        
        <main className="relative z-10 pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/virtualtour" element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <VirtualTour />
                </motion.div>
              } />
              <Route path="/map" element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Map />
                </motion.div>
              } />
              <Route path="/archives" element={
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Archives />
                </motion.div>
              } />
              <Route path="/calendar" element={
                <motion.div
                  initial={{ opacity: 0, rotateY: 10 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -10 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Calendar />
                </motion.div>
              } />
              <Route path="/services" element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <ServicesHub />
                </motion.div>
              } />
              <Route path="/profile" element={
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Profile user={user} onLogout={handleLogout} />
                </motion.div>
              } />
              <Route path="/planner" element={
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <SmartPlanner />
                </motion.div>
              } />
              <Route path="/social" element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotateX: -5 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Social />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        
        <FloatingChatbot />
        <VoiceAssistant />
        <EmergencyPanel />
        <Footer />
      </div>
    </Router>
  );
}

export default App;