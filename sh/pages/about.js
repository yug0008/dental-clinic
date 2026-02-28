// pages/about.js
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FaAward, 
  FaCalendarAlt, 
  FaArrowRight,
  FaChevronLeft,
  FaStar,
  FaHeart,
  FaHandsHelping,
  FaBalanceScale,
  FaGraduationCap,
  FaUserMd,
  FaUsers,
  FaQuoteLeft,
  FaQuoteRight,
  FaTooth,
  FaRegSmile,
  FaGem,
  FaEye,
  FaHeartbeat,
  FaChevronRight
} from 'react-icons/fa'

 export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  const coreValues = [
    {
      letter: 'J',
      title: 'Justice in Care',
      description: 'We believe everyone deserves access to exceptional dentistry. We stand for fairness, honesty, and doing what is right—always.',
      icon: FaBalanceScale,
      color: 'from-blue-600 to-blue-400'
    },
    {
      letter: 'A',
      title: 'Always Patient First',
      description: 'Every choice begins with what is best for the patient. We listen, we respect, and we deliver care centered around each individual\'s needs and story.',
      icon: FaHeart,
      color: 'from-green-500 to-teal-400'
    },
    {
      letter: 'M',
      title: 'Mastery Through Excellence',
      description: 'We commit to continuous learning, clinical precision, and elevating our craft every day. Excellence is not a goal—it\'s our standard.',
      icon: FaStar,
      color: 'from-purple-500 to-pink-400'
    },
    {
      letter: 'I',
      title: 'Integrity in Every Action',
      description: 'We honor our commitments, communicate with transparency, and serve with authenticity. Trust is earned through every interaction.',
      icon: FaHandsHelping,
      color: 'from-amber-500 to-orange-400'
    },
    {
      letter: 'M',
      title: 'Making a Lasting Legacy',
      description: 'Our impact goes beyond the dental chair. We build a legacy through the lives we touch, the smiles we restore, and the communities we uplift.',
      icon: FaGraduationCap,
      color: 'from-red-500 to-rose-400'
    }
  ];

  const teamMembers = [
    { name: 'Catherine R.', role: 'Office Manager', initials: 'CR' },
    { name: 'Amanda R.', role: 'Business Assistant', initials: 'AR' },
    { name: 'Bernadette M.', role: 'Dental Assistant', initials: 'BM' },
    { name: 'Breanna R.', role: 'Dental Assistant', initials: 'BR' },
    { name: 'Emilia R.', role: 'Dental Assistant', initials: 'ER' },
    { name: 'Madison M.', role: 'Dental Assistant', initials: 'MM' }
  ];


// Add this inside your component
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [touchStart, setTouchStart] = useState(null);
const [touchEnd, setTouchEnd] = useState(null);

const doctorImages = [
  { src: '/sh-doc.webp', alt: 'Dr. Juan L. Rodriguez', caption: 'Dr. Juan L. Rodriguez, DDS, MPH, MS' },
  { src: '/sh-doc1.webp', alt: 'Dr. Rodriguez with Family', caption: 'Dr. Rodriguez with Family' },
  { src: '/sh-doc2.webp', alt: 'Dr. Rodriguez with Family', caption: 'Dr. Rodriguez with Family' }
];

// Minimum swipe distance
const minSwipeDistance = 50;

const handleTouchStart = (e) => {
  setTouchEnd(null);
  setTouchStart(e.targetTouches[0].clientX);
};

const handleTouchMove = (e) => {
  setTouchEnd(e.targetTouches[0].clientX);
};

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return;
  
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  
  if (isLeftSwipe) {
    // Next image
    setCurrentImageIndex((prev) => (prev + 1) % doctorImages.length);
  } else if (isRightSwipe) {
    // Previous image
    setCurrentImageIndex((prev) => (prev - 1 + doctorImages.length) % doctorImages.length);
  }
};

const handlePrevImage = () => {
  setCurrentImageIndex((prev) => (prev - 1 + doctorImages.length) % doctorImages.length);
};

const handleNextImage = () => {
  setCurrentImageIndex((prev) => (prev + 1) % doctorImages.length);
};

