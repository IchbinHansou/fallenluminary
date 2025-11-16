'use client'

import { useEffect, useRef } from 'react'

export default function PixelAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    // 像素风配色
    const colors = {
      sky: '#0a192f',
      star: '#64ffda',
      girl: '#f8faff',
      shadow: '#112240',
      accent: '#5ce0c0',
    }

    let frame = 0

    // 简单的像素风角色（女孩剪影）
    const drawPixelGirl = (x: number, y: number, frame: number) => {
      const pixelSize = 4
      
      // 头部（呼吸效果）
      const breathOffset = Math.sin(frame * 0.03) * 2
      ctx.fillStyle = colors.girl
      ctx.fillRect(x + pixelSize * 4, y + breathOffset, pixelSize * 4, pixelSize * 4)
      
      // 身体
      ctx.fillRect(x + pixelSize * 3, y + pixelSize * 4, pixelSize * 6, pixelSize * 6)
      
      // 手臂（微微摆动）
      const armSwing = Math.sin(frame * 0.05) * pixelSize
      ctx.fillRect(x + pixelSize * 2, y + pixelSize * 5 + armSwing, pixelSize * 2, pixelSize * 4)
      ctx.fillRect(x + pixelSize * 9, y + pixelSize * 5 - armSwing, pixelSize * 2, pixelSize * 4)
      
      // 腿
      ctx.fillRect(x + pixelSize * 4, y + pixelSize * 10, pixelSize * 2, pixelSize * 4)
      ctx.fillRect(x + pixelSize * 7, y + pixelSize * 10, pixelSize * 2, pixelSize * 4)
    }

    // 像素风星星
    const drawPixelStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.fillStyle = `rgba(100, 255, 218, ${opacity})`
      ctx.fillRect(x, y, size, size)
      ctx.fillRect(x - size, y, size, size)
      ctx.fillRect(x + size, y, size, size)
      ctx.fillRect(x, y - size, size, size)
      ctx.fillRect(x, y + size, size, size)
    }

    // 星星数组
    const stars: Array<{ x: number; y: number; speed: number; opacity: number }> = []
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.6,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // 漂浮的书本/纸张
    const papers: Array<{ x: number; y: number; speed: number; angle: number }> = []
    for (let i = 0; i < 5; i++) {
      papers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      // 渐变背景
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, colors.sky)
      gradient.addColorStop(1, colors.shadow)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制并更新星星
      stars.forEach((star) => {
        // 闪烁效果
        star.opacity += (Math.random() - 0.5) * 0.05
        star.opacity = Math.max(0.2, Math.min(0.8, star.opacity))
        
        drawPixelStar(star.x, star.y, 2, star.opacity)
      })

      // 绘制漂浮的纸张（像素风）
      papers.forEach((paper) => {
        paper.y -= paper.speed
        paper.angle += 0.02
        
        if (paper.y < -20) {
          paper.y = canvas.height + 20
          paper.x = Math.random() * canvas.width
        }

        ctx.save()
        ctx.translate(paper.x, paper.y)
        ctx.rotate(paper.angle)
        ctx.fillStyle = `rgba(248, 250, 255, 0.3)`
        ctx.fillRect(-8, -6, 16, 12)
        ctx.fillStyle = `rgba(100, 255, 218, 0.2)`
        ctx.fillRect(-6, -4, 12, 2)
        ctx.fillRect(-6, 0, 12, 2)
        ctx.restore()
      })

      // 地面（像素风地板）
      const groundY = canvas.height - 60
      ctx.fillStyle = colors.shadow
      for (let x = 0; x < canvas.width; x += 8) {
        ctx.fillRect(x, groundY, 8, 60)
        if ((x / 8) % 2 === 0) {
          ctx.fillStyle = colors.sky
          ctx.fillRect(x, groundY, 8, 60)
          ctx.fillStyle = colors.shadow
        }
      }

      // 绘制女孩
      drawPixelGirl(canvas.width / 2 - 24, groundY - 56, frame)

      // 发光效果（她在思考）
      const glowSize = 30 + Math.sin(frame * 0.05) * 10
      const gradient2 = ctx.createRadialGradient(
        canvas.width / 2,
        groundY - 30,
        0,
        canvas.width / 2,
        groundY - 30,
        glowSize
      )
      gradient2.addColorStop(0, 'rgba(100, 255, 218, 0.2)')
      gradient2.addColorStop(1, 'rgba(100, 255, 218, 0)')
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frame++
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="flex justify-center mb-12">
      <canvas
        ref={canvasRef}
        className="rounded-2xl border-2 border-[#64ffda]/30 shadow-2xl"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}

