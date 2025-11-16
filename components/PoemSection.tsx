'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PoemSectionProps {
  poem: {
    id: number
    title: string
    lines: string[]
  }
  index: number
}

export default function PoemSection({ poem, index }: PoemSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="max-w-3xl mx-auto px-4"
    >
      <div className="bg-white/10 backdrop-blur-xl backdrop-saturate-150 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-3xl md:text-4xl font-serif text-center mb-12 text-white font-light tracking-wide"
        >
          {poem.title}
        </motion.h2>

        <div className="space-y-6">
          {poem.lines.map((line, lineIndex) => (
                <motion.p
                  key={lineIndex}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: line === '' ? 0 : 1 }}
                  transition={{
                    duration: 1.2,
                    delay: lineIndex * 0.15,
                    ease: 'easeInOut',
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  className={`text-xl md:text-2xl font-serif text-center leading-relaxed ${
                    line === ''
                      ? 'h-8'
                      : 'text-white/90'
                  }`}
                >
                  {line}
                </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

