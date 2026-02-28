import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

    return () => subscription.unsubscribe()
  }, [])

  // 🔥 Check if current route starts with /admin
  const isAdminPage = router.pathname.startsWith('/admin')

  // 🔥 If admin page → no layout
  if (isAdminPage) {
    return <Component {...pageProps} user={user} />
  }

  // 🔥 Normal pages → with layout
  return (
    <Layout user={user}>
      <Component {...pageProps} user={user} />
    </Layout>
  )
}

export default MyApp
