'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface MusicTrack {
  id: number
  name: string
  fileName: string
  displayName: string
}

const musicTracks: MusicTrack[] = [
  {
    id: 1,
    name: 'Atlas Misplaced Genius',
    fileName: 'Atlas Misplaced Genius (The Tod）.mp3',
    displayName: 'Atlas: Misplaced Genius'
  },
  {
    id: 2,
    name: 'Background Music',
    fileName: 'bg.mp3',
    displayName: 'Background Music'
  }
]

export default function MusicListPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(musicTracks[0])
  const [volume, setVolume] = useState(0.3)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 24, y: 24 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 创建音频元素
    audioRef.current = new Audio(`/music/${currentTrack.fileName}`)
    audioRef.current.loop = true
    audioRef.current.volume = volume
    
    // 添加时间更新事件监听器
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
      }
    }

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
    
    // 自动播放（需要用户交互后才能真正播放）
    const tryAutoPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
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
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioRef.current.pause()
        audioRef.current = null
      }
      document.removeEventListener('click', handleInteraction)
    }
  }, [currentTrack.fileName])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const switchTrack = (track: MusicTrack) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setCurrentTrack(track)
    setShowPlaylist(false)
    setCurrentTime(0)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Katya Player 风格播放器 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="relative">
          {/* Katya Player 背景图片 - 播放时旋转 */}
          <motion.div
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 10,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
            className="relative"
          >
            <Image
              src="/images/katyaplayer.png"
              alt="Katya Player"
              width={300}
              height={300}
              className="rounded-full shadow-2xl"
              unoptimized
            />
          </motion.div>

          {/* 透明播放按钮 - 居中 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayPause}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 border border-white/30 shadow-lg"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4l10 6-10 6V4z" />
              </svg>
            )}
          </motion.button>

          {/* 歌曲信息 - 底部 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white font-semibold text-xs mb-1 truncate max-w-[200px]">
              {currentTrack.displayName}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-white/60">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-white/30">/</span>
              <span className="text-xs text-white/60">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* 进度条 - 底部 */}
        <div className="mt-4 w-full max-w-[300px]">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            aria-label="音乐进度控制"
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.15) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.15) 100%)`,
            }}
          />
        </div>

        {/* 音量和其他控制 - 底部 */}
        <div className="flex items-center justify-center space-x-4 mt-3">
          {/* 音量控制 */}
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5L5 7H2v6h3l5 3.5V3.5zM14 10c0-1.5-.8-2.8-2-3.5v7c1.2-.7 2-2 2-3.5z" />
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              aria-label="音量控制"
              className="w-16 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) ${volume * 100}%, rgba(255, 255, 255, 0.15) ${volume * 100}%, rgba(255, 255, 255, 0.15) 100%)`,
              }}
            />
          </div>

          {/* 播放列表按钮 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/15 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* iOS 风格播放列表弹出框 */}
      <AnimatePresence>
        {showPlaylist && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPlaylist(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            {/* 播放列表卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
            >
              <div className="bg-white/10 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <h3 className="text-white font-semibold text-base">
                    播放列表
                  </h3>
                  <button
                    onClick={() => setShowPlaylist(false)}
                    aria-label="关闭播放列表"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="py-2">
                  {musicTracks.map((track) => (
                    <motion.button
                      key={track.id}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => switchTrack(track)}
                      className={`w-full text-left px-6 py-3 transition-all duration-200 ${
                        currentTrack.id === track.id ? 'bg-white/5' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${
                            currentTrack.id === track.id ? 'text-white font-semibold' : 'text-white/80'
                          }`}>
                            {track.displayName}
                          </p>
                        </div>
                        {currentTrack.id === track.id && (
                          <div className="ml-3 flex-shrink-0">
                            {isPlaying ? (
                              <div className="w-2 h-2 rounded-full bg-white/80" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-white/40" />
                            )}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
