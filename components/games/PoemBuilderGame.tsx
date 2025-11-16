'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const poemPieces = [
  { id: 1, text: '星光穿过黑暗', position: 0 },
  { id: 2, text: '温柔地触碰大地', position: 1 },
  { id: 3, text: '每一颗坠落的心', position: 2 },
  { id: 4, text: '都在寻找归宿', position: 3 },
  { id: 5, text: '夜空低声诉说', position: 4 },
  { id: 6, text: '关于遗失的梦境', position: 5 },
]

export default function PoemBuilderGame() {
  const [availablePieces, setAvailablePieces] = useState(
    [...poemPieces].sort(() => Math.random() - 0.5)
  )
  const [selectedPieces, setSelectedPieces] = useState<typeof poemPieces>([])
  const [isComplete, setIsComplete] = useState(false)

  const selectPiece = (piece: typeof poemPieces[0]) => {
    setAvailablePieces(prev => prev.filter(p => p.id !== piece.id))
    setSelectedPieces(prev => [...prev, piece])

    if (selectedPieces.length + 1 === poemPieces.length) {
      setTimeout(() => setIsComplete(true), 500)
    }
  }

  const removePiece = (piece: typeof poemPieces[0]) => {
    setSelectedPieces(prev => prev.filter(p => p.id !== piece.id))
    setAvailablePieces(prev => [...prev, piece])
  }

  const reset = () => {
    setAvailablePieces([...poemPieces].sort(() => Math.random() - 0.5))
    setSelectedPieces([])
    setIsComplete(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-serif text-[#64ffda] mb-4">诗歌拼图</h2>
        <p className="text-gray-300 mb-4">
          点击诗句碎片，按你喜欢的顺序组合成一首诗
        </p>
      </motion.div>

      {/* 已选择的诗句 */}
      <div className="mb-12 min-h-[300px] bg-[#0a192f]/50 border-2 border-[#64ffda]/30 rounded-2xl p-8">
        <h3 className="text-xl text-[#64ffda] mb-6 text-center font-serif">
          你的诗歌：
        </h3>
        <AnimatePresence>
          {selectedPieces.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center italic"
            >
              点击下方的诗句开始创作...
            </motion.p>
          ) : (
            <div className="space-y-4">
              {selectedPieces.map((piece, index) => (
                <motion.div
                  key={piece.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => removePiece(piece)}
                  className="text-xl text-[#f8faff] text-center font-serif cursor-pointer hover:text-[#64ffda] transition-colors leading-relaxed"
                >
                  {piece.text}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 可用的诗句碎片 */}
      {!isComplete && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <AnimatePresence>
            {availablePieces.map((piece, index) => (
              <motion.div
                key={piece.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectPiece(piece)}
                className="bg-gradient-to-br from-[#64ffda]/20 to-[#64ffda]/10 border border-[#64ffda]/40 rounded-xl p-6 cursor-pointer hover:border-[#64ffda] transition-all"
              >
                <p className="text-gray-300 text-center font-serif">
                  {piece.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 完成提示 */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-2xl text-[#64ffda] mb-6 font-serif">
            ✨ 你创作了一首美丽的诗 ✨
          </p>
          <button
            onClick={reset}
            className="px-8 py-3 bg-[#64ffda] hover:bg-[#5ce0c0] text-[#0a192f] font-semibold rounded-full transition-colors"
          >
            重新创作
          </button>
        </motion.div>
      )}
    </div>
  )
}

