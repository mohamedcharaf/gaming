import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { featuredProducts, testimonials } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

// Import components
import HeroCarousel from '../components/home/HeroCarousel';
import ProductCard from '../components/products/ProductCard';
import NewsletterSignup from '../components/common/NewsletterSignup';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  
  // Animation controls
  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
        <HeroCarousel />
        
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container-custom">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                <span className="text-white">Level Up Your</span>
                <span className="block text-primary-400 neon-text">Gaming Experience</span>
              </h1>
              <p className="text-gray-300 mb-8">
                Premium gaming gear for the most demanding players. Enhance your gaming setup with our curated collection of high-performance equipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary">
                  Shop Now
                </Link>
                <a href="#featured" className="btn-outline">
                  View Featured
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-dark-300">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Shop By Category</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard 
              title="Keyboards" 
              image="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0.1}
            />
            <CategoryCard 
              title="Mice" 
              image="https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0.2}
            />
            <CategoryCard 
              title="Monitors" 
              image="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0.3}
            />
            <CategoryCard 
              title="Headsets" 
              image="https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-dark-200">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <motion.div 
            ref={featuredRef}
            variants={container}
            initial="hidden"
            animate={featuredInView ? "show" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.slice(0, 4).map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} onAddToCart={() => addToCart(product)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-dark-300 to-dark-200 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-accent-500 text-white text-sm rounded-full mb-4">
              Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Get 20% Off on All Gaming Monitors
            </h2>
            <p className="text-gray-300 mb-8">
              Upgrade your visual experience with our premium gaming monitors. High refresh rates, low response times, and crystal-clear resolution for competitive gaming.
            </p>
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-dark-300">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">What Gamers Say</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>
          
          <motion.div 
            ref={testimonialsRef}
            variants={container}
            initial="hidden"
            animate={testimonialsInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id} 
                variants={item}
                className="bg-dark-200 rounded-lg p-6 border border-gray-800"
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < testimonial.rating ? "text-primary-400 fill-primary-400" : "text-gray-600"}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-500" 
                  />
                  <div className="ml-4">
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-dark-200">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Latest Gaming News</h2>
            <Link to="/blog" className="text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogPreviewCard 
              title="Best Gaming Keyboards of 2025"
              excerpt="Discover the top mechanical keyboards that are dominating the competitive gaming scene this year."
              image="https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              date="May 15, 2025"
              category="Hardware"
              slug="best-gaming-keyboards-2025"
            />
            <BlogPreviewCard 
              title="How to Optimize Your PC for Maximum FPS"
              excerpt="Learn the advanced techniques to squeeze every last frame out of your gaming rig."
              image="https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              date="May 10, 2025"
              category="Guides"
              slug="optimize-pc-maximum-fps"
            />
            <BlogPreviewCard 
              title="Upcoming eSports Tournaments to Watch"
              excerpt="Mark your calendar for these major eSports events happening in the second half of 2025."
              image="https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              date="May 5, 2025"
              category="eSports"
              slug="upcoming-esports-tournaments-2025"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
  delay?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group overflow-hidden rounded-lg aspect-square"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-heading text-xl md:text-2xl font-medium">
          {title}
        </h3>
      </div>
      <Link to="/products" className="absolute inset-0" aria-label={`Shop ${title}`}></Link>
    </motion.div>
  );
};

interface BlogPreviewCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({ 
  title, excerpt, image, date, category, slug 
}) => {
  return (
    <motion.article 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-100 rounded-lg overflow-hidden blog-card"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
          {category}
        </div>
      </div>
      <div className="p-6">
        <time className="text-gray-400 text-sm mb-2 block">{date}</time>
        <h3 className="text-white font-heading text-xl font-medium mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          {excerpt}
        </p>
        <Link 
          to={`/blog/${slug}`} 
          className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-2 transition-colors"
        >
          Read More <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
};

export default Home;