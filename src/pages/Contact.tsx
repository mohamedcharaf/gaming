// src/pages/Contact.tsx

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  X,
} from 'lucide-react'

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [chatOpen, setChatOpen] = useState(false)

  const [contactInfoRef, contactInfoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')

    setTimeout(() => {
      setFormStatus('success')
      setFormState({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="bg-dark-200 relative py-16">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-15" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-gray-300">
              Have questions or need assistance? We're here to help with any gaming gear needs.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            ref={contactInfoRef}
            initial={{ opacity: 0, x: -30 }}
            animate={contactInfoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-dark-200 rounded-lg p-8"
          >
            <h2 className="text-2xl font-heading font-bold mb-8">Get In Touch</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Our Location</h3>
                  <p className="text-gray-300">
                    1234 Gamer Street, Alger, Algérie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Phone Number</h3>
                  <p className="text-gray-300">Support: +1 (555) 123-4567</p>
                  <p className="text-gray-300">Sales: +1 (555) 765-4321</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Email Address</h3>
                  <p className="text-gray-300">Support: support@gamersvault.com</p>
                  <p className="text-gray-300">Sales: sales@gamersvault.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-white font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Social icons... */}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-dark-200 rounded-lg p-8">
              <h2 className="text-2xl font-heading font-bold mb-8">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-status">Order Status</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className="btn-primary w-full"
                  >
                    {formStatus === 'loading' ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : formStatus === 'success' ? (
                      <div className="flex items-center justify-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent!
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send size={18} className="mr-2" />
                        Send Message
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-dark-200 rounded-lg p-8">
          <h2 className="text-2xl font-heading font-bold mb-8">Find Us On The Map</h2>
          <div className="aspect-[16/9] w-full bg-dark-100 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31308.75697254891!2d3.0195698!3d36.753769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb9e7f0a2f03f%3A0x4bc1a5b6e508a3ae!2sAlger%2C%20Alg%C3%A9rie!5e0!3m2!1sfr!2s!4v1620762240426!5m2!1sfr!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Maps - Alger, Algérie"
            />
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed right-6 bottom-6 z-20">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors ${
            chatOpen ? 'rotate-90' : ''
          }`}
          aria-label="Live Chat"
        >
          {chatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 bottom-24 z-20 bg-dark-200 rounded-lg shadow-xl w-80 sm:w-96 overflow-hidden"
        >
          <div className="bg-primary-500 p-4">
            <h3 className="text-white font-medium">Live Chat Support</h3>
            <p className="text-primary-100 text-sm">We typically reply within minutes</p>
          </div>
          <div className="p-4 h-80 overflow-y-auto bg-dark-100">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-primary-400 text-xs font-bold">GV</span>
                </div>
                <div className="bg-dark-200 rounded-lg p-3 max-w-[80%]">
                  <p className="text-white text-sm">
                    Hello! Welcome to Gamers Vault support. How can I help you today?
                  </p>
                  <span className="text-gray-400 text-xs mt-1 block">12:03 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="input flex-grow"
              />
              <button className="ml-2 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Contact
