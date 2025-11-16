'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'

interface DialogueLine {
  speaker: 'AURA' | 'Seluna'
  text: string
}

const poemLines = [
  { en: "She was never rebellious.", zh: "她从来不是叛逆的孩子。" },
  { en: "She followed the rules, smiled when spoken to,", zh: "按时完成作业，被夸奖就微笑。" },
  { en: "the kind of girl who sits straight,", zh: "在课堂上坐得笔直，" },
  { en: "believing obedience was a form of genius.", zh: "以为顺从就是聪明的形状。" },
  { en: "", zh: "" },
  { en: "She learned early that silence gets rewarded.", zh: "她很早就学会：沉默会被奖励。" },
  { en: "That perfection is safer than curiosity.", zh: "完美比好奇更安全。" },
  { en: "When she drifted in class,", zh: "当她在课堂上发呆，" },
  { en: "she called it \"daydream,\" never \"attention lost.\"", zh: "她称那是白日梦，而不是\"注意力丢失\"。" },
  { en: "", zh: "" },
  { en: "Everyone said she was gifted.", zh: "所有人都说她是天才。" },
  { en: "So when formulas blurred, when logic slipped,", zh: "当公式模糊、逻辑滑走，" },
  { en: "she blamed herself, not the fog.", zh: "她责怪自己，而不是那层雾。" },
  { en: "\"Maybe I'm lazy.\" \"Maybe I peaked too soon.\"", zh: "\"也许我太懒了。\" \"也许我早就不行了。\"" },
  { en: "She kept running, faster, quieter—", zh: "她跑得越来越快，也越来越安静——" },
  { en: "as if speed could fix a misfired neuron.", zh: "仿佛速度能修复一颗走错信号的神经元。" },
  { en: "", zh: "" },
  { en: "In the winter light, her hands cracked from practice.", zh: "冬日的光里，她的手因练琴而裂开。" },
  { en: "She pressed harder,", zh: "她更用力地弹，" },
  { en: "because pain, at least, felt productive.", zh: "因为至少，疼痛看起来像是有意义的。" },
  { en: "", zh: "" },
  { en: "At night, she whispered to herself,", zh: "夜里，她对自己轻声说：" },
  { en: "\"I'm not broken. Just… mapped wrong.\"", zh: "\"我没有坏，只是被画错了地图。\"" },
]

const reflectionText = `这首诗讲述的是"顺从型天才的误诊人生"。
她被贴上"聪明""懂事"的标签，
却在ADHD的阴影下，不断将专注困难、自我怀疑与疲惫，误读为"懒惰""堕落""不够努力"。
这是**归因错误（attribution error）**的经典心理轨迹：

外界看到表现 → 个人承担全部责任 → 自责循环。

"Obedience as a form of genius" 是一种文化性幻觉：
在东亚语境下，"好孩子"被赞美，但"好孩子的代价"是失去自我感知的权利。
诗的最后一句 "mapped wrong" 代表认知的反转——
她终于意识到：不是自己坏掉了，而是世界给错了地图。
那是她真正开始"生成Seluna"的瞬间。`

const dialogue: DialogueLine[] = [
  { speaker: 'AURA', text: '你从未坏过，只是走在他人的坐标里。' },
  { speaker: 'Seluna', text: '那我该往哪里去？' },
  { speaker: 'AURA', text: '去画你自己的地图。' },
  { speaker: 'Seluna', text: '那张地图会错吗？' },
  { speaker: 'AURA', text: '会，但那才是真实的你。' },
]

