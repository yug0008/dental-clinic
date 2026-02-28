import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaPhone, 
  FaEnvelope, 
  FaTruck, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaChevronRight,
  FaShoppingCart,
  FaHome,
  FaBox,
  FaSearch,
  FaGift,
  FaFire,
  FaTag,
  FaBolt,
  FaAngleDown
} from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';

const Header = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All Categories');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  // Color palette based on logo
  const colors = {
    dark: '#272726',
    gold: '#c68939',
    brown: '#674d26',
  };

  // Offer messages
  const offers = [
    { icon: <FaFire />, text: 'Summer Sale - Up to 40% Off on All Electronics' },
    { icon: <FaTag />, text: 'Free Shipping on Orders Above ₹999' },
    { icon: <FaGift />, text: 'Buy 1 Get 1 Free on Selected Items' },
    { icon: <FaBolt />, text: 'Flash Sale: 24 Hours Only!' },
  ];

  // Auto-slide offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-category-dropdown')) {
        setIsSearchCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Product categories for overlay
  const electricCategories = [
    'Wires & Cables',
    'Switches & Sockets',
    'Circuit Breakers',
    'Electrical Tools',
    'Lighting',
    'Fans',
    'Electrical Accessories',
    'Industrial Supplies'
  ];

  // Search categories
  const searchCategories = [
    'All Categories',
    'Transformer',
    'Power Supply',
    'Amplifier',
    'Wires & Cables',
    'Switches & Sockets',
    'Circuit Breakers',
    'Lighting',
    'Fans'
  ];

  return (
    <>
      {/* Offer Header with Sliding Animation */}
      <div className="bg-gradient-to-r from-[#c68939] to-[#674d26] text-white py-1.5 sm:py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div 
            className="flex items-center justify-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentOfferIndex * 100}%)` }}
          >
            {offers.map((offer, index) => (
              <div 
                key={index}
                className="flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base min-w-full"
              >
                <span className="text-[#272726]">{offer.icon}</span>
                <span className="font-medium truncate px-2">{offer.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Header */}
      <div className="bg-[#272726] text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Left side - Contact Info */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-1 sm:mb-0">
            <div className="flex items-center space-x-1">
              <FaPhone className="text-[#c68939]" size={10} />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEnvelope className="text-[#c68939]" size={10} />
              <span className="hidden xs:inline">info@bijoyelectronics.com</span>
              <span className="xs:hidden">info@bijoy</span>
            </div>
          </div>

          {/* Right side - Track Order & Sign In */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/track-order" className="flex items-center space-x-1 hover:text-[#c68939] transition-colors">
              <FaTruck size={10} />
              <span>Track</span>
            </Link>
            <Link href="/signin" className="flex items-center space-x-1 hover:text-[#c68939] transition-colors">
              <FaUser size={10} />
              <span className="hidden xs:inline">Signin / Register</span>
              <span className="xs:hidden">Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-3 md:px-8 py-2 md:py-3">
          {/* Desktop Header */}
          <div className="hidden md:block">
            {/* Logo and Search Row */}
            <div className="flex items-center justify-between mb-4">
              {/* Logo with Google Font */}
              <Link href="/" className="flex items-center group">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif" }}>
                  <span className="text-[#272726] group-hover:text-[#c68939] transition-colors">Bijoy</span>
                  <span className="text-[#c68939] group-hover:text-[#674d26] transition-colors"> Electronics</span>
                </div>
                <div className="ml-2 w-2 h-2 bg-[#c68939] rounded-full animate-pulse"></div>
              </Link>

              {/* Search Bar with Category Dropdown */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="flex items-center border-2 border-[#c68939] rounded-lg overflow-hidden shadow-sm">
                  {/* Category Dropdown */}
                  <div className="relative search-category-dropdown">
                    <button
                      onClick={() => setIsSearchCategoryOpen(!isSearchCategoryOpen)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-[#272726] border-r border-gray-200 min-w-[140px]"
                    >
                      <span className="text-sm truncate">{selectedSearchCategory}</span>
                      <FaAngleDown className={`text-[#c68939] transition-transform ${isSearchCategoryOpen ? 'rotate-180' : ''}`} size={14} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isSearchCategoryOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                        {searchCategories.map((category, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-4 py-2 hover:bg-[#c68939] hover:text-white text-sm transition-colors"
                            onClick={() => {
                              setSelectedSearchCategory(category);
                              setIsSearchCategoryOpen(false);
                            }}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 focus:outline-none"
                  />
                  
                  {/* Search Button */}
                  <button className="bg-[#c68939] text-white px-6 py-2 hover:bg-[#674d26] transition-colors">
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Cart Icon */}
              <Link href="/cart" className="relative group">
                <FaShoppingCart size={28} className="text-[#272726] group-hover:text-[#c68939] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-[#c68939] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-[#674d26] transition-colors">
                  0
                </span>
              </Link>
            </div>

            {/* Navigation Row */}
            <nav className="flex items-center justify-center space-x-8 border-t border-gray-100 pt-3">
              <Link href="/" className="text-[#272726] hover:text-[#c68939] transition-colors font-medium">
                Home
              </Link>
              <Link href="/all-products" className="text-[#272726] hover:text-[#c68939] transition-colors font-medium">
                All Products
              </Link>
              <Link href="/transformer" className="text-[#272726] hover:text-[#c68939] transition-colors font-medium">
                Transformer
              </Link>
              <Link href="/power-supply" className="text-[#272726] hover:text-[#c68939] transition-colors font-medium">
                Power supply
              </Link>
              <Link href="/amplifier" className="text-[#272726] hover:text-[#c68939] transition-colors font-medium">
                Amplifier
              </Link>
              
              {/* All Categories Button */}
              <button
                onClick={() => setIsCategoryOpen(true)}
                className="flex items-center space-x-1 text-[#272726] hover:text-[#c68939] transition-colors font-medium"
              >
                <MdCategory size={20} />
                <span>All categories</span>
                <IoMdArrowDropright className="text-[#c68939]" />
              </button>
            </nav>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            {/* Logo Row */}
            <div className="flex items-center justify-between mb-2">
              {/* Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 text-[#272726] hover:text-[#c68939]"
              >
                <FaBars size={22} />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="text-lg font-bold" style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif" }}>
                  <span className="text-[#272726]">Bijoy</span>
                  <span className="text-[#c68939]"> Elec.</span>
                </div>
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="relative">
                <FaShoppingCart size={20} className="text-[#272726]" />
                <span className="absolute -top-2 -right-2 bg-[#c68939] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Search Bar */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center border border-[#c68939] rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-3 py-1.5 text-sm focus:outline-none"
                />
                <button className="bg-[#c68939] text-white px-3 py-1.5">
                  <FaSearch size={14} />
                </button>
              </div>
              
              {/* All Categories Button */}
              <button
                onClick={() => setIsCategoryOpen(true)}
                className="p-2 text-[#272726] hover:text-[#c68939] border border-[#c68939] rounded-lg"
              >
                <MdCategory size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Overlay (Right Side) - Same for Desktop & Mobile */}
      {isCategoryOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          {/* Backdrop with Blur */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsCategoryOpen(false)}
          />
          
          {/* Overlay Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm md:max-w-md bg-white shadow-2xl animate-slideInRight">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#272726]" style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif" }}>
                  All Categories
                </h2>
                <button
                  onClick={() => setIsCategoryOpen(false)}
                  className="p-2 hover:text-[#c68939] transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <h3 className="text-base md:text-lg font-semibold text-[#674d26] mb-3 md:mb-4">
                Electric Products
              </h3>
              
              <div className="space-y-2 md:space-y-3">
                {electricCategories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-2 md:p-3 hover:bg-[#c68939] hover:bg-opacity-10 rounded-lg transition-colors group"
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    <span className="text-sm md:text-base text-[#272726] group-hover:text-[#c68939]">
                      {category}
                    </span>
                    <FaChevronRight className="text-[#c68939] text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 md:mt-8">
                <Link
                  href="/all-products"
                  className="block w-full text-center bg-[#c68939] text-white py-2.5 md:py-3 rounded-lg hover:bg-[#674d26] transition-colors font-semibold text-sm md:text-base"
                  onClick={() => setIsCategoryOpen(false)}
                >
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay (Android Style) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden md:hidden">
          {/* Backdrop with Blur */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel - Bottom Sheet Style */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slideUp">
            <div className="p-5">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-[#272726]" style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif" }}>
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:text-[#c68939] transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <nav className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center space-x-3 p-3 text-[#272726] hover:text-[#c68939] hover:bg-[#c68939] hover:bg-opacity-10 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHome size={18} />
                  <span className="font-medium">Home</span>
                </Link>

                <Link
                  href="/all-products"
                  className="flex items-center space-x-3 p-3 text-[#272726] hover:text-[#c68939] hover:bg-[#c68939] hover:bg-opacity-10 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaBox size={18} />
                  <span className="font-medium">All Products</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center space-x-3 p-3 text-[#272726] hover:text-[#c68939] hover:bg-[#c68939] hover:bg-opacity-10 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaShoppingCart size={18} />
                  <span className="font-medium">Cart</span>
                </Link>

                <Link
                  href="/account"
                  className="flex items-center space-x-3 p-3 text-[#272726] hover:text-[#c68939] hover:bg-[#c68939] hover:bg-opacity-10 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser size={18} />
                  <span className="font-medium">Account</span>
                </Link>
              </nav>

              {/* Quick Links */}
              <div className="mt-5 pt-5 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/transformer" className="text-center p-2 text-xs text-[#674d26] hover:text-[#c68939]">
                    Transformer
                  </Link>
                  <Link href="/power-supply" className="text-center p-2 text-xs text-[#674d26] hover:text-[#c68939]">
                    Power Supply
                  </Link>
                  <Link href="/amplifier" className="text-center p-2 text-xs text-[#674d26] hover:text-[#c68939]">
                    Amplifier
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCategoryOpen(true);
                    }}
                    className="text-center p-2 text-xs text-[#674d26] hover:text-[#c68939]"
                  >
                    All Categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Google Fonts Link in _document.js or _app.js */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;