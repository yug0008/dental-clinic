"use client";
import { useState, useRef, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { 
  FaTooth, 
  FaUserMd, 
  FaArrowRight,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaMicroscope, 
  FaGoogle,
  FaThumbsUp,
  FaCreditCard,
  FaAmbulance,
  FaStar,
  FaRegSmile,
  FaGem,
  FaMagic,
  FaEye,
  FaCalendarCheck,
  FaPhone,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaAward
} from 'react-icons/fa'

export default function Home() {
  const [cityName] = useState("City Name") // Replace with actual city name
  

  // Slider state and refs - MOVED INSIDE COMPONENT
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);


  // Add this inside your Home component with other state declarations
const [testimonialCurrentSlide, setTestimonialCurrentSlide] = useState(0);
const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState(true);
const testimonialSliderRef = useRef(null);
const testimonialAutoPlayRef = useRef(null);

// Testimonials data
const testimonialsData = [
  {
    name: "John D.",
    review: "Best dental experience I've ever had. The staff is incredibly friendly and professional. From the moment I walked in, I felt welcomed and cared for. The facility is spotless and modern.",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Sarah M.",
    review: "Dr. Smith transformed my smile! The Invisalign treatment was quick and painless. I couldn't be happier with the results. Everyone comments on my smile now!",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Robert K.",
    review: "Finally found a dentist I trust. Their emergency care saved my tooth! They got me in immediately and took care of the problem right away. Lifetime patient now.",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Emily W.",
    review: "The cosmetic work they did is amazing. My veneers look completely natural and the process was smooth. Thank you to the whole team!",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    name: "Michael P.",
    review: "I used to be terrified of dentists, but this team changed everything. They're gentle, understanding, and truly care about patient comfort.",
    rating: 5,
    date: "1 week ago"
  },
  {
    name: "Lisa R.",
    review: "My kids actually look forward to dental visits now! The pediatric care is outstanding. Very patient and great with children.",
    rating: 5,
    date: "2 weeks ago"
  }
];

// Auto-slide functionality for testimonials
useEffect(() => {
  if (isTestimonialAutoPlaying) {
    testimonialAutoPlayRef.current = setInterval(() => {
      setTestimonialCurrentSlide(prev => 
        prev === testimonialsData.length - (window.innerWidth < 768 ? 1 : 3) ? 0 : prev + 1
      );
    }, 4000);
  }
  
  return () => {
    if (testimonialAutoPlayRef.current) {
      clearInterval(testimonialAutoPlayRef.current);
    }
  };
}, [isTestimonialAutoPlaying, testimonialsData.length]);

// Testimonial slide functions
const slideTestimonials = (direction) => {
  setIsTestimonialAutoPlaying(false);
  
  const maxSlide = window.innerWidth < 768 
    ? testimonialsData.length - 1 
    : testimonialsData.length - 3;
  
  if (direction === 'left') {
    setTestimonialCurrentSlide(prev => Math.max(0, prev - 1));
  } else {
    setTestimonialCurrentSlide(prev => Math.min(maxSlide, prev + 1));
  }
  
  // Resume auto-play after 5 seconds
  setTimeout(() => {
    setIsTestimonialAutoPlaying(true);
  }, 5000);
};

const goToTestimonialSlide = (index) => {
  setIsTestimonialAutoPlaying(false);
  setTestimonialCurrentSlide(index);
  
  setTimeout(() => {
    setIsTestimonialAutoPlaying(true);
  }, 5000);
};

// Handle window resize for slider
useEffect(() => {
  const handleResize = () => {
    setTestimonialCurrentSlide(0); // Reset on resize
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  // Card data for cleaner code - MOVED INSIDE COMPONENT
  const originalCards = [
    {
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: <FaTooth className="text-2xl md:text-3xl text-white" />,
      iconBg: 'bg-[#0194d0]',
      subtitle: '30+ Years',
      title: 'Expert Team',
      content: (
        <>
          <p className="text-white/90 text-sm md:text-base lg:text-lg mb-4 md:mb-6">
            Led by Dr. Sarah Johnson, multiple award-winning specialists
          </p>
          <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
            <span className="bg-white/20 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm backdrop-blur-sm">Board Certified</span>
            <span className="bg-white/20 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm backdrop-blur-sm">Award Winning</span>
            <span className="bg-white/20 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm backdrop-blur-sm">Top 1%</span>
          </div>
        </>
      ),
      trustBanner: (
        <div className="bg-[#01d09e]/20 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-sm md:text-base">Success Rate</span>
            <span className="text-2xl md:text-3xl font-bold text-white">99.7%</span>
          </div>
          <div className="w-full bg-white/20 h-1.5 md:h-2 rounded-full mt-2">
            <div className="bg-[#01d09e] w-[99.7%] h-1.5 md:h-2 rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: <FaMicroscope className="text-2xl md:text-3xl text-white" />,
      iconBg: 'bg-[#0194d0]',
      subtitle: 'Digital Excellence',
      title: 'Modern Tech',
      content: (
        <ul className="space-y-2 md:space-y-3 lg:space-y-4 mb-4 md:mb-6">
          <li className="flex items-center gap-2 md:gap-3 text-white/90 text-xs md:text-sm lg:text-base">
            <span className="w-5 h-5 md:w-6 md:h-6 bg-[#01d09e] rounded-full flex items-center justify-center text-xs">✓</span>
            3D Imaging & Digital Impressions
          </li>
          <li className="flex items-center gap-2 md:gap-3 text-white/90 text-xs md:text-sm lg:text-base">
            <span className="w-5 h-5 md:w-6 md:h-6 bg-[#01d09e] rounded-full flex items-center justify-center text-xs">✓</span>
            Laser Dentistry - Pain Free
          </li>
          <li className="flex items-center gap-2 md:gap-3 text-white/90 text-xs md:text-sm lg:text-base">
            <span className="w-5 h-5 md:w-6 md:h-6 bg-[#01d09e] rounded-full flex items-center justify-center text-xs">✓</span>
            Same-Day Crowns (CEREC)
          </li>
        </ul>
      ),
      trustBanner: (
        <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm md:text-base">Radiation Reduction</span>
            <span className="text-xl md:text-2xl font-bold text-[#01d09e]">90%</span>
          </div>
        </div>
      )
    },
    {
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: <FaCreditCard className="text-2xl md:text-3xl text-white" />,
      iconBg: 'bg-[#0194d0]',
      subtitle: 'Flexible Plans',
      title: 'Affordable Care',
      content: (
        <div className="space-y-2 md:space-y-3 lg:space-y-4 mb-4 md:mb-6">
          <div className="flex justify-between items-center text-white text-xs md:text-sm lg:text-base">
            <span>0% APR Financing</span>
            <span className="text-[#01d09e] font-bold">UP TO 24 MONTHS</span>
          </div>
          <div className="flex justify-between items-center text-white text-xs md:text-sm lg:text-base">
            <span>Insurance Accepted</span>
            <span className="text-[#01d09e] font-bold">ALL MAJOR</span>
          </div>
        </div>
      ),
      trustBanner: (
        <div className="bg-[#0194d0]/20 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4">
          <p className="text-white text-center text-sm md:text-base">
            <span className="text-xl md:text-2xl font-bold">$0 </span> 
            <span className="text-white/80">down payment options</span>
          </p>
        </div>
      )
    },
    {
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: <FaClock className="text-2xl md:text-3xl text-white" />,
      iconBg: 'bg-[#0194d0]',
      subtitle: '24/7 Available',
      title: 'Emergency Care',
      content: (
        <>
          <div className="bg-red-500/20 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-red-500/30">
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <span className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></span>
              <span className="font-semibold text-xs md:text-sm lg:text-base">Same-day emergency appointments</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-white bg-white/10 rounded-lg md:rounded-xl p-3 md:p-4">
            <FaPhone className="text-[#01d09e] text-base md:text-xl" />
            <div>
              <p className="text-xs md:text-sm text-white/70">Emergency Hotline</p>
              <p className="text-base md:text-lg lg:text-xl font-bold">(555) 123-4567</p>
            </div>
          </div>
        </>
      ),
      trustBanner: null
    }
  ];

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 280; // mobile
      if (window.innerWidth < 1024) return 350; // tablet
      return 450; // desktop
    }
    return 450;
  };

  const [cardWidth, setCardWidth] = useState(getCardWidth());

  // Update card width on resize
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % (originalCards.length * 2));
      }, 3000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, originalCards.length]);

  // Slide functions
  const slide = (direction) => {
    setIsAutoPlaying(false);
    
    if (direction === 'left') {
      setCurrentSlide(prev => Math.max(0, prev - 1));
    } else {
      setCurrentSlide(prev => Math.min(originalCards.length * 2 - 1, prev + 1));
    }
    
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  // Reset to beginning when reaching the end (for infinite loop effect)
  useEffect(() => {
    if (currentSlide >= originalCards.length) {
      // When reaching duplicate set, reset to original set without animation
      setTimeout(() => {
        setCurrentSlide(0);
      }, 500);
    }
  }, [currentSlide, originalCards.length]);

  return (
    <>
      <Header />
      
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-blue-300 min-h-screen flex items-center justify-center -mt-12 pt-12">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0 ">
            <Image
              src="/hero.png"
              alt="Modern dental clinic interior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#0194d0]/80"></div>
          </div>

          {/* Hero Content */}
          <div className="container-custom relative z-10 text-white py-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Trusted Family & Cosmetic Dentist in Fresno, CA 
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Advanced dental care with a gentle, patient-first approach.
              </p>
              
              {/* CTA Buttons */}
<div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
  <Link 
    href="/appointment" 
    className="btn-primary text-[#0194d0] bg-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4"
  >
    Schedule Your Visit
  </Link>
  <a 
    href="tel:+15594321300" 
    className="btn-secondary text-[#0194d0] bg-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4"
  >
    Call Now
  </a>
</div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="font-medium">5-Star Rated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-white text-xl" />
                  <span className="font-medium">Same-Day Appointments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShieldAlt className="text-green-200 text-xl" />
                  <span className="font-medium">Insurance Accepted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Professional Redesign */}
        <section className="py-12 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#0194d0] rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#01d09e] rounded-full filter blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <span className="text-[#0194d0] font-semibold tracking-wider uppercase text-sm mb-3 block">
                Why Patients Trust Us
              </span>
              <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
                Experience Dental Care That 
                <span className="text-[#0194d0]"> Exceeds Expectations</span>
              </h2>
              <p className="t lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied patients who've discovered the difference 
                of personalized, technology-driven dentistry
              </p>
            </div>

            {/* Sliding Cards Container with Navigation */}
            <div className="relative w-full overflow-hidden group/slider">
              {/* Gradient Overlays for Scroll Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Navigation Buttons */}
              <button 
                onClick={() => slide('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <FaArrowLeft className="text-lg" />
              </button>
              
              <button 
                onClick={() => slide('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <FaArrowRight className="text-lg" />
              </button>

              {/* Sliding Cards Track */}
              <div 
                ref={sliderRef}
                className="flex gap-6 transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(-${currentSlide * (cardWidth + 24)}px)`
                }}
              >
                {/* Original Cards */}
                {originalCards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[450px] group">
                    <div className="relative h-[400px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                      {/* Background Image with Overlay */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${card.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
                          {/* Card Header */}
                          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                            <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${card.iconBg} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg`}>
                              {card.icon}
                            </div>
                            <div>
                              <span className="text-white/80 text-xs md:text-sm">{card.subtitle}</span>
                              <h3 className="text-xl md:text-2xl font-bold text-white">{card.title}</h3>
                            </div>
                          </div>
                          
                          {/* Card Body */}
                          {card.content}

                          {/* Trust Banner */}
                          {card.trustBanner}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate Cards for Seamless Loop */}
                {originalCards.map((card, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[450px] group">
                    <div className="relative h-[400px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${card.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                      
                      <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
                          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                            <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${card.iconBg} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg`}>
                              {card.icon}
                            </div>
                            <div>
                              <span className="text-white/80 text-xs md:text-sm">{card.subtitle}</span>
                              <h3 className="text-xl md:text-2xl font-bold text-white">{card.title}</h3>
                            </div>
                          </div>
                          
                          {card.content}
                          {card.trustBanner}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {originalCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide % originalCards.length === index 
                        ? 'w-8 bg-[#0194d0]' 
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Badges - 90% Width Banner */}
            <div className="max-w-[90%] mx-auto mt-12 md:mt-16">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0194d0]/20 rounded-lg md:rounded-xl flex items-center justify-center">
                      <FaShieldAlt className="text-lg md:text-2xl text-[#0194d0]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Sterilization Certified</p>
                      <p className="text-white/60 text-xs md:text-sm">Hospital-grade protocols</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#01d09e]/20 rounded-lg md:rounded-xl flex items-center justify-center">
                      <FaAward className="text-lg md:text-2xl text-[#01d09e]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Top Rated 2024</p>
                      <p className="text-white/60 text-xs md:text-sm">5-star patient reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0194d0]/20 rounded-lg md:rounded-xl flex items-center justify-center">
                      <FaCheckCircle className="text-lg md:text-2xl text-[#0194d0]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Insurance Friendly</p>
                      <p className="text-white/60 text-xs md:text-sm">All PPO plans accepted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-10 md:mt-12">
              <Link 
  href="/appointment" 
  className="inline-flex items-center gap-2 md:gap-3 bg-[#0194d0] text-white px-4 md:px-6 lg:px-10 py-2.5 md:py-4 lg:py-5 rounded-full font-semibold text-sm md:text-base lg:text-lg hover:bg-[#017ab0] transition-all transform hover:scale-105 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl"
>
  Book Your Visit at Forester Dental
  <FaArrowRight className="text-[10px] md:text-xs lg:text-sm" />
</Link>
              <p className="text-gray-500 mt-3 md:mt-4 text-sm md:text-base">✨ No insurance? Ask about our membership plan</p>
            </div>
          </div>
        </section>
  
    {/* Our Services Section - Professional Premium Design */}
<section className="py-7 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
  {/* Abstract Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0194d0]/5 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#01d09e]/5 rounded-full blur-3xl"></div>
    
    {/* Grid Pattern */}
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
      backgroundSize: '40px 40px',
      opacity: 0.4
    }}></div>
  </div>

  <div className="container-custom relative z-10">
    {/* Section Header with Unique Design - Mobile Optimized */}
