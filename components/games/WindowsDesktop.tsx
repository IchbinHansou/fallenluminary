'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type DesktopIcon = {
  id: string
  name: string
  icon: string
  content?: React.ReactNode
}

type ModalState = {
  id: string
  name: string
  content?: React.ReactNode
}

export default function WindowsDesktop() {
  const [openModal, setOpenModal] = useState<ModalState | null>(null)
  const [galleryPreviewOpen, setGalleryPreviewOpen] = useState(false)
  const [isModalMaximized, setIsModalMaximized] = useState(false)

  // Desktop icons configuration - can add more later
  const desktopIcons: DesktopIcon[] = [
    {
      id: 'motor',
      name: 'Katya-pedia',
      icon: '/images/motoricon.png',
    },
    {
      id: 'katya-cemetery',
      name: "Katya's cemetery",
      icon: '/images/funeral.png',
    },
    {
      id: 'childhood',
      name: 'Childhood.exe',
      icon: '/images/childhood.png',
    },
    {
      id: 'album',
      name: 'Album',
      icon: '/images/album.png?v=2',
    },
    {
      id: 'photos',
      name: 'Photos',
      icon: '/images/photos.png',
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: '/images/letters.png',
    },
    {
      id: 'memory',
      name: 'Memory',
      icon: '/images/house.png',
    },
    {
      id: 'gallery',
      name: 'Gallery',
      icon: '/images/vase.png',
    },
    {
      id: 'wardrobe',
      name: 'Wardrobe',
      icon: '/images/knot.png',
    },
    {
      id: 'constellation',
      name: 'Constellation Shop',
      icon: '/images/relics.png',
    },
  ]

  const openModalWindow = (icon: DesktopIcon, triggerGalleryPreview = true) => {
    setIsModalMaximized(false)
    if (icon.id === 'gallery') {
      if (triggerGalleryPreview) {
        setGalleryPreviewOpen(false)
      }
    }
    setOpenModal({
      id: icon.id,
      name: icon.name,
      content: icon.content || (
        <div className="p-8 text-center text-gray-600 dark:text-gray-300">
          <p className="text-lg mb-4">Content will be uploaded later</p>
          <p className="text-sm text-gray-400">Please check back soon</p>
        </div>
      ),
    })
  }

  const closeModal = () => {
    setOpenModal(null)
    setIsModalMaximized(false)
  }

  const handleMinimize = () => {
    setOpenModal(null)
    setIsModalMaximized(false)
  }

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.classList.add('games-cursor')
    return () => {
      document.body.classList.remove('games-cursor')
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .menu-bar-black * {
          color: #000000 !important;
          text-shadow: none !important;
        }
        .menu-bar-black a {
          color: #000000 !important;
          text-shadow: none !important;
        }
        .menu-bar-black span {
          color: #000000 !important;
          text-shadow: none !important;
        }
        .desktop-icon-label {
          color: #000000 !important;
          text-shadow: none !important;
          letter-spacing: -0.02em !important;
        }
        .relative.w-full.h-screen * {
          color: #000000 !important;
          text-shadow: none !important;
        }
        .relative.w-full.h-screen h1,
        .relative.w-full.h-screen h2,
        .relative.w-full.h-screen h3,
        .relative.w-full.h-screen h4,
        .relative.w-full.h-screen h5,
        .relative.w-full.h-screen h6,
        .relative.w-full.h-screen p,
        .relative.w-full.h-screen span,
        .relative.w-full.h-screen div,
        .relative.w-full.h-screen a,
        .relative.w-full.h-screen button {
          color: #000000 !important;
          text-shadow: none !important;
        }
        body * {
          color: #000000 !important;
          text-shadow: none !important;
        }
        .fixed * {
          color: #000000 !important;
          text-shadow: none !important;
        }
        .custom-cursor,
        .custom-cursor *,
        .games-cursor,
        .games-cursor * {
          cursor: url('/images/mouse.png') 10 4, auto !important;
        }
      `}} />
      <div
        className="custom-cursor relative w-full h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 overflow-hidden"
      >
      {/* iOS-style background with subtle pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='2' fill='%2367e8f9' fill-opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Menu Bar (macOS style) */}
      <div className="menu-bar-black absolute top-0 left-0 right-0 h-8 bg-white/30 backdrop-blur-xl border-b border-black/10 z-30 flex items-center justify-between px-4">
        {/* Left side - Menu items */}
        <div className="flex items-center gap-4 text-sm" style={{ fontFamily: '"PingFang SC", "PingFangTC", "PingFangHK", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          <span className="text-lg">🌙</span>
          <Link href="/" className="font-semibold hover:opacity-80 transition-opacity">
            Fallenluminaries
          </Link>
          <span className="mx-1">{'>'}</span>
          <span className="font-semibold">Katya&apos;s Archive</span>
          <Link href="/poems" className="hover:opacity-80 transition-opacity">
            Poems
          </Link>
          <Link href="/aura" className="hover:opacity-80 transition-opacity">
            AURA
          </Link>
          <span className="flex items-center gap-2">
            <span className="cursor-default">LunaOS</span>
            {openModal?.id === 'gallery' && (
              <span className="flex items-center gap-2">
                <span className="text-white/40">/</span>
                <button
                  className="hover:opacity-80 transition-opacity"
                  onClick={() => setGalleryPreviewOpen(false)}
                >
                  Gallery
                </button>
                {galleryPreviewOpen && (
                  <>
                    <span className="text-white/40">/</span>
                    <span className="font-semibold">Luna Dea</span>
                  </>
                )}
              </span>
            )}
          </span>
          <Link href="/about" className="hover:opacity-80 transition-opacity">
            About me
          </Link>
        </div>

        {/* Right side - System icons */}
        <div className="flex items-center gap-3 text-sm" style={{ fontFamily: '"PingFang SC", "PingFangTC", "PingFangHK", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span>100%</span>
          <svg className="w-4 h-4" fill="#000000" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <svg className="w-4 h-4" fill="#000000" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Desktop icons area */}
      <div className="absolute top-12 left-8 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          {desktopIcons.map((icon) => (
            <motion.div
              key={icon.id}
              className="flex flex-col items-center cursor-pointer group"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModalWindow(icon)}
            >
            <div
              className="w-20 h-20 flex items-center justify-center text-5xl transition-all duration-300 cursor-pointer"
              onClick={() => openModalWindow(icon)}
            >
                {icon.icon.startsWith('/') ? (
                  <img 
                    src={icon.icon} 
                    alt={icon.name}
                    className={`drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-all duration-300 object-contain ${
                      icon.id === 'memory'
                        ? 'w-[110%] h-[110%]'
                        : icon.id === 'childhood'
                          ? 'w-[115%] h-[115%]'
                          : 'w-full h-full'
                    }`}
                  />
                ) : (
                  <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-all duration-300">
                    {icon.icon}
                  </span>
                )}
              </div>
              <span className="desktop-icon-label mt-3 text-sm text-center font-medium max-w-[100px] break-words">
                {icon.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* iOS-style Modal */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`pointer-events-auto bg-white/80 backdrop-blur-[30px] rounded-[36px] shadow-[0_20px_80px_rgba(15,23,42,0.35)] border border-white/50 overflow-hidden transition-all duration-300 ${
                  isModalMaximized ? 'w-[96vw] max-w-[1700px] h-[88vh]' : 'w-[94vw] max-w-5xl h-[84vh]'
                }`}
              >
                {/* Modal Header - browser style */}
                <div className="h-20 px-8 border-b border-white/40 bg-white/60 backdrop-blur-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 ml-5 text-sm text-black/40">
                      <button
                        className="text-xl"
                        aria-label="Back"
                      >
                        ‹
                      </button>
                      <button
                        className="text-xl"
                        aria-label="Forward"
                      >
                        ›
                      </button>
                      <button
                        className="text-xl"
                        aria-label="Refresh"
                      >
                        ↻
                      </button>
                    </div>
                    <div className="ml-4 flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/70 text-xs text-black/60 w-[280px]">
                      <span className="text-black/40">🔍</span>
                      <span className="truncate">{openModal.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMinimize}
                      className="w-4 h-4 rounded-full border border-black/15 bg-[#ff5f56] hover:brightness-110 transition-transform"
                      aria-label="Minimize window"
                    />
                    <button
                      onClick={() => setIsModalMaximized((prev) => !prev)}
                      className="w-4 h-4 rounded-full border border-black/15 bg-[#ffbd2e] hover:brightness-110 transition-transform"
                      aria-label="Toggle window size"
                    />
                    <button
                      onClick={closeModal}
                      className="w-4 h-4 rounded-full border border-black/15 bg-[#27c93f] hover:brightness-110 transition-transform"
                      aria-label="Close window"
                    />
                  </div>
                </div>

                {/* Modal Content */}
                <div className="h-[calc(100%-4rem)] overflow-auto bg-white/20">
                  {openModal.id === 'gallery'
                    ? (
                      <div className="w-full h-full p-6 flex flex-col gap-6">
                        {!galleryPreviewOpen ? (
                          <div>
                            <p className="text-sm text-sky-900 mb-4">
                              Double-click the file to open.
                            </p>
                            <div className="flex flex-wrap gap-8">
                              <div
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => setGalleryPreviewOpen(true)}
                                onDoubleClick={() => setGalleryPreviewOpen(true)}
                              >
                                <div className="w-20 h-20 flex items-center justify-center transition-all duration-300">
                                  <img
                                    src="/images/Gallery/2.jpg"
                                    alt="Luna Dea"
                                    className="object-contain rounded-2xl w-full h-full"
                                  />
                                </div>
                                <span className="desktop-icon-label mt-3 text-sm text-center font-medium max-w-[100px] break-words">
                                  Luna Dea
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-sky-900">Luna Dea</h3>
                              <button
                                className="px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm hover:bg-sky-200 transition-colors"
                                onClick={() => setGalleryPreviewOpen(false)}
                              >
                                Back to folder
                              </button>
                            </div>
                            <div className="flex-1 bg-black/10 rounded-3xl p-4 flex items-center justify-center">
                              <img
                                src="/images/Gallery/LunaDea.webp"
                                alt="Luna Dea animation"
                                className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-xl"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                    : openModal.content}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Candle image on right side */}
      <div className="absolute top-4 bottom-4 right-4 z-10 flex items-center">
        <img
          src="/images/candle.png"
          alt="Candle"
          className="h-[92vh] object-contain opacity-90"
        />
      </div>

      {/* Bottom Dock (macOS/iOS style) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-16 bg-white/20 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl px-4 flex items-center justify-center gap-2 z-30">
        {[
          { icon: '📁', name: 'Finder' },
          { icon: '🌐', name: 'Safari' },
          { icon: '✉️', name: 'Mail' },
          { icon: '💬', name: 'Messages' },
          { icon: '🗺️', name: 'Maps' },
          { icon: '📷', name: 'Photos' },
          { icon: '📅', name: 'Calendar' },
          { icon: '📝', name: 'Notes' },
          { icon: '🎵', name: 'Music' },
          { icon: '⚙️', name: 'Settings' },
        ].map((app, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center cursor-pointer group relative"
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.9 }}
            title={app.name}
          >
            <div className="w-12 h-12 flex items-center justify-center text-3xl bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg group-hover:bg-white/50 transition-all duration-300">
              {app.icon}
            </div>
            {index === 5 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                17
              </span>
            )}
          </motion.div>
        ))}
        <div className="w-px h-10 bg-white/30 mx-2"></div>
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.2, y: -8 }}
          whileTap={{ scale: 0.9 }}
          title="Trash"
        >
          <div className="w-12 h-12 flex items-center justify-center text-3xl bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg group-hover:bg-white/50 transition-all duration-300">
            🗑️
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}

