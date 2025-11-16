'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'

const CARD_WIDTH = 320
const CARD_HEIGHT = 280

const PREFER_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type PlanetInfo = {
  orbit: string
  domain: string
  surface: string
  echo: string
  function: string
}

type PlanetInfoCardProps = {
  name: string
  tagline: string
  description: string
  info: PlanetInfo
  position: {
    x: number
    y: number
    side: 'top' | 'bottom' | 'left' | 'right'
  }
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClose?: () => void
}

const InfoItems: Array<{ key: keyof PlanetInfo; label: string }> = [
  { key: 'domain', label: 'Domain' },
  { key: 'orbit', label: 'Orbit' },
  { key: 'surface', label: 'Surface' },
  { key: 'echo', label: 'Echo' },
  { key: 'function', label: 'Function' },
]

const usePrefersReducedMotion = () => {
  const query = typeof window !== 'undefined' ? window.matchMedia(PREFER_REDUCED_MOTION_QUERY) : null
  const prefers = query?.matches ?? false

  useEffect(() => {
    if (!query) return
    const handler = () => {}
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [query])

  return prefers
}

const PlanetInfoCard = ({ name, tagline, description, info, position, onMouseEnter, onMouseLeave, onClose }: PlanetInfoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  // ESC 关闭
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const transform = useMemo(() => {
    switch (position.side) {
      case 'bottom':
        return 'translate(-50%, 0)'
      case 'left':
        return 'translate(-100%, -50%)'
      case 'right':
        return 'translate(0, -50%)'
      case 'top':
      default:
        return 'translate(-50%, -100%)'
    }
  }, [position.side])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 8 }}
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto fixed z-40"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        left: position.x,
        top: position.y,
        transform,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/25 bg-white/[0.08] p-6 text-left text-white shadow-[0_18px_50px_rgba(16,16,35,0.45)] backdrop-blur-[26px]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.45em] text-white/45">{name}</p>
            <span className="rounded-full border border-white/20 px-2 py-[2px] text-[10px] uppercase tracking-[0.3em] text-white/50">
              {position.side}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">{tagline}</h3>
          <p className="mt-2 text-sm text-white/70 leading-6">{description}</p>
        </div>

        <div className="mt-4 space-y-1.5">
          {InfoItems.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/35">
              <span>{label}</span>
              <span className="max-w-[170px] truncate text-right text-white/80 normal-case tracking-normal">
                {info[key]}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] uppercase tracking-[0.35em] text-white/30">Press ESC to close</p>
      </div>
    </motion.div>
  )
}

export default PlanetInfoCard
