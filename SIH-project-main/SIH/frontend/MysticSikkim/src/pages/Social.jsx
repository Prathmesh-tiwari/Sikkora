import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Camera, MapPin, Star, Users, Plus, Filter, Bookmark } from 'lucide-react';

export default function Social() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Priya Sharma', avatar: '👩', location: 'Mumbai' },
      monastery: 'Rumtek Monastery',
      image: '/images/rumtek.jpg',
      caption: 'Incredible spiritual experience at Rumtek! The morning prayers were absolutely divine. 🙏',
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
      caption: 'The architecture here is breathtaking! Perfect place for meditation and reflection.',
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
      caption: 'Witnessed the most beautiful Cham dance performance today! Sikkim never fails to amaze.',
      likes: 18,
      comments: 6,
      timeAgo: '1 day ago',
      rating: 4
    }
  ]);

  const [communities] = useState([
    { name: 'Sikkim Spiritual Travelers', members: 1247, posts: 89, image: '🏔️' },
    { name: 'Buddhist Monastery Explorers', members: 892, posts: 156, image: '🏛️' },
    { name: 'Himalayan Photography', members: 2341, posts: 234, image: '📸' },
    { name: 'Meditation & Mindfulness', members: 567, posts: 78, image: '🧘' }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-red-400 bg-clip-text text-transparent mb-4">
            Spiritual Community
          </h1>
          <p className="text-xl text-white/80">Connect with fellow travelers and share your sacred journey</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex gap-2 mb-8 bg-black/20 backdrop-blur-md rounded-2xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: 'feed', name: 'Feed', icon: Heart },
            { id: 'communities', name: 'Communities', icon: Users },
            { id: 'create', name: 'Share Experience', icon: Plus }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
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
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Filters */}
                <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-yellow-400/20">
                  <Filter className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Filter by:</span>
                  <select className="bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-1 text-white text-sm">
                    <option className="bg-red-900">All Posts</option>
                    <option className="bg-red-900">Recent</option>
                    <option className="bg-red-900">Most Liked</option>
                    <option className="bg-red-900">Following</option>
                  </select>
                </div>

                {/* Posts */}
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl border border-yellow-400/20 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-xl">
                            {post.user.avatar}
                          </div>
                          <div>
                            <h3 className="text-white font-bold">{post.user.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <MapPin className="w-3 h-3" />
                              <span>{post.user.location}</span>
                              <span>•</span>
                              <span>{post.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                        <Bookmark className="w-5 h-5 text-white/60 hover:text-yellow-400 cursor-pointer" />
                      </div>

                      {/* Monastery Tag */}
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

                      <p className="text-white/90 mb-4">{post.caption}</p>
                    </div>

                    {/* Post Image */}
                    <div className="relative h-64 bg-gradient-to-br from-yellow-600 to-amber-700 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white/50" />
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        📸 Sacred Moment
                      </div>
                    </div>

                    {/* Post Actions */}
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
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trending Monasteries */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-white font-bold mb-4">🔥 Trending Monasteries</h3>
                  <div className="space-y-3">
                    {['Rumtek Monastery', 'Pemayangtse Monastery', 'Tashiding Monastery'].map((monastery, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{monastery}</span>
                        <span className="text-yellow-400 text-xs">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-white font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="text-white/80">
                      <span className="text-yellow-400">@priya_sharma</span> visited Rumtek Monastery
                    </div>
                    <div className="text-white/80">
                      <span className="text-yellow-400">@david_chen</span> shared photos from Pemayangtse
                    </div>
                    <div className="text-white/80">
                      <span className="text-yellow-400">@anjali_rai</span> joined Buddhist Explorers group
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div>
                      <h3 className="text-white font-bold text-lg">{community.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{community.members} members</span>
                        <span>{community.posts} posts</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Community
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/20">
                <h2 className="text-2xl font-bold text-white mb-6">Share Your Sacred Experience</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Monastery Visited</label>
                    <select className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white">
                      <option className="bg-red-900">Select monastery</option>
                      <option className="bg-red-900">Rumtek Monastery</option>
                      <option className="bg-red-900">Pemayangtse Monastery</option>
                      <option className="bg-red-900">Enchey Monastery</option>
                      <option className="bg-red-900">Tashiding Monastery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Your Experience</label>
                    <textarea
                      rows="4"
                      className="w-full p-4 bg-white/10 border-2 border-yellow-400/30 rounded-xl text-white placeholder-white/50 resize-none"
                      placeholder="Share your spiritual journey, what moved you, what you learned..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-8 h-8 text-yellow-400 cursor-pointer hover:fill-current" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Add Photos</label>
                    <div className="border-2 border-dashed border-yellow-400/30 rounded-xl p-8 text-center">
                      <Camera className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <p className="text-white/60">Click to upload photos or drag and drop</p>
                    </div>
                  </div>

                  <motion.button
                    className="w-full py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold text-lg rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Share Experience
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}