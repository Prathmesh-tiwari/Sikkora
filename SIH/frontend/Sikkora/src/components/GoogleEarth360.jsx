import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function GoogleEarth360() {
  const [selectedLocation, setSelectedLocation] = useState('rumtek');

  const locations = {
    rumtek: {
      name: 'Rumtek Monastery',
      coords: { lat: 27.3059105, lng: 88.5362892 },
      description: 'The Dharma Chakra Centre - Seat of the Karmapa',
      streetViewUrl: 'https://www.google.com/maps/place/Rumtek,+Sikkim+737135/@27.3059105,88.5362892,3a,75y,59.62h,86.8t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDsjrrfYA!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6Ha11wGbe89IF-zxH3WGCiSU0rUwS7M_JXBG5awZspx-11I_EhjwpqEEqJOpLeIXfufNHwhP9NvO9GiM9e6fZS2ddPjeyiewEI6vmvHaIUL5K2rd_FqzBQMV1f6uR3TooN4sGMGw%3Dw900-h600-k-no-pi3.196217261283337-ya125.61967897821222-ro0-fo100!7i8704!8i4352!4m15!1m8!3m7!1s0x39e6a3a012c5e107:0xba94d4c4385ff03!2sRumtek,+Sikkim+737135!3b1!8m2!3d27.3059105!4d88.5362892!16s%2Fg%2F1tjgyskn!3m5!1s0x39e6a3a012c5e107:0xba94d4c4385ff03!8m2!3d27.3059105!4d88.5362892!16s%2Fg%2F1tjgyskn?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D'
    },
    pemayangtse: {
      name: 'Pemayangtse Monastery',
      coords: { lat: 27.303354, lng: 88.253716 },
      description: 'Perfect Sublime Lotus - Ancient Nyingma Monastery',
      streetViewUrl: 'https://www.google.com/maps/place/Pemayangtse+Monastery,+Sikkim+737111/@27.3042603,88.3015366,3a,75y,268.78h,90t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICE7IqDxQE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HaFgQCWFbvQJAxa_5ZjrhRDjRuB2KFJEqipxJPkOED8i4zojjQIWCVcv5tXdHgeIJm-EQkHq7PPatPF8f-JUfhsCKMTXMFeLC2Icz_OIKbbI5s1p4XiltuPYT3-yzllLEegfoJdyQ%3Dw900-h600-k-no-pi0-ya268.7781-ro0-fo100!7i5660!8i2830!4m15!1m8!3m7!1s0x39e6842d294c8d71:0x5ff926244a424543!2sPemayangtse+Monastery,+Sikkim+737111!3b1!8m2!3d27.303354!4d88.253716!16s%2Fg%2F12ht_zg59!3m5!1s0x39e6842d294c8d71:0x5ff926244a424543!8m2!3d27.303354!4d88.253716!16s%2Fg%2F12ht_zg59?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D'
    },
    enchey: {
      name: 'Enchey Monastery',
      coords: { lat: 27.3359368, lng: 88.6191659 },
      description: 'The Solitary Temple - Peaceful Mountain Retreat',
      streetViewUrl: 'https://www.google.com/maps/place/Enchey+Monastery/@27.3359368,88.6191659,3a,75y,44.02h,90t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICJsMq39gE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HbhgHWqY_Y0gGXAUxE0yTz2dr9tZQl3e-7e5TJI6EsS7H3CLmrDcKwV_O2UfejzfNWH8mkyf96t-eQTBNQVuTW0APMRUz7iCI3UN0sbzO9wFXWr10eXruCKwoLGCKmwXvUt1_5Q%3Dw900-h600-k-no-pi0-ya44.015686-ro0-fo100!7i6080!8i3040!4m14!1m7!3m6!1s0x39e6ba848fe4b38f:0xf1c23957008e31e8!2sEnchey+Monastery!8m2!3d27.3359368!4d88.6191659!16zL20vMDZyZDM1!3m5!1s0x39e6ba848fe4b38f:0xf1c23957008e31e8!8m2!3d27.3359368!4d88.6191659!16zL20vMDZyZDM1?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D'
    },
    tashiding: {
      name: 'Tashiding Monastery',
      coords: { lat: 27.3089308, lng: 88.2978746 },
      description: 'The Devoted Central Glory - Sacred Hilltop Monastery',
      streetViewUrl: 'https://www.google.com/maps/place/Tashiding+Monastery/@27.3089194,88.2978798,3a,75y,337.75h,90t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICEzsO3Ig!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HbJVhzv3yXqK8CnJew70hASxXA5AJOPwXncNFooLJpGJYkcCcdNUUog32MhkUDJrN-oyACG9YDtShD_MQP8wuCSvfnJRjQAGF-b6kLUUM-a45iYiqYKIzMNpmwIrSEdOvhsRG7m%3Dw900-h600-k-no-pi0-ya195.7484-ro0-fo100!7i8704!8i4352!4m14!1m7!3m6!1s0x39e685fca06dc171:0x92150f5f129db887!2sTashiding+Monastery!8m2!3d27.3089308!4d88.2978746!16s%2Fm%2F09glmyd!3m5!1s0x39e685fca06dc171:0x92150f5f129db887!8m2!3d27.3089308!4d88.2978746!16s%2Fm%2F09glmyd?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D'
    },
    dubdi: {
      name: 'Dubdi Monastery',
      coords: { lat: 27.3665529, lng: 88.2299922 },
      description: 'The First Monastery of Sikkim - Historical Foundation',
      streetViewUrl: 'https://www.google.com/maps/place/Dubdi+Buddhist+Monastery+-+Yuksom,+West+Sikkim+District,+Sikkim,+India/@27.3665529,88.2299922,3a,75y,326.36h,90t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDUity16wE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6Hb65tXgHDYeoi0gPvxIWnhJWh3zXiwSk8I_o7X_iqrLos57LO1IyV68PSiMXqudoir59-2Bd5yiMgECA0MSOZZgBza6ub_Zo8CXx8gVcv8ScHU5rfSoP1d_MjOGSOzI5ocqdJEBxQ%3Dw900-h600-k-no-pi0-ya267.35718-ro0-fo100!7i10240!8i5120!4m10!1m2!2m1!1sDubdi+Monastery!3m6!1s0x39e688bc40b54c35:0x9be6bac98c197ef0!8m2!3d27.3665529!4d88.2299922!15sCg9EdWJkaSBNb25hc3RlcnmSAQltb25hc3RlcnmqATcQATIeEAEiGmawjqJOClXC_fbnkPsoCuDJmYow03nb_s8GMhMQAiIPZHViZGkgbW9uYXN0ZXJ54AEA!16s%2Fg%2F11c5sr412g?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D'
    },
    lingdum: {
      name: 'Lingdum Monastery',
      coords: { lat: 27.3311957, lng: 88.5790387 },
      description: 'The Modern Spiritual Haven - Contemporary Buddhist Center',
      streetViewUrl: 'https://www.google.com/maps/place/Pal+Karma+Zurmang+Shedup+Chokhor+Ling+Lingdum+Monastery+(Ranka+Monastery)/@27.331186,88.5790941,3a,75y,281.1h,90t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICMuObdrgE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HZXGywv8vri3SSZfH2NNDH9zLuZvnz39ATbWFS0krsLtzXCCkARHfSpwOd7I3Wk9M6O6v4gOcXUc36IcTusfwm9m3AZ2Qj9PFHzgIOyFze4MKSsuogE8kDdf7ev7Uo8i9yefzCYPw%3Dw900-h600-k-no-pi0-ya273.10345-ro0-fo100!7i8704!8i4352!4m14!1m7!3m6!1s0x39e6a4ea90097ab7:0xe9dad44d6bbcc5ec!2sPal+Karma+Zurmang+Shedup+Chokhor+Ling+Lingdum+Monastery+(Ranka+Monastery)!8m2!3d27.3311957!4d88.5790387!16s%2Fm%2F0cp1g9p!3m5!1s0x39e6a4ea90097ab7:0xe9dad44d6bbcc5ec!8m2!3d27.3311957!4d88.5790387!16s%2Fm%2F0cp1g9p?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D'
    }
  };

  const open360View = (location) => {
    window.open(location.streetViewUrl, '_blank');
  };

  const openGoogleMaps = (location) => {
    const { lat, lng } = location.coords;
    const url = `https://www.google.com/maps/@${lat},${lng},15z`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full bg-gradient-to-br from-red-950 to-amber-900 rounded-3xl overflow-hidden border-2 border-yellow-400/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-white" />
            <h3 className="text-white font-bold text-lg">Google Street View 360°</h3>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm">{locations[selectedLocation].name}</span>
          </div>
        </div>
      </div>

      {/* Location Selector */}
      <div className="p-6 bg-black/20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(locations).map(([key, location]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedLocation(key)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedLocation === key
                  ? 'bg-yellow-500/20 border-2 border-yellow-400'
                  : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="text-white font-medium text-sm">{location.name}</h4>
              <p className="text-yellow-200 text-xs mt-1">{location.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Location Display */}
      <div className="p-6">
        <motion.div
          key={selectedLocation}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{locations[selectedLocation].name}</h3>
              <p className="text-yellow-200">{locations[selectedLocation].description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-black/20 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2">Coordinates</h4>
              <p className="text-yellow-200 text-sm">
                Lat: {locations[selectedLocation].coords.lat}°<br/>
                Lng: {locations[selectedLocation].coords.lng}°
              </p>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2">Experience</h4>
              <p className="text-yellow-200 text-sm">
                360° Street View<br/>
                Interactive Navigation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => open360View(locations[selectedLocation])}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              Open 360° Street View
            </motion.button>
            
            <motion.button
              onClick={() => openGoogleMaps(locations[selectedLocation])}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-4 h-4" />
              Open in Google Maps
            </motion.button>
            
            <motion.button
              onClick={() => {
                const coords = locations[selectedLocation].coords;
                navigator.clipboard.writeText(`${coords.lat}, ${coords.lng}`);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 border-2 border-yellow-400/30 text-white rounded-full hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-4 h-4" />
              Copy Coordinates
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Preview Section */}
      <div className="p-6 bg-black/20">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          360° Virtual Experience
        </h4>
        <div className="bg-gradient-to-br from-yellow-600/10 to-amber-700/10 rounded-xl p-6 border border-yellow-400/20">
          <p className="text-white/80 mb-4">
            Experience {locations[selectedLocation].name} in full 360° immersive view using Google Street View technology. 
            Navigate around the monastery grounds and explore the sacred architecture from every angle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-3 text-center">
              <div className="text-green-300 text-sm font-medium">✓ Full 360° View</div>
            </div>
            <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-3 text-center">
              <div className="text-blue-300 text-sm font-medium">✓ Interactive Navigation</div>
            </div>
            <div className="bg-purple-600/20 border border-purple-400/30 rounded-lg p-3 text-center">
              <div className="text-purple-300 text-sm font-medium">✓ High Resolution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}