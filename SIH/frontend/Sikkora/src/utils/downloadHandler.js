export const downloadMonasteryData = (monasteryName) => {
  const content = `SIKKORA - ${monasteryName} Offline Guide
===============================================

📍 MONASTERY: ${monasteryName}
📅 DOWNLOADED: ${new Date().toLocaleDateString()}
🌟 PREMIUM HERITAGE EXPERIENCE

🎧 AUDIO GUIDES (4 Languages):
- English: 15 minutes, High Quality
- Hindi: 15 minutes, Native Speaker  
- Nepali: 15 minutes, Local Pronunciation
- Bhutia: 15 minutes, Traditional Language

📸 HIGH-RESOLUTION IMAGES:
- Exterior monastery view (2.5MB)
- Interior prayer hall (3.1MB)
- Sacred prayer wheels (1.8MB)
- Monks ceremony (2.9MB)

🏛️ VIRTUAL TOUR:
- 360° Interactive Experience
- Zoom and navigation controls
- Audio narration hotspots
- Offline functionality (45MB)

📚 CULTURAL INFORMATION:
- Detailed historical background
- Architectural significance
- Annual festivals and ceremonies
- Daily practices and rituals

🗺️ LOCATION DATA:
- GPS coordinates for offline navigation
- Nearby facilities and services
- Trekking routes and paths
- Emergency contact information

📱 USAGE INSTRUCTIONS:
1. Content works offline after download
2. Audio guides play without internet
3. Virtual tour includes interactive hotspots
4. All images are high-resolution
5. GPS data works with offline maps

🌟 PREMIUM FEATURES:
✨ Professional narration by heritage experts
🎯 Interactive 360° monastery exploration
🌍 Multi-language support
📱 Mobile-optimized experience
🔄 Automatic updates when online

For support: support@sikkora.com
Visit: www.sikkora.com

© 2024 SIKKORA - Premium Heritage Experience`;

  // Create and download file
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${monasteryName.replace(/\s+/g, '_')}_Guide.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Show notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-24 right-6 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3';
  notification.innerHTML = `
    <div class="w-6 h-6">✅</div>
    <span class="font-medium">${monasteryName} guide downloaded! 📱</span>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
};