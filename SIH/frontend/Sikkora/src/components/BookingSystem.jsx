import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Star, Phone, ExternalLink, Bed, Camera, Mountain, Utensils } from 'lucide-react';

export default function BookingSystem() {
  const [selectedCategory, setSelectedCategory] = useState('hotels');
  const [selectedDates, setSelectedDates] = useState({ checkin: '', checkout: '' });
  const [guests, setGuests] = useState(2);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = {
    hotels: {
      name: 'Hotels & Accommodation',
      icon: Bed,
      items: [
        {
          name: 'The Elgin Nor-Khill',
          location: 'Gangtok',
          rating: 4.8,
          price: '₹8,500/night',
          image: '/images/hotel1.jpg',
          amenities: ['WiFi', 'Restaurant', 'Spa', 'Mountain View'],
          phone: '+91-3592-205637',
          website: 'www.elginhotels.com',
          description: 'Luxury heritage hotel with stunning Himalayan views'
        },
        {
          name: 'Mayfair Spa Resort & Casino',
          location: 'Gangtok',
          rating: 4.6,
          price: '₹12,000/night',
          image: '/images/hotel2.jpg',
          amenities: ['Casino', 'Spa', 'Pool', 'Fine Dining'],
          phone: '+91-3592-270301',
          website: 'www.mayfairhotels.com',
          description: 'Premium resort with world-class facilities'
        },
        {
          name: 'Hotel Tashidelek',
          location: 'Gangtok',
          rating: 4.3,
          price: '₹4,500/night',
          image: '/images/hotel3.jpg',
          amenities: ['Restaurant', 'WiFi', 'City View', 'Room Service'],
          phone: '+91-3592-202038',
          website: 'www.hoteltashidelek.com',
          description: 'Comfortable stay in the heart of Gangtok'
        },
        {
          name: 'Norbu Ghang Resort',
          location: 'Pelling',
          rating: 4.5,
          price: '₹6,000/night',
          image: '/images/hotel4.jpg',
          amenities: ['Mountain View', 'Restaurant', 'Garden', 'WiFi'],
          phone: '+91-3595-250296',
          website: 'www.norbugang.com',
          description: 'Serene resort with Kanchenjunga views'
        }
      ]
    },
    activities: {
      name: 'Tours & Activities',
      icon: Camera,
      items: [
        {
          name: 'Monastery Heritage Tour',
          location: 'Multiple Locations',
          rating: 4.9,
          price: '₹2,500/person',
          duration: 'Full Day',
          includes: ['Transport', 'Guide', 'Entry Fees', 'Lunch'],
          phone: '+91-9832123456',
          website: 'www.sikkimtours.com',
          description: 'Visit Rumtek, Enchey, and Ganesh Tok monasteries'
        },
        {
          name: 'Tsomgo Lake & Baba Mandir',
          location: 'East Sikkim',
          rating: 4.7,
          price: '₹3,500/person',
          duration: '8 Hours',
          includes: ['Shared Taxi', 'Permits', 'Guide'],
          phone: '+91-9832654321',
          website: 'www.sikkimadventure.com',
          description: 'Sacred lake and revered shrine visit'
        },
        {
          name: 'Nathula Pass Border Tour',
          location: 'Indo-China Border',
          rating: 4.6,
          price: '₹4,000/person',
          duration: 'Full Day',
          includes: ['Transport', 'Permits', 'Guide', 'Lunch'],
          phone: '+91-9832987654',
          website: 'www.bordertoursikkim.com',
          description: 'Historic Silk Route and border experience'
        },
        {
          name: 'Pelling Monastery Circuit',
          location: 'West Sikkim',
          rating: 4.8,
          price: '₹2,800/person',
          duration: '6 Hours',
          includes: ['Transport', 'Guide', 'Entry Fees'],
          phone: '+91-9832111222',
          website: 'www.pellingsightseeing.com',
          description: 'Pemayangtse and Sangachoeling monasteries'
        }
      ]
    },
    trekking: {
      name: 'Trekking & Adventure',
      icon: Mountain,
      items: [
        {
          name: 'Goecha La Trek',
          location: 'Yuksom to Goecha La',
          rating: 4.9,
          price: '₹15,000/person',
          duration: '8 Days',
          difficulty: 'Moderate to Difficult',
          includes: ['Guide', 'Porter', 'Meals', 'Camping'],
          phone: '+91-9832333444',
          website: 'www.sikkimtrekking.com',
          description: 'Ultimate Kanchenjunga base camp trek'
        },
        {
          name: 'Dzongri Trek',
          location: 'Yuksom to Dzongri',
          rating: 4.7,
          price: '₹12,000/person',
          duration: '5 Days',
          difficulty: 'Moderate',
          includes: ['Guide', 'Meals', 'Camping', 'Permits'],
          phone: '+91-9832555666',
          website: 'www.himalayantrek.com',
          description: 'Rhododendron forests and mountain views'
        }
      ]
    },
    dining: {
      name: 'Local Dining',
      icon: Utensils,
      items: [
        {
          name: 'Taste of Tibet',
          location: 'MG Road, Gangtok',
          rating: 4.6,
          price: '₹800/person',
          cuisine: 'Tibetan & Sikkimese',
          speciality: 'Momos, Thukpa, Gundruk',
          phone: '+91-3592-225020',
          description: 'Authentic Tibetan cuisine in traditional setting'
        },
        {
          name: 'The Square Restaurant',
          location: 'Mahatma Gandhi Marg',
          rating: 4.4,
          price: '₹1,200/person',
          cuisine: 'Multi-cuisine',
          speciality: 'Continental, Indian, Chinese',
          phone: '+91-3592-203025',
          description: 'Fine dining with panoramic city views'
        }
      ]
    }
  };

  const fetchGoogleResults = async (category, location = 'Sikkim') => {
    setIsLoading(true);
    
    // Simulate Google Places API call
    setTimeout(() => {
      const results = categories[category].items.map(item => ({
        ...item,
        availability: Math.random() > 0.3 ? 'Available' : 'Limited',
        bookingUrl: `https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + location + ' booking')}`
      }));
      
      setSearchResults(results);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchGoogleResults(selectedCategory);
  }, [selectedCategory]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    insurance: false,
    cancellation: false,
    groupDiscount: false,
    loyaltyPoints: 0
  });

  const handleBooking = (item) => {
    setSelectedItem(item);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    let bookingUrl;
    const params = new URLSearchParams({
      checkin: selectedDates.checkin,
      checkout: selectedDates.checkout,
      guests: guests,
      insurance: bookingDetails.insurance,
      cancellation: bookingDetails.cancellation
    });
    
    if (selectedCategory === 'hotels') {
      switch (selectedItem.name) {
        case 'The Elgin Nor-Khill':
          bookingUrl = `https://www.elginhotels.com/elgin-nor-khill-gangtok/?${params}`;
          break;
        case 'Mayfair Spa Resort & Casino':
          bookingUrl = `https://www.mayfairhotels.com/mayfair-gangtok/?${params}`;
          break;
        case 'Hotel Tashidelek':
          bookingUrl = `https://www.booking.com/hotel/in/tashidelek.html?${params}`;
          break;
        case 'Norbu Ghang Resort':
          bookingUrl = `https://www.norbugang.com/?${params}`;
          break;
        default:
          bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(selectedItem.name)}&${params}`;
      }
    } else if (selectedCategory === 'activities') {
      bookingUrl = `https://www.thrillophilia.com/tours/sikkim?q=${encodeURIComponent(selectedItem.name)}&${params}`;
    } else if (selectedCategory === 'trekking') {
      bookingUrl = `https://www.indiahikes.com/sikkim-treks?search=${encodeURIComponent(selectedItem.name)}&${params}`;
    } else {
      bookingUrl = `https://www.zomato.com/gangtok/restaurants?q=${encodeURIComponent(selectedItem.name)}&${params}`;
    }
    
    // Save booking to user profile
    const booking = {
      id: Date.now(),
      item: selectedItem,
      dates: selectedDates,
      guests: guests,
      details: bookingDetails,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    const savedBookings = JSON.parse(localStorage.getItem('sikkora_bookings') || '[]');
    savedBookings.push(booking);
    localStorage.setItem('sikkora_bookings', JSON.stringify(savedBookings));
    
    window.open(bookingUrl, '_blank');
    setShowBookingModal(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-red-950 to-amber-900 rounded-3xl overflow-hidden border-2 border-yellow-400/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Booking & Reservations</h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-white text-red-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {React.createElement(category.icon, { className: "w-4 h-4" })}
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search Filters */}
      <div className="p-6 bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Check-in Date</label>
            <input
              type="date"
              value={selectedDates.checkin}
              onChange={(e) => setSelectedDates(prev => ({ ...prev, checkin: e.target.value }))}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/30 rounded-lg text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Check-out Date</label>
            <input
              type="date"
              value={selectedDates.checkout}
              onChange={(e) => setSelectedDates(prev => ({ ...prev, checkout: e.target.value }))}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/30 rounded-lg text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/30 rounded-lg text-white focus:outline-none focus:border-yellow-400"
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num} className="bg-red-900">{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="flex items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-4 text-white text-lg">Searching available options...</span>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {searchResults.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image placeholder */}
                    <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-yellow-600 to-amber-700 rounded-xl flex items-center justify-center">
                      {React.createElement(categories[selectedCategory].icon, { className: "w-12 h-12 text-white" })}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-200">{item.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white font-medium">{item.rating}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.availability === 'Available' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-orange-500/20 text-orange-300'
                          }`}>
                            {item.availability}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-3">{item.description}</p>
                      
                      {/* Amenities/Includes */}
                      {(item.amenities || item.includes) && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(item.amenities || item.includes).map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-yellow-500/20 text-yellow-200 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        {item.duration && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-yellow-400" />
                            <span className="text-white">Duration: {item.duration}</span>
                          </div>
                        )}
                        {item.difficulty && (
                          <div className="flex items-center gap-2">
                            <Mountain className="w-4 h-4 text-yellow-400" />
                            <span className="text-white">Difficulty: {item.difficulty}</span>
                          </div>
                        )}
                        {item.cuisine && (
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-yellow-400" />
                            <span className="text-white">Cuisine: {item.cuisine}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-green-400">{item.price}</span>
                          {selectedCategory === 'hotels' && (
                            <span className="text-white/60 ml-2">per night</span>
                          )}
                        </div>
                        
                        <div className="flex gap-3">
                          <motion.a
                            href={`tel:${item.phone}`}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </motion.a>
                          
                          <motion.button
                            onClick={() => handleBooking(item)}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-full hover:from-yellow-700 hover:to-amber-700 transition-all font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Book Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advanced Booking Modal */}
      {showBookingModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            className="bg-gradient-to-br from-red-900 to-amber-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Complete Your Booking</h2>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{selectedItem.name}</h3>
                <p className="text-yellow-200 mb-4">{selectedItem.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">{selectedItem.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white">{selectedItem.rating}</span>
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4 mb-6">
                <h4 className="text-white font-bold">Premium Add-ons</h4>
                
                <label className="flex items-center gap-3 p-4 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                  <input
                    type="checkbox"
                    checked={bookingDetails.insurance}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, insurance: e.target.checked }))}
                    className="w-5 h-5 text-yellow-600"
                  />
                  <div>
                    <div className="text-white font-medium">Travel Insurance (+₹500)</div>
                    <div className="text-white/60 text-sm">Comprehensive coverage for your journey</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                  <input
                    type="checkbox"
                    checked={bookingDetails.cancellation}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, cancellation: e.target.checked }))}
                    className="w-5 h-5 text-yellow-600"
                  />
                  <div>
                    <div className="text-white font-medium">Free Cancellation (+₹200)</div>
                    <div className="text-white/60 text-sm">Cancel up to 24 hours before</div>
                  </div>
                </label>

                {guests >= 4 && (
                  <label className="flex items-center gap-3 p-4 bg-green-600/20 border border-green-400/30 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingDetails.groupDiscount}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, groupDiscount: e.target.checked }))}
                      className="w-5 h-5 text-green-600"
                    />
                    <div>
                      <div className="text-green-300 font-medium">Group Discount (-15%)</div>
                      <div className="text-green-200 text-sm">Available for 4+ travelers</div>
                    </div>
                  </label>
                )}

                <div className="p-4 bg-purple-600/20 border border-purple-400/30 rounded-xl">
                  <div className="text-purple-300 font-medium mb-2">Loyalty Points</div>
                  <div className="text-white/80 text-sm">Earn 250 points with this booking • Use 500 points for ₹100 off</div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-black/20 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center text-white mb-2">
                  <span>Base Price:</span>
                  <span>{selectedItem.price}</span>
                </div>
                {bookingDetails.insurance && (
                  <div className="flex justify-between items-center text-white/80 mb-2">
                    <span>Travel Insurance:</span>
                    <span>+₹500</span>
                  </div>
                )}
                {bookingDetails.cancellation && (
                  <div className="flex justify-between items-center text-white/80 mb-2">
                    <span>Free Cancellation:</span>
                    <span>+₹200</span>
                  </div>
                )}
                {bookingDetails.groupDiscount && (
                  <div className="flex justify-between items-center text-green-400 mb-2">
                    <span>Group Discount:</span>
                    <span>-15%</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between items-center text-white font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-400">₹{Math.round(parseInt(selectedItem.price.replace(/[^0-9]/g, '')) * (bookingDetails.groupDiscount ? 0.85 : 1) + (bookingDetails.insurance ? 500 : 0) + (bookingDetails.cancellation ? 200 : 0))}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 bg-white/10 border-2 border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={confirmBooking}
                  className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold rounded-xl hover:from-yellow-700 hover:to-amber-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm Booking
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}