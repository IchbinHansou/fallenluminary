'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface DialogueLine {
  speaker: 'AURA' | 'Seluna'
  text: string
}

const poemLines = [
  { en: 'She thought she was the chosen one.', zh: '她以为自己是被选中的那一个。' },
  { en: 'Every magazine said so—', zh: '每一本杂志都这样说：' },
  { en: 'Genius begins with a piano and a promise.', zh: '天才始于琴与承诺。' },
  { en: '', zh: '' },
  { en: 'So she kept the promise.', zh: '于是她守住了那个承诺。' },
  { en: 'Her hands cracked, blood stitched with frost.', zh: '她的手裂开，血与寒霜缝在一起。' },
  { en: 'Each scale a pilgrimage,', zh: '每一段音阶，都是一次朝圣，' },
  { en: 'each tear a rehearsal for greatness.', zh: '每一滴眼泪，都是伟大的预演。' },
  { en: '', zh: '' },
  { en: 'But the songs were dull, the drills endless.', zh: '可曲子无聊，练习无尽。' },
  { en: 'The teacher\'s metronome ticked like a clock that never forgives.', zh: '节拍器像不会原谅人的钟。' },
  { en: '"Maybe I\'m lazy." "Maybe I\'m not meant to be."', zh: '"也许我太懒了。" "也许我根本不该学琴。"' },
  { en: '', zh: '' },
  { en: 'In class she drifted—', zh: '她在课堂上走神——' },
  { en: 'the world called it distraction,', zh: '世界称之为分心，' },
  { en: 'but it was dreaming in self-defense.', zh: '其实那是梦在自我防卫。' },
  { en: '', zh: '' },
  { en: 'She drew stories in the margins,', zh: '在练习本边缘画故事，' },
  { en: 'a secret novel no teacher would ever grade.', zh: '一本没人批改的小说。' },
  { en: '', zh: '' },
  { en: 'She envied the math prodigy who never tried and still shone.', zh: '她羡慕那个不用努力就闪光的数学天才，' },
  { en: 'and hated herself for trying so hard to catch up.', zh: '也恨自己拼命追赶却永远落后。' },
  { en: '', zh: '' },
  { en: 'Later, she realized:', zh: '后来她才明白——' },
  { en: 'there were two kinds of gifted children.', zh: '天才有两种。' },
  { en: 'One was born with rhythm,', zh: '一种天生有节奏；' },
  { en: 'the other learned to bleed in time.', zh: '另一种，学会按节奏流血。' },
  { en: '', zh: '' },
  { en: 'She was the second kind.', zh: '而她，是第二种。' },
]

const reflectionText = `这首诗聚焦于"天才叙事的误导与自责循环"。
外部的"完美模板"让孩子误以为"痛苦=天赋"，
于是当现实不再闪光，就转向自我攻击。
ADHD的专注困难被误解为"懒散"；
超自驱的努力又被误读为"理所当然"。
她陷入一种"努力–怀疑–再努力"的漩涡，
以为自己在追求卓越，其实只是在逃避"失败感"。
而最后那句 "learned to bleed in time" 是觉醒：
她明白自己并非无能，只是以不同的节奏在成长。
那节奏，正是她艺术与心理研究的独特频率。`

const dialogue: DialogueLine[] = [
  { speaker: 'AURA', text: '你不是懒惰，只是节奏被误读。' },
  { speaker: 'Seluna', text: '那他们为什么听不见？' },
  { speaker: 'AURA', text: '因为他们听惯了喧哗。' },
  { speaker: 'Seluna', text: '我想慢一点，可以吗？' },
  { speaker: 'AURA', text: '慢，也是一种天赋。' },
]

