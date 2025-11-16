'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWindow from './ChatWindow'

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 悬浮按钮 */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-[#64ffda] to-[#5ce0c0] rounded-full shadow-2xl flex items-center justify-center text-3xl hover:shadow-[#64ffda]/50 transition-shadow"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景模糊 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* 聊天面板 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-28 right-8 z-50 w-[400px] max-h-[600px]"
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                <ChatWindow />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

