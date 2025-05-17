// Mock product data
export const allProducts = [
  {
    id: 'p1',
    name: 'Nexus Pro Gaming Keyboard',
    price: 149.99,
    oldPrice: 179.99,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Keyboards',
    rating: 4.8,
    stock: 15
  },
  {
    id: 'p2',
    name: 'Specter X Gaming Mouse',
    price: 89.99,
    oldPrice: null,
    image: 'https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Mice',
    rating: 4.9,
    stock: 8
  },
  {
    id: 'p3',
    name: 'Aurora 240Hz Gaming Monitor',
    price: 399.99,
    oldPrice: 449.99,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Monitors',
    rating: 4.7,
    stock: 5
  },
  {
    id: 'p4',
    name: 'Titan Pro Gaming Headset',
    price: 129.99,
    oldPrice: null,
    image: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Headsets',
    rating: 4.6,
    stock: 12
  },
  {
    id: 'p5',
    name: 'Phantom RGB Gaming Chair',
    price: 299.99,
    oldPrice: 349.99,
    image: 'https://images.pexels.com/photos/2582932/pexels-photo-2582932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Chairs',
    rating: 4.5,
    stock: 7
  },
  {
    id: 'p6',
    name: 'Stealth Wireless Controller',
    price: 69.99,
    oldPrice: null,
    image: 'https://images.pexels.com/photos/10049581/pexels-photo-10049581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Controllers',
    rating: 4.4,
    stock: 20
  },
  {
    id: 'p7',
    name: 'Vortex RGB Mechanical Keyboard',
    price: 129.99,
    oldPrice: 159.99,
    image: 'https://images.pexels.com/photos/1422262/pexels-photo-1422262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Keyboards',
    rating: 4.7,
    stock: 14
  },
  {
    id: 'p8',
    name: 'Hyperspeed Gaming Mouse',
    price: 79.99,
    oldPrice: 99.99,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Mice',
    rating: 4.5,
    stock: 10
  }
];

// Featured products
export const featuredProducts = allProducts.slice(0, 4);

// Testimonials
export const testimonials = [
  {
    id: 't1',
    name: 'Alex Rodriguez',
    title: 'Pro Gamer, Team Nexus',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'The quality of products from Gamers Vault is unmatched. My new setup has definitely improved my competitive performance.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Sarah Chen',
    title: 'Streamer & Content Creator',
    avatar: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'My viewers always ask about my gear, and I\'m proud to recommend Gamers Vault. Fast shipping and amazing customer service!',
    rating: 5
  },
  {
    id: 't3',
    name: 'Marcus Johnson',
    title: 'Casual Gamer',
    avatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Finally found a retailer that understands what gamers need. The product recommendations were spot on for my setup.',
    rating: 4
  }
];

// Blog posts
export const blogPosts = [
  {
    id: 'b1',
    title: 'Best Gaming Keyboards of 2025',
    slug: 'best-gaming-keyboards-2025',
    excerpt: 'Discover the top mechanical keyboards that are dominating the competitive gaming scene this year.',
    image: 'https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 15, 2025',
    author: 'Ryan Thompson',
    category: 'Hardware'
  },
  {
    id: 'b2',
    title: 'How to Optimize Your PC for Maximum FPS',
    slug: 'optimize-pc-maximum-fps',
    excerpt: 'Learn the advanced techniques to squeeze every last frame out of your gaming rig.',
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 10, 2025',
    author: 'Emma Davis',
    category: 'Guides'
  },
  {
    id: 'b3',
    title: 'Upcoming eSports Tournaments to Watch',
    slug: 'upcoming-esports-tournaments-2025',
    excerpt: 'Mark your calendar for these major eSports events happening in the second half of 2025.',
    image: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'May 5, 2025',
    author: 'Jordan Lee',
    category: 'eSports'
  },
  {
    id: 'b4',
    title: 'The Rise of Haptic Feedback Gaming Gear',
    slug: 'rise-haptic-feedback-gaming-gear',
    excerpt: 'How new haptic technology is creating more immersive gaming experiences.',
    image: 'https://images.pexels.com/photos/2884870/pexels-photo-2884870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'April 28, 2025',
    author: 'Ryan Thompson',
    category: 'Hardware'
  },
  {
    id: 'b5',
    title: 'Gaming on a Budget: Best Value Gear of 2025',
    slug: 'gaming-budget-best-value-gear-2025',
    excerpt: 'Top-performing gaming peripherals that won\'t break the bank.',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'April 20, 2025',
    author: 'Emma Davis',
    category: 'Guides'
  },
  {
    id: 'b6',
    title: 'How Pro Gamers Customize Their Setups',
    slug: 'how-pro-gamers-customize-setups',
    excerpt: 'An inside look at how professional gamers optimize their gear for tournament play.',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: 'April 15, 2025',
    author: 'Jordan Lee',
    category: 'eSports'
  }
];