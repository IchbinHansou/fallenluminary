'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Manrope } from 'next/font/google'

const subtitleFont = Manrope({
  subsets: ['latin'],
  weight: ['300'],
})

type OrbitingPlanetConfig = {
  id: string
  imageUrl: string
  size: number
  radiusX: number
  radiusY: number
  speed: number
  initialAngle: number
  label: string
  link: string
}

const ORBITING_PLANETS: OrbitingPlanetConfig[] = [
  {
    id: 'poems',
    imageUrl: '/images/planet2.png',
    size: 260,
    radiusX: 0, // 将动态计算
    radiusY: 0, // 将动态计算
    speed: 0.05,
    initialAngle: 0, // 均匀分布：0度
    label: 'POEMS',
    link: '/poems',
  },
  {
    id: 'katya-archive',
    imageUrl: '/images/planet3.png',
    size: 220,
    radiusX: 0, // 将动态计算
    radiusY: 0, // 将动态计算
    speed: 0.05,
    initialAngle: (2 * Math.PI) / 3, // 均匀分布：120度
    label: "Katya's Archive",
    link: '/katya-archive',
  },
  {
    id: 'aura',
    imageUrl: '/images/planet4.png',
    size: 220,
    radiusX: 0, // 将动态计算
    radiusY: 0, // 将动态计算
    speed: 0.05,
    initialAngle: (4 * Math.PI) / 3, // 均匀分布：240度
    label: 'A.U.R.A.',
    link: '/aura',
  },
]

const ANCHOR_PLANET_URL = '/images/planet1.jpg'

