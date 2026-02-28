import Header from './Header'
import Sidebar from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Layout({ children, user }) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if current page is auth page (login/signup)
  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup'

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Changed to md breakpoint (768px)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
        setIsSidebarCollapsed(false)
      } else {
        setIsSidebarOpen(true)
        // Restore collapsed state from localStorage or default to false
        const savedCollapsedState = localStorage.getItem('sidebarCollapsed')
        setIsSidebarCollapsed(savedCollapsedState === 'true')
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Save collapsed state to localStorage
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString())
    }
  }, [isSidebarCollapsed, isMobile])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [router.pathname, isMobile])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  const handleSidebarCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed)
  }

  // Calculate main content margin based on sidebar state (only for non-mobile)
  const getMainContentMargin = () => {
    if (isMobile) return 'ml-0'
    if (!isSidebarOpen) return 'ml-0'
    return isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
  }

  // Calculate main content width based on sidebar state (only for non-mobile)
  const getMainContentWidth = () => {
    if (isMobile) return 'w-full'
    if (!isSidebarOpen) return 'w-full'
    return isSidebarCollapsed ? 'lg:w-[calc(100%-5rem)]' : 'lg:w-[calc(100%-16rem)]'
  }

  // Calculate bottom padding for mobile (to account for bottom nav)
  const getBottomPadding = () => {
    if (isMobile && !isAuthPage) {
      return 'pb-16' // Add padding for bottom navigation
    }
    return ''
  }

  // For auth pages, render without sidebar and bottom nav
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header user={user} toggleSidebar={toggleSidebar} />
        <main className="pt-16">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Header */}
      <Header user={user} toggleSidebar={toggleSidebar} />

      {/* Sidebar - Only shown on desktop */}
      {!isMobile && (
        <Sidebar 
          user={user} 
          onCollapse={handleSidebarCollapse}
          isCollapsed={isSidebarCollapsed}
        />
      )}

      {/* Main Content - Adjusts based on sidebar state */}
      <main 
        className={`
          pt-16 
          transition-all duration-300 ease-in-out
          ${getMainContentMargin()}
          ${getMainContentWidth()}
          ${getBottomPadding()}
          min-h-screen
        `}
      >
        {/* Content Container */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && !isAuthPage && (
        <MobileBottomNav user={user} />
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  )
}