'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function PoetryHero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* 纯黑色背景 */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black" />

      {/* 主要内容 - 严丝合缝布局 */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8 items-center">
          
          {/* 左侧文字 - 精确对齐 */}
          <div className="col-span-3 flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-right"
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-light tracking-widest mb-2 text-white"
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                }}
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                    '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(255, 255, 255, 0.6), 0 0 120px rgba(255, 255, 255, 0.4)',
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                POETRY
              </motion.h2>
              <motion.h2 
                className="text-2xl md:text-3xl font-light tracking-widest text-white"
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                }}
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                    '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(255, 255, 255, 0.6), 0 0 120px rgba(255, 255, 255, 0.4)',
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                COLLECTION
              </motion.h2>
            </motion.div>
          </div>

          {/* 中央Katya原图 - 精确居中 */}
          <div className="col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
              transition={{ duration: 2.5, delay: 0.3 }}
              className="relative"
            >
              <Image
                src="/images/Katya.jpg"
                alt="Fallen Luminaries Poetry Hero"
                width={450}
                height={650}
                className="object-contain opacity-90 shadow-2xl"
                priority
                onLoad={() => setImageLoaded(true)}
              />
              {/* 微妙的发光效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-white/3" />
              <div className="absolute -inset-4 bg-white/5 blur-xl opacity-30" />
            </motion.div>
          </div>

          {/* 右侧文字 - 精确对齐 */}
          <div className="col-span-3 flex justify-start">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="text-left"
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-light tracking-widest mb-2 text-white"
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                }}
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                    '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(255, 255, 255, 0.6), 0 0 120px rgba(255, 255, 255, 0.4)',
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                FALLEN
              </motion.h2>
              <motion.h2 
                className="text-2xl md:text-3xl font-light tracking-widest text-white"
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                }}
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                    '0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(255, 255, 255, 0.6), 0 0 120px rgba(255, 255, 255, 0.4)',
                    '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                LUMINARIES
              </motion.h2>
            </motion.div>
          </div>
        </div>

        {/* 导航箭头 - 精确位置 */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center white-sparkle-text hover:border-white/60 transition-all"
          >
            <span className="text-lg">‹</span>
          </motion.button>
        </div>

        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center white-sparkle-text hover:border-white/60 transition-all"
          >
            <span className="text-lg">›</span>
          </motion.button>
        </div>

        {/* 底部滚动提示 - 精确居中 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 border border-white/50 rounded-full flex items-center justify-center white-sparkle-text"
          >
            <span className="text-sm">↓</span>
          </motion.div>
        </motion.div>
      </div>

      {/* 底部过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-30" />
    </section>
  )
}
