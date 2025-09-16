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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/virtualtour" element={<VirtualTour />} />
            <Route path="/map" element={<Map />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path="/planner" element={<SmartPlanner />} />
            <Route path="/social" element={<Social />} />
          </Routes>
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