'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  text: string
  speed: number
}

const poemLines = [
  '星光闪烁',
  '夜空低语',
  '梦境破碎',
  '温柔永恒',
  '时光流转',
  '希望不灭',
  '黑暗中发光',
  '坠落的美丽',
]

export default function StarCatcherGame() {
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState<Star[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [caughtLines, setCaughtLines] = useState<string[]>([])
  const gameAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gameStarted) return

    const spawnInterval = setInterval(() => {
      if (gameAreaRef.current) {
        const newStar: Star = {
          id: Date.now(),
          x: Math.random() * (gameAreaRef.current.offsetWidth - 80),
          y: -50,
          text: poemLines[Math.floor(Math.random() * poemLines.length)],
          speed: Math.random() * 2 + 2,
        }
        setStars(prev => [...prev, newStar])
      }
    }, 1500)

    const moveInterval = setInterval(() => {
      setStars(prev =>
        prev
          .map(star => ({ ...star, y: star.y + star.speed }))
          .filter(star => star.y < (gameAreaRef.current?.offsetHeight || 600))
      )
    }, 50)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(moveInterval)
    }
  }, [gameStarted])

  const catchStar = (starId: number, text: string) => {
    setStars(prev => prev.filter(star => star.id !== starId))
    setScore(prev => prev + 10)
    setCaughtLines(prev => [...prev, text])
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-serif text-[#64ffda] mb-4">捕星者</h2>
        <p className="text-gray-300 mb-4">点击坠落的星辰，收集诗句</p>
        <div className="text-2xl text-[#64ffda] font-bold mb-4">得分: {score}</div>
      </motion.div>

      {!gameStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <button
            onClick={() => setGameStarted(true)}
            className="px-12 py-4 bg-[#64ffda] hover:bg-[#5ce0c0] text-[#0a192f] font-bold text-xl rounded-full transition-colors"
          >
            开始游戏
          </button>
        </motion.div>
      ) : (
        <div
          ref={gameAreaRef}
          className="relative bg-[#0a192f]/50 border-2 border-[#64ffda]/30 rounded-2xl overflow-hidden"
          style={{ height: '500px' }}
        >
          <AnimatePresence>
            {stars.map(star => (
              <motion.div
                key={star.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => catchStar(star.id, star.text)}
                className="cursor-pointer absolute"
                style={{
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#64ffda] to-[#5ce0c0] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#64ffda]/50 transition-shadow">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-[#64ffda] font-semibold">
                    {star.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {caughtLines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white/10 rounded-2xl"
        >
          <h3 className="text-xl font-serif text-[#64ffda] mb-4 text-center">
            你收集的诗句：
          </h3>
          <div className="space-y-2">
            {caughtLines.slice(-5).map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gray-300 text-center"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

