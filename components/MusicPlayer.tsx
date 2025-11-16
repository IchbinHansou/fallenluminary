'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // 创建音频元素 - 支持多个文件名
    const musicFiles = [
      '/music/Atlas Misplaced Genius (The Tod）.mp3',
      '/music/bg.mp3'
    ]
    
    // 尝试加载第一个存在的文件
    audioRef.current = new Audio(musicFiles[0])
    audioRef.current.loop = true
    audioRef.current.volume = volume
    
    // 如果第一个文件加载失败，尝试第二个
    audioRef.current.addEventListener('error', () => {
      if (audioRef.current) {
        audioRef.current.src = musicFiles[1]
      }
    })

    // 自动播放（需要用户交互后才能真正播放）
    const tryAutoPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // 浏览器阻止了自动播放，等待用户点击
          console.log('等待用户交互以播放音乐')
        })
      }
    }

    // 页面交互后尝试自动播放
    const handleInteraction = () => {
      tryAutoPlay()
      document.removeEventListener('click', handleInteraction)
    }
    
    document.addEventListener('click', handleInteraction)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      document.removeEventListener('click', handleInteraction)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-[#0a192f]/80 backdrop-blur-lg border border-[#64ffda]/30 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-6">
          {/* 播放/暂停按钮 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#64ffda] flex items-center justify-center text-[#0a192f] font-bold shadow-lg hover:shadow-[#64ffda]/50 transition-shadow"
            style={{
              boxShadow: isPlaying ? '0 0 20px rgba(100, 255, 218, 0.6)' : 'none',
            }}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4l10 6-10 6V4z" />
              </svg>
            )}
          </motion.button>

          {/* 音量控制 */}
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-[#64ffda]"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10 3.5L5 7H2v6h3l5 3.5V3.5zM14 10c0-1.5-.8-2.8-2-3.5v7c1.2-.7 2-2 2-3.5z" />
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              aria-label="音量控制"
              title="调节音量"
              className="w-24 h-1 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #64ffda 0%, #64ffda ${volume * 100}%, rgba(100, 255, 218, 0.3) ${volume * 100}%, rgba(100, 255, 218, 0.3) 100%)`,
              }}
            />
          </div>

          {/* 状态指示 */}
          {isPlaying && (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#64ffda] rounded-full"
                  animate={{
                    height: [8, 16, 8],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