const handleThumbnailClick = (index) => {
  setCurrentImageIndex(index);
};

  return (
    <>
      <Head>
        <title>About Us - Sand Hill Dental Care | J.A.M.I.M. Dental</title>
        <meta name="description" content="Meet Dr. Juan L. Rodriguez and our team at Sand Hill Dental Care. Learn about our mission, vision, and commitment to patient-centered care." />
      </Head>

      <Header />
      
      <main className="bg-white min-h-screen pt-0">
        {/* Hero Section - Newspaper Style */}
        {/* Hero Section - Newspaper Style */}
<section className="relative bg-[#0194d0] py-20 overflow-hidden">
  {/* Background Image with 70% Opacity */}
  <div className="absolute inset-0 z-0">
    <div className="relative w-full h-full">
      <Image
        src="/shdc.jpg"
        alt="Sand Hill Dental Care Clinic"
        fill
        className="object-cover"
        priority
      />
    </div>
    {/* 70% Opacity Overlay - This creates the 70% effect over the blue background */}
    <div className="absolute inset-0 bg-[#0194d0] opacity-80"></div>
  </div>
  
  {/* Pattern Overlay */}
  <div className="absolute inset-0 opacity-20 z-1">
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)`,
      backgroundSize: '30px 30px'
    }}></div>
  </div>
  
  <div className="container-custom px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-block border-t-2 border-b-2 border-white px-6 py-2 mb-6">
        <span className="text-white font-serif text-sm uppercase tracking-[0.4em]">Est. 2024</span>
      </div>
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Welcome to{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white">
          Sand Hill Dental Care
        </span>
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto font-serif">
        Owned & Operated by J.A.M.I.M. Dental — Where Every Smile Tells a Story
      </p>
    </div>
  </div>
</section>
        {/* Core Values Section - Newspaper Style */}
        <section className="py-16 md:py-24 bg-white relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, #0194d0 0px, #0194d0 1px, transparent 1px, transparent 20px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="container-custom px-4">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block border-t-2 border-b-2 border-[#0194d0] px-6 py-2 mb-4">
                <span className="text-[#0194d0] font-serif text-sm uppercase tracking-[0.3em]">Our Foundation</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Core Values
              </h2>
              <div className="w-24 h-0.5 bg-[#0194d0] mx-auto"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-serif italic">
                The principles that guide every interaction, every decision, and every smile we touch.
              </p>
            </div>

            {/* Values Grid - Newspaper Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #0194d0 0px, #0194d0 2px, transparent 2px, transparent 10px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  {/* Letter Badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center text-white font-serif text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {value.letter}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 group-hover:text-[#0194d0] transition-colors">
                        {value.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-[#01d09e]"></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#0194d0]/5 to-transparent rounded-tl-3xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision - Newspaper Spread */}
        <section className="py-16 md:py-24 bg-gray-50 relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #0194d0 2px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="container-custom px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Mission Statement */}
              <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 relative group hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0194d0]/5 rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#0194d0] rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-white text-xl" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                      Mission Statement
                    </h2>
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-serif italic border-l-4 border-[#0194d0] pl-4">
                    At J.A.M.I.M. Dental, our mission is to make exceptional, accessible dentistry 
                    available to every person. We stand for integrity-driven, patient-centered care 
                    that honors each individual with compassion. Our purpose is to remove barriers 
                    to care and empower every smile to shine with health, confidence, and joy—because 
                    a brighter smile has the power to transform a life.
                  </p>
                  <div className="mt-4 text-right">
                    <FaQuoteRight className="text-gray-300 text-xl inline-block" />
                  </div>
                </div>
              </div>

              {/* Vision Statement */}
              <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 relative group hover:shadow-2xl transition-all">
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#01d09e]/5 rounded-br-full"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#01d09e] rounded-full flex items-center justify-center">
                      <FaEye className="text-white text-xl" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                      Vision Statement
                    </h2>
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-serif border-r-4 border-[#01d09e] pr-4">
                    Our vision at J.A.M.I.M. Dental is to become a model of justice-driven, 
                    patient-first dentistry—where every person, regardless of background, receives 
                    exceptional care delivered with integrity and mastery. We envision a future where 
                    our legacy is defined not by the size of our practice, but by the generations of 
                    smiles we uplift, the trust we earn, and the communities we transform. Through our 
                    commitment to excellence, honor, and accessible care, we aim to inspire a new 
                    standard in dentistry—one where compassion leads, innovation follows, and every 
                    smile has the power to shape a brighter world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Doctor - Newspaper Style (Enhanced) */}
        <section className="py-16 md:py-24 bg-white relative">
          <div className="container-custom px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-block border-t-2 border-b-2 border-[#0194d0] px-6 py-2 mb-4">
                <span className="text-[#0194d0] font-serif text-sm uppercase tracking-[0.3em]">The Lead Practitioner</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Meet the Doctor
              </h2>
              <div className="w-24 h-0.5 bg-[#0194d0] mx-auto"></div>
            </div>

            {/* Doctor Content - Newspaper Layout */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Photo Gallery */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 space-y-4">
                 {/* Main Photo with Navigation */}
<div className="relative group bg-white p-3 shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500">
  {/* Image Container with Touch Handlers */}
  <div 
    className="relative h-[300px] md:h-[350px] overflow-hidden border border-gray-200"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    <Image
      src={doctorImages[currentImageIndex].src}
      alt={doctorImages[currentImageIndex].alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-contain object-center transition-opacity duration-300"
      priority
    />
    
    {/* Left Navigation Button - Visible on hover */}
    <button
      onClick={handlePrevImage}
      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#0194d0] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0194d0] hover:text-white shadow-lg z-10"
      aria-label="Previous image"
    >
      <FaChevronLeft className="text-lg" />
    </button>
    
    {/* Right Navigation Button - Visible on hover */}
    <button
      onClick={handleNextImage}
      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#0194d0] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0194d0] hover:text-white shadow-lg z-10"
      aria-label="Next image"
    >
      <FaChevronRight className="text-lg" />
    </button>
    
    {/* Image Counter */}
    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
      {currentImageIndex + 1} / {doctorImages.length}
    </div>
  </div>
  
  {/* Caption */}
  <div className="mt-3 text-center border-b border-dashed border-gray-300 pb-2">
    <p className="font-serif text-sm text-gray-600 italic">{doctorImages[currentImageIndex].caption}</p>
  </div>
</div>

{/* Thumbnail Grid - Clickable */}
<div className="grid grid-cols-3 gap-3 mt-4">
  {doctorImages.map((image, index) => (
    <button
      key={index}
      onClick={() => handleThumbnailClick(index)}
      className={`relative h-[80px] bg-white p-1.5 shadow-md hover:shadow-lg transition-all duration-300 ${
        currentImageIndex === index 
          ? 'ring-2 ring-[#0194d0] scale-105' 
          : 'opacity-70 hover:opacity-100 rotate-0 hover:rotate-0'
      }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 33vw, 15vw"
          className="object-cover"
        />
      </div>
      {/* Active Indicator */}
      {currentImageIndex === index && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0194d0] rounded-full border-2 border-white"></div>
      )}
    </button>
  ))}
