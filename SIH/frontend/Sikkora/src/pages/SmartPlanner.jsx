import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Calendar, MapPin, Users, Clock, Star, Zap, Route, Camera, Utensils } from 'lucide-react';

export default function SmartPlanner() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    duration: '',
    interests: [],
    budget: '',
    groupSize: 1,
    travelStyle: '',
    season: ''
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const interests = [
    { id: 'spiritual', name: 'Spiritual Experience', icon: '🙏' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'trekking', name: 'Trekking', icon: '🥾' },
    { id: 'culture', name: 'Cultural Learning', icon: '📚' },
    { id: 'meditation', name: 'Meditation', icon: '🧘' },
    { id: 'festivals', name: 'Festivals', icon: '🎭' }
  ];

  const generateItinerary = () => {
    const mockPlan = {
      title: 'Sacred Sikkim Spiritual Journey',
      duration: preferences.duration,
      totalCost: '₹25,000',
      days: [
        {
          day: 1,
          title: 'Arrival & Gangtok Exploration',
          activities: [
            { time: '10:00 AM', activity: 'Arrival at Bagdogra Airport', location: 'Bagdogra' },
            { time: '2:00 PM', activity: 'Check-in at The Elgin Nor-Khill', location: 'Gangtok' },
            { time: '4:00 PM', activity: 'Visit Enchey Monastery', location: 'Enchey' },
            { time: '7:00 PM', activity: 'Dinner at Taste of Tibet', location: 'MG Road' }
          ]
        },
        {
          day: 2,
          title: 'Rumtek Monastery Experience',
          activities: [
            { time: '8:00 AM', activity: 'Morning meditation session', location: 'Hotel' },
            { time: '10:00 AM', activity: 'Rumtek Monastery tour with guide', location: 'Rumtek' },
            { time: '1:00 PM', activity: 'Traditional lunch with monks', location: 'Rumtek' },
            { time: '4:00 PM', activity: 'Photography session', location: 'Rumtek' },
            { time: '6:00 PM', activity: 'Evening prayers participation', location: 'Rumtek' }
          ]
        },
        {
          day: 3,
          title: 'Pemayangtse & Tashiding',
          activities: [
            { time: '7:00 AM', activity: 'Drive to Pelling', location: 'Pelling' },
            { time: '11:00 AM', activity: 'Pemayangtse Monastery visit', location: 'Pemayangtse' },
            { time: '2:00 PM', activity: 'Lunch with mountain views', location: 'Pelling' },
            { time: '4:00 PM', activity: 'Tashiding sacred site visit', location: 'Tashiding' },
            { time: '7:00 PM', activity: 'Sunset meditation', location: 'Tashiding' }
          ]
        }
      ],
      recommendations: [
        'Best time to visit: March-May for clear mountain views',
        'Carry warm clothes for early morning monastery visits',
        'Respect photography restrictions in sacred areas',
        'Book accommodations in advance during festival seasons'
      ]
    };
    setGeneratedPlan(mockPlan);
    setStep(4);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent">
              AI Smart Planner
            </h1>
          </div>
          <p className="text-xl text-white/80">Let AI create your perfect Sikkim monastery journey</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`flex items-center ${num < 4 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= num ? 'bg-yellow-500 text-black' : 'bg-white/20 text-white/60'
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step > num ? 'bg-yellow-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-white/60">
            <span>Preferences</span>
            <span>Interests</span>
            <span>Details</span>
            <span>Your Plan</span>
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-yellow-400/20">
              <h2 className="text-2xl font-bold text-white mb-8">Tell us about your journey</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-3">Trip Duration</label>
                  <select
                    value={preferences.duration}
                    onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="" className="bg-red-900">Select duration</option>
                    <option value="2-3 days" className="bg-red-900">2-3 days</option>
                    <option value="4-5 days" className="bg-red-900">4-5 days</option>
                    <option value="1 week" className="bg-red-900">1 week</option>
                    <option value="2 weeks" className="bg-red-900">2 weeks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Budget Range</label>
                  <select
                    value={preferences.budget}
                    onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="" className="bg-red-900">Select budget</option>
                    <option value="budget" className="bg-red-900">Budget (₹10,000-20,000)</option>
                    <option value="mid-range" className="bg-red-900">Mid-range (₹20,000-40,000)</option>
                    <option value="luxury" className="bg-red-900">Luxury (₹40,000+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Group Size</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={preferences.groupSize}
                    onChange={(e) => setPreferences(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                    className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                    placeholder="Number of travelers"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Travel Style</label>
                  <select
                    value={preferences.travelStyle}
                    onChange={(e) => setPreferences(prev => ({ ...prev, travelStyle: e.target.value }))}
                    className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="" className="bg-red-900">Select style</option>
                    <option value="relaxed" className="bg-red-900">Relaxed & Spiritual</option>
                    <option value="adventure" className="bg-red-900">Adventure & Trekking</option>
                    <option value="cultural" className="bg-red-900">Cultural Immersion</option>
                    <option value="photography" className="bg-red-900">Photography Focus</option>
                  </select>
                </div>
              </div>

              <motion.button
                onClick={() => setStep(2)}
                disabled={!preferences.duration || !preferences.budget}
                className="mt-8 w-full py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Interests
              </motion.button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-yellow-400/20">
              <h2 className="text-2xl font-bold text-white mb-8">What interests you most?</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {interests.map((interest) => (
                  <motion.button
                    key={interest.id}
                    onClick={() => {
                      const newInterests = preferences.interests.includes(interest.id)
                        ? preferences.interests.filter(i => i !== interest.id)
                        : [...preferences.interests, interest.id];
                      setPreferences(prev => ({ ...prev, interests: newInterests }));
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      preferences.interests.includes(interest.id)
                        ? 'bg-yellow-500/20 border-yellow-400'
                        : 'bg-white/10 border-white/20 hover:border-yellow-400/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">{interest.icon}</div>
                    <div className="text-white font-medium text-sm">{interest.name}</div>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-white/10 border-2 border-white/20 text-white font-medium rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={() => setStep(3)}
                  disabled={preferences.interests.length === 0}
                  className="flex-1 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold rounded-2xl disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-yellow-400/20">
              <h2 className="text-2xl font-bold text-white mb-8">Final details</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-white font-medium mb-3">Preferred Season</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                      <motion.button
                        key={season}
                        onClick={() => setPreferences(prev => ({ ...prev, season }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          preferences.season === season
                            ? 'bg-yellow-500/20 border-yellow-400'
                            : 'bg-white/10 border-white/20 hover:border-yellow-400/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-white font-medium">{season}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-600/20 border border-blue-400/30 rounded-xl p-6">
                  <h3 className="text-blue-300 font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Recommendations Preview
                  </h3>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p>• Based on your interests, we'll include spiritual experiences and cultural learning</p>
                    <p>• {preferences.duration} itinerary with {preferences.budget} budget optimization</p>
                    <p>• Customized for {preferences.groupSize} traveler{preferences.groupSize > 1 ? 's' : ''}</p>
                    <p>• {preferences.travelStyle} style journey with premium accommodations</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-white/10 border-2 border-white/20 text-white font-medium rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={generateItinerary}
                  className="flex-1 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate My Plan
                </motion.button>
              </div>
            </div>
          )}

          {step === 4 && generatedPlan && (
            <div className="space-y-6">
              {/* Plan Header */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 backdrop-blur-md rounded-3xl p-8 border-2 border-yellow-400/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{generatedPlan.title}</h2>
                    <div className="flex items-center gap-6 text-white/80">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{generatedPlan.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{preferences.groupSize} traveler{preferences.groupSize > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-green-400 font-bold">{generatedPlan.totalCost}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book This Plan
                  </motion.button>
                </div>
              </div>

              {/* Daily Itinerary */}
              <div className="space-y-4">
                {generatedPlan.days.map((day) => (
                  <motion.div
                    key={day.day}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: day.day * 0.1 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Day {day.day}: {day.title}
                    </h3>
                    <div className="space-y-3">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-black/20 rounded-xl">
                          <div className="flex items-center gap-2 min-w-0">
                            <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <span className="text-yellow-200 font-medium">{activity.time}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.activity}</p>
                            <p className="text-white/60 text-sm">{activity.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-bold text-white mb-4">AI Recommendations</h3>
                <div className="space-y-2">
                  {generatedPlan.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-white/80">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => setStep(1)}
                className="w-full py-4 bg-white/10 border-2 border-white/20 text-white font-medium rounded-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Another Plan
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}