<div className="text-center mb-10 md:mb-16">
  <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#0194d0]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0194d0] rounded-full animate-pulse"></div>
    <span className="text-[#0194d0] font-semibold text-xs md:text-sm uppercase tracking-wider">Our Expertise</span>
  </div>
  
  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6 px-2">
    Comprehensive Dental Services
  </h2>
  
  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
    From routine checkups to complete smile makeovers, 
    we provide everything you need for optimal oral health
  </p>
</div>

{/* Featured Service - Full Width Banner - Mobile Optimized */}
<div className="relative mb-10 md:mb-16 group">
  <div className="absolute inset-0 bg-gradient-to-r from-[#0194d0] to-[#01d09e] rounded-2xl md:rounded-3xl blur-lg md:blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
  <div className="relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 shadow-xl md:shadow-2xl overflow-hidden">
    <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-[#0194d0]/5 rounded-full translate-x-16 md:translate-x-32 -translate-y-16 md:-translate-y-32"></div>
    
    {/* Grid with responsive ordering - text left, image right on all devices */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-center">
      {/* Text Content - Left side */}
      <div className="order-1">
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#0194d0]/10 px-2.5 md:px-3 py-1 rounded-full mb-3 md:mb-4">
          <FaStar className="text-[#0194d0] text-xs md:text-sm" />
          <span className="text-[#0194d0] font-medium text-xs md:text-sm">Patient Favorite</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
          Same-Day Emergency Care
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6">
          Dental emergency? We're here for you 24/7 with immediate care, 
          pain relief, and flexible payment options.
        </p>
        <div className="flex flex-wrap gap-3 md:gap-4">
          <Link href="/emergency" className="group inline-flex items-center gap-1.5 md:gap-2 bg-[#0194d0] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs sm:text-sm md:text-base hover:bg-[#017ab0] transition-all transform hover:scale-105 shadow-md md:shadow-lg">
            <FaAmbulance className="text-sm md:text-lg" />
            <span>Emergency Care</span>
            <FaArrowRight className="text-xs md:text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+15594321300" className="inline-flex items-center gap-1.5 md:gap-2 bg-gray-100 text-gray-700 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs sm:text-sm md:text-base hover:bg-gray-200 transition-all">
            <FaPhone className="text-[#01d09e] text-sm md:text-lg" />
            <span>(555) 123-4567</span>
          </a>
        </div>
      </div>

      {/* Image - Right side */}
      <div className="order-2 relative h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Emergency dental care"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
          <div className="flex items-center gap-1.5 md:gap-2 text-white">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="font-semibold text-xs md:text-sm">Available 24/7 - Call Now</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    {/* Service Cards Grid - Unique Design */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 xl:gap-8">
  {[
    {
      icon: <FaTooth className="text-lg sm:text-xl md:text-2xl" />,
      title: "General Dentistry",
      description: "Preventive care, cleanings, and routine exams for lasting oral health",
      features: ["Comprehensive Exams", "Professional Cleaning", "Oral Cancer Screening"],
      gradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-[#0194d0]",
      link: "/services/general"
    },
    {
      icon: <FaRegSmile className="text-lg sm:text-xl md:text-2xl" />,
      title: "Cosmetic Dentistry",
      description: "Transform your smile with veneers, bonding, and complete smile makeovers",
      features: ["Porcelain Veneers", "Dental Bonding", "Smile Design"],
      gradient: "from-purple-50 to-pink-50",
      iconBg: "bg-[#0194d0]",
      link: "/services/cosmetic"
    },
    {
      icon: <FaGem className="text-lg sm:text-xl md:text-2xl" />,
      title: "Dental Implants",
      description: "Permanent tooth replacement that looks, feels, and functions naturally",
      features: ["Single Implants", "All-on-4", "Implant Bridges"],
      gradient: "from-amber-50 to-orange-50",
      iconBg: "bg-[#0194d0]",
      popular: true,
      link: "/services/implants"
    },
    {
      icon: <FaMagic className="text-lg sm:text-xl md:text-2xl" />,
      title: "Teeth Whitening",
      description: "Professional whitening for a dramatically brighter, more confident smile",
      features: ["In-Office Whitening", "Take-Home Kits", "Stain Removal"],
      gradient: "from-cyan-50 to-blue-50",
      iconBg: "bg-[#0194d0]",
      link: "/services/whitening"
    },
    {
      icon: <FaEye className="text-lg sm:text-xl md:text-2xl" />,
      title: "Invisalign",
      description: "Clear aligners that straighten teeth discreetly and comfortably",
      features: ["Clear Aligners", "Virtual Monitoring", "Express Treatment"],
      gradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-[#0194d0]",
      link: "/services/invisalign"
    },
    {
      icon: <FaAmbulance className="text-lg sm:text-xl md:text-2xl" />,
      title: "Emergency Care",
      description: "Immediate attention for dental emergencies with same-day appointments",
      features: ["24/7 Availability", "Pain Management", "Urgent Treatment"],
      gradient: "from-rose-50 to-red-50",
      iconBg: "bg-[#0194d0]",
      link: "/services/emergency"
    }
  ].map((service, index) => (
    <div
      key={index}
      className="group relative bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#0194d0] to-[#01d09e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
          <div className="bg-[#01d09e] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
            Most Popular
          </div>
        </div>
      )}

      <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Icon with Unique Design */}
        <div className="relative mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${service.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            {service.icon}
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#01d09e]/20 rounded-full blur-[2px] sm:blur-sm group-hover:bg-[#01d09e]/30 transition-colors"></div>
        </div>

        {/* Content */}
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 group-hover:text-[#0194d0] transition-colors">
          {service.title}
        </h3>
        
        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5 lg:mb-6 line-clamp-2">
          {service.description}
        </p>

        {/* Feature List */}
        <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-600">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#01d09e] rounded-full"></div>
              <span className="text-xs sm:text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Stats/Additional Info */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6 pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#0194d0]">Success</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">98%</div>
          </div>
          <div className="w-px h-4 sm:h-5 md:h-6 lg:h-8 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#0194d0]">Recovery</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">24-48h</div>
          </div>
        </div>

        {/* Link Button */}
        <Link
          href={service.link}
          className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[#0194d0] font-semibold text-xs sm:text-sm md:text-base group/link"
        >
          <span>Learn More</span>
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#0194d0]/10 flex items-center justify-center group-hover/link:bg-[#0194d0] group-hover/link:translate-x-1 transition-all">
            <FaArrowRight className="text-[8px] sm:text-[10px] md:text-xs text-[#0194d0] group-hover/link:text-white transition-colors" />
          </div>
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-tl from-[#0194d0]/5 to-transparent rounded-tl-xl sm:rounded-tl-2xl"></div>
    </div>
  ))}
</div>
   {/* Service Highlights Banner - Mobile Optimized */}
<div className="mt-10 md:mt-16 relative">
  <div className="absolute inset-0 bg-gradient-to-r from-[#0194d0] to-[#01d09e] rounded-xl md:rounded-2xl blur-md md:blur-xl opacity-30"></div>
  <div className="relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg md:shadow-xl border border-gray-100">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0194d0] mb-0.5 md:mb-1 lg:mb-2">15+</div>
        <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">Years Exp.</div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0194d0] mb-0.5 md:mb-1 lg:mb-2">10k+</div>
        <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">Patients</div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0194d0] mb-0.5 md:mb-1 lg:mb-2">50+</div>
        <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">Services</div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0194d0] mb-0.5 md:mb-1 lg:mb-2">24/7</div>
        <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">Emergency</div>
      </div>
    </div>
  </div>
</div>
    {/* Bottom CTA */}
    <div className="text-center mt-16">
      
      <p className="text-gray-500 mt-4 text-sm">
        ✨ Not sure what you need? Schedule a consultation and we'll guide you
      </p>
    </div>
  </div>
</section>
   
        {/* About the Dentist */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/doctor.jpeg"
                  alt="Dr. Smith - Lead Dentist"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="section-title text-[#0194d0]">Meet Dr. Sarah Smith, DDS</h2>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-blue-100 text-[#0194d0] px-4 py-2 rounded-full font-semibold">20+ Years Experience</span>
                  <span className="bg-blue-100 text-[#0194d0] px-4 py-2 rounded-full font-semibold">DDS, FAGD</span>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Dr. Smith is a trusted name in {cityName} dentistry, known for combining advanced 
                  techniques with a gentle, caring approach. After earning her DDS from the University 
                  of Southern California, she completed advanced training in cosmetic and restorative 
                  dentistry.
                </p>
                <p className="text-gray-600 mb-8">
                  "I believe in treating every patient like family. Your comfort and confidence in 
                  your smile are my top priorities." - Dr. Smith
                </p>
                <div className="flex items-center space-x-4">
                  <FaAward className="text-4xl text-[#0194d0]" />
                  <div>
                    <p className="font-semibold">Fellow of the Academy of General Dentistry</p>
                    <p className="text-sm text-gray-500">Top 1% of dentists nationwide</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/team" className="btn-primary bg-[#0194d0] inline-block">
                    Meet Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Gallery */}
        <section className="py-10">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title text-[#0194d0]">Real Transformations</h2>
              <p className="section-subtitle">
                See the difference our cosmetic dentistry can make
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider
                beforeImage="/before-1.png"
                afterImage="/after-1.png"
                beforeAlt="Before treatment"
                afterAlt="After treatment"
              />
            </div>

            <div className="text-center mt-8">
              <Link href="/gallery" className="text-blue-500 font-semibold hover:text-blue-600 inline-flex items-center group">
                See More Transformations
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

       {/* Patient Testimonials - Premium White Design */}
<section className="py-8 md:py-8 bg-white relative overflow-hidden">
  {/* Subtle Background Elements */}
  <div className="absolute inset-0">
    <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-[#0194d0]/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-[#01d09e]/5 rounded-full blur-3xl"></div>
    
    {/* Subtle Grid Pattern */}
    <div className="absolute inset-0 opacity-20 md:opacity-30" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
      backgroundSize: '20px 20px md:40px 40px'
    }}></div>
  </div>

  <div className="container-custom relative z-10 px-4 md:px-6">
    {/* Section Header - Mobile Optimized */}
    <div className="text-center mb-10 md:mb-16">
      <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#0194d0]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
        <FaStar className="text-[#0194d0] text-xs md:text-sm" />
        <span className="text-[#0194d0] font-semibold text-xs md:text-sm uppercase tracking-wider">5-Star Reviews</span>
      </div>
      
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6 px-2">
        What Our <span className="text-[#0194d0]">Patients</span> Say
      </h2>
      
      <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Don't just take our word for it — hear from thousands of happy patients who trust us with their smiles
      </p>
    </div>

    {/* Main Testimonials Slider - Mobile Optimized */}
    <div className="relative group/slider px-0 md:px-12">
      {/* Navigation Buttons - Always visible on mobile, slightly smaller */}
      <button 
        onClick={() => slideTestimonials('left')}
        className="absolute -left-2 md:left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all border border-gray-200 lg:opacity-0 lg:group-hover/slider:opacity-100 opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous testimonial"
      >
        <FaArrowLeft className="text-xs md:text-sm lg:text-base" />
      </button>
      
      <button 
        onClick={() => slideTestimonials('right')}
        className="absolute -right-2 md:right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all border border-gray-200 lg:opacity-0 lg:group-hover/slider:opacity-100 opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next testimonial"
      >
        <FaArrowRight className="text-xs md:text-sm lg:text-base" />
      </button>

      {/* Slider Track */}
      <div className="overflow-hidden">
        <div 
          ref={testimonialSliderRef}
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${testimonialCurrentSlide * (typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 33.333)}%)`
          }}
        >
          {/* Testimonial Cards - Mobile Optimized */}
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index}
              className="w-full md:w-1/3 flex-shrink-0 px-2 md:px-4"
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Quote Icon - Smaller on mobile */}
                <div className="text-[#0194d0] text-2xl md:text-4xl mb-2 md:mb-4 opacity-20">"</div>

                {/* Rating - Smaller stars on mobile */}
                <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-xs md:text-base ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>

                {/* Review Text - Smaller on mobile */}
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">
                  "{testimonial.review}"
                </p>

                {/* Patient Info - Compact on mobile */}
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Avatar - Smaller on mobile */}
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0194d0] to-[#01d09e] flex items-center justify-center text-white font-bold text-xs md:text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div>
                    <h4 className="text-sm md:text-base lg:text-lg text-gray-900 font-bold">{testimonial.name}</h4>
                    <div className="flex items-center gap-1 md:gap-2 text-xs">
                      <span className="text-gray-500">{testimonial.date}</span>
                      <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-[#01d09e] flex items-center gap-0.5">
                        <FaCheckCircle className="text-[10px] md:text-xs" />
                        <span className="text-[10px] md:text-xs">Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators - Smaller on mobile */}
      <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonialSlide(index)}
            className={`transition-all duration-300 ${
              testimonialCurrentSlide === index 
                ? 'w-6 md:w-8 h-1.5 md:h-2 bg-[#0194d0] rounded-full' 
                : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 rounded-full hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>

    {/* Statistics Banner - Mobile Optimized */}
    <div className="mt-10 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {[
        { value: '10k+', label: 'Happy Patients', icon: FaRegSmile },
        { value: '4.9', label: 'Avg Rating', icon: FaStar },
        { value: '250+', label: 'Reviews', icon: FaGoogle },
        { value: '98%', label: 'Recommend', icon: FaThumbsUp }
      ].map((stat, index) => (
        <div key={index} className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-6 text-center border border-gray-100 hover:border-[#0194d0]/30 hover:shadow-lg transition-all group">
          <div className="flex justify-center mb-1 md:mb-3">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#0194d0]/10 flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
              <stat.icon className="text-sm md:text-xl text-[#0194d0] group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="text-base md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">{stat.value}</div>
          <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Google Reviews Badge - Mobile Optimized */}
    <div className="mt-8 md:mt-12 text-center">
      <div className="inline-flex items-center gap-2 md:gap-4 bg-gray-50 px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-200 hover:border-[#0194d0]/30 hover:shadow-lg transition-all cursor-pointer group">
        <div className="flex -space-x-1.5 md:-space-x-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#0194d0] to-[#01d09e] flex items-center justify-center text-white text-[8px] md:text-xs font-bold border-1.5 md:border-2 border-white">
              {['JD', 'SM', 'RK', 'AL'][i-1]}
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-[10px] md:text-sm" />
              ))}
            </div>
            <span className="text-xs md:text-base text-gray-900 font-bold">4.9</span>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1 text-[8px] md:text-xs text-gray-500">
            <span>250+ reviews on</span>
            <FaGoogle className="text-[10px] md:text-sm text-[#0194d0]" />
            <span className="font-medium hidden xs:inline">Google</span>
          </div>
        </div>
        <FaArrowRight className="text-gray-400 group-hover:text-[#0194d0] group-hover:translate-x-1 transition-all text-[10px] md:text-sm" />
      </div>
    </div>
  </div>
</section>
        {/* Insurance & Payment Options */}
        <section className="py-8">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title text-[#0194d0]">Insurance & Payment Options</h2>
              <p className="section-subtitle">
                Quality dental care should be accessible to everyone
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-[#0194d0] ">Accepted Insurance Plans</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
                      <Image
                        src={`/insurance-${i}.jpg`}
                        alt={`Insurance provider ${i}`}
                        width={120}
                        height={40}
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0194d8] to-[#0194d0] p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">Flexible Payment Plans</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-xl mt-1 flex-shrink-0" />
                    <span>0% financing options available</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-xl mt-1 flex-shrink-0" />
                    <span>CareCredit and LendingClub accepted</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-xl mt-1 flex-shrink-0" />
                    <span>Monthly payment plans tailored to your budget</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-xl mt-1 flex-shrink-0" />
                    <span>Discounts for uninsured patients</span>
                  </li>
                </ul>
                <Link href="/insurance" className="bg-white text-[#0194d0] px-6 py-3 rounded-full font-semibold inline-block hover:bg-gray-200 transition">
                  Check Your Coverage
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment CTA Section */}
        <section className="py-10 bg-[#0194d0] rounded-lg ">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready for a Healthier Smile?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Take the first step towards the smile you deserve
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment" className="btn-primary bg-white text-[#0194d0] hover:bg-gray-100 text-lg px-8 py-4">
                Request Appointment
              </Link>
              <a href="tel:+15594321300" className="btn-secondary bg-[#0194d0] hover:bg-navy-900 text-white border-white border-3 text-lg px-8 py-4">
                <FaPhone className="inline mr-2" />
                +1 559-432-1300
              </a>
            </div>
          </div>
        </section>

        {/* Contact & Location Section */}
        <section className="py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="section-title text-[#0194d0] mb-8">Get in Touch</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 559-432-1300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select
                      id="time"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Morning (8am - 12pm)</option>
                      <option>Afternoon (12pm - 4pm)</option>
                      <option>Evening (4pm - 6pm)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary ext-white bg-[#0194d0] w-full">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map & Info */}
              <div>
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-8 h-[300px]">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.6322516573514!2d-119.75966602510222!3d36.84532986515583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809442ccfd88aa9d%3A0xadca9a18c7a364b9!2s7525%20N%20Cedar%20Ave%20UNIT%20117%2C%20Fresno%2C%20CA%2093720%2C%20USA!5e1!3m2!1sen!2sin!4v1771396074594!5m2!1sen!2sin"
    className="w-full h-full"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-[#0194d0] text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-navy-800">Address</h4>
                      <p className="text-gray-600">7525 N Cedar Ave UNIT 117<br />Fresno, CA 93711</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaPhone className="text-[#0194d0] text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-navy-800">Phone</h4>
                      <a href="tel:+15594321300" className="text-gray-600 hover:text-blue-500">+1 559-432-1300</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:col-span-2">
                    <FaClock className="text-[#0194d0] text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-navy-800">Office Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 8am - 6pm<br />Saturday: 9am - 2pm<br />Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}