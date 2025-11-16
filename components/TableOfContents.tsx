'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TOCItem {
  id: string
  title: string
  subtitle: string
  page: number
}

const tocItems: TOCItem[] = [
  {
    id: 'atlas',
    title: 'I. Atlas: Misplaced Genius',
    subtitle: '错位的天才',
    page: 0
  },
  {
    id: 'myth-of-genius',
    title: 'II. The Myth of Genius',
    subtitle: '天才神话',
    page: 1
  },
  {
    id: 'fallen-stars',
    title: '坠落的星辰',
    subtitle: 'Fallen Stars',
    page: 2
  },
  {
    id: 'night-whispers',
    title: '夜语',
    subtitle: 'Night Whispers',
    page: 3
  },
  {
    id: 'light-memory',
    title: '光的记忆',
    subtitle: 'Memory of Light',
    page: 4
  }
]

export default function TableOfContents() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (item: TOCItem) => {
    const element = document.getElementById(item.id)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-0 h-full z-50 flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 左侧触发区域 */}
      <div className="w-8 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          className="w-1 h-32 bg-white/40 rounded-r-full"
        />
      </div>

      {/* 抽屉式菜单 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="w-80 h-full bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border-r border-white/20 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg flex items-center">
                  <span className="mr-3 text-white/80">📖</span>
                  TABLE OF CONTENTS
                </h3>
              </div>

              <div className="space-y-3">
                {tocItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(item)}
                    className="w-full text-left p-4 rounded-xl transition-all duration-300 border bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:bg-white/15"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-sm text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-white/50 mt-1 font-mono opacity-75">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="text-white/60 text-lg ml-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-xs text-white/50 text-center font-mono">
                  Hover to navigate
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
