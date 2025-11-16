'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: '首页' },
    { href: '/poems', label: 'POEMS' },
    { href: '/katya-archive', label: "Katya's Archive" },
    { href: '/aura', label: 'AURA' },
    { href: '/ai-support', label: 'Research' },
  ]

  // 首页不显示导航栏
  if (pathname === '/') {
    return null
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-serif text-white/90">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              Fallen Luminary
            </motion.span>
          </Link>
          
          <div className="flex space-x-8">
            {links.slice(1).map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`text-base transition-colors ${
                    pathname === link.href
                      ? 'text-white font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
