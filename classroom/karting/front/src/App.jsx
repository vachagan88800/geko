import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Heart, Search, Menu, X, Star, ArrowRight, ChevronRight,
  Package, Truck, Shield, Zap, Plus, Minus, Trash2, ChevronDown, Check,
  Filter, Eye, Award, Globe, Clock, MapPin, Phone, Mail, CreditCard,
  ChevronLeft, Flag, SlidersHorizontal, Tag, Facebook, Twitter, Instagram,
  Youtube, Linkedin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRODUCTS = [
  {
    id: 1, name: "OTK Tony Kart 401R Senior", brand: "OTK", category: "Racing Karts",
    price: 4299, originalPrice: 4899, rating: 4.9, reviews: 127, stock: "In Stock", badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1612810938387-7bba76aa5a8c?w=600&h=500&fit=crop&auto=format",
    description: "The Tony Kart 401R is the absolute benchmark in senior racing karts. Built for champions and engineered for pure victory, it features advanced molybdenum steel tubing, adjustable front and rear ride heights, self-ventilating brake systems, and aerodynamic bodywork that cuts through track resistance with surgical precision.",
    tags: ["Kart", "Competition", "Senior", "OTK Chassis"],
  },
  {
    id: 2, name: "Arai GP-7 Racing Helmet", brand: "Arai", category: "Helmets",
    price: 899, originalPrice: 1099, rating: 4.8, reviews: 89, stock: "In Stock", badge: "Sale",
    image: "https://images.unsplash.com/photo-1556570508-121c77af2a75?w=600&h=500&fit=crop&auto=format",
    description: "The Arai GP-7 is an FIA-certified, ultra-lightweight carbon-composite helmet designed for maximum racing safety. Features a revolutionary ventilation system with seven intake ports, a dual-pivot visor locking mechanism, and removable fire-resistant cheek pads to deliver ultimate comfort and security at top speeds.",
    tags: ["Helmet", "Safety", "FIA Approved", "Carbon"],
  },
  {
    id: 3, name: "Alpinestars KMX-9 v2 Suit", brand: "Alpinestars", category: "Racing Suits",
    price: 349, originalPrice: null, rating: 4.7, reviews: 64, stock: "In Stock", badge: "New",
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=500&fit=crop&auto=format",
    description: "Certified to CIK-FIA Level 2 homologation standards, the KMX-9 v2 features an aggressive, technical design with a dual-layer construction for exceptional protection and breathability. Anatomical arm, leg, and torso panels ensure an optimal driving position with zero binding.",
    tags: ["Suit", "CIK-FIA", "Breathing Fabric", "Comfort Fit"],
  },
  {
    id: 4, name: "IAME X30 125cc Engine", brand: "IAME", category: "Engines",
    price: 2199, originalPrice: 2499, rating: 4.9, reviews: 203, stock: "In Stock", badge: "Pro",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=600&h=500&fit=crop&auto=format",
    description: "The IAME X30 is the world's most popular 125cc single-cylinder 2-stroke water-cooled karting engine. Rated at over 30 horsepower, it offers a perfect balance of blistering power, exceptional reliability, and strict class parity, making it the choice for national and international grids.",
    tags: ["Engine", "125cc", "2-Stroke", "Water Cooled"],
  },
  {
    id: 5, name: "CRG Road Rebel 2024", brand: "CRG", category: "Racing Karts",
    price: 3799, originalPrice: null, rating: 4.8, reviews: 55, stock: "Low Stock", badge: "2024",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&h=500&fit=crop&auto=format",
    description: "Italian master craftsmanship meets race-proven track geometry. The CRG Road Rebel features 32mm chrome-moly frame tubes, highly adjustable ride settings, and the legendary Ven11 braking system that provides unparalleled stopping power and feedback under heavy load.",
    tags: ["Kart", "Championship", "CRG", "32mm Tubing"],
  },
  {
    id: 6, name: "Sparco Tide KG-5 Gloves", brand: "Sparco", category: "Gloves",
    price: 89, originalPrice: 119, rating: 4.6, reviews: 178, stock: "In Stock", badge: "Sale",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop&auto=format",
    description: "Sparco Tide KG-5 karting gloves utilize a unique, patented 3D volcanic element palm grip configuration for unprecedented wheel tactile feel and anti-slip endurance. Pre-curved fingers and external seams reduce hand fatigue and pressure points during endurance racing stints.",
    tags: ["Gloves", "Sparco", "Tactile Grip", "Pro Series"],
  },
  {
    id: 7, name: "Bridgestone YLC Slick Tire Set", brand: "Bridgestone", category: "Tires",
    price: 249, originalPrice: null, rating: 4.7, reviews: 92, stock: "In Stock", badge: null,
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=500&fit=crop&auto=format",
    description: "The official tire selection for top-tier national karting classes. Bridgestone YLC compound delivers exceptionally fast warm-up cycles, long-lasting performance consistency, and astronomical cornering grip levels that allow drivers to push the limits of tire adhesion.",
    tags: ["Tires", "Slicks", "Bridgestone", "Soft Compound"],
  },
  {
    id: 8, name: "Rotax Max Evo 125cc", brand: "Rotax", category: "Engines",
    price: 2599, originalPrice: 2899, rating: 4.9, reviews: 314, stock: "In Stock", badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600&h=500&fit=crop&auto=format",
    description: "The Rotax Max Evo engine represents the highest standard of modern karting equality. With electronic fuel management, integrated power valves, and custom sealed components, it offers drivers an extremely pure performance sandbox where racing skill and setups win races.",
    tags: ["Engine", "Rotax", "125cc", "Evo Series"],
  }
];

