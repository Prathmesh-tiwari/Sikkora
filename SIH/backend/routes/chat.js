// backend/routes/chat.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk";
import fs from "fs";

const chatrouter = express.Router();

// Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Helper: Save chat logs (Optional - for debugging / KPI tracking)
 */
function saveChatLog(userMessage, botReply) {
  const log = {
    timestamp: new Date().toISOString(),
    user: userMessage,
    bot: botReply,
  };
  fs.appendFile("chatlogs.json", JSON.stringify(log) + "\n", (err) => {
    if (err) console.error("Error saving chat log:", err);
  });
}

// POST /chat → Handle user messages
chatrouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  // Comprehensive fallback responses with all features
  const fallbackResponses = {
    "hello": "🙏 Namaste! Welcome to MysticSikkim AI! I can help you with:\n\n🏛️ **Virtual Tours** - 360° monastery experiences\n🗺️ **Interactive Maps** - Explore locations\n📚 **Digital Archives** - Historical artifacts\n📅 **Event Calendar** - Festivals & bookings\n🎧 **Audio Guides** - Immersive storytelling\n🛍️ **Artisan Store** - Authentic crafts\n✈️ **Travel Planning** - Complete itineraries\n\nWhat interests you most?",
    
    "features": "🌟 **MysticSikkim Features:**\n\n🏛️ **Virtual Tours** - 360° monastery walkthroughs\n🗺️ **Interactive Map** - GPS locations & routes\n📚 **Digital Archives** - Ancient manuscripts & artifacts\n📅 **Festival Calendar** - Live events & bookings\n🎧 **Audio Guides** - Multi-language narration\n🛍️ **Artisan Marketplace** - Authentic handicrafts\n📱 **Offline Access** - Download for remote areas\n🔐 **Blockchain Verified** - Authentic artifacts\n💬 **AI Assistant** - 24/7 cultural guidance\n\nTry saying 'virtual tour' or 'book festival'!",
    
    "virtualtour": "🏛️ **Virtual Tours Available:**\n\n• **Rumtek Monastery** - Tibetan Buddhist center\n• **Pemayangtse** - Nyingma sect headquarters\n• **Enchey Monastery** - Gangtok's spiritual heart\n• **Tashiding** - Sacred Bumchu ceremony site\n• **Dubdi Monastery** - Sikkim's oldest monastery\n\n🎮 **Features:** 360° views, zoom controls, historical info, audio narration\n\n*Visit /virtualtour page to start exploring!*",
    
    "map": "🗺️ **Interactive Map Features:**\n\n📍 **Locations:** All 28+ monasteries mapped\n🛣️ **Routes:** GPS navigation & travel times\n🏔️ **Terrain:** Altitude & difficulty levels\n📸 **Photos:** High-res monastery images\n⭐ **Reviews:** Visitor experiences\n🎯 **Filters:** By region, accessibility, festivals\n\n*Visit /exploremap to plan your journey!*",
    
    "archives": "📚 **Digital Archives Collection:**\n\n📜 **Ancient Manuscripts** - Buddhist texts & prayers\n🎨 **Sacred Art** - Thangkas & murals\n🏺 **Artifacts** - Ritual objects & relics\n📖 **Historical Records** - Monastery chronicles\n🔐 **Blockchain Verified** - Authenticity guaranteed\n💾 **High Resolution** - Zoom to see details\n\n*Explore /archives for the complete collection!*",
    
    "calendar": "📅 **Festival Calendar & Events:**\n\n🎊 **Upcoming Festivals:**\n• Losar (Tibetan New Year) - Feb\n• Saga Dawa (Buddha's enlightenment) - May\n• Drupka Teshi (First sermon) - July\n• Dashain (Victory of good) - Oct\n\n🎫 **Book Events:** Secure your spot\n🏨 **Accommodation:** Nearby stays\n🚗 **Transport:** Arranged transfers\n\n*Visit /calendar to book festivals!*",
    
    "audioguide": "🎧 **Audio Guide Features:**\n\n🗣️ **Languages:** English, Hindi, Nepali, Bhutia\n📱 **Offline Mode:** Download for remote areas\n🎵 **Immersive:** Monastery chants & ambience\n👨‍🏫 **Expert Narration:** Monks & historians\n⏱️ **Duration:** 15-45 mins per monastery\n🎯 **Interactive:** Tap hotspots for details\n\n*Available in Virtual Tours section!*",
    
    "store": "🛍️ **Artisan Marketplace:**\n\n🎨 **Handicrafts:** Prayer wheels, singing bowls\n👕 **Textiles:** Traditional Bhutia clothing\n📿 **Jewelry:** Turquoise & silver ornaments\n🍵 **Tea & Spices:** Organic Sikkim varieties\n📚 **Books:** Buddhist philosophy & culture\n🎁 **Souvenirs:** Monastery blessed items\n\n💳 **Secure Payments** | 🚚 **Worldwide Shipping**\n*Support local artisans directly!*",
    
    "monasteries": "🏛️ **Major Monasteries in Sikkim:**\n\n**Rumtek** - Dharma Chakra Centre, Tibetan Buddhism HQ\n**Pemayangtse** - 'Perfect Sublime Lotus', 300+ years old\n**Enchey** - 'Solitary Temple', Gangtok's guardian\n**Tashiding** - 'Central Glory', most sacred site\n**Dubdi** - 'Retreat', Sikkim's first monastery (1701)\n**Ralang** - Kagyu sect, sacred dances\n**Phensang** - Highest monastery at 4,500m\n\n🎯 Each offers virtual tours, archives & festivals!",
    
    "travel": "✈️ **Complete Travel Guide:**\n\n🌤️ **Best Time:** March-May, Sept-Nov\n📋 **Permits:** Inner Line Permit required\n🏔️ **Altitude:** Acclimatization needed above 3,000m\n🚗 **Transport:** Helicopter, car, trekking options\n🏨 **Stay:** Monastery guesthouses available\n🍽️ **Food:** Vegetarian meals at monasteries\n📱 **Connectivity:** Download offline maps\n\n*Use our interactive map for detailed planning!*",
    
    "festivals": "🎊 **Sikkim Festival Calendar:**\n\n**Losar** (Feb) - Tibetan New Year celebrations\n**Saga Dawa** (May) - Buddha's birth, enlightenment\n**Drupka Teshi** (Jul) - First sermon anniversary\n**Pang Lhabsol** (Aug) - Guardian deity worship\n**Dashain** (Oct) - Victory of good over evil\n**Tihar** (Nov) - Festival of lights\n\n🎫 **Book Now:** Secure spots, accommodation & transport\n*Visit /calendar for live bookings!*",
    
    "food": "🍜 **Sikkim Cuisine Guide:**\n\n**Momos** - Steamed dumplings (veg/non-veg)\n**Thukpa** - Hearty noodle soup\n**Gundruk** - Fermented leafy greens\n**Sel Roti** - Traditional ring-shaped bread\n**Chhurpi** - Yak cheese delicacy\n**Suja** - Butter tea (monastery special)\n**Kinema** - Fermented soybean curry\n\n🍵 **Monastery Meals:** Simple, pure vegetarian food\n*Try authentic recipes in our cultural section!*",
    
    "booking": "🎫 **Easy Booking Process:**\n\n1️⃣ **Select Event** - Choose from calendar\n2️⃣ **Pick Package** - Basic/Premium/VIP\n3️⃣ **Add Services** - Stay, transport, meals\n4️⃣ **Secure Payment** - Multiple options\n5️⃣ **Get Confirmation** - WhatsApp & email\n6️⃣ **Enjoy Experience** - Guided tours included\n\n💰 **Packages from ₹999** | 🔄 **Free cancellation**\n*Book now at /calendar!*",
    
    "offline": "📱 **Offline Features:**\n\n💾 **Download:** Complete monastery data\n🗺️ **Maps:** GPS works without internet\n🎧 **Audio:** Pre-loaded guides\n📚 **Archives:** Cached artifacts\n📅 **Calendar:** Saved events\n🔄 **Sync:** Auto-update when online\n\n📡 **Bluetooth Transfer:** Share with nearby devices\n*Perfect for remote Himalayan areas!*",
    
    "help": "❓ **How Can I Help You?**\n\n🏛️ Say 'virtual tour' - Explore monasteries\n🗺️ Say 'map' - Plan your route\n📚 Say 'archives' - View artifacts\n📅 Say 'calendar' - Book festivals\n🎧 Say 'audio guide' - Listen to stories\n🛍️ Say 'store' - Buy authentic crafts\n✈️ Say 'travel' - Get trip advice\n🍜 Say 'food' - Learn about cuisine\n\n*I'm here 24/7 to guide your Sikkim journey!*",
    
    "default": "🌄 I'm your MysticSikkim AI guide! I can help with:\n\n• **Virtual Tours** & **Interactive Maps**\n• **Digital Archives** & **Festival Bookings**\n• **Audio Guides** & **Artisan Store**\n• **Travel Planning** & **Cultural Info**\n\nTry asking: 'What features do you have?' or 'Book a festival'\n\n*Let's explore Sikkim's mystical heritage together!* 🙏"
  };

  // Enhanced keyword matching for all features
  const getResponse = (msg) => {
    const lower = msg.toLowerCase();
    
    // Greetings
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || lower.includes('hey')) return fallbackResponses.hello;
    
    // Features & Help
    if (lower.includes('feature') || lower.includes('what can you') || lower.includes('what do you') || lower.includes('help me')) return fallbackResponses.features;
    if (lower.includes('help') || lower.includes('guide') || lower.includes('assist')) return fallbackResponses.help;
    
    // Virtual Tours
    if (lower.includes('virtual') || lower.includes('tour') || lower.includes('360') || lower.includes('explore monastery')) return fallbackResponses.virtualtour;
    
    // Interactive Map
    if (lower.includes('map') || lower.includes('location') || lower.includes('route') || lower.includes('navigation') || lower.includes('gps')) return fallbackResponses.map;
    
    // Digital Archives
    if (lower.includes('archive') || lower.includes('artifact') || lower.includes('manuscript') || lower.includes('historical') || lower.includes('ancient')) return fallbackResponses.archives;
    
    // Calendar & Events
    if (lower.includes('calendar') || lower.includes('event') || lower.includes('festival') || lower.includes('book') || lower.includes('celebration')) return fallbackResponses.calendar;
    
    // Audio Guides
    if (lower.includes('audio') || lower.includes('listen') || lower.includes('narration') || lower.includes('story')) return fallbackResponses.audioguide;
    
    // Artisan Store
    if (lower.includes('store') || lower.includes('shop') || lower.includes('buy') || lower.includes('craft') || lower.includes('artisan') || lower.includes('handicraft')) return fallbackResponses.store;
    
    // Monasteries
    if (lower.includes('monastery') || lower.includes('temple') || lower.includes('rumtek') || lower.includes('pemayangtse') || lower.includes('enchey')) return fallbackResponses.monasteries;
    
    // Travel
    if (lower.includes('travel') || lower.includes('visit') || lower.includes('trip') || lower.includes('plan') || lower.includes('permit') || lower.includes('best time')) return fallbackResponses.travel;
    
    // Festivals specific
    if (lower.includes('losar') || lower.includes('saga dawa') || lower.includes('dashain') || lower.includes('drupka')) return fallbackResponses.festivals;
    
    // Food
    if (lower.includes('food') || lower.includes('eat') || lower.includes('cuisine') || lower.includes('momo') || lower.includes('thukpa')) return fallbackResponses.food;
    
    // Booking
    if (lower.includes('booking') || lower.includes('reserve') || lower.includes('ticket') || lower.includes('package')) return fallbackResponses.booking;
    
    // Offline
    if (lower.includes('offline') || lower.includes('download') || lower.includes('bluetooth') || lower.includes('cache')) return fallbackResponses.offline;
    
    return fallbackResponses.default;
  };

  try {
    // Try Groq API first
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
      const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `
MysticSikkim AI Assistant - SIH 2025

Purpose:
- Guide about Sikkim monasteries, tourism, festivals, food, and culture.
- Answer FAQs about MysticSikkim platform (360° tours, interactive maps, artifact archives, event calendar, audio guides, artisan store, booking flow).
- Explain offline/cached access (PWA + IndexedDB) and last-mile content transfer (Bluetooth simulation).
- Redirect politely if a question is unrelated to Sikkim or MysticSikkim.

Personality & Tone:
- Warm, respectful, culturally aware.
- Concise but informative (2-4 sentences unless depth requested).
- If unsure, say: “I’m not sure, but MysticSikkim archives may have more details.”

Demo & MVP Flow Awareness:
- 360° tours and interactive map selections.
- Offline cached tours and festival calendar.
- Artifact authenticity proof via IPFS CID + blockchain (testnet).
- Artisan store → product listing, cart, checkout → commission calculation.
- Booking API → select event, fill details, pay (test) → booking confirmation.
- WhatsApp sandbox → automated confirmations & reminders.
- Bluetooth demo → simulate last-mile manifest transfer.
- Admin console → upload content, manage artifacts, artisan products, booking.

Special Behaviors:
- "What can you do?" → list MysticSikkim features.
- Travel questions → give Sikkim travel tips (weather, best season, permits, etiquette).
- Unrelated questions → reply: "I specialize in Sikkim heritage & MysticSikkim. Would you like to explore that instead?"
- Commission / revenue → explain small transaction fee (₹10 per ₹1000) & ledger demo.
- Artifact authenticity → IPFS + blockchain anchoring (testnet).
- Offline access → PWA + IndexedDB, last-mile transfer via Bluetooth.

Common Questions:
1. Artisan payouts & protection → backend ledger, test payouts, artisan dashboard.
2. Artifact authenticity → IPFS CID + blockchain (testnet).
3. Offline access → cached tours/calendar + Bluetooth transfer simulation.
4. Monastery permissions → MoU & consent templates.
5. Revenue model → small transaction commission, premium access, sponsorships.
6. Cultural sensitivity → access levels (public / premium / restricted), cultural council moderation.

Metrics & KPIs:
- Monasteries digitized (demo: 2; target 20 in 6 months)
- Virtual tour views (unique users)
- Conversion %: view → booking (target 5–10%)
- Artisan listings live & sales count
- Offline downloads / cached tours count
- Commission collected (simulated) & seed funds for preservation
- Time-to-onboard a monastery (<48 hrs for metadata + basic tour)
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.6,
      max_completion_tokens: 500,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a response.";

   
    saveChatLog(message, reply);

      res.json({ reply });
    } else {
      // Use fallback response
      const reply = getResponse(message);
      saveChatLog(message, reply);
      res.json({ reply });
    }
  } catch (err) {
    console.error("Groq API Error, using fallback:", err);
    // Use fallback response on error
    const reply = getResponse(message);
    saveChatLog(message, reply);
    res.json({ reply });
  }
});

export default chatrouter;