</div>
                </div>
              </div>

              {/* Right Column - Article */}
              <div className="lg:col-span-7 space-y-6">
                {/* Headline */}
                <div className="border-b-2 border-gray-200 pb-4">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                    Dr. Juan L. Rodriguez
                    <span className="block text-xl text-[#0194d0] mt-2">DDS, MPH, MS</span>
                  </h3>
                </div>

                {/* Article Content */}
                <div className="space-y-6 font-serif text-gray-700 leading-relaxed">
                  <p className="text-base md:text-lg">
                    <span className="float-left text-5xl font-bold text-[#0194d0] mr-3 font-serif">D</span>
                    r. Juan L. Rodriguez was born and raised in Colorado Springs, proudly growing up in the Widefield community. 
                    He completed his undergraduate degree in Biology at CSU Pueblo, where he also pursued a Master of Science degree. 
                    Dr. Rodriguez went on to attend the University of Colorado School of Dental Medicine, earning his Doctor of Dental 
                    Surgery while simultaneously completing a dual degree and receiving his Master of Public Health.
                  </p>

                  <p className="text-base md:text-lg pl-4 border-l-2 border-[#0194d0]/30 italic text-gray-600">
                    Dr. Rodriguez married his wife during his undergraduate years, and together they are raising three children. 
                    Outside of dentistry, he enjoys spending time with his family—especially watching his kids compete in sports. 
                    He is an avid supporter of all Colorado professional sports teams, enjoys ice fishing, playing chess, and 
                    vacationing with his family whenever possible.
                  </p>

                  <p className="text-base md:text-lg">
                    Dr. Rodriguez is passionate about serving his community and is honored to provide high-quality, compassionate 
                    dental care to the area he proudly calls home. Striving to serve every individual who walks through the door, 
                    Dr. Rodriguez is committed to helping anyone in need with honesty, compassion, and respect.
                  </p>
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                  <span className="bg-[#0194d0]/10 text-[#0194d0] px-4 py-2 rounded-full text-sm font-semibold">DDS</span>
                  <span className="bg-[#01d09e]/10 text-[#01d09e] px-4 py-2 rounded-full text-sm font-semibold">MPH</span>
                  <span className="bg-[#0194d0]/10 text-[#0194d0] px-4 py-2 rounded-full text-sm font-semibold">MS</span>
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">20+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Team - Newspaper Style */}
<section className="py-12 md:py-24 bg-gray-50 relative">
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(45deg, #0194d0 0px, #0194d0 1px, transparent 1px, transparent 20px)`,
      backgroundSize: '30px 30px'
    }}></div>
  </div>

  <div className="container-custom px-4">
    {/* Section Header - Mobile Optimized */}
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-block border-t-2 border-b-2 border-[#0194d0] px-4 md:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
        <span className="text-[#0194d0] font-serif text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em]">Our Family</span>
      </div>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
        Meet The Team
      </h2>
      <div className="w-16 md:w-24 h-0.5 bg-[#0194d0] mx-auto"></div>
      <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-3 md:mt-4 font-serif italic px-2">
        Dedicated professionals committed to your comfort and care.
      </p>
    </div>

    {/* Team Grid - 2 columns on mobile, 3 on desktop */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
        >
          <div className="p-3 md:p-5 lg:p-6 text-center">
            {/* Avatar - Smaller on mobile */}
            <div className="w-16 h-16 md:w-20 lg:w-24 md:h-20 lg:h-24 mx-auto mb-2 md:mb-3 lg:mb-4 rounded-full bg-gradient-to-br from-[#0194d0] to-[#01d09e] flex items-center justify-center text-white font-serif text-lg md:text-2xl lg:text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
              {member.initials}
            </div>
            
            {/* Info - Smaller text on mobile */}
            <h3 className="font-serif text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-0.5 md:mb-1 group-hover:text-[#0194d0] transition-colors">
              {member.name}
            </h3>
            <p className="text-[#01d09e] font-medium text-xs md:text-sm mb-2 md:mb-3">{member.role}</p>
            
            {/* Decorative Line - Smaller on mobile */}
            <div className="w-8 md:w-10 lg:w-12 h-0.5 bg-gray-200 mx-auto group-hover:w-12 md:group-hover:w-16 lg:group-hover:w-20 transition-all"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

       {/* Call to Action - Newspaper Ad Style */}
<section className="py-16 bg-white">
  <div className="container-custom px-4">
    <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-xl relative overflow-hidden">
      {/* Background Pattern - Fixed to not block clicks */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0194d0 2px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative z-10">
        Experience the <span className="text-[#0194d0]">J.A.M.I.M.</span> Difference
      </h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto relative z-10">
        Join our family of smiles and discover compassionate, exceptional dental care.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
        <Link
          href="/appointment"
          className="inline-flex items-center justify-center gap-2 bg-[#0194d0] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#017ab0] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FaCalendarAlt />
          Request Appointment
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-white text-[#0194d0] border-2 border-[#0194d0] px-8 py-4 rounded-full font-semibold hover:bg-[#0194d0] hover:text-white transition-all"
        >
          Contact Us
          <FaArrowRight />
        </Link>
      </div>
    </div>
  </div>
</section>
      </main>

      <Footer />
    </>
  )
}