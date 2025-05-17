import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, User, Tag, ArrowLeft, Facebook, 
  Twitter, Linkedin, Share2, ChevronRight 
} from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find post by slug
  const post = blogPosts.find(p => p.slug === id);
  
  // Related posts (same category)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.slug !== id).slice(0, 2)
    : [];
  
  if (!post) {
    return (
      <div className="pt-24 pb-12 container-custom">
        <div className="text-center py-16">
          <h2 className="text-3xl font-heading font-bold mb-4">Post Not Found</h2>
          <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-dark-200">
        <div className="container-custom py-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-500" />
            <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-500" />
            <span className="text-white truncate">
              {post.title}
            </span>
          </div>
        </div>
      </div>
      
      <article className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6"
            >
              {post.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Tag size={16} className="mr-2" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden mb-10">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p>
              The gaming industry continues to evolve at an unprecedented pace, with new technologies and innovations emerging regularly. From high-end gaming peripherals to cutting-edge software developments, there's always something exciting happening in the gaming world.
            </p>

            <h2>The Rise of Next-Gen Gaming Gear</h2>
            <p>
              As competitive gaming grows in popularity, so does the demand for professional-grade equipment. Modern gaming peripherals are not just about aesthetics; they're essential tools that can significantly impact your gaming performance.
            </p>
            <p>
              The latest keyboards feature advanced switch technology, offering faster response times and better tactile feedback. Many professional gamers prefer mechanical keyboards for their durability and precision, with custom switches designed specifically for gaming applications.
            </p>
            
            <h2>Key Features to Look For</h2>
            <p>
              When selecting gaming peripherals, several key features can make a significant difference in your gaming experience:
            </p>
            <ul>
              <li>Response time and polling rate for reduced input lag</li>
              <li>Ergonomic design for comfortable extended gaming sessions</li>
              <li>Customizable settings for different game genres</li>
              <li>Build quality and durability for long-term reliability</li>
              <li>RGB customization options for personalization and function</li>
            </ul>
            
            <h2>Setting Up Your Ultimate Gaming Rig</h2>
            <p>
              Creating the optimal gaming setup involves more than just purchasing high-end components. Proper configuration and optimization are essential for getting the most out of your gaming gear.
            </p>
            <p>
              Start by ensuring your desk and chair provide ergonomic support to prevent fatigue during long gaming sessions. Position your monitor at eye level and maintain good posture to avoid strain.
            </p>
            <p>
              For optimal performance, keep your gaming peripherals clean and updated with the latest firmware. Many premium gaming products come with dedicated software that allows for deep customization and performance tuning.
            </p>
            
            <h2>The Future of Gaming Technology</h2>
            <p>
              Looking ahead, we can expect even more innovation in the gaming peripheral market. Haptic feedback technology is evolving rapidly, providing more immersive experiences. Wireless performance continues to improve, closing the gap with wired alternatives.
            </p>
            <p>
              Artificial intelligence integration is another exciting frontier, with gaming peripherals that adapt to your play style and preferences. These smart peripherals can optimize settings based on the game you're playing and your individual performance metrics.
            </p>
            
            <h2>Conclusion</h2>
            <p>
              The world of gaming peripherals continues to advance, offering more performance and features than ever before. Whether you're a casual gamer or aspiring professional, investing in quality gaming gear can significantly enhance your gaming experience and potentially improve your performance.
            </p>
            <p>
              Remember that the best gaming setup is one that suits your individual needs and preferences. Take the time to research and test different options to find the perfect combination for your unique gaming style.
            </p>
          </div>
          
          {/* Share Links */}
          <div className="flex flex-wrap items-center justify-between border-t border-gray-800 pt-6 mb-12">
            <div className="mb-4 sm:mb-0">
              <Link to="/blog" className="flex items-center text-primary-400 hover:text-primary-300 transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                Back to Blog
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Share:</span>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-200 text-gray-400 hover:bg-[#1877F2] hover:text-white transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-200 text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-200 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-200 text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="Copy Link"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>
          
          {/* Author Box */}
          <div className="bg-dark-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 mb-12">
            <div className="md:w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <img 
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt={post.author} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="text-white font-heading text-xl font-medium mb-2 text-center md:text-left">
                {post.author}
              </h3>
              <p className="text-gray-300 text-center md:text-left">
                A gaming enthusiast and tech writer with 8+ years of experience covering gaming peripherals, eSports, and emerging gaming technologies. Previously worked as a hardware reviewer for major gaming publications.
              </p>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-dark-200 rounded-lg overflow-hidden blog-card">
                    <Link to={`/blog/${relatedPost.slug}`} className="block">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <Calendar size={14} className="mr-1" />
                        <span>{relatedPost.date}</span>
                      </div>
                      
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <h3 className="text-xl font-heading font-medium text-white mb-3 hover:text-primary-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      
                      <Link 
                        to={`/blog/${relatedPost.slug}`} 
                        className="text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors"
                      >
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;