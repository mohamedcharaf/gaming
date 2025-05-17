import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Tag, Calendar, User, X } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="bg-dark-200 relative py-16">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-15"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Gaming Blog
            </h1>
            <p className="text-gray-300">
              The latest news, reviews, and insights from the gaming world.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow order-2 md:order-1">
            {/* Search and Filters - Mobile */}
            <div className="md:hidden mb-8">
              <div className="relative mb-4">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-full"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm px-3 py-1 rounded-full ${
                    selectedCategory === null 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-200 text-gray-300 hover:bg-dark-100'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm px-3 py-1 rounded-full ${
                      selectedCategory === category 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Blog Posts */}
            {filteredPosts.length > 0 ? (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.article 
                    key={post.id} 
                    variants={item}
                    className="bg-dark-200 rounded-lg overflow-hidden blog-card"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                          {post.category}
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-heading font-medium text-white mb-3 hover:text-primary-400 transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <p className="text-gray-300 mb-6">
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors"
                      >
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-dark-200 rounded-lg">
                <h3 className="text-xl font-heading mb-2">No posts found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-80 order-1 md:order-2">
            <div className="bg-dark-200 rounded-lg p-6 sticky top-20">
              {/* Search */}
              <div className="hidden md:block mb-8">
                <h3 className="text-lg font-heading font-medium mb-4">Search</h3>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 w-full"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Categories */}
              <div className="hidden md:block mb-8">
                <h3 className="text-lg font-heading font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left py-2 px-3 rounded text-sm flex items-center justify-between ${
                      selectedCategory === null ? 'bg-primary-500/20 text-primary-400' : 'text-gray-300 hover:bg-dark-100'
                    }`}
                  >
                    <span>All Categories</span>
                    {selectedCategory === null && <Check size={16} />}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded text-sm flex items-center justify-between ${
                        selectedCategory === category ? 'bg-primary-500/20 text-primary-400' : 'text-gray-300 hover:bg-dark-100'
                      }`}
                    >
                      <span>{category}</span>
                      {selectedCategory === category && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="mb-8">
                <h3 className="text-lg font-heading font-medium mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="w-20 h-20 bg-dark-100 rounded overflow-hidden flex-shrink-0"
                      >
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </Link>
                      <div>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="text-white hover:text-primary-400 transition-colors text-sm font-medium"
                        >
                          {post.title}
                        </Link>
                        <div className="text-gray-400 text-xs mt-1">{post.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-lg font-heading font-medium mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="bg-dark-100 hover:bg-primary-500/20 text-gray-300 hover:text-primary-400 px-3 py-1 rounded-full text-xs transition-colors">
                    Gaming
                  </a>
                  <a href="#" className="bg-dark-100 hover:bg-primary-500/20 text-gray-300 hover:text-primary-400 px-3 py-1 rounded-full text-xs transition-colors">
                    Hardware
                  </a>
                  <a href="#" className="bg-dark-100 hover:bg-primary-500/20 text-gray-300 hover:text-primary-400 px-3 py-1 rounded-full text-xs transition-colors">
                    eSports
                  </a>
                  <a href="#" className="bg-dark-100 hover:bg-primary-500/20 text-gray-300 hover:text-primary-400 px-3 py-1 rounded-full text-xs transition-colors">
                    Reviews
                  </a>
                  <a href="#" className="bg-dark-100 hover:bg-primary-500/20 text-gray-300 hover:text-primary-400 px-3 py-1 rounded-full text-xs transition-colors">
                    Guides
                  </a>
                  <a href="#" className="bg-dark-100 hover:bg-primary-500/20 text-gray-300 hover:text-primary-400 px-3 py-1 rounded-full text-xs transition-colors">
                    New Releases
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Check = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Blog;