// src/pages/Products.tsx

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Filter,
  ChevronDown,
  Search,
  Grid,
  List,
  X,
  Check,
} from 'lucide-react'

import ProductCard from '../components/products/ProductCard'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'

/** Représente la ligne brute dans Supabase */
interface SupabaseProduct {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  created_at: string
}

/** Produit enrichi qu’on passe à ProductCard */
export interface Product extends SupabaseProduct {
  image: string
}

const Products: React.FC = () => {
  const { addToCart } = useCart()

  // Data & UI state
  const [products, setProducts]           = useState<Product[]>([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState<string | null>(null)
  const [searchQuery, setSearchQuery]     = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange]       = useState<[number, number]>([0, 10000])
  const [sortBy, setSortBy]               = useState<'featured'|'price-asc'|'price-desc'|'name'>('featured')
  const [isGridView, setIsGridView]       = useState(true)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Intersection observer for animations
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Fetch all products on mount
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from<SupabaseProduct>('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
      } else if (data) {
        setProducts(data.map(p => ({ ...p, image: p.image_url })))
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // Price range handler
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = Number(e.target.value) || 0
    setPriceRange(prev => {
      const next: [number, number] = [...prev] as [number, number]
      next[idx] = val
      return next
    })
  }

  // Filter & sort
  const filtered = products.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (selectedCategory && p.category !== selectedCategory) return false
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false
    return true
  })
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':  return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'name':       return a.name.localeCompare(b.name)
      default:           return 0
    }
  })
  const categories = Array.from(new Set(products.map(p => p.category)))

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.05 } },
  }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Chargement des produits…</p>
    </div>
  )
  if (error) return (
    <div className="p-8 text-center">
      <p className="text-red-400 mb-4">Erreur : {error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
      >
        Réessayer
      </button>
    </div>
  )

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-gray-900 relative py-16">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7915264/pexels-photo-7915264.jpeg')] bg-cover bg-center opacity-15"/>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Gaming Products
          </h1>
          <p className="text-gray-300">
            Explore our premium gaming gear collection.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFiltersOpen(o => !o)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 rounded-lg text-white"
          >
            <Filter size={18}/>
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            className={`bg-gray-800 rounded-lg p-6 md:w-64 sticky top-20 ${isFiltersOpen? 'block':'hidden md:block'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">Filters</h2>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left py-1.5 px-3 rounded text-sm flex items-center justify-between ${
                    selectedCategory===null
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>All</span>
                  {selectedCategory===null && <Check size={16}/>}
                </button>
                {categories.map(cat=>(
                  <button
                    key={cat}
                    onClick={()=>setSelectedCategory(cat)}
                    className={`w-full text-left py-1.5 px-3 rounded text-sm flex items-center justify-between ${
                      selectedCategory===cat
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory===cat && <Check size={16}/>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-200">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Min</label>
                    <input
                      type="number"
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={e=>handlePriceChange(e,0)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Max</label>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max={1000}
                      value={priceRange[1]}
                      onChange={e=>handlePriceChange(e,1)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={()=>{
                setSelectedCategory(null)
                setPriceRange([0,1000])
                setSearchQuery('')
              }}
              className="w-full py-2 text-sm text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-500/10 transition-colors"
            >
              Reset Filters
            </button>
          </motion.aside>

          {/* Main */}
          <div className="flex-grow">
            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e=>setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                />
                {searchQuery && (
                  <button
                    onClick={()=>setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={16}/>
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {/* View toggle */}
                <div className="flex bg-gray-800 rounded-md overflow-hidden">
                  <button
                    onClick={()=>setIsGridView(true)}
                    className={`p-2.5 ${isGridView? 'bg-indigo-600 text-white':'text-gray-400'}`}
                    aria-label="Grid view"
                  >
                    <Grid size={18}/>
                  </button>
                  <button
                    onClick={()=>setIsGridView(false)}
                    className={`p-2.5 ${!isGridView? 'bg-indigo-600 text-white':'text-gray-400'}`}
                    aria-label="List view"
                  >
                    <List size={18}/>
                  </button>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e=>setSortBy(e.target.value as any)}
                    className="appearance-none pl-3 pr-8 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                </div>
              </div>
            </div>

            {/* Products */}
            <motion.div
              ref={productsRef}
              variants={containerVariants}
              initial="hidden"
              animate={productsInView? 'show':'hidden'}
              className={isGridView? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':'space-y-6'}
            >
              {sorted.map(p=>(
                <motion.div key={p.id} variants={itemVariants}>
                  <ProductCard product={p} onAddToCart={()=>addToCart(p)} />
                </motion.div>
              ))}
            </motion.div>

            {/* No results */}
            {sorted.length===0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-heading mb-2 text-white">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search.</p>
                <button
                  onClick={()=>{
                    setSelectedCategory(null)
                    setPriceRange([0,1000])
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
