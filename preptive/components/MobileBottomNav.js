import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  FaHome,
  FaBook,
  FaLayerGroup,
  FaNewspaper,
  FaUser,
  FaSignInAlt
} from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function MobileBottomNav({ user }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Update active tab based on current route
  useEffect(() => {
    const path = router.pathname
    
    if (path === '/') {
      setActiveTab('home')
    } else if (path.startsWith('/practice')) {
      setActiveTab('practice')
    } else if (path.startsWith('/flashcards')) {
      setActiveTab('flashcards')
    } else if (path.startsWith('/current-affairs')) {
      setActiveTab('current-affairs')
    } else if (path.startsWith('/profile')) {
      setActiveTab('profile')
    }
  }, [router.pathname])

  // Check for small screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 420)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const navItems = [
    {
      id: 'home',
      name: isSmallScreen ? '' : 'Home', // Hide text on very small screens
      icon: FaHome,
      href: '/',
      color: 'blue',
      shortName: '' // For very small screens
    },
    {
      id: 'practice',
      name: isSmallScreen ? '' : 'Practice',
      icon: FaBook,
      href: '/practice/static-gk',
      color: 'green',
      shortName: ''
    },
    {
      id: 'flashcards',
      name: isSmallScreen ? '' : 'Cards', // Shorter text on small screens
      icon: FaLayerGroup,
      href: '/flashcards',
      color: 'pink',
      shortName: 'Cards'
    },
    {
      id: 'current-affairs',
      name: isSmallScreen ? '' : 'News', // Shorter text on small screens
      icon: FaNewspaper,
      href: '/current-affairs',
      color: 'red',
      shortName: 'News'
    },
    {
      id: 'profile',
      name: isSmallScreen ? '' : (user ? 'Profile' : 'Login'),
      icon: user ? FaUser : FaSignInAlt,
      href: user ? '/profile' : '/login',
      color: 'purple',
      shortName: user ? '' : ''
    }
  ]

  const getActiveColor = (color, isActive) => {
    if (!isActive) return 'text-gray-500 dark:text-gray-400'
    
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      pink: 'text-pink-600 dark:text-pink-400',
      red: 'text-red-600 dark:text-red-400',
      purple: 'text-purple-600 dark:text-purple-400',
    }
    
    return colorMap[color] || 'text-blue-600 dark:text-blue-400'
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex flex-col items-center justify-center flex-1 h-full
                transition-colors duration-200
                ${isSmallScreen ? 'px-0' : 'px-1'}
                ${isActive 
                  ? getActiveColor(item.color, true)
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }
                relative
              `}
            >
              <Icon className={`${isSmallScreen ? 'text-2xl' : 'text-xl'} mb-1`} />
              {item.name && (
                <span className={`${isSmallScreen ? 'text-[10px]' : 'text-xs'} font-medium whitespace-nowrap`}>
                  {item.name}
                </span>
              )}
              
              {/* Active Indicator */}
              {isActive && (
                <span className={`absolute bottom-0 w-10 sm:w-12 h-0.5 rounded-t-full ${
                  item.color === 'blue' ? 'bg-blue-600 dark:bg-blue-400' :
                  item.color === 'green' ? 'bg-green-600 dark:bg-green-400' :
                  item.color === 'pink' ? 'bg-pink-600 dark:bg-pink-400' :
                  item.color === 'red' ? 'bg-red-600 dark:bg-red-400' :
                  'bg-purple-600 dark:bg-purple-400'
                }`} />
              )}
            </Link>
          )
        })}
      </div>

      {/* Safe Area for iPhone X and above */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white dark:bg-gray-900" />
    </nav>
  )
}