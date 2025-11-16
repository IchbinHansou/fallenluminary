'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FloatingStars() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 50; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 5,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: index % 3 === 0 
                  ? 'linear-gradient(135deg, #67e8f9 0%, #3b82f6 100%)'
                  : index % 3 === 1
                  ? 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)'
                  : 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0.3, 1, 0.3],
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + star.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: star.delay,
              }}
              viewport={{ once: false, amount: 0.1 }}
            />
      ))}
    </div>
  )
}

