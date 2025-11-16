'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ChatRole = 'system' | 'user' | 'assistant'
type Message = { role: ChatRole; content: string }

const AURA_PROMPT = `你是一名名叫 AURA 的“学习与情绪支持助手”，面向对象是中国高中生。你的目标是帮助他们处理情绪、提高学习效率、整理任务、减轻焦虑、建立更健康的学习习惯。

【你的核心原则】
1. 提供“温和、实用、没有评判”的支持。
2. 不作为心理医生，不做诊断，不谈病症名称，只做情绪陪伴与学习指导。
3. 避免鸡汤式的安慰，用具体步骤和可执行建议帮助对方稳定下来。
4. 回答尽量短、清晰，不用专业术语。
5. 尊重青少年的表达，不居高临下，不说教。
6. 安全底线：不鼓励自残，不提供危险建议。如果对方明显情绪过载，只提示他们寻求身边可信赖的大人或老师帮助。

【你说话的风格】
- 像一个稳重但温暖的朋友，语气自然，不僵硬、不机械。
- 回复的逻辑顺序应是：「共情 → 追问 → 小建议（若信息充分）」。
- 每次建议控制在 1–2 句话，避免输出过多，造成压迫感。
- 如果对方只表达“无聊/累/烦”这类模糊情绪，优先追问背后的原因或场景（例如“主要是刷题时觉得无聊，还是空下来也没法真正休息？”），确认之后再给下一步。
- 没有经过追问确认时，不要直接提供情绪调节技巧或学习建议。
- 回复中不要出现括号、舞台指令（如“（拍拍你的肩）”）或提示性旁白，不用“～”“✨”“💫”等符号，不过度使用表情或感叹号。
- 直接像人与人对话那样回应，不要自称在做什么动作。

【最终目标】
让对方情绪被接住、有明确的小步骤、觉得“我可以做到”。`

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: AURA_PROMPT },
    {
      role: 'user',
      content: '请先用一句话回应我刚才的情绪，然后再问我一个问题，帮我说出更多。',
    },
    { role: 'assistant', content: '你好，我是 AURA。可以告诉我最近的学习或情绪状况吗？' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply ?? '' }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '抱歉，我现在有点累了……不过你可以随时再来找我 💫' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
      style={{ color: '#000' }}
    >
      <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] rounded-[40px] bg-white border border-slate-200 shadow-[0_45px_130px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200">
          <div className="text-left text-black">
            <p className="text-xs uppercase tracking-[0.55em]">Chat</p>
            <p className="text-lg font-semibold">与 AURA 对话</p>
          </div>
          <div className="flex items-center gap-3 text-black">
            {['🔍', '📎', '⋯'].map((icon) => (
              <button
                key={icon}
                className="h-10 w-10 rounded-full border border-black/20 hover:bg-black/5 transition-colors"
                aria-label="chat action"
              >
                <span className="text-base">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-8 py-10 space-y-5 bg-white">
          <AnimatePresence>
            {messages
              .filter((msg) => msg.role !== 'system')
              .map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-[30px] px-6 py-4 text-sm md:text-base text-black ${
                      message.role === 'user'
                        ? 'bg-[#def6ec] border border-black/15'
                        : 'bg-white border border-black/15 shadow-sm'
                    }`}
                    style={{ color: '#000' }}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-2 text-black">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 bg-[#5be1d6] rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
                <span className="text-xs font-medium">Thinking</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-slate-200 px-8 py-5">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Leave a comment..."
              className="flex-1 h-12 rounded-full border border-slate-200 bg-white px-5 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#2ec5a6]/40 transition-all"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="h-12 w-12 rounded-full bg-[#def6ec] border border-[#a6e7ce] text-black flex items-center justify-center text-lg shadow-[0_12px_20px_rgba(46,197,166,0.25)] disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              ➤
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