const SolarSystem = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const leftImageRef = useRef<HTMLImageElement | null>(null)
  const animationFrameRef = useRef<number>()

  const [time, setTime] = useState(0)
  const [anchorCenter, setAnchorCenter] = useState({ x: 0, y: 0 })
  const [bounds, setBounds] = useState({ left: 96, right: 96, top: 96, bottom: 96 })

  useEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current || !anchorRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const anchorRect = anchorRef.current.getBoundingClientRect()
      const leftRect = leftImageRef.current?.getBoundingClientRect()

      setAnchorCenter({
        x: anchorRect.left - containerRect.left + anchorRect.width / 2,
        y: anchorRect.top - containerRect.top + anchorRect.height / 2,
      })

      const leftBoundary =
        (leftRect ? leftRect.right - containerRect.left : 0) + 80

      setBounds({
        left: Math.min(leftBoundary, containerRect.width - 160),
        right: containerRect.width - 64,
        top: 96,
        bottom: containerRect.height - 96,
      })
    }

    updateMetrics()
    const rafId = requestAnimationFrame(updateMetrics)
    window.addEventListener('resize', updateMetrics)
    return () => {
      window.removeEventListener('resize', updateMetrics)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    let frameId: number
    let lastTimestamp = performance.now()

    const step = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp
      setTime((prev) => prev + delta)
      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const orbitingPlanets = useMemo(() => {
    if (anchorCenter.x === 0 && anchorCenter.y === 0 || !containerRef.current) {
      return []
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height

    // 屏幕左边1/3的位置
    const leftThirdBoundary = containerWidth / 3
    
    // 获取最大星球半径，用于计算边界
    const maxPlanetRadius = Math.max(...ORBITING_PLANETS.map(p => p.size / 2))

    // 计算椭圆轨道半径
    // 限制1：椭圆最左点（考虑星球半径）不能进入左边1/3区域
    // 椭圆最左点 = anchorCenter.x - radiusX
    // 星球最左点 = anchorCenter.x - radiusX - planetHalfSize
    // 所以：anchorCenter.x - radiusX - maxPlanetRadius >= leftThirdBoundary
    // 即：radiusX <= anchorCenter.x - leftThirdBoundary - maxPlanetRadius
    
    // 限制2：椭圆最右点（考虑星球半径）不能超出屏幕
    const rightLimit = containerWidth - maxPlanetRadius
    
    // 限制3：椭圆最上/最下点（考虑星球半径）不能超出屏幕
    const topLimit = maxPlanetRadius
    const bottomLimit = containerHeight - maxPlanetRadius

    // 计算可用的最大半径（考虑星球大小）
    const maxRadiusXFromLeft = anchorCenter.x - leftThirdBoundary - maxPlanetRadius
    const maxRadiusXFromRight = rightLimit - anchorCenter.x
    const maxRadiusX = Math.min(maxRadiusXFromLeft, maxRadiusXFromRight)
    
    const maxRadiusYFromTop = anchorCenter.y - topLimit
    const maxRadiusYFromBottom = bottomLimit - anchorCenter.y
    const maxRadiusY = Math.min(maxRadiusYFromTop, maxRadiusYFromBottom)

    // 使用计算出的椭圆轨道（确保有最小值）
    const radiusX = Math.max(maxRadiusX, 300)
    const radiusY = Math.max(maxRadiusY, 250)

    return ORBITING_PLANETS.map((planet) => {
      const angle = planet.initialAngle + time * planet.speed
      let x = anchorCenter.x + Math.cos(angle) * radiusX
      let y = anchorCenter.y + Math.sin(angle) * radiusY
      
      // 确保星球至少露出一半（边界检查）
      const planetHalfSize = planet.size / 2
      
      // 左边界：星球至少要露出一半
      if (x - planetHalfSize < 0) {
        x = planetHalfSize
      }
      
      // 右边界：星球至少要露出一半
      if (x + planetHalfSize > containerWidth) {
        x = containerWidth - planetHalfSize
      }
      
      // 上边界：星球至少要露出一半
      if (y - planetHalfSize < 0) {
        y = planetHalfSize
      }
      
      // 下边界：星球至少要露出一半
      if (y + planetHalfSize > containerHeight) {
        y = containerHeight - planetHalfSize
      }
      
      // 左边1/3限制：星球不能进入左边1/3区域（至少要露出一半）
      if (x - planetHalfSize < leftThirdBoundary) {
        x = leftThirdBoundary + planetHalfSize
      }
      
      const isFront = y >= anchorCenter.y

      return {
        ...planet,
        x,
        y,
        radiusX,
        radiusY,
        zIndex: isFront ? 30 : 10,
        opacity: isFront ? 1 : 0.4,
      }
    })
  }, [anchorCenter, bounds, time])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(2px 2px at 24px 40px, rgba(220,225,255,0.16), transparent 60%), radial-gradient(1.4px 1.4px at 210px 160px, rgba(255,255,255,0.12), transparent 56%), radial-gradient(1.8px 1.8px at 420px 260px, rgba(255,255,255,0.18), transparent 60%), radial-gradient(2.2px 2.2px at 680px 120px, rgba(255,255,255,0.14), transparent 55%)',
          backgroundSize: '540px 540px, 520px 520px, 600px 600px, 680px 680px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 mix-blend-screen opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Crect width='220' height='220' fill='none'/%3E%3Ccircle cx='18' cy='40' r='0.8' fill='%23fff' fill-opacity='0.12'/%3E%3Ccircle cx='120' cy='22' r='0.6' fill='%23fff' fill-opacity='0.18'/%3E%3Ccircle cx='44' cy='140' r='0.9' fill='%23fff' fill-opacity='0.1'/%3E%3Ccircle cx='180' cy='90' r='0.7' fill='%23fff' fill-opacity='0.15'/%3E%3Ccircle cx='160' cy='200' r='0.6' fill='%23fff' fill-opacity='0.16'/%3E%3Ccircle cx='92' cy='188' r='0.5' fill='%23fff' fill-opacity='0.12'/%3E%3Ccircle cx='12' cy='190' r='0.7' fill='%23fff' fill-opacity='0.1'/%3E%3Ccircle cx='208' cy='24' r='0.5' fill='%23fff' fill-opacity='0.14'/%3E%3Ccircle cx='70' cy='76' r='0.65' fill='%23fff' fill-opacity='0.12'/%3E%3C/svg%3E\")",
          backgroundSize: '220px 220px',
        }}
      />

      <header className="pointer-events-none absolute right-10 top-24 z-30 text-right md:right-16 md:top-32">
        <h1
          className="text-4xl font-bold leading-[1.45] tracking-[0.03em] text-white drop-shadow-[0_0_45px_rgba(120,160,255,0.45)] md:text-[74px]"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            textShadow: '0 0 35px rgba(120,160,255,0.55), 0 0 90px rgba(120,160,255,0.35)',
          }}
        >
          Fallen Luminary
        </h1>
        <p
          className={`${subtitleFont.className} mt-2 ml-auto max-w-[520px] text-right text-lg font-light leading-[1.85] tracking-[0.05em] text-white/70 md:text-[20px]`}
        >
          An interactive universe weaving poetry, stories and
          <br />
          affective computing.
        </p>
      </header>

      <div className="pointer-events-none absolute left-[12%] top-1/2 z-10 hidden w-[420px] -translate-y-1/2 opacity-90 xl:block">
        <img
          ref={leftImageRef}
          src="/images/fallen.png"
          alt=""
          className="w-full"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-30 w-full max-w-[960px] -translate-x-1/2 pb-3 text-center text-white/65 md:pb-5">
        <p
          className="whitespace-nowrap text-[12.5px] tracking-[0.05em] text-white/65 md:text-[14px]"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
          }}
        >
          Click any planet to enter the realms of <span className="font-semibold text-white">POEMS</span>,{' '}
          <span className="font-semibold text-white">GAMES</span>, and <span className="font-semibold text-white">A.U.R.A.</span> —{' '}
          <span className="font-semibold text-white">A</span>rtificial <span className="font-semibold text-white">U</span>
          nderstanding &amp; <span className="font-semibold text-white">R</span>eframing <span className="font-semibold text-white">A</span>
          ssistant.
        </p>
      </div>

      <div
        aria-hidden="true"
        ref={anchorRef}
        className="pointer-events-none absolute bottom-[-60px] right-40 z-20 rounded-full md:bottom-[-38px] md:right-44"
        style={{
          width: 'clamp(360px, 48vw, 660px)',
          height: 'clamp(360px, 48vw, 660px)',
          backgroundImage: `url(${ANCHOR_PLANET_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {orbitingPlanets.length > 0 && (
        <div className="absolute inset-0 z-20">
          {orbitingPlanets.map((planet) => (
            <Link
              key={planet.id}
              href={planet.link}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-transform duration-300 hover:scale-110"
              style={{
                left: planet.x,
                top: planet.y,
                zIndex: planet.zIndex,
                opacity: planet.opacity,
                pointerEvents: 'auto',
              }}
            >
              <div
                className="rounded-full transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,223,100,0.6)]"
                style={{
                  width: planet.size,
                  height: planet.size,
                  backgroundImage: `url(${planet.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                }}
              />
              <span
                className={`${subtitleFont.className} mt-3 text-[13px] uppercase tracking-[0.32em] text-white/70 transition-colors duration-300 hover:text-white`}
              >
                {planet.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SolarSystem