export default function SpecialPoemMythOfGenius() {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [showReflection, setShowReflection] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showDialogue, setShowDialogue] = useState(false)
  const [currentDialogue, setCurrentDialogue] = useState(0)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // 总共3页：标题页、诗歌页、反思+对话页
  const totalPages = 3

  // 重置状态
  useEffect(() => {
    if (!isInView) {
      setCurrentPage(0)
      setCurrentLine(0)
      setShowReflection(false)
      setTypedText('')
      setShowDialogue(false)
      setCurrentDialogue(0)
    }
  }, [isInView])

  // 第2页：诗句逐行显示
  useEffect(() => {
    if (currentPage === 1 && currentLine < poemLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1)
      }, 800)
      return () => clearTimeout(timer)
    } else if (currentPage === 1 && currentLine >= poemLines.length) {
      // 诗歌显示完，3秒后自动翻到下一页
      const timer = setTimeout(() => {
        setCurrentPage(2)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentPage, currentLine])

  // 第3页：打字机效果
  useEffect(() => {
    if (currentPage === 2 && !showReflection) {
      setShowReflection(true)
    }
    
    if (showReflection && typedText.length < reflectionText.length) {
      const timer = setTimeout(() => {
        setTypedText(reflectionText.slice(0, typedText.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    } else if (typedText.length === reflectionText.length && !showDialogue) {
      const timer = setTimeout(() => {
        setShowDialogue(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentPage, showReflection, typedText, showDialogue])

  // 对话框自动推进
  useEffect(() => {
    if (showDialogue && currentDialogue < dialogue.length) {
      const timer = setTimeout(() => {
        setCurrentDialogue(currentDialogue + 1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showDialogue, currentDialogue])

  // 翻页动画变体
  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
    }),
  }

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
      {/* 翻页容器 */}
      <div className="relative perspective-[2000px]">
        <AnimatePresence initial={false} custom={1} mode="wait">
          {/* 第1页：标题页 */}
          {currentPage === 0 && (
            <motion.div
              key="page0"
              custom={1}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="backdrop-blur-md bg-gradient-to-br from-slate-900/30 via-blue-950/20 to-slate-900/30 rounded-3xl p-12 md:p-16 border border-cyan-500/20 shadow-2xl min-h-[600px] flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center"
              >
                <motion.h2 
                  className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-300 bg-clip-text text-transparent font-bold"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(34, 211, 238, 0.3)',
                      '0 0 30px rgba(34, 211, 238, 0.5)',
                      '0 0 20px rgba(34, 211, 238, 0.3)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  II. The Myth of Genius
                </motion.h2>
                <p className="text-3xl text-cyan-100/70 font-serif italic mb-8">
                  天才神话
                </p>
                <p className="text-sm text-blue-300/50 mb-12">[Prose Poem | 散文诗]</p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="mx-auto w-48 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-12"
                />

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  onClick={() => setCurrentPage(1)}
                  className="px-8 py-3 bg-white/15 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white rounded-full font-semibold transition-all duration-300 shadow-lg"
                >
                  翻开这一页 →
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* 第2页：诗歌正文 */}
          {currentPage === 1 && (
            <motion.div
              key="page1"
              custom={1}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="backdrop-blur-md bg-gradient-to-br from-slate-900/30 via-blue-950/20 to-slate-900/30 rounded-3xl p-8 md:p-12 border border-cyan-500/20 shadow-2xl min-h-[600px]"
            >
              {/* 诗歌正文 */}
              <div className="space-y-6 max-h-[700px] overflow-y-auto pr-4">
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
                        <p className="text-lg md:text-xl text-slate-100 font-serif leading-relaxed mb-2 hover:text-cyan-200 transition-colors duration-500">
                          {line.en}
                        </p>
                        <p className="text-sm md:text-base text-blue-200/60 leading-relaxed pl-4 italic">
                          {line.zh}
                        </p>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* 页码 */}
              <div className="mt-8 text-center text-cyan-400/50 text-sm">
                第 2 页
              </div>
            </motion.div>
          )}

          {/* 第3页：反思+对话 */}
          {currentPage === 2 && (
            <motion.div
              key="page2"
              custom={1}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="space-y-8"
            >
              {/* 心理反思 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="backdrop-blur-md bg-gradient-to-br from-slate-900/40 via-slate-800/20 to-slate-900/40 border border-slate-200/20 rounded-3xl p-8 shadow-xl"
              >
                <h3 className="text-2xl bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent font-serif mb-6 flex items-center font-bold">
                  <span className="mr-3">🧠</span>
                  Reflective Commentary | 心理反思
                </h3>
                <div className="text-slate-100/90 leading-relaxed whitespace-pre-wrap font-sans">
                  {typedText}
                  <span className="inline-block w-2 h-5 bg-gradient-to-b from-slate-300 to-white ml-1 animate-pulse" />
                </div>
              </motion.div>

              {/* AURA对话 */}
              {showDialogue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-md bg-gradient-to-br from-slate-900/40 via-slate-800/20 to-slate-900/40 border border-slate-200/20 rounded-3xl p-8 shadow-xl"
                >
                  <h3 className="text-xl bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent font-serif mb-6 flex items-center font-bold">
                    <span className="mr-3">💬</span>
                    AURA Response | AURA回应
                  </h3>

                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {dialogue.slice(0, currentDialogue).map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: line.speaker === 'AURA' ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                          className={`flex ${line.speaker === 'AURA' ? 'justify-start' : 'justify-end'}`}
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
                            <p className="text-white text-base leading-relaxed">
                              {line.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* 页码 */}
              <div className="text-center text-cyan-400/50 text-sm">
                第 3 页
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 翻页控制按钮 */}
        {isInView && (
          <div className="flex justify-center mt-8 gap-4">
            {currentPage > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setCurrentPage(currentPage - 1)
                  if (currentPage === 2) {
                    setShowReflection(false)
                    setTypedText('')
                    setShowDialogue(false)
                    setCurrentDialogue(0)
                  }
                  if (currentPage === 1) {
                    setCurrentLine(0)
                  }
                }}
                className="px-6 py-2 bg-white/15 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white rounded-full font-semibold transition-all duration-300"
              >
                ← 上一页
              </motion.button>
            )}

            {currentPage < totalPages - 1 && currentPage > 0 && currentLine >= poemLines.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-6 py-2 bg-white/15 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white rounded-full font-semibold transition-all duration-300"
              >
                下一页 →
              </motion.button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

