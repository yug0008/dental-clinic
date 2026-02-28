import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  FaBook, 
  FaHistory, 
  FaLandmark, 
  FaGlobe, 
  FaChartBar,
  FaGraduationCap,
  FaNewspaper,
  FaUser,
  FaSignInAlt,
  FaLayerGroup,
  FaDollarSign,
  FaCog,
  FaQuestionCircle
} from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Sidebar({ user, onCollapse, isCollapsed: controlledCollapsed }) {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [internalCollapsed, setInternalCollapsed] = useState(controlledCollapsed || false)

  // Use controlled or internal state
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed
    if (controlledCollapsed !== undefined) {
      // If controlled, notify parent
      onCollapse?.(newCollapsedState)
    } else {
      // If uncontrolled, update internal state
      setInternalCollapsed(newCollapsedState)
    }
  }

  const practiceNavItems = [
    { name: 'Static GK', icon: FaBook, href: '/practice/static-gk', color: 'blue' },
    { name: 'Vocab', icon: FaGraduationCap, href: '/practice/vocab', color: 'green' },
    { name: 'Polity', icon: FaLandmark, href: '/practice/polity', color: 'purple' },
    { name: 'History', icon: FaHistory, href: '/practice/history', color: 'amber' },
    { name: 'Geography', icon: FaGlobe, href: '/practice/geography', color: 'emerald' },
    { name: 'Economics', icon: FaDollarSign, href: '/practice/economics', color: 'indigo' },
  ]

  const mainNavItems = [
    { name: 'Flash Cards', icon: FaLayerGroup, href: '/flashcards', color: 'pink' },
    { name: 'Current Affairs', icon: FaNewspaper, href: '/current-affairs', color: 'red' },
  ]

  const bottomNavItems = [
    { name: 'Settings', icon: FaCog, href: '/settings' },
    { name: 'Help', icon: FaQuestionCircle, href: '/help' },
  ]

  const getActiveColor = (color, isActive) => {
    if (!isActive) return ''
    
    const colorMap = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      pink: 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
      red: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    }
    
    return colorMap[color] || 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  }

  return (
    <aside className={`
      fixed left-0 top-16 bottom-0 
      hidden md:block
      ${isCollapsed ? 'w-20' : 'w-64'} 
      bg-white dark:bg-gray-900 
      shadow-lg dark:shadow-gray-800 
      overflow-y-auto 
      transition-all duration-300 
      border-r border-gray-200 dark:border-gray-800
      z-40
    `}>
      {/* Collapse Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shadow-md z-50"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div className="p-4">
        {/* Practice Navigation */}
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Practice
            </h3>
          )}
          <nav className="space-y-1">
            {practiceNavItems.map((item) => {
              const Icon = item.icon
              const isActive = router.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${isActive 
                      ? getActiveColor(item.color, true)
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                    group relative
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className={`text-lg ${isActive ? '' : 'text-gray-500 dark:text-gray-400'}`} />
                  {!isCollapsed && <span className="text-sm">{item.name}</span>}
                  
                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Navigation */}
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Resources
            </h3>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = router.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${isActive 
                      ? getActiveColor(item.color, true)
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                    group relative
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className={`text-lg ${isActive ? '' : 'text-gray-500 dark:text-gray-400'}`} />
                  {!isCollapsed && <span className="text-sm">{item.name}</span>}
                  
                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User Section */}
        <div className={`
          border-t border-gray-200 dark:border-gray-800 
          pt-4 mt-auto
          ${isCollapsed ? 'text-center' : ''}
        `}>
          {user ? (
            <Link
              href="/profile"
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg 
                bg-gray-50 dark:bg-gray-800/50 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors
                ${isCollapsed ? 'justify-center' : ''}
                group relative
              `}
              title={isCollapsed ? 'Profile' : ''}
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={user.email}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-white dark:ring-gray-700"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.user_metadata?.name || 'Profile'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              )}
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Profile
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg 
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors
                ${isCollapsed ? 'justify-center' : ''}
                group relative
              `}
              title={isCollapsed ? 'Login' : ''}
            >
              <FaSignInAlt className="text-lg text-gray-500 dark:text-gray-400" />
              {!isCollapsed && <span className="text-sm">Login</span>}
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Login
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <nav className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon
              const isActive = router.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                    group relative
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className="text-lg" />
                  {!isCollapsed && <span className="text-sm">{item.name}</span>}
                  
                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

     
    </aside>
  )
}