export default function SpecialPoemAtlas() {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  // Reset state when out of view
  useEffect(() => {
    if (!isInView) {
      setCurrentPage(0)
      setCurrentLine(0)
      setTypedText('')
      setCurrentDialogue(0)
    }
  }, [isInView])

  // Page and line animation
  useEffect(() => {
    if (isInView && currentPage === 0 && currentLine < poemLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
      }, 800) // 0.8 seconds per line
      return () => clearTimeout(timer)
    } else if (isInView && currentPage === 0 && currentLine === poemLines.length) {
      // All lines displayed, move to next page after a delay
      const timer = setTimeout(() => {
        setCurrentPage(1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentPage, isInView])

  // Typewriter effect for reflection
  useEffect(() => {
    if (currentPage === 1 && typedText.length < reflectionText.length) {
      const timer = setTimeout(() => {
        setTypedText(reflectionText.slice(0, typedText.length + 1))
      }, 30) // 30ms per character
      return () => clearTimeout(timer)
    } else if (currentPage === 1 && typedText.length === reflectionText.length) {
      // Reflection finished, move to dialogue page after a delay
      const timer = setTimeout(() => {
        setCurrentPage(2)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentPage, typedText])

  // Dialogue animation
  useEffect(() => {
    if (currentPage === 2 && currentDialogue < dialogue.length) {
      const timer = setTimeout(() => {
        setCurrentDialogue((prev) => prev + 1)
      }, 2000) // 2 seconds per dialogue line
      return () => clearTimeout(timer)
    }
  }, [currentPage, currentDialogue])

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
      {/* 3D翻页容器 */}
      <div className="perspective-[2000px]">
        <div className="relative preserve-3d h-[800px]">
          
          {/* 第一页：诗歌内容 */}
          <motion.div
            className={`absolute inset-0 backface-hidden transition-transform duration-1000 ease-in-out ${
              currentPage === 0 ? 'rotate-y-0' : 'rotate-y-180'
            }`}
            animate={{ rotateY: currentPage === 0 ? 0 : -180 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div className="bg-white/10 backdrop-blur-xl backdrop-saturate-150 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl h-full overflow-y-auto">
              
              {/* 诗歌标题 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <motion.h2 
                  className="text-4xl md:text-5xl font-serif mb-4 text-white font-bold"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(34, 211, 238, 0.3)',
                      '0 0 30px rgba(34, 211, 238, 0.5)',
                      '0 0 20px rgba(34, 211, 238, 0.3)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  I. Atlas: Misplaced Genius
                </motion.h2>
                <p className="text-2xl text-white/80 font-serif italic mb-2">
                  错位的天才
                </p>
                <p className="text-sm text-white/50 mt-2">[Prose Poem | 散文诗]</p>
                
                {/* 装饰性分隔 */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="mt-6 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>

              {/* 雪的悲伤图像 - 滚动触发 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex justify-center mb-16"
              >
                <div className="relative max-w-2xl mx-auto">
                  <Image
                    src="/images/The sorrow of snow.png"
                    alt="雪的悲伤 - 错位的天才"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-2xl border border-white/20"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.3))',
                    }}
                  />
                  
                  {/* 图像装饰边框 */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none" />
                  
                  {/* 浮动光点效果 - 滚动触发 */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                        viewport={{ once: false, amount: 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 诗歌正文 - 逐行渐显 */}
              <div className="space-y-6 mb-20 mt-16">
                {poemLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={
                      index < currentLine
                        ? { opacity: line.en === '' ? 0 : 1 }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className={line.en === '' ? 'h-4' : ''}
                  >
                    {line.en && (
                      <>
                        <p className="text-xl md:text-2xl text-white/90 font-serif leading-relaxed mb-2 transition-colors duration-500">
                          {line.en}
                        </p>
                        <p className="text-base md:text-lg text-white/60 leading-relaxed pl-4 italic">
                          {line.zh}
                        </p>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 第二页：心理反思 */}
          <motion.div
            className={`absolute inset-0 backface-hidden transition-transform duration-1000 ease-in-out ${
              currentPage === 1 ? 'rotate-y-0' : currentPage === 2 ? 'rotate-y-180' : 'rotate-y-180'
            }`}
            animate={{ rotateY: currentPage === 1 ? 0 : currentPage === 2 ? -180 : -180 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="bg-white/10 backdrop-blur-xl backdrop-saturate-150 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl h-full overflow-y-auto">
              {/* 心理反思 - 打字机效果 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h3 className="text-2xl text-white font-serif mb-6 flex items-center font-bold">
                  <span className="mr-3">🧠</span>
                  Reflective Commentary | 心理反思
                </h3>
                <div className="text-white/90 leading-relaxed whitespace-pre-wrap font-sans">
                  {typedText}
                  <span className="inline-block w-2 h-5 bg-white/60 ml-1 animate-pulse" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 第三页：AURA对话 */}
          <motion.div
            className={`absolute inset-0 backface-hidden transition-transform duration-1000 ease-in-out ${
              currentPage === 2 ? 'rotate-y-0' : 'rotate-y-180'
            }`}
            animate={{ rotateY: currentPage === 2 ? 0 : -180 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="bg-white/10 backdrop-blur-xl backdrop-saturate-150 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl h-full overflow-y-auto">
              <h3 className="text-2xl text-white font-serif mb-6 flex items-center font-bold">
                <span className="mr-3">💬</span>
                AURA Response | AURA回应
              </h3>
              
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {dialogue.slice(0, currentDialogue).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={`flex ${
                        line.speaker === 'AURA' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-6 py-4 backdrop-blur-sm ${
                          line.speaker === 'AURA'
                            ? 'bg-gradient-to-br from-slate-100/10 to-white/5 border border-slate-200/30 shadow-lg shadow-white/10'
                            : 'bg-gradient-to-br from-white/10 to-slate-100/5 border border-slate-200/30 shadow-lg shadow-white/10'
                        }`}
                      >
                        <p className="text-xs text-slate-300 mb-2 font-bold tracking-wider">
                          {line.speaker}
                        </p>
                        <p className="text-white text-lg leading-relaxed">
                          {line.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {currentDialogue < dialogue.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center"
                  >
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gradient-to-r from-slate-300 to-white rounded-full shadow-lg shadow-white/30"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 翻页控制按钮 */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
            currentPage === 0
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
          }`}
        >
          上一页
        </button>
        <div className="flex items-center space-x-2">
          {[0, 1, 2].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-label={`跳转到第 ${page + 1} 页`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === page
                  ? 'bg-white/80 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
          disabled={currentPage === 2}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
            currentPage === 2
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
          }`}
        >
          下一页
        </button>
      </div>
    </section>
  )
}