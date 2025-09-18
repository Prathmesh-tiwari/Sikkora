import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Bus, Plane, Train, MapPin, Clock, Star, Phone, ExternalLink } from 'lucide-react';

export default function TransportTourism() {
  const [selectedService, setSelectedService] = useState('transport');
  const [nearbyServices, setNearbyServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const transportOptions = [
    {
      type: 'Taxi/Cab',
      icon: Car,
      services: [
        { name: 'Sikkim Taxi Service', phone: '+91-9832123456', rating: 4.5, price: '₹15/km' },
        { name: 'Mountain Cab', phone: '+91-9832654321', rating: 4.3, price: '₹12/km' },
        { name: 'Himalayan Rides', phone: '+91-9832987654', rating: 4.7, price: '₹18/km' }
      ]
    },
    {
      type: 'Bus Service',
      icon: Bus,
      services: [
        { name: 'Sikkim Transport Corp', phone: '+91-3592-202033', rating: 4.0, price: '₹50-200' },
        { name: 'Private Bus Service', phone: '+91-9832111222', rating: 3.8, price: '₹80-300' }
      ]
    },
    {
      type: 'Airport Transfer',
      icon: Plane,
      services: [
        { name: 'Bagdogra Airport Shuttle', phone: '+91-9832333444', rating: 4.6, price: '₹1500' },
        { name: 'Premium Airport Transfer', phone: '+91-9832555666', rating: 4.8, price: '₹2000' }
      ]
    }
  ];

  const tourismServices = [
    {
      category: 'Tour Operators',
      services: [
        { 
          name: 'Sikkim Tourism Development Corporation',
          phone: '+91-3592-221634',
          rating: 4.4,
          speciality: 'Government certified tours',
          website: 'www.sikkimtourism.gov.in'
        },
        {
          name: 'Blue Poppy Tours',
          phone: '+91-9832777888',
          rating: 4.6,
          speciality: 'Monastery & Cultural Tours',
          website: 'www.bluepoppytours.com'
        },
        {
          name: 'Himalayan Holidays',
          phone: '+91-9832999000',
          rating: 4.5,
          speciality: 'Adventure & Trekking',
          website: 'www.himalayantours.in'
        }
      ]
    },
    {
      category: 'Local Guides',
      services: [
        {
          name: 'Pemba Sherpa - Cultural Guide',
          phone: '+91-9832111333',
          rating: 4.9,
          speciality: 'Buddhist Culture & Monasteries',
          languages: 'English, Hindi, Nepali, Bhutia'
        },
        {
          name: 'Tenzin Norbu - Heritage Guide',
          phone: '+91-9832444555',
          rating: 4.7,
          speciality: 'Historical Sites & Traditions',
          languages: 'English, Hindi, Tibetan'
        }
      ]
    }
  ];

  const fetchNearbyServices = async (serviceType) => {
    setIsLoading(true);
    // Simulate API call to Google Places
    setTimeout(() => {
      const mockServices = [
        { name: 'Local Transport Hub', distance: '0.5 km', rating: 4.2 },
        { name: 'Tourist Information Center', distance: '1.2 km', rating: 4.5 },
        { name: 'Monastery Tour Desk', distance: '0.8 km', rating: 4.7 }
      ];
      setNearbyServices(mockServices);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchNearbyServices(selectedService);
  }, [selectedService]);

  return (
    <div className="w-full bg-gradient-to-br from-red-950 to-amber-900 rounded-3xl overflow-hidden border-2 border-yellow-400/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Local Transport & Tourism Services</h2>
        <div className="flex gap-4">
          <motion.button
            onClick={() => setSelectedService('transport')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedService === 'transport'
                ? 'bg-white text-red-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Car className="w-5 h-5 inline mr-2" />
            Transport
          </motion.button>
          <motion.button
            onClick={() => setSelectedService('tourism')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedService === 'tourism'
                ? 'bg-white text-red-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-5 h-5 inline mr-2" />
            Tourism
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        {selectedService === 'transport' && (
          <div className="space-y-6">
            {transportOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{option.type}</h3>
                </div>
                
                <div className="space-y-3">
                  {option.services.map((service, idx) => (
                    <div key={idx} className="bg-black/20 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{service.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-yellow-200 text-sm">{service.rating}</span>
                          </div>
                          <span className="text-green-300 text-sm font-medium">{service.price}</span>
                        </div>
                      </div>
                      <motion.a
                        href={`tel:${service.phone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </motion.a>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedService === 'tourism' && (
          <div className="space-y-6">
            {tourismServices.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                
                <div className="space-y-4">
                  {category.services.map((service, idx) => (
                    <div key={idx} className="bg-black/20 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">{service.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-yellow-200 text-sm">{service.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.a
                            href={`tel:${service.phone}`}
                            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </motion.a>
                          {service.website && (
                            <motion.a
                              href={`https://${service.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit
                            </motion.a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-amber-200 text-sm mb-2">{service.speciality}</p>
                      {service.languages && (
                        <p className="text-yellow-300 text-xs">Languages: {service.languages}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Nearby Services */}
        <motion.div
          className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Nearby Services</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <motion.div
                className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {nearbyServices.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/20 rounded-xl p-3">
                  <div>
                    <h4 className="text-white font-medium">{service.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-blue-300 text-sm">{service.distance}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-yellow-200 text-sm">{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Directions
                  </motion.button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}