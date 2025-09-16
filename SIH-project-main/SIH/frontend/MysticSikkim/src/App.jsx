import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";
import Map from "./pages/Map";
import Archives from "./pages/Archives";
import Calendar from "./pages/Calendar";
import FloatingChatbot from "./components/chatbot";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("/");

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 text-white overflow-x-hidden">
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.3),transparent_50%)]" />
        </div>
        
        <Navbar setCurrentPage={setCurrentPage} />
        
        <main className="relative z-10 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/virtualtour" element={<VirtualTour />} />
            <Route path="/map" element={<Map />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
        
        <FloatingChatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;