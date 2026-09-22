import React, { useState, useMemo } from 'react';
import { 
  Star, 
  ShoppingCart, 
  Check, 
  Eye, 
  RotateCcw,
  Sparkles, 
  Heart,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface ProductsSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  categoriesList: string[];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onSelectProduct,
  categoriesList,
}) => {
  // Price and sorting filters
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'prod-1': true,
    'prod-7': true,
  });

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        const matchesCategory = 
          selectedCategory === 'All' || 
          product.category.toLowerCase() === selectedCategory.toLowerCase();

        // Search query
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          !q || 
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);

        // Price filter
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        // In Stock filter
        const matchesStock = !onlyInStock || product.inStock;

        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    onSearchChange('');
    setMinPrice(0);
    setMaxPrice(3000);
    setSortBy('featured');
    setOnlyInStock(false);
  };

  return (
    <section id="products" className="py-20 bg-black text-white relative border-b border-[#00FF66]/15">
      
      {/* Background ambient neon glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00FF66]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-zinc-900">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
              OFFICIAL HARDWARE REPOSITORY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Featured <span className="text-[#00FF66] neon-text-glow">Products</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1 max-w-xl">
              Precision engineered electronics featuring aerospace materials, high-speed connectivity, and full manufacturer guarantees.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Showing <span className="text-[#00FF66] font-bold">{filteredProducts.length}</span> devices
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              id="filter-category-all"
              onClick={() => onSelectCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                  : 'bg-[#0a0a0a] text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#00FF66]/40'
              }`}
            >
              All Devices
            </button>
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => onSelectCategory(cat as ProductCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                      : 'bg-[#0a0a0a] text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#00FF66]/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Sorting and Price Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-500 font-mono flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#00FF66]" /> Filter:
              </span>
              <button
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                  onlyInStock
                    ? 'bg-[#00FF66]/15 border-[#00FF66] text-[#00FF66]'
                    : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                In Stock Only
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 font-mono flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#00FF66]" /> Sort:
              </span>
              <select
                id="products-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black text-white text-xs border border-zinc-800 rounded-lg px-2.5 py-1.5 focus:border-[#00FF66] focus:outline-none"
              >
                <option value="featured">Featured / Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="discount">Biggest Discounts</option>
              </select>

              {(selectedCategory !== 'All' || searchQuery || onlyInStock || sortBy !== 'featured') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-[#00FF66] ml-2 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Products Grid:
            Dark product cards with green borders.
            Smooth hover effects where the card glows green and slightly rises.
            Each card contains:
            - Product image
            - Discount badge
            - Product name
            - Star rating
            - Current price
            - Old price
            - Favorite ❤️ icon
            - Bright green "Add to Cart" button
        */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#080808] rounded-2xl border border-zinc-900 p-8">
            <Sparkles className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No products found matching your filters</h3>
            <p className="text-sm text-zinc-400 mt-1">Try resetting search keywords or category filters.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#00FF66] text-black font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedItemIds[product.id];
              const isFav = favorites[product.id];

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="group relative rounded-2xl bg-[#0a0a0a] border border-[#00FF66]/25 hover:border-[#00FF66] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,255,102,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-md"
                >
                  {/* Top Media Area with Badges & Favorite Heart */}
                  <div className="relative w-full h-56 bg-black/60 overflow-hidden flex items-center justify-center">
                    {/* Ambient subtle green glow behind image */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-32 h-32 rounded-full bg-[#00FF66]/10 blur-xl group-hover:bg-[#00FF66]/25 transition-all duration-500" />
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Discount Badge */}
                    {product.discountPercentage && (
                      <span 
                        id={`discount-badge-${product.id}`}
                        className="absolute top-3 left-3 text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full bg-[#00FF66] text-black shadow-[0_0_10px_rgba(0,255,102,0.5)] z-10"
                      >
                        -{product.discountPercentage}% OFF
                      </span>
                    )}

                    {/* Favorite Heart Icon */}
                    <button
                      id={`favorite-btn-${product.id}`}
                      onClick={(e) => toggleFavorite(e, product.id)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all z-10 cursor-pointer ${
                        isFav 
                          ? 'bg-black/90 text-red-500 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.5)] scale-110' 
                          : 'bg-black/70 text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#00FF66]/50'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      aria-label="Toggle favorite"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Quick Specs hover pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <span className="text-[11px] font-semibold bg-black/80 backdrop-blur-md text-[#00FF66] border border-[#00FF66]/40 px-3 py-1 rounded-lg flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> View Full Specifications
                      </span>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
                        <span>{product.brand}</span>
                        <span className="text-zinc-500">•</span>
                        <span>{product.category}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-base font-bold text-white group-hover:text-[#00FF66] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating)
                                  ? 'text-[#00FF66] fill-[#00FF66]'
                                  : 'text-zinc-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-mono font-semibold text-white">
                          {product.rating}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Pricing and Add to Cart Section */}
                    <div className="mt-5 pt-4 border-t border-zinc-900">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          {/* Current Price */}
                          <span className="text-2xl font-black font-mono text-[#00FF66] neon-text-glow">
                            ${product.price.toLocaleString()}
                          </span>
                          {/* Old Price */}
                          {product.oldPrice && (
                            <span className="text-xs font-mono text-zinc-500 line-through">
                              ${product.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {product.inStock ? (
                          <span className="text-[10px] font-mono font-bold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded">
                            IN STOCK
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                            BACKORDER
                          </span>
                        )}
                      </div>

                      {/* Bright green “Add to Cart” button as requested */}
                      <button
                        id={`add-to-cart-btn-${product.id}`}
                        onClick={(e) => handleAddToCartClick(e, product)}
                        className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                          isAdded
                            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                            : 'bg-[#00FF66] hover:bg-[#00e65c] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_25px_rgba(0,255,102,0.65)] active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-black stroke-[3]" />
                            <span>Added to Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 text-black stroke-[2.5]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                  {/* Bottom glowing line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#00FF66]" />
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
