# SIKKORA - Premium Heritage Experience

🏔️ **Explore Sikkim's Sacred Monasteries with AI-Powered Premium Experience**

## 🌟 Overview

SIKKORA is a premium web application that provides an immersive experience for exploring Sikkim's rich Buddhist heritage and sacred monasteries. Built with cutting-edge technology, it offers virtual tours, AI-powered assistance, and comprehensive travel planning tools.

## 🚀 Features

- **🏛️ Virtual Monastery Tours**: 360° immersive experiences of sacred sites
- **🤖 AI-Powered Chatbot**: Multilingual support (English, Hindi, Nepali, Bhutia)
- **🎙️ Voice Assistant**: Voice-activated navigation and information
- **🗺️ Interactive Maps**: Detailed monastery locations and routes
- **📅 Event Calendar**: Buddhist festivals and cultural events
- **🏨 Booking System**: Hotels, transport, and tour packages
- **📱 Smart Planner**: AI-assisted trip planning
- **🌐 Social Features**: Community sharing and reviews

## 🛠️ Technology Stack

### Frontend
- **React 19** with Vite
- **Framer Motion** for premium animations
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Leaflet** for interactive maps
- **Three.js** for 3D experiences

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** enabled for cross-origin requests
- **Environment variables** for configuration

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prathmesh-tiwari/Sikkora.git
   cd Sikkora
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd SIH/frontend/Sikkora
   npm install
   
   # Install backend dependencies
   cd ../../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend .env file
   cd SIH/backend
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Run the application**
   ```bash
   # Quick start (Windows)
   start-sikkora.bat
   
   # Or manually:
   # Terminal 1 - Backend
   cd SIH/backend
   npm start
   
   # Terminal 2 - Frontend
   cd SIH/frontend/Sikkora
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🏗️ Project Structure

```
Sikkora/
├── SIH/
│   ├── frontend/
│   │   └── Sikkora/                # React frontend application
│   │       ├── src/
│   │       │   ├── components/     # React components
│   │       │   ├── pages/          # Page components
│   │       │   └── utils/          # Utility functions
│   │       ├── public/
│   │       │   ├── images/         # Static images
│   │       │   └── videos/         # Video assets
│   │       ├── .env               # Frontend environment variables
│   │       └── package.json
│   ├── backend/                   # Node.js backend API
│   │   ├── controllers/           # API controllers
│   │   ├── models/                # Database models
│   │   ├── routes/                # API routes
│   │   ├── config/                # Configuration
│   │   ├── .env                   # Backend environment variables
│   │   └── package.json
│   └── package.json
├── start-sikkora.bat             # Quick start script
├── .gitignore                    # Git ignore rules
└── README.md                     # Documentation
```

## 🎨 Key Components

### Frontend Components
- **Navbar**: Premium navigation with smooth animations
- **LoadingScreen**: Cinematic startup experience
- **VoiceAssistant**: AI-powered voice interaction
- **FloatingChatbot**: Multilingual AI assistant
- **VirtualTour**: 360° monastery experiences
- **SmartPlanner**: AI trip planning
- **BookingSystem**: Integrated booking platform

### Backend Services
- **Authentication**: User management
- **Monastery Data**: Sacred site information
- **Event Management**: Festival and cultural events
- **Booking API**: Hotel and transport booking
- **Chat Logs**: Conversation history

## 🔒 Privacy & Security

- All user data is stored locally in your MongoDB instance
- No external data sharing without explicit consent
- Secure API endpoints with proper validation
- Environment variables for sensitive configuration

## 🌍 Supported Languages

- **English** (Primary)
- **Hindi** (हिंदी)
- **Nepali** (नेपाली)
- **Bhutia** (Traditional)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prathmesh Tiwari**
- GitHub: [@Prathmesh-tiwari](https://github.com/Prathmesh-tiwari)
- Repository: [Sikkora](https://github.com/Prathmesh-tiwari/Sikkora)

## 🙏 Acknowledgments

- Buddhist monasteries of Sikkim for inspiration
- Open source community for amazing tools
- Cultural heritage preservation initiatives

## 📞 Support

For support, please open an issue on [GitHub Issues](https://github.com/Prathmesh-tiwari/Sikkora/issues) or contact the maintainer.

---

**🏔️ Experience the Sacred Heritage of Sikkim with SIKKORA - Where Technology Meets Tradition**