const CATEGORIES = [
  { name: "Racing Karts", count: 24, emoji: "🏎️", color: "#E8002D", image: "https://images.unsplash.com/photo-1612810938387-7bba76aa5a8c?w=400&h=280&fit=crop&auto=format" },
  { name: "Helmets", count: 47, emoji: "⛑️", color: "#FF6B00", image: "https://images.unsplash.com/photo-1556570508-121c77af2a75?w=400&h=280&fit=crop&auto=format" },
  { name: "Racing Suits", count: 33, emoji: "🦺", color: "#FFD700", image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400&h=280&fit=crop&auto=format" },
  { name: "Gloves", count: 29, emoji: "🧤", color: "#00D4FF", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=280&fit=crop&auto=format" },
  { name: "Tires", count: 18, emoji: "⚙️", color: "#E8002D", image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&h=280&fit=crop&auto=format" },
  { name: "Engines", count: 12, emoji: "⚡", color: "#FF6B00", image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=400&h=280&fit=crop&auto=format" },
  { name: "Spare Parts", count: 156, emoji: "🔧", color: "#FFD700", image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&h=280&fit=crop&auto=format" },
  { name: "Accessories", count: 84, emoji: "🎯", color: "#00D4FF", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=280&fit=crop&auto=format" },
];

const BRANDS = ["Rotax", "IAME", "KG", "Alpinestars", "Sparco", "Arai", "Bell", "Bridgestone", "Mojo", "OTK", "CRG", "Tony Kart"];

const REVIEWS = [
  { name: "Marco Rossi", team: "Scuderia Italia Karting", rating: 5, avatar: "MR", color: "#E8002D", review: "The OTK Tony Kart I bought from KartShop is phenomenal. Shipping was unbelievably fast and everything arrived in immaculate condition. Top-tier service that matches the premium racing gear they sell." },
  { name: "Sarah Chen", team: "Pacific Racing Series", rating: 5, avatar: "SC", color: "#FF6B00", review: "Best karting shop online, period. I've been buying gear here for 3 seasons now. The Alpinestars suit fits perfectly, their technical support is top class, and prices beat every competitor on the web." },
  { name: "James O'Brien", team: "British Karting Association", rating: 5, avatar: "JO", color: "#FFD700", review: "Ordered the Rotax Max Evo engine on Thursday, and it was delivered on Saturday morning. The team knows their products inside out and went the extra mile to provide standard setup files." },
];

function HeroParticles() {
  const particles = [
    { top: "15%", left: "8%", size: 4, color: "#E8002D", dur: 5, delay: 0 },
    { top: "30%", left: "92%", size: 3, color: "#FF6B00", dur: 4, delay: 1 },
    { top: "60%", left: "5%", size: 5, color: "#FFD700", dur: 6, delay: 0.5 },
    { top: "75%", left: "88%", size: 3, color: "#E8002D", dur: 4.5, delay: 2 },
    { top: "45%", left: "50%", size: 2, color: "#FF6B00", dur: 3.5, delay: 0.8 },
    { top: "20%", left: "70%", size: 4, color: "#FFD700", dur: 5.5, delay: 1.5 },
    { top: "85%", left: "30%", size: 3, color: "#00D4FF", dur: 4, delay: 2.5 },
    { top: "10%", left: "45%", size: 2, color: "#E8002D", dur: 3, delay: 0.3 },
  ];
  const streaks = [
    { top: "25%", width: 200, dur: 4, del: 0, color: "rgba(232,0,45,0.4)" },
    { top: "55%", width: 300, dur: 5, del: 1.5, color: "rgba(255,107,0,0.3)" },
    { top: "70%", width: 150, dur: 3.5, del: 0.7, color: "rgba(255,215,0,0.3)" },
    { top: "40%", width: 250, dur: 4.5, del: 2.2, color: "rgba(0,212,255,0.25)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{
          top: p.top, left: p.left,
          width: p.size * 2, height: p.size * 2,
          background: p.color,
          boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          "--duration": `${p.dur}s`,
          "--delay": `${p.delay}s`,
          opacity: 0.6,
        }} />
      ))}
      {streaks.map((s, i) => (
        <div key={i} className="streak" style={{
          top: s.top,
          width: s.width,
          background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
          "--dur": `${s.dur}s`,
          "--del": `${s.del}s`,
        }} />
      ))}
    </div>
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
      ))}
    </div>
  );
}

function Badge({ label }) {
  const colors = {
    "Best Seller": "from-red-600 to-orange-500",
    "Sale": "from-orange-500 to-yellow-400",
    "New": "from-blue-500 to-cyan-400",
    "Pro": "from-purple-600 to-pink-500",
    "2024": "from-red-600 to-red-400",
    "Top Rated": "from-yellow-500 to-orange-400",
  };
  return (
    <span className={`bg-gradient-to-r ${colors[label] || "from-gray-600 to-gray-500"} text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-display tracking-wider`}>
      {label}
    </span>
  );
}

