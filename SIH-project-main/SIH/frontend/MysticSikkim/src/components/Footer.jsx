import { motion } from "framer-motion";
import { Mountain, Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart, Code, Users, Award } from "lucide-react";

export default function Footer() {
  const teamMembers = [
    { name: "Arjun Sharma", role: "Lead Developer", email: "arjun.sharma@consolecrusaders.dev" },
    { name: "Priya Patel", role: "UI/UX Designer", email: "priya.patel@consolecrusaders.dev" },
    { name: "Rahul Kumar", role: "Backend Engineer", email: "rahul.kumar@consolecrusaders.dev" },
    { name: "Sneha Gupta", role: "Frontend Developer", email: "sneha.gupta@consolecrusaders.dev" },
    { name: "Vikram Singh", role: "DevOps Engineer", email: "vikram.singh@consolecrusaders.dev" },
    { name: "Anita Rao", role: "Product Manager", email: "anita.rao@consolecrusaders.dev" }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/console-crusaders", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/console-crusaders", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/consolecrusaders", label: "Twitter" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-red-950 via-amber-950 to-yellow-900 text-white overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,165,0,0.2),transparent_50%)]" />
      </div>

      {/* Animated Golden Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
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
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/images/premium logo design .png" 
                alt="SIKKORA Logo" 
                className="w-12 h-12 object-contain filter drop-shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  SIKKORA
                </h3>
                <p className="text-sm text-yellow-200/80">Premium Heritage</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Experience Sikkim's sacred monasteries through cutting-edge technology, 
              offline accessibility, and multi-language narration for the ultimate cultural journey.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  whileHover={{ 
                    boxShadow: '0 10px 25px rgba(255,215,0,0.4)',
                    y: -2
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
              <Mountain className="w-5 h-5" />
              Explore
            </h4>
            <ul className="space-y-3">
              {['Sacred Monasteries', 'Virtual Tours', 'Cultural Archives', 'Audio Guides', 'Offline Maps'].map((item, index) => (
                <motion.li 
                  key={item}
                  className="text-white/70 hover:text-yellow-300 cursor-pointer transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>info@sikkora.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Gangtok, Sikkim, India</span>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Premium Features
            </h4>
            <ul className="space-y-3">
              {['Offline Mode', 'Multi-Language Support', '4K Virtual Tours', 'AI-Powered Guides', 'Cultural Insights'].map((feature, index) => (
                <motion.li 
                  key={feature}
                  className="text-white/70 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          className="border-t border-yellow-400/20 pt-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-yellow-300 mb-4 flex items-center justify-center gap-3">
              <Code className="w-8 h-8" />
              Meet Console Crusaders
              <Users className="w-8 h-8" />
            </h3>
            <p className="text-white/70 text-lg">The brilliant minds behind SIKKORA's premium experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 15px 35px rgba(255,215,0,0.15)'
                }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-1">{member.name}</h4>
                  <p className="text-yellow-300 text-sm mb-3">{member.role}</p>
                  <p className="text-white/60 text-xs">{member.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-yellow-400/20 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-2 text-white/70 mb-4 md:mb-0">
            <span>© 2024 SIKKORA. Crafted with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>by Console Crusaders</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-white/60">
            <span className="hover:text-yellow-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-yellow-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-yellow-300 cursor-pointer transition-colors">Support</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}