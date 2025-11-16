'use client'

import { motion } from 'framer-motion'
import FloatingStars from '@/components/FloatingStars'
import ChatWindow from '@/components/ChatWindow'

export default function AISupportPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#0a192f]">
      <FloatingStars />
      
      <div className="relative z-10 pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#64ffda] mb-4">
            AI心理支持研究
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            这是一个用于学术研究的AI心理健康支持系统。Luna不仅是一个温柔的倾听者，
            更是一个探索AI如何为青少年提供心理支持的研究平台。
          </p>
        </motion.div>

        {/* 研究说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 border border-[#64ffda]/20 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-serif text-[#64ffda] mb-6">研究目标</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-[#64ffda] mb-3">🎯 核心目标</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 探索AI在青少年心理支持中的作用</li>
                  <li>• 研究温柔对话风格的有效性</li>
                  <li>• 评估诗意表达对情绪的影响</li>
                  <li>• 建立AI倾听陪伴的最佳实践</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#64ffda] mb-3">🔬 研究特色</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 非专业咨询定位：陪伴而非治疗</li>
                  <li>• 诗意化表达：降低心理防御</li>
                  <li>• 简短回复：适合青少年注意力特点</li>
                  <li>• 情感共鸣：建立信任关系</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Luna聊天界面 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <ChatWindow />
        </motion.div>

        {/* 伦理声明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <p className="text-sm text-gray-500 italic">
            ⚠️ 重要提示：Luna是一个研究性AI助手，不能替代专业的心理咨询或治疗。
            <br />
            如果你正经历严重的心理困扰，请寻求专业心理健康服务。
          </p>
        </motion.div>
      </div>
    </div>
  )
}