function ProductCard({ product, onView, onAddCart, compact = false }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    onAddCart(product);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="product-card glass rounded-2xl overflow-hidden cursor-pointer relative group flex flex-col h-full"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      onClick={onView}
    >
      {/* Glow layer */}
      <div className="card-glow-layer absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300" style={{ boxShadow: "0 0 40px rgba(232,0,45,0.15)", border: "1px solid rgba(232,0,45,0.2)" }} />

      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#0d0d0d]" style={{ height: compact ? 180 : 220 }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Overlay actions */}
        <div className="card-image-overlay absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/20 hover:border-red-500/50 transition-all hover:scale-110"
            onClick={(e) => { e.stopPropagation(); onView(); }}
          >
            <Eye size={16} className="text-white" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && <Badge label={product.badge} />}
          {discount && (
            <span className="bg-black/70 border border-red-500/40 text-red-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-display">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center border border-white/10 z-10 ${wished ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
        >
          <Heart size={15} className={wished ? "fill-red-500 text-red-500" : "text-white/70"} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[10px] font-black tracking-widest uppercase text-orange-400 font-display mb-1">{product.brand}</p>
          <h3 className="text-white font-bold font-display leading-tight mb-2 group-hover:text-red-400 transition-colors" style={{ fontSize: compact ? 14 : 15 }}>{product.name}</h3>

          <div className="flex items-center gap-2 mb-3">
            <Stars rating={product.rating} size={12} />
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2 border-t border-white/05 mt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-bold font-display" style={{ fontSize: compact ? 16 : 18 }}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-600 line-through text-xs">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <span className={`text-[10px] font-bold ${product.stock === "In Stock" ? "text-green-400" : "text-yellow-400"}`}>
              ● {product.stock}
            </span>
          </div>

          <button
            className="btn-primary h-9 px-4 rounded-xl text-white text-xs font-black font-display flex items-center gap-1.5 uppercase tracking-wide"
            onClick={handleAdd}
          >
            {added ? <Check size={14} /> : <Plus size={14} />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar({ currentPage, setCurrentPage, cartCount, onOpenCategoryFilter, onOpenBrandFilter }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (page) => {
    setMobileOpen(false);
    if (page === "categories") {
      onOpenCategoryFilter();
    } else if (page === "brands") {
      onOpenBrandFilter();
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-6" style={{ height: 72 }}>
        {/* Brand Logo */}
        <button
          className="flex items-center gap-2.5 flex-shrink-0"
          onClick={() => setCurrentPage("home")}
        >
          <div className="w-9 h-9 rounded-xl gradient-red flex items-center justify-center glow-red">
            <Flag size={18} className="text-white" />
          </div>
          <span className="text-xl font-black font-display text-white tracking-tight">
            Kart<span className="gradient-text-red">Shop</span>
          </span>
        </button>

        {/* Navigation Items */}
        <div className="hidden lg:flex items-center gap-8">
          <button
            className={`nav-link text-xs font-bold uppercase font-display tracking-wider transition-colors ${currentPage === "home" ? "text-white active" : "text-gray-400"}`}
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>
          <button
            className={`nav-link text-xs font-bold uppercase font-display tracking-wider transition-colors ${currentPage === "shop" ? "text-white active" : "text-gray-400"}`}
            onClick={() => handleNavClick("shop")}
          >
            Shop
          </button>
          <button
            className="nav-link text-xs font-bold uppercase font-display tracking-wider transition-colors text-gray-400"
            onClick={() => handleNavClick("categories")}
          >
            Categories
          </button>
          <button
            className="nav-link text-xs font-bold uppercase font-display tracking-wider transition-colors text-gray-400"
            onClick={() => handleNavClick("brands")}
          >
            Brands
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <button className="hidden sm:flex w-9 h-9 rounded-xl glass border border-white/08 items-center justify-center relative hover:border-red-500/30 transition-all">
            <Heart size={16} className="text-gray-400 hover:text-white transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 gradient-red rounded-full text-white text-[9px] flex items-center justify-center font-bold">2</span>
          </button>

          {/* Cart Icon */}
          <button
            className="flex items-center gap-2 btn-primary h-9 px-4 rounded-xl text-white text-xs font-black uppercase tracking-wider font-display relative"
            onClick={() => setCurrentPage("cart")}
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Cart</span>
            <span className="w-5 h-5 bg-white/20 rounded-full text-[10px] flex items-center justify-center font-bold">{cartCount}</span>
          </button>

          {/* Hamburger Menu */}
          <button
            className="lg:hidden w-9 h-9 rounded-xl glass border border-white/08 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={16} className="text-white" /> : <Menu size={16} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass-strong border-t border-white/08 px-6 py-4 flex flex-col gap-3">
          <button
            className="text-left py-2 text-xs font-bold uppercase font-display tracking-wider text-gray-300 hover:text-white transition-colors border-b border-white/05"
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>
          <button
            className="text-left py-2 text-xs font-bold uppercase font-display tracking-wider text-gray-300 hover:text-white transition-colors border-b border-white/05"
            onClick={() => handleNavClick("shop")}
          >
            Shop
          </button>
          <button
            className="text-left py-2 text-xs font-bold uppercase font-display tracking-wider text-gray-300 hover:text-white transition-colors border-b border-white/05"
            onClick={() => handleNavClick("categories")}
          >
            Categories
          </button>
          <button
            className="text-left py-2 text-xs font-bold uppercase font-display tracking-wider text-gray-300 hover:text-white transition-colors border-b border-white/05"
            onClick={() => handleNavClick("brands")}
          >
            Brands
          </button>
        </div>
      )}
    </nav>
  );
}

function HomePage({ setCurrentPage, setSelectedProduct, onAddCart, categorySectionRef, onSelectCategory }) {
  const [hoveredCat, setHoveredCat] = useState(null);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">
        <HeroParticles />

        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1612810938387-7bba76aa5a8c?w=1920&h=1080&fit=crop&auto=format"
            alt="Professional go-kart racing"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.9) 100%)" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(ellipse, #E8002D, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Hero */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass border border-red-500/25 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-red-400 font-display">Official Racing Equipment</span>
            </div>

            <h1 className="font-black font-display leading-none mb-6" style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)", letterSpacing: "-0.03em" }}>
              Built For<br />
              <span className="gradient-text-all text-glow-red">Speed.</span><br />
              <span style={{ color: "rgba(255,255,255,0.95)" }}>Designed</span><br />
              <span className="gradient-text-orange">To Win.</span>
            </h1>

            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
              Premium racing karts, helmets, suits, tires, engines, and official accessories for professional drivers. Built for the track, trusted by champions worldwide.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="btn-primary h-14 px-8 rounded-2xl text-white font-black font-display text-base flex items-center gap-2.5 uppercase tracking-wider"
                onClick={() => setCurrentPage("shop")}
              >
                Shop Now <ArrowRight size={18} />
              </button>
              <button
                className="btn-ghost h-14 px-8 rounded-2xl text-white font-bold font-display text-sm flex items-center gap-2 uppercase tracking-wider"
                onClick={() => {
                  categorySectionRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Categories <ChevronRight size={16} />
              </button>
            </div>

            {/* Stat Counters */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/06 flex-wrap sm:flex-nowrap">
              {[
                { val: "15K+", label: "Products" },
                { val: "50+", label: "Top Brands" },
                { val: "98%", label: "Satisfaction" },
                { val: "120+", label: "Countries" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-black font-display gradient-text-red">{s.val}</div>
                  <div className="text-[10px] text-gray-500 font-black tracking-widest uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Featured Card */}
          <div className="hidden lg:flex justify-center animate-fade-up-delay2">
            <div className="relative">
              {/* Spinning decoration circles */}
              <div className="absolute inset-[-40px] rounded-full border border-red-500/10 animate-spin-slow" />
              <div className="absolute inset-[-20px] rounded-full border border-orange-500/08" style={{ animation: "spin-slow 12s linear infinite reverse" }} />

              <div className="glass rounded-3xl overflow-hidden glow-red w-[380px]" style={{ border: "1px solid rgba(232,0,45,0.2)" }} onClick={() => { setSelectedProduct(PRODUCTS[0]); setCurrentPage("product"); }}>
                <div className="relative bg-[#0d0d0d]" style={{ height: 260 }}>
                  <img
                    src="https://images.unsplash.com/photo-1612810938387-7bba76aa5a8c?w=760&h=560&fit=crop&auto=format"
                    alt="Featured racing kart"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge label="Best Seller" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-black tracking-widest uppercase text-orange-400 font-display mb-1">OTK Racing</p>
                  <h3 className="text-white font-bold font-display text-lg mb-3">Tony Kart 401R Senior</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black font-display text-white">$4,299</span>
                      <span className="text-gray-600 line-through text-xs ml-2">$4,899</span>
                    </div>
                    <button
                      className="btn-primary h-10 px-5 rounded-xl text-white text-xs font-black font-display uppercase tracking-wider"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating banner */}
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-2.5 glow-orange" style={{ border: "1px solid rgba(255,107,0,0.3)" }}>
                <div className="text-[10px] text-orange-400 font-black tracking-wider uppercase font-display">Free Shipping</div>
                <div className="text-white font-black font-display">Worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <span className="text-[9px] text-gray-500 tracking-widest uppercase font-display font-bold">Scroll</span>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section ref={categorySectionRef} className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-14">
          <p className="text-[10px] font-black tracking-widest uppercase text-red-500 font-display mb-3">Shop by Category</p>
          <h2 className="text-4xl md:text-5xl font-black font-display text-white leading-none">
            Everything You Need<br />
            <span className="gradient-text-all">To Race</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              className="category-card glass rounded-2xl overflow-hidden text-left relative"
              style={{ border: `1px solid rgba(255,255,255,0.07)`, height: 200 }}
              onMouseEnter={() => setHoveredCat(i)}
              onMouseLeave={() => setHoveredCat(null)}
              onClick={() => onSelectCategory(cat.name)}
            >
              <img src={cat.image} alt={cat.name} className="cat-img absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(10,10,10,0.85), rgba(10,10,10,0.4))` }} />
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${cat.color}20, transparent)`, boxShadow: `inset 0 0 40px ${cat.color}15` }} />

              {/* Hover glow */}
              {hoveredCat === i && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: `0 0 30px ${cat.color}25`, border: `1px solid ${cat.color}35` }} />
              )}

              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="text-2xl mb-2">{cat.emoji}</div>
                <h3 className="text-white font-bold font-display text-sm leading-tight">{cat.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5 font-display">{cat.count} products</p>
              </div>

              <div className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all" style={{ background: `${cat.color}25`, border: `1px solid ${cat.color}40` }}>
                <ArrowRight size={13} style={{ color: cat.color }} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Products Grid ── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, transparent, rgba(232,0,45,0.04), transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-orange-400 font-display mb-3">Featured Products</p>
              <h2 className="text-4xl md:text-5xl font-black font-display text-white">
                Race-Proven<br />
                <span className="gradient-text-orange">Equipment</span>
              </h2>
            </div>
            <button
              className="btn-ghost hidden md:flex items-center gap-2 px-5 h-11 rounded-xl text-xs font-black uppercase tracking-wider font-display text-gray-300"
              onClick={() => setCurrentPage("shop")}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onView={() => { setSelectedProduct(p); setCurrentPage("product"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onAddCart={onAddCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black tracking-widest uppercase text-red-500 font-display mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-black font-display text-white">
              The <span className="gradient-text-all">Champion's</span> Choice
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, label: "Pro-Grade Equipment", desc: "Every product tested and certified by professional racing teams. Only the best makes our catalog.", color: "#E8002D", grad: "from-red-600 to-red-400" },
              { icon: Globe, label: "Worldwide Shipping", desc: "We ship to 120+ countries with tracked delivery. Race anywhere on the planet with confidence.", color: "#FF6B00", grad: "from-orange-500 to-yellow-400" },
              { icon: Shield, label: "Certified Brands", desc: "Authorized dealer for OTK, CRG, Rotax, IAME, Alpinestars, Sparco, Arai and more top marques.", color: "#FFD700", grad: "from-yellow-400 to-orange-400" },
              { icon: Zap, label: "Lightning Fast Delivery", desc: "In-stock orders dispatched same day. Express options available for race weekend emergencies.", color: "#00D4FF", grad: "from-cyan-400 to-blue-500" },
            ].map(({ icon: Icon, label, desc, color, grad }) => (
              <div
                key={label}
                className="glass rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 group"
                style={{ border: `1px solid rgba(255,255,255,0.07)` }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <h3 className="text-white font-bold font-display text-base mb-2 leading-tight">{label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>

                <div className="mt-4 h-0.5 rounded-full overflow-hidden" style={{ background: `rgba(255,255,255,0.05)` }}>
                  <div className={`h-full bg-gradient-to-r ${grad} w-0 group-hover:w-full transition-all duration-700 rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands Marquee ── */}
      <section className="py-16 border-y border-white/05 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 font-display">Official Partner Brands</p>
        </div>
        <div className="scroll-mask-right">
          <div className="flex animate-brand-scroll" style={{ width: "max-content" }}>
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-8 px-6 py-3 glass rounded-xl border border-white/06 hover:border-red-500/30 transition-all hover:-translate-y-1 cursor-pointer flex-shrink-0"
                style={{ minWidth: 120 }}
              >
                <span className="text-gray-400 font-black font-display text-xs tracking-widest uppercase hover:text-white transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Track Record Stats Card ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ border: "1px solid rgba(232,0,45,0.15)", background: "linear-gradient(135deg, rgba(232,0,45,0.06), rgba(255,107,0,0.04), rgba(10,10,10,0.8))" }}>
            <div className="absolute right-0 top-0 w-[500px] h-[300px] rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(ellipse, #E8002D, transparent)" }} />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-red-500 font-display mb-4">Track Record</p>
                <h2 className="text-3xl md:text-4xl font-black font-display text-white leading-tight mb-4">
                  Trusted By<br />
                  <span className="gradient-text-all">Champions Worldwide</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">From grassroots club racing to international FIA championship grids, KartShop equips drivers who refuse to compromise on quality or safety.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "50,000+", label: "Happy Customers", icon: "👥" },
                  { val: "200+", label: "Championship Wins", icon: "🏆" },
                  { val: "15 Years", label: "Industry Experience", icon: "📅" },
                  { val: "24/7", label: "Expert Support", icon: "💬" },
                ].map(s => (
                  <div key={s.label} className="glass rounded-2xl p-4" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-lg font-black font-display gradient-text-red">{s.val}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black tracking-widest uppercase text-orange-400 font-display mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-black font-display text-white">
              Drivers <span className="gradient-text-orange">Love Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                style={{ border: `1px solid rgba(255,255,255,0.07)` }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center font-black font-display text-white text-xs" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}88)` }}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="text-white font-bold font-display text-sm">{r.name}</div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Flag size={10} style={{ color: r.color }} />
                        {r.team}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Stars rating={r.rating} size={12} />
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed italic">"{r.review}"</p>
                </div>

                <div className="mt-5 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${r.color}50, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(232,0,45,0.12), rgba(255,107,0,0.08), rgba(10,10,10,0.9))", border: "1px solid rgba(232,0,45,0.2)", boxShadow: "0 0 60px rgba(232,0,45,0.1)" }}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(232,0,45,0.15), transparent)" }} />
              <HeroParticles />
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-black tracking-widest uppercase text-red-400 font-display mb-4">Newsletter</p>
              <h2 className="text-4xl md:text-5xl font-black font-display text-white mb-4 leading-none">
                Stay Ahead Of The<br />
                <span className="gradient-text-all">Competition</span>
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">Get exclusive racing offers, fresh product announcements, and professional setup recommendations directly.</p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-12 px-5 rounded-2xl glass border border-white/15 text-white placeholder:text-gray-600 text-sm"
                />
                <button className="btn-primary h-12 px-7 rounded-2xl text-white font-black font-display text-xs uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2">
                  Subscribe <ArrowRight size={14} />
                </button>
              </div>

              <p className="text-gray-700 text-[10px] mt-4 font-bold tracking-wider uppercase font-display">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShopPage({ setCurrentPage, setSelectedProduct, onAddCart, activeCategory, setActiveCategory, activeBrand, setActiveBrand, showFilters, setShowFilters }) {
  const [sortBy, setSortBy] = useState("Popular");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQ, setSearchQ] = useState("");

  const cats = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const brandList = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.brand)))];

  const filtered = PRODUCTS.filter(p => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (activeBrand !== "All" && p.brand !== activeBrand) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (searchQ && !p.name.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-display font-bold uppercase tracking-wider">
          <button className="hover:text-white transition-colors" onClick={() => setCurrentPage("home")}>Home</button>
          <ChevronRight size={12} />
          <span className="text-gray-300">Shop</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black font-display text-white">
              Racing <span className="gradient-text-all">Equipment</span>
            </h1>
            <p className="text-gray-500 text-xs mt-1 font-bold tracking-wider uppercase">{filtered.length} products available</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="flex items-center glass border border-white/10 rounded-xl px-3 h-11 gap-2">
              <Search size={14} className="text-gray-500" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-white text-xs outline-none w-36 placeholder:text-gray-600"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none glass border border-white/10 rounded-xl h-11 px-4 pr-8 text-xs text-gray-300 font-display font-bold uppercase tracking-wider bg-transparent cursor-pointer"
              >
                {["Popular", "Newest", "Price: Low to High", "Price: High to Low"].map(o => (
                  <option key={o} value={o} className="bg-[#111]">{o}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Filters Toggle Button */}
            <button
              className="btn-ghost h-11 px-4 rounded-xl flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-gray-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-6">
        {/* Toggleable Sidebar Filters */}
        <div className={`flex-shrink-0 transition-all duration-300 overflow-hidden ${showFilters ? "w-64" : "w-0 opacity-0"}`}>
          <div className="glass rounded-2xl p-5 space-y-6 w-60" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <h3 className="text-white font-black font-display text-[10px] uppercase tracking-widest mb-3 text-red-400">Categories</h3>
              {cats.map(c => (
                <button
                  key={c}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-display font-bold tracking-wider uppercase transition-all mb-1 ${activeCategory === c ? "bg-red-500/15 text-red-400 border border-red-500/30" : "text-gray-500 hover:text-white hover:bg-white/05 border border-transparent"}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-white font-black font-display text-[10px] uppercase tracking-widest mb-3 text-orange-400">Brands</h3>
              {brandList.map(b => (
                <button
                  key={b}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-display font-bold tracking-wider uppercase transition-all mb-1 ${activeBrand === b ? "bg-orange-500/15 text-orange-400 border border-orange-500/30" : "text-gray-500 hover:text-white hover:bg-white/05 border border-transparent"}`}
                  onClick={() => setActiveBrand(b)}
                >
                  {b}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-white font-black font-display text-[10px] uppercase tracking-widest mb-3 text-yellow-400">Price Range</h3>
              <div className="text-gray-400 text-xs font-display font-semibold mb-2">${priceRange[0]} – ${priceRange[1]}</div>
              <input
                type="range" min={0} max={5000} step={50}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-red-500 bg-gray-800"
              />
            </div>

            <button
              className="w-full btn-ghost py-2.5 rounded-xl text-xs font-display font-black uppercase tracking-wider text-gray-400"
              onClick={() => { setActiveCategory("All"); setActiveBrand("All"); setPriceRange([0, 5000]); setSearchQ(""); }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Grid Panel */}
        <div className="flex-1">
          {/* Quick pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cats.map(c => (
              <button
                key={c}
                className={`filter-tag px-4 h-9 rounded-xl border text-xs font-display font-black uppercase tracking-wider transition-all ${activeCategory === c ? "active" : "border-white/10 text-gray-500"}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-600">
              <Package size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-display font-black text-lg">No products match filters</p>
              <p className="text-xs mt-1 uppercase tracking-wider">Try resetting active category or brand filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => { setSelectedProduct(p); setCurrentPage("product"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  onAddCart={onAddCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductPage({ setCurrentPage, product, onAddCart }) {
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const p = product || PRODUCTS[0];
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;

  const mockGallery = [p.image, PRODUCTS[2].image, PRODUCTS[3].image, PRODUCTS[4].image];

  const handleAdd = () => {
    setAdded(true);
    onAddCart(p, qty);
    setTimeout(() => setAdded(false), 2000);
  };

  const tabs = ["description", "specifications", "reviews", "shipping"];

  const specs = [
    { k: "Brand Partner", v: p.brand },
    { k: "Racing Class", v: p.category },
    { k: "Certification", v: "FIA / CIK-FIA Homologated" },
    { k: "Warranty Offer", v: "12 Month Limited" },
    { k: "Weight Spec", v: "Variable by Size" },
    { k: "Production Year", v: "2025 Series" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-display font-bold uppercase tracking-wider">
          <button className="hover:text-white transition-colors" onClick={() => setCurrentPage("home")}>Home</button>
          <ChevronRight size={12} />
          <button className="hover:text-white transition-colors" onClick={() => setCurrentPage("shop")}>Shop</button>
          <ChevronRight size={12} />
          <span className="text-gray-300">{p.name}</span>
        </div>

        {/* Gallery & Core purchase interface */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="glass rounded-2xl overflow-hidden relative bg-[#0d0d0d]" style={{ border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "4/3" }}>
              <img src={mockGallery[selectedImg]} alt={p.name} className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {p.badge && (
                <div className="absolute top-4 left-4 z-10"><Badge label={p.badge} /></div>
              )}
              {discount && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="glass border border-red-500/40 text-red-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider font-display">-{discount}%</span>
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="grid grid-cols-4 gap-3">
              {mockGallery.map((img, i) => (
                <button
                  key={i}
                  className="rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    border: selectedImg === i ? "2px solid rgba(232,0,45,0.7)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: selectedImg === i ? "0 0 15px rgba(232,0,45,0.25)" : "none",
                    aspectRatio: "4/3",
                  }}
                  onClick={() => setSelectedImg(i)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Options Info */}
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-orange-400 font-display mb-2">{p.brand}</p>
            <h1 className="text-3xl md:text-4xl font-black font-display text-white leading-tight mb-3">{p.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <Stars rating={p.rating} size={16} />
              <span className="text-gray-400 text-xs">({p.reviews} customer reviews)</span>
              <span className={`text-xs font-black uppercase tracking-wider font-display ${p.stock === "In Stock" ? "text-green-400" : "text-yellow-400"}`}>● {p.stock}</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.description}</p>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black font-display text-white">${p.price.toLocaleString()}</span>
              {p.originalPrice && (
                <span className="text-gray-600 line-through text-lg">${p.originalPrice.toLocaleString()}</span>
              )}
              {discount && (
                <span className="text-xs font-black text-red-400 font-display bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Save {discount}%</span>
              )}
            </div>

            {/* Tags strip */}
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tags.map(t => (
                <span key={t} className="glass border border-white/10 text-gray-400 text-[10px] font-display font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag size={10} /> {t}
                </span>
              ))}
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center glass border border-white/10 rounded-xl overflow-hidden">
                <button className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:bg-white/05" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-white font-bold font-display">{qty}</span>
                <button className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:bg-white/05" onClick={() => setQty(qty + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-gray-500 text-xs uppercase font-bold tracking-wider font-display">Subtotal: <span className="text-white font-black">${(p.price * qty).toLocaleString()}</span></span>
            </div>

            {/* Buy & Add buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                className="btn-primary flex-1 h-14 rounded-2xl text-white font-black font-display text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                onClick={handleAdd}
              >
                {added ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button
                className="btn-orange flex-1 h-14 rounded-2xl text-white font-black font-display text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                onClick={() => { onAddCart(p, qty); setCurrentPage("checkout"); }}
              >
                Instant Checkout <ArrowRight size={18} />
              </button>
            </div>

            <button
              className={`flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider transition-colors ${wished ? "text-red-400" : "text-gray-500 hover:text-white"}`}
              onClick={() => setWished(!wished)}
            >
              <Heart size={16} className={wished ? "fill-red-400" : ""} />
              {wished ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        {/* Tab system */}
        <div className="glass rounded-2xl overflow-hidden mb-12" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex border-b border-white/07">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-btn px-6 py-4 text-xs font-black font-display uppercase tracking-wider ${activeTab === tab ? "text-white active" : "text-gray-600"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-400 leading-relaxed text-sm mb-4">{p.description}</p>
                <p className="text-gray-500 leading-relaxed text-xs">
                  All items sold via KartShop are brand new, standard-packed, and shipped directly from certified motorsport logistics centers in Europe. Racing components are built strictly to homologated engineering guidelines and fully track-validated prior to final customer release.
                </p>
              </div>
            )}
            {activeTab === "specifications" && (
              <div className="grid md:grid-cols-2 gap-3">
                {specs.map(({ k, v }) => (
                  <div key={k} className="flex justify-between items-center py-3 border-b border-white/05">
                    <span className="text-gray-500 text-xs font-display font-bold uppercase tracking-wider">{k}</span>
                    <span className="text-white text-xs font-display font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-5">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="glass rounded-xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-display text-xs text-white" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}88)` }}>{r.avatar}</div>
                      <div>
                        <div className="text-white font-bold font-display text-xs">{r.name}</div>
                        <div className="text-gray-500 text-[9px] font-bold uppercase tracking-wider">{r.team}</div>
                      </div>
                      <div className="ml-auto">
                        <Stars rating={r.rating} size={11} />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed italic">"{r.review}"</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Truck, title: "Standard Dispatch", desc: "3-7 track business days. Full transit insurance coverage included.", cost: "Free over $150" },
                  { icon: Zap, title: "Next-Day Air Racing Delivery", desc: "Premium courier delivery designed for weekend race survival emergencies.", cost: "Flat $49.90" },
                ].map(({ icon: Icon, title, desc, cost }) => (
                  <div key={title} className="glass rounded-xl p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Icon size={20} className="text-red-400 mb-3" />
                    <h4 className="text-white font-bold font-display mb-1 text-sm">{title}</h4>
                    <p className="text-gray-500 text-xs mb-2">{desc}</p>
                    <span className="text-orange-400 font-black font-display text-xs uppercase tracking-wider">{cost}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        <div>
          <h2 className="text-2xl font-black font-display text-white mb-6">Related Gear</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.filter(item => item.id !== p.id).slice(0, 4).map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onView={() => { setSelectedProduct(item); setSelectedImg(0); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onAddCart={onAddCart}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPage({ setCurrentPage, cartItems, setCartItems }) {
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQty = (idx, delta) => {
    const updated = cartItems.map((item, i) => i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item);
    setCartItems(updated);
  };
  const remove = (idx) => setCartItems(cartItems.filter((_, i) => i !== idx));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-display font-bold uppercase tracking-wider">
          <button className="hover:text-white transition-colors" onClick={() => setCurrentPage("home")}>Home</button>
          <ChevronRight size={12} />
          <span className="text-gray-300">Cart</span>
        </div>

        <h1 className="text-4xl font-black font-display text-white mb-8">
          Your <span className="gradient-text-all">Cart</span>
          <span className="text-gray-600 text-2xl ml-3 font-bold">({cartItems.length} items)</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <ShoppingCart size={64} className="mx-auto mb-5 text-gray-700" />
            <h2 className="text-2xl font-black font-display text-white mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 text-sm">Fill your garage with pro racing components and tracksides.</p>
            <button className="btn-primary h-12 px-8 rounded-xl text-white font-bold font-display text-xs uppercase tracking-wider" onClick={() => setCurrentPage("shop")}>
              Browse Shop Catalog
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items list */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="glass rounded-2xl p-5 flex gap-4" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-[#0d0d0d] flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-[10px] font-black text-orange-400 font-display tracking-wider mb-0.5 uppercase">{item.product.brand}</p>
                        <h3 className="text-white font-bold font-display text-sm leading-tight">{item.product.name}</h3>
                        <p className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider ${item.product.stock === "In Stock" ? "text-green-400" : "text-yellow-400"}`}>● {item.product.stock}</p>
                      </div>
                      <button className="text-gray-600 hover:text-red-400 transition-colors" onClick={() => remove(idx)}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/05">
                      <div className="flex items-center glass border border-white/10 rounded-lg overflow-hidden">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors" onClick={() => updateQty(idx, -1)}>
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-white font-bold font-display text-xs">{item.qty}</span>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors" onClick={() => updateQty(idx, 1)}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-white font-black font-display text-base">${(item.product.price * item.qty).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="btn-ghost w-full h-11 rounded-xl text-xs font-black uppercase tracking-wider font-display text-gray-400 flex items-center justify-center gap-2"
                onClick={() => setCurrentPage("shop")}
              >
                <ChevronLeft size={16} /> Continue Racing Shopping
              </button>
            </div>

            {/* Total Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-24" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-xl font-black font-display text-white mb-5 uppercase tracking-wide">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  {[
                    { label: "Subtotal", val: `$${subtotal.toFixed(2)}` },
                    { label: "Shipping Ground", val: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}` },
                    { label: "V.A.T Tax (8%)", val: `$${tax.toFixed(2)}` },
                    { label: "Promo Code", val: "-$0.00" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-gray-500 font-display font-bold uppercase tracking-wider">{label}</span>
                      <span className="font-display font-bold text-gray-300">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/08 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold font-display text-sm uppercase tracking-wider">Total Charge</span>
                    <span className="text-2xl font-black font-display gradient-text-red">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo application */}
                <div className="flex gap-2 mb-5">
                  <input
                    placeholder="ENTER CODE"
                    className="flex-1 h-10 px-3 glass border border-white/10 rounded-xl text-white text-xs placeholder:text-gray-700 outline-none uppercase font-bold"
                  />
                  <button className="btn-ghost h-10 px-4 rounded-xl text-xs font-display font-black uppercase tracking-wider">Apply</button>
                </div>

                <button
                  className="btn-primary w-full h-13 rounded-2xl text-white font-black font-display text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  style={{ height: 52 }}
                  onClick={() => setCurrentPage("checkout")}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>

                {/* Secure Badge */}
                <div className="mt-4 flex items-center justify-center gap-4 text-gray-600 text-[10px] font-black uppercase tracking-wider font-display">
                  <div className="flex items-center gap-1"><Shield size={11} /> 100% Secure</div>
                  <div className="flex items-center gap-1"><CreditCard size={11} /> Encrypted</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutPage({ setCurrentPage, cartItems, onClearCart }) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "", country: "US",
  });
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [placed, setPlaced] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shippingCost = shipping === "express" ? 24.99 : shipping === "overnight" ? 49.99 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const steps = ["Shipping", "Payment", "Review"];

  const handlePlaceOrder = () => {
    setPlaced(true);
    onClearCart();
  };

  if (placed) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 rounded-full gradient-red flex items-center justify-center mx-auto mb-6 glow-red animate-pulse-border">
            <Check size={44} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-black font-display text-white mb-3 leading-none">Order Confirmed!</h1>
          <p className="text-gray-400 text-sm mb-4">Your racing shipment is scheduled. A track telemetry verification and booking receipt has been sent to your inbox.</p>
          <p className="text-xs text-red-400 mb-8 font-display font-black uppercase tracking-widest bg-red-500/10 border border-red-500/20 py-2 rounded-xl">Order Code: KS-{Math.floor(Math.random() * 90000 + 10000)}</p>
          <div className="flex gap-3 justify-center">
            <button className="btn-primary h-12 px-6 rounded-xl text-white font-bold font-display text-xs uppercase tracking-wider" onClick={() => setCurrentPage("home")}>Back to Home</button>
            <button className="btn-ghost h-12 px-6 rounded-xl text-gray-300 font-bold font-display text-xs uppercase tracking-wider" onClick={() => setCurrentPage("shop")}>Continue Gear Hunting</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-display font-bold uppercase tracking-wider">
          <button className="hover:text-white" onClick={() => setCurrentPage("home")}>Home</button>
          <ChevronRight size={12} />
          <button className="hover:text-white" onClick={() => setCurrentPage("cart")}>Cart</button>
          <ChevronRight size={12} />
          <span className="text-gray-300">Checkout</span>
        </div>

        <h1 className="text-4xl font-black font-display text-white mb-8">
          Checkout Flow
        </h1>

        {/* Steps display */}
        <div className="flex items-center gap-0 mb-10 max-w-md">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <button
                className={`step-indicator w-9 h-9 rounded-full border flex items-center justify-center font-bold font-display text-sm transition-all ${
                  step === i + 1 ? "active text-white" :
                  step > i + 1 ? "done text-red-400 border-red-500/40" :
                  "border-white/15 text-gray-600"
                }`}
                onClick={() => step > i + 1 && setStep(i + 1)}
              >
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </button>
              <span className={`ml-2 text-[10px] font-black uppercase tracking-wider font-display ${step === i + 1 ? "text-white" : "text-gray-600"}`}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-white/08 mx-3" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h2 className="text-xl font-black font-display text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                    <MapPin size={18} className="text-red-400" /> Shipping Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { k: "firstName", label: "First Name", placeholder: "e.g. Marco", type: "text" },
                      { k: "lastName", label: "Last Name", placeholder: "e.g. Rossi", type: "text" },
                      { k: "email", label: "Email Address", placeholder: "e.g. marco@racing.com", type: "email" },
                      { k: "phone", label: "Phone Number", placeholder: "e.g. +39 02 1234567", type: "text" },
                    ].map(field => (
                      <div key={field.k}>
                        <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.k]}
                          onChange={e => setForm({ ...form, [field.k]: e.target.value })}
                          className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700"
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">Track Delivery Address</label>
                      <input
                        placeholder="Street, Pit Lane, Apartment..."
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                        className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">City</label>
                      <input placeholder="Monaco" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">ZIP Code</label>
                      <input placeholder="98000" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Shipping selections */}
                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h2 className="text-xl font-black font-display text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                    <Truck size={18} className="text-orange-400" /> Ground or Trackside Logistics
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Standard Track Dispatch", sub: "3-7 business days", price: "$14.99" },
                      { id: "express", label: "Express Racing Courier", sub: "1-3 business days", price: "$24.99" },
                      { id: "overnight", label: "Emergency Overnight Air", sub: "Next-day arrival", price: "$49.99" },
                    ].map(opt => (
                      <div
                        key={opt.id}
                        className={`checkout-card flex items-center gap-4 p-4 rounded-xl border ${shipping === opt.id ? "selected" : "border-white/08 glass"}`}
                        onClick={() => setShipping(opt.id)}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${shipping === opt.id ? "border-red-500" : "border-gray-600"}`}>
                          {shipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-bold font-display text-sm">{opt.label}</div>
                          <div className="text-gray-500 text-xs font-display">{opt.sub}</div>
                        </div>
                        <div className="text-white font-bold font-display">{opt.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-primary w-full h-13 rounded-2xl text-white font-black font-display text-xs uppercase tracking-widest flex items-center justify-center gap-2" style={{ height: 52 }} onClick={() => setStep(2)}>
                  Continue to Payment <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h2 className="text-xl font-black font-display text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                    <CreditCard size={18} className="text-yellow-400" /> Secure Payment Gateways
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { id: "card", label: "Credit Card", icon: "💳" },
                      { id: "paypal", label: "PayPal", icon: "🅿️" },
                      { id: "apple", label: "Apple Pay", icon: "🍎" },
                      { id: "google", label: "Google Pay", icon: "🔵" },
                    ].map(opt => (
                      <div
                        key={opt.id}
                        className={`checkout-card flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center cursor-pointer ${payment === opt.id ? "selected" : "border-white/08 glass"}`}
                        onClick={() => setPayment(opt.id)}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className={`font-black font-display text-[10px] uppercase tracking-wider ${payment === opt.id ? "text-white" : "text-gray-500"}`}>{opt.label}</span>
                      </div>
                    ))}
                  </div>

                  {payment === "card" && (
                    <div className="space-y-4">
                      {/* Credit Card Mock */}
                      <div className="glass rounded-2xl p-6 relative overflow-hidden" style={{ border: "1px solid rgba(232,0,45,0.2)", background: "linear-gradient(135deg, rgba(232,0,45,0.08), rgba(10,10,10,0.8))" }}>
                        <div className="flex justify-between items-start mb-8">
                          <div className="text-[10px] text-gray-500 font-display font-black tracking-widest uppercase">KartShop Champion Card</div>
                          <CreditCard size={28} className="text-red-400" />
                        </div>
                        <div className="text-white font-mono text-base sm:text-lg tracking-widest mb-4">{cardNum || "•••• •••• •••• ••••"}</div>
                        <div className="flex justify-between">
                          <div>
                            <div className="text-gray-600 text-[9px] uppercase tracking-wider">Holder</div>
                            <div className="text-white font-display font-bold text-xs truncate uppercase">{form.firstName || "YOUR"} {form.lastName || "NAME"}</div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-[9px] uppercase tracking-wider">Expires</div>
                            <div className="text-white font-display font-bold text-xs">{cardExpiry || "MM/YY"}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">Card Number</label>
                        <input
                          placeholder="4532 1234 5678 9012"
                          maxLength={19}
                          value={cardNum}
                          onChange={e => setCardNum(e.target.value)}
                          className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">Expiry Date</label>
                          <input
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-1.5">CVV Code</label>
                          <input
                            placeholder="•••"
                            type="password"
                            maxLength={3}
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            className="w-full h-11 px-4 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {payment !== "card" && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="font-display font-semibold text-xs uppercase tracking-wider">You will transition to external secure window to authorize {payment.toUpperCase()} payment.</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button className="btn-ghost flex-1 h-13 rounded-2xl font-display font-black text-xs uppercase tracking-widest text-gray-300 flex items-center justify-center gap-2" style={{ height: 52 }} onClick={() => setStep(1)}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button className="btn-primary flex-1 h-13 rounded-2xl text-white font-black font-display text-xs uppercase tracking-widest flex items-center justify-center gap-2" style={{ height: 52 }} onClick={() => setStep(3)}>
                    Review Order <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h2 className="text-xl font-black font-display text-white mb-5 uppercase tracking-wider">Final Verification</h2>

                  <div className="space-y-3 mb-5">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-3 border-b border-white/06">
                        <img src={item.product.image} alt={item.product.name} className="w-14 h-12 object-cover rounded-lg" />
                        <div className="flex-1">
                          <div className="text-white text-xs font-bold font-display">{item.product.name}</div>
                          <div className="text-gray-500 text-[10px] uppercase tracking-wider">Qty: {item.qty}</div>
                        </div>
                        <div className="text-white font-bold font-display text-sm">${(item.product.price * item.qty).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="glass rounded-xl p-4 border border-white/05">
                      <div className="text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-2">Shipping Destination</div>
                      <div className="text-white font-display font-bold text-sm">{form.firstName || "Marco"} {form.lastName || "Rossi"}</div>
                      <div className="text-gray-400 text-xs mt-1">{form.address || "123 Circuit Road"}, {form.city || "Monaco"}</div>
                    </div>
                    <div className="glass rounded-xl p-4 border border-white/05">
                      <div className="text-[10px] font-black text-gray-500 font-display tracking-widest uppercase mb-2">Payment Details</div>
                      <div className="text-white font-display font-bold text-sm capitalize">{payment === "card" ? "Credit Card" : payment}</div>
                      {payment === "card" && <div className="text-gray-400 text-xs mt-1">•••• •••• •••• {cardNum.slice(-4) || "9012"}</div>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn-ghost h-13 px-5 rounded-2xl font-display font-black text-xs uppercase tracking-widest text-gray-300 flex items-center gap-2" style={{ height: 52 }} onClick={() => setStep(2)}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button
                    className="btn-primary flex-1 h-13 rounded-2xl text-white font-black font-display text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                    style={{ height: 52, boxShadow: "0 0 40px rgba(232,0,45,0.4)" }}
                    onClick={handlePlaceOrder}
                  >
                    <Flag size={20} /> Place Track Order — ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Summary Sidebar */}
          <div>
            <div className="glass rounded-2xl p-6 sticky top-24" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="text-base font-black font-display text-white mb-5 uppercase tracking-wider">Cart Cargo</h2>
              <div className="space-y-3 mb-5">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.product.image} alt="" className="w-11 h-9 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-display font-bold truncate">{item.product.name}</div>
                      <div className="text-gray-500 text-[10px]">×{item.qty}</div>
                    </div>
                    <div className="text-white text-xs font-bold font-display">${(item.product.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/08 pt-4 space-y-2 mb-4">
                {[
                  { l: "Subtotal", v: `$${subtotal.toFixed(2)}` },
                  { l: "Logistics", v: `$${shippingCost.toFixed(2)}` },
                  { l: "VAT (8%)", v: `$${tax.toFixed(2)}` },
                ].map(({ l, v }) => (
                  <div key={l} className="flex justify-between text-xs">
                    <span className="text-gray-500 font-display font-bold uppercase tracking-wider">{l}</span>
                    <span className="text-gray-300 font-bold font-display">{v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/08 pt-4 flex justify-between items-center">
                <span className="text-white font-bold font-display text-xs uppercase tracking-wider">Total</span>
                <span className="text-xl font-black font-display gradient-text-red">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setCurrentPage, onOpenCategoryFilter, onOpenBrandFilter }) {
  const handleNavClick = (page) => {
    if (page === "categories") {
      onOpenCategoryFilter();
    } else if (page === "brands") {
      onOpenBrandFilter();
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/06 pt-16 pb-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-red flex items-center justify-center">
                <Flag size={18} className="text-white" />
              </div>
              <span className="text-xl font-black font-display text-white tracking-tight">
                Kart<span className="gradient-text-red">Shop</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-5 max-w-xs">
              The world's premier digital destination for professional racing karts, homologated components, safety gear, and race-day logistics. Established 2009.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl glass border border-white/08 flex items-center justify-center hover:border-red-500/30 transition-all hover:-translate-y-1">
                  <Icon size={15} className="text-gray-400 hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-black font-display text-[10px] tracking-widest uppercase mb-4 text-red-400">Shop Catalog</h3>
            <ul className="space-y-2.5">
              {["Racing Karts", "Helmets", "Racing Suits", "Gloves", "Tires", "Engines"].map(link => (
                <li key={link}>
                  <button
                    className="text-gray-500 text-xs hover:text-white transition-colors font-display font-bold uppercase tracking-wider text-left"
                    onClick={() => {
                      onOpenCategoryFilter(link);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black font-display text-[10px] tracking-widest uppercase mb-4 text-orange-400">Company</h3>
            <ul className="space-y-2.5">
              {["About Us", "Motorsport Careers", "Press Room", "Affiliate Tracks"].map(link => (
                <li key={link}>
                  <button
                    className="text-gray-500 text-xs hover:text-white transition-colors font-display font-bold uppercase tracking-wider text-left"
                    onClick={() => handleNavClick("home")}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black font-display text-[10px] tracking-widest uppercase mb-4 text-yellow-400">Support Desk</h3>
            <ul className="space-y-2.5">
              {["F.A.Q Help", "Shipping Speeds", "Return Policy", "Track Order"].map(link => (
                <li key={link}>
                  <button
                    className="text-gray-500 text-xs hover:text-white transition-colors font-display font-bold uppercase tracking-wider text-left"
                    onClick={() => handleNavClick("shop")}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Strips */}
        <div className="grid sm:grid-cols-3 gap-4 py-8 border-t border-b border-white/06 mb-8">
          {[
            { icon: Mail, label: "Official Email", val: "support@kartshop.com" },
            { icon: Phone, label: "Support Hotline", val: "+1 (555) KART-PRO" },
            { icon: MapPin, label: "Motorsport HQ", val: "Monaco Grand Prix Circuit, MC" },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass border border-white/08 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-red-400" />
              </div>
              <div>
                <div className="text-gray-500 text-[9px] font-black font-display uppercase tracking-wider">{label}</div>
                <div className="text-white text-xs font-display font-black uppercase mt-0.5">{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal block */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] font-bold uppercase tracking-wider font-display">
          <div>© 2025 KartShop. Designed & Manufactured for Track Champions.</div>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Racing", "Cookies", "Sitemap"].map(l => (
              <button key={l} className="hover:text-gray-400 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([
    { product: PRODUCTS[0], qty: 1 },
    { product: PRODUCTS[1], qty: 2 },
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categorySectionRef = useRef(null);

  const addToCart = (product, qty = 1) => {
    const p = product || PRODUCTS[0];
    setCartItems(prev => {
      const existing = prev.findIndex(item => item.product.id === p.id);
      if (existing >= 0) {
        return prev.map((item, i) => i === existing ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { product: p, qty }];
    });
  };

  const handleOpenCategoryFilter = (catName = "All") => {
    setActiveCategory(catName);
    setShowFilters(true);
    setCurrentPage("shop");
  };

  const handleOpenBrandFilter = () => {
    setActiveBrand("All");
    setShowFilters(true);
    setCurrentPage("shop");
  };

  const handleSelectCategoryFromHome = (catName) => {
    setActiveCategory(catName);
    setCurrentPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen font-body select-none"
      style={{ background: "#0A0A0A", color: "#FFFFFF" }}
    >
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigate}
        cartCount={cartItems.reduce((s, i) => s + i.qty, 0)}
        onOpenCategoryFilter={() => handleOpenCategoryFilter("All")}
        onOpenBrandFilter={handleOpenBrandFilter}
      />

      <main className="min-h-[80vh]">
        {currentPage === "home" && (
          <HomePage
            setCurrentPage={navigate}
            setSelectedProduct={setSelectedProduct}
            onAddCart={addToCart}
            categorySectionRef={categorySectionRef}
            onSelectCategory={handleSelectCategoryFromHome}
          />
        )}
        {currentPage === "shop" && (
          <ShopPage
            setCurrentPage={navigate}
            setSelectedProduct={setSelectedProduct}
            onAddCart={addToCart}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeBrand={activeBrand}
            setActiveBrand={setActiveBrand}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        )}
        {currentPage === "product" && (
          <ProductPage
            setCurrentPage={navigate}
            product={selectedProduct}
            onAddCart={addToCart}
          />
        )}
        {currentPage === "cart" && (
          <CartPage
            setCurrentPage={navigate}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            setCurrentPage={navigate}
            cartItems={cartItems}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      <Footer
        setCurrentPage={navigate}
        onOpenCategoryFilter={handleOpenCategoryFilter}
        onOpenBrandFilter={handleOpenBrandFilter}
      />
    </div>
  );
}
