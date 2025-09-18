import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Camera, MapPin, Star, Users, Plus, Filter, Bookmark, CheckCircle, Upload, X } from 'lucide-react';

export default function Social() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [formData, setFormData] = useState({
    monastery: '',
    experience: '',
    rating: 0,
    photos: []
  });
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Priya Sharma', avatar: '👩', location: 'Mumbai' },
      monastery: 'Rumtek Monastery',
      image: '/images/rumtek.jpg',
      caption: 'Incredible spiritual experience at Rumtek! The morning prayers were absolutely divine. The monks chanting created such a peaceful atmosphere. 🙏',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      rating: 5
    },
    {
      id: 2,
      user: { name: 'David Chen', avatar: '👨', location: 'Singapore' },
      monastery: 'Pemayangtse Monastery',
      image: '/images/pemayagtse.jpg',
      caption: 'The architecture here is breathtaking! Perfect place for meditation and reflection. The 300-year-old monastery has so much history.',
      likes: 31,
      comments: 12,
      timeAgo: '5 hours ago',
      rating: 5
    },
    {
      id: 3,
      user: { name: 'Anjali Rai', avatar: '👩', location: 'Darjeeling' },
      monastery: 'Enchey Monastery',
      image: '/images/enchey.jpg',
      caption: 'Witnessed the most beautiful Cham dance performance today! Sikkim never fails to amaze. The colorful masks and traditional music were mesmerizing.',
      likes: 18,
      comments: 6,
      timeAgo: '1 day ago',
      rating: 4
    },
    {
      id: 4,
      user: { name: 'Rajesh Kumar', avatar: '👨', location: 'Delhi' },
      monastery: 'Tashiding Monastery',
      image: '/images/tashiding.jpg',
      caption: 'The sacred Bumchu ceremony was life-changing. Such powerful spiritual energy here! The holy water blessing was truly special. 🙏✨',
      likes: 42,
      comments: 15,
      timeAgo: '2 days ago',
      rating: 5
    },
    {
      id: 5,
      user: { name: 'Sarah Johnson', avatar: '👩', location: 'London' },
      monastery: 'Dubdi Monastery',
      image: '/images/dubdi.jpg',
      caption: 'First monastery in Sikkim! The peaceful atmosphere and ancient wisdom here is incredible. The trek up was worth every step.',
      likes: 28,
      comments: 9,
      timeAgo: '3 days ago',
      rating: 4
    },
    {
      id: 6,
      user: { name: 'Tenzin Norbu', avatar: '👨', location: 'Gangtok' },
      monastery: 'Lingdum Monastery',
      image: '/images/lingdim.jpg',
      caption: 'Modern monastery with traditional values. The meditation sessions here are transformative. Beautiful mountain views all around! 🏔️',
      likes: 35,
      comments: 11,
      timeAgo: '4 days ago',
      rating: 5
    },
    {
      id: 7,
      user: { name: 'Maria Rodriguez', avatar: '👩', location: 'Spain' },
      monastery: 'Ralang Monastery',
      image: '/images/ralang.jpg',
      caption: 'The Kagyu tradition is beautifully preserved here. Attended the morning prayers and felt such inner peace. Highly recommend! ✨',
      likes: 22,
      comments: 7,
      timeAgo: '5 days ago',
      rating: 4
    },
    {
      id: 8,
      user: { name: 'Karma Lama', avatar: '👨', location: 'Pelling' },
      monastery: 'Sanghak Choeling',
      image: '/images/sanghak.jpg',
      caption: 'Second oldest monastery in Sikkim with incredible views of Kanchenjunga. The sunrise here is absolutely magical! 🌅',
      likes: 39,
      comments: 13,
      timeAgo: '6 days ago',
      rating: 5
    },
    {
      id: 9,
      user: { name: 'Lisa Wang', avatar: '👩', location: 'Taiwan' },
      monastery: 'Phodong Monastery',
      image: '/images/phodong.webp',
      caption: 'Beautiful monastery with rich history. The monks were so welcoming and shared amazing stories about Buddhist philosophy.',
      likes: 26,
      comments: 8,
      timeAgo: '1 week ago',
      rating: 4
    },
    {
      id: 10,
      user: { name: 'James Wilson', avatar: '👨', location: 'Australia' },
      monastery: 'Labrang Monastery',
      image: '/images/labrang.webp',
      caption: 'Hidden gem in Sikkim! The peaceful environment and spiritual teachings here touched my soul. Perfect for meditation retreats.',
      likes: 33,
      comments: 10,
      timeAgo: '1 week ago',
      rating: 5
    }
  ]);

  const [communities] = useState([
    { 
      name: 'Sikkim Spiritual Travelers', 
      members: 1247, 
      posts: 89, 
      image: '🏔️', 
      description: 'Connect with fellow spiritual seekers exploring Sikkim',
      recentActivity: 'Latest: Sacred journey to Tashiding shared by @priya_sharma',
      memberPhotos: ['👩', '👨', '👩', '👨', '👩']
    },
    { 
      name: 'Buddhist Monastery Explorers', 
      members: 892, 
      posts: 156, 
      image: '🏛️', 
      description: 'Discover the sacred monasteries of the Himalayas',
      recentActivity: 'Latest: Cham dance video from Enchey Monastery',
      memberPhotos: ['👨', '👩', '👨', '👩', '👨']
    },
    { 
      name: 'Himalayan Photography', 
      members: 2341, 
      posts: 234, 
      image: '📸', 
      description: 'Share stunning photos from your mountain adventures',
      recentActivity: 'Latest: Sunrise at Kanchenjunga by @james_wilson',
      memberPhotos: ['👩', '👨', '👩', '👨', '👩']
    },
    { 
      name: 'Meditation & Mindfulness', 
      members: 567, 
      posts: 78, 
      image: '🧘', 
      description: 'Practice mindfulness in sacred spaces',
      recentActivity: 'Latest: 7-day meditation retreat experience shared',
      memberPhotos: ['👨', '👩', '👨', '👩', '👨']
    },
    { 
      name: 'Cultural Heritage Lovers', 
      members: 1156, 
      posts: 203, 
      image: '🎭', 
      description: 'Explore and preserve Sikkim\'s rich cultural heritage',
      recentActivity: 'Latest: Traditional Bhutia dance performance video',
      memberPhotos: ['👩', '👨', '👩', '👨', '👩']
    },
    { 
      name: 'Trekking Enthusiasts', 
      members: 1834, 
      posts: 312, 
      image: '🥾', 
      description: 'Adventure seekers exploring Sikkim\'s trails',
      recentActivity: 'Latest: Goecha La trek guide with stunning photos',
      memberPhotos: ['👨', '👩', '👨', '👩', '👨']
    }
  ]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('sikkora_community_posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setPosts(prevPosts => [...parsedPosts, ...prevPosts]);
    }
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (formData.monastery && formData.experience && formData.rating > 0) {
      const newPost = {
        id: Date.now(),
        user: { name: 'You', avatar: '😊', location: 'Current User' },
        monastery: formData.monastery,
        caption: formData.experience,
        likes: 0,
        comments: 0,
        timeAgo: 'Just now',
        rating: formData.rating,
        isUserPost: true,
        images: selectedImages
      };

      setPosts(prev => [newPost, ...prev]);

      const existingPosts = JSON.parse(localStorage.getItem('sikkora_community_posts') || '[]');
      existingPosts.unshift(newPost);
      localStorage.setItem('sikkora_community_posts', JSON.stringify(existingPosts));

      setFormData({
        monastery: '',
        experience: '',
        rating: 0,
        photos: []
      });
      setSelectedImages([]);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('feed');
      }, 2000);
    }
  };

  const joinCommunity = (community) => {
    setSelectedCommunity(community);
    setShowCommunityModal(true);
    
    const joinedCommunities = JSON.parse(localStorage.getItem('sikkora_joined_communities') || '[]');
    if (!joinedCommunities.includes(community.name)) {
      joinedCommunities.push(community.name);
      localStorage.setItem('sikkora_joined_communities', JSON.stringify(joinedCommunities));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed top-24 right-6 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Experience shared successfully! 🎉</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Community Modal */}
        <AnimatePresence>
          {showCommunityModal && selectedCommunity && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCommunityModal(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-red-950 via-amber-900 to-yellow-800 rounded-3xl p-8 max-w-2xl w-full border-2 border-yellow-400/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Welcome to {selectedCommunity.name}!</h2>
                  <button
                    onClick={() => setShowCommunityModal(false)}
                    className="text-white hover:text-yellow-300 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{selectedCommunity.image}</div>
                  <p className="text-white/80 text-lg mb-4">{selectedCommunity.description}</p>
                  <div className="flex items-center justify-center gap-6 text-white/60">
                    <span>{selectedCommunity.members.toLocaleString()} members</span>
                    <span>{selectedCommunity.posts} posts</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-3">Recent Activity</h3>
                  <p className="text-white/80">{selectedCommunity.recentActivity}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-3">Active Members</h3>
                  <div className="flex items-center gap-2">
                    {selectedCommunity.memberPhotos.map((photo, index) => (
                      <div key={index} className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-lg">
                        {photo}
                      </div>
                    ))}
                    <span className="text-white/60 ml-2">+{selectedCommunity.members - 5} more</span>
                  </div>
                </div>

                <div className="text-center">
                  <motion.button
                    onClick={() => setShowCommunityModal(false)}
                    className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✅ Successfully Joined!
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent mb-4">
            Spiritual Community
          </h1>
          <p className="text-xl text-white/80">Connect with fellow travelers and share your sacred journey</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 bg-black/20 backdrop-blur-md rounded-2xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: 'feed', name: 'Community Feed', icon: Heart },
            { id: 'communities', name: 'Join Communities', icon: Users },
            { id: 'create', name: 'Share Experience', icon: Plus }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'feed' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-yellow-400/20">
                  <Filter className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Filter by:</span>
                  <select className="bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-1 text-white text-sm">
                    <option className="bg-red-900">All Posts</option>
                    <option className="bg-red-900">Recent</option>
                    <option className="bg-red-900">Most Liked</option>
                    <option className="bg-red-900">My Posts</option>
                  </select>
                </div>

                <AnimatePresence>
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className={`bg-white/10 backdrop-blur-md rounded-2xl border overflow-hidden ${
                        post.isUserPost ? 'border-green-400/50 bg-green-500/5' : 'border-yellow-400/20'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="p-6 pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-xl">
                              {post.user.avatar}
                            </div>
                            <div>
                              <h3 className="text-white font-bold flex items-center gap-2">
                                {post.user.name}
                                {post.isUserPost && <span className="text-green-400 text-sm">(You)</span>}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-white/60">
                                <MapPin className="w-3 h-3" />
                                <span>{post.user.location}</span>
                                <span>•</span>
                                <span>{post.timeAgo}</span>
                              </div>
                            </div>
                          </div>
                          <Bookmark className="w-5 h-5 text-white/60 hover:text-yellow-400 cursor-pointer transition-colors" />
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-200 rounded-full text-sm font-medium">
                            📍 {post.monastery}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < post.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                            ))}
                          </div>
                        </div>

                        <p className="text-white/90 mb-4 leading-relaxed">{post.caption}</p>
                      </div>

                      <div className="relative h-64 bg-gradient-to-br from-yellow-600/20 to-amber-700/20 flex items-center justify-center border-y border-yellow-400/10">
                        <Camera className="w-12 h-12 text-white/30" />
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                          📸 Sacred Moment
                        </div>
                      </div>

                      <div className="p-6 pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <motion.button
                              onClick={() => handleLike(post.id)}
                              className="flex items-center gap-2 text-white/70 hover:text-red-400 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Heart className="w-5 h-5" />
                              <span>{post.likes}</span>
                            </motion.button>
                            <button className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-white/70 hover:text-green-400 transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    🔥 Trending Monasteries
                  </h3>
                  <div className="space-y-3">
                    {['Rumtek Monastery', 'Pemayangtse Monastery', 'Tashiding Monastery', 'Enchey Monastery'].map((monastery, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-white/80 text-sm">{monastery}</span>
                        <span className="text-yellow-400 text-xs font-bold">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-white font-bold mb-4">📈 Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      '@priya_sharma visited Rumtek Monastery',
                      '@david_chen shared photos from Pemayangtse',
                      '@anjali_rai joined Buddhist Explorers group',
                      '@rajesh_kumar attended Bumchu ceremony',
                      '@sarah_johnson completed Dubdi trek',
                      '@tenzin_norbu shared meditation experience'
                    ].map((activity, index) => (
                      <div key={index} className="text-white/80 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-yellow-400 font-medium">{activity.split(' ')[0]}</span>
                        <span> {activity.substring(activity.indexOf(' ') + 1)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'communities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-2xl">
                      {community.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">{community.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
                        <span>{community.members.toLocaleString()} members</span>
                        <span>{community.posts} posts</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{community.description}</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <p className="text-white/60 text-xs">{community.recentActivity}</p>
                  </div>
                  
                  <motion.button
                    onClick={() => joinCommunity(community)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Community
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/20"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  ✨ Share Your Sacred Experience
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Monastery Visited *</label>
                    <select 
                      value={formData.monastery}
                      onChange={(e) => handleInputChange('monastery', e.target.value)}
                      className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white focus:border-yellow-400/60 transition-colors"
                    >
                      <option value="" className="bg-red-900">Select monastery</option>
                      <option value="Rumtek Monastery" className="bg-red-900">Rumtek Monastery</option>
                      <option value="Pemayangtse Monastery" className="bg-red-900">Pemayangtse Monastery</option>
                      <option value="Enchey Monastery" className="bg-red-900">Enchey Monastery</option>
                      <option value="Tashiding Monastery" className="bg-red-900">Tashiding Monastery</option>
                      <option value="Dubdi Monastery" className="bg-red-900">Dubdi Monastery</option>
                      <option value="Lingdum Monastery" className="bg-red-900">Lingdum Monastery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Your Experience *</label>
                    <textarea
                      rows="4"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white placeholder-white/50 resize-none focus:border-yellow-400/60 transition-colors"
                      placeholder="Share your spiritual journey, what moved you, what you learned..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={() => handleRatingClick(star)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star 
                            className={`w-8 h-8 cursor-pointer transition-colors ${
                              star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-400 hover:text-yellow-300'
                            }`} 
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Add Photos</label>
                    <div className="border-2 border-dashed border-yellow-400/30 rounded-xl p-8 text-center hover:border-yellow-400/50 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <p className="text-white/60">Click to upload photos or drag and drop</p>
                        <p className="text-white/40 text-sm mt-2">JPG, PNG up to 10MB</p>
                      </label>
                    </div>
                    
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img src={image} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    disabled={!formData.monastery || !formData.experience || formData.rating === 0}
                    className={`w-full py-4 font-bold text-lg rounded-2xl transition-all ${
                      formData.monastery && formData.experience && formData.rating > 0
                        ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:shadow-lg'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={formData.monastery && formData.experience && formData.rating > 0 ? { scale: 1.02 } : {}}
                    whileTap={formData.monastery && formData.experience && formData.rating > 0 ? { scale: 0.98 } : {}}
                  >
                    Share Experience ✨
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}