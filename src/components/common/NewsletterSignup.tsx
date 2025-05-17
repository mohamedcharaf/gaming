import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <section className="py-16 bg-dark-300 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#4361EE_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-6">
            <Mail className="text-primary-400 h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Join Our Gaming Newsletter
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Stay updated with the latest gaming gear, exclusive offers, and pro gaming tips delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  required
                />
                {status === 'error' && (
                  <p className="absolute -bottom-6 left-0 text-accent-500 text-xs">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn-primary min-w-20 sm:min-w-32"
              >
                {status === 'loading' ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : status === 'success' ? (
                  'Subscribed!'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Subscribe <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <p className="text-gray-400 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;