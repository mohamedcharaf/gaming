import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Twitch, Youtube, 
  Mail, Phone, MapPin, CreditCard, Shield, Truck
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 border-t border-gray-800">
      <div className="container-custom py-12">
        {/* Service Promise Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-dark-100">
              <Truck className="text-primary-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-medium">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">Free on orders over $99</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-dark-100">
              <Shield className="text-primary-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-medium">2 Year Warranty</h3>
              <p className="text-gray-400 text-sm">On all gaming products</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-dark-100">
              <CreditCard className="text-primary-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-medium">Secure Payment</h3>
              <p className="text-gray-400 text-sm">100% secure checkout</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <div className="font-heading text-xl font-bold mb-4">
              <span className="text-primary-400">GAMERS</span> <span className="text-accent-500">VAULT</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your premium destination for high-end gaming gear. From the latest RGB keyboards to pro-level gaming monitors, we've got your setup covered.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitch size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Links */}
          <div>
            <h3 className="text-white font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Categories */}
          <div>
            <h3 className="text-white font-heading text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Gaming Keyboards
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Gaming Mice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Gaming Monitors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Headsets
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Gaming Chairs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-white font-heading text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary-400 h-5 w-5 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  1234 Gamer Street, Pixel City, PC 98765, Game Land
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary-400 h-5 w-5" />
                <span className="text-gray-400 text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-primary-400 h-5 w-5" />
                <span className="text-gray-400 text-sm">
                  support@gamersvault.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Gamers Vault. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <img src="https://raw.githubusercontent.com/bedimcode/responsive-watches-website/4a5749576f6ca63b5ec5b77bc273c5e641bd6c2d/assets/img/visa.png" 
                alt="Visa" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
              <img src="https://raw.githubusercontent.com/bedimcode/responsive-watches-website/4a5749576f6ca63b5ec5b77bc273c5e641bd6c2d/assets/img/mastercard.png" 
                alt="Mastercard" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
              <img src="https://raw.githubusercontent.com/bedimcode/responsive-watches-website/4a5749576f6ca63b5ec5b77bc273c5e641bd6c2d/assets/img/paypal.png" 
                alt="PayPal" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;