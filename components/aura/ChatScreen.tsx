// components/aura/ChatScreen.tsx
import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/components/aura/ui/button'
import { Input } from '@/components/aura/ui/input'
import { Card } from '@/components/aura/ui/card'
import { ScrollArea } from '@/components/aura/ui/scroll-area'
import { ChatMessage } from '@/components/aura/ChatMessage'
import { EmotionCards } from '@/components/aura/EmotionCards'
import { UserSurveyData } from '@/components/aura/UserSurveyScreen'

interface Message {
	id: string
	text: string
	sender: 'user' | 'ai'
	timestamp: Date
}

interface ChatScreenProps {
	initialMood: string | null
	userData: UserSurveyData | null
	onBack: () => void
}

export function ChatScreen({ initialMood, userData, onBack }: ChatScreenProps) {
	const auraIcon = '/images/kaura/AURA1.jpg'

	const getInitialMessage = () => {
		const name = userData?.nickname || '朋友'
		const feeling = userData?.currentFeeling || initialMood

		if (feeling) {
			return `Hi ${name}～很高兴认识你！我注意到你提到了"${feeling}"。想和我聊聊发生了什么吗？或者，我们可以先从今天过得怎么样开始～`
		}
		return `Hi ${name}～很高兴认识你！今天过得还好吗？或许可以先说说发生了什么～`
	}

	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: getInitialMessage(),
			sender: 'ai',
			timestamp: new Date(),
		},
	])
	const [inputValue, setInputValue] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [showEmotionCards, setShowEmotionCards] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight
		}
	}, [messages, isTyping])

	const handleSendMessage = async (text: string) => {
		if (!text.trim()) return

		const userMessage: Message = {
			id: Date.now().toString(),
			text: text.trim(),
			sender: 'user',
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInputValue('')
		setIsTyping(true)
		setShowEmotionCards(false)

		try {
			// 使用现有的 /api/chat 作为后端
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: [
						...messages.map((m) => ({
							role: m.sender === 'user' ? 'user' : 'assistant',
							content: m.text,
						})),
						{ role: 'user', content: userMessage.text },
					],
				}),
			})

			const data = await res.json()
			const replyText =
				data?.reply?.toString?.() ??
				'抱歉，我现在遇到了一些技术问题。我们稍后再试可以吗？'

			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: replyText,
				sender: 'ai',
				timestamp: new Date(),
			}

			setMessages((prev) => [...prev, aiMessage])
			setIsTyping(false)

			// 可选：根据返回加卡片
			if (false) {
				setShowEmotionCards(true)
			}
		} catch (error) {
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: '抱歉，我现在遇到了一些技术问题。请稍后再试，或者检查网络连接。',
				sender: 'ai',
				timestamp: new Date(),
			}
			setMessages((prev) => [...prev, errorMessage])
			setIsTyping(false)
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		handleSendMessage(inputValue)
	}

	const handleEmotionSelect = (emotion: string) => {
		handleSendMessage(emotion)
	}

	return (
		<div className="min-h-screen flex flex-col">
			<div className="aura-header">
				<div className="container mx-auto px-4 py-4 max-w-4xl">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="sm"
							onClick={onBack}
							className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
						>
							<ArrowLeft className="w-5 h-5" />
						</Button>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-white border border-emerald-200 flex items-center justify-center">
								<img src={auraIcon} alt="AURA" className="w-8 h-8 object-contain" />
							</div>
							<div>
								<h2 className="aura-title">AURA</h2>
								<p className="aura-subtle">
									{userData?.nickname ? `陪${userData.nickname}聊天中` : '一直在听你说话'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
				<Card className="h-full aura-card flex flex-col">
					<ScrollArea className="flex-1 p-6">
						<div className="space-y-6" ref={scrollRef}>
							{messages.map((message) => (
								<ChatMessage key={message.id} message={message} />
							))}
							{isTyping && (
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-full bg-white border border-emerald-200 flex items-center justify-center flex-shrink-0">
										<img
											src={auraIcon}
											alt="AURA"
											className="w-8 h-8 object-contain"
										/>
									</div>
									<div className="bg-emerald-50/70 rounded-3xl rounded-tl-sm px-6 py-4 border border-emerald-100">
										<div className="flex gap-1.5">
											<span
												className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
												style={{ animationDelay: '0ms' }}
											/>
											<span
												className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
												style={{ animationDelay: '150ms' }}
											/>
											<span
												className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
												style={{ animationDelay: '300ms' }}
											/>
										</div>
									</div>
								</div>
							)}
							{showEmotionCards && !isTyping && (
								<EmotionCards onSelect={handleEmotionSelect} />
							)}
						</div>
					</ScrollArea>

					<div className="p-6 border-t border-emerald-100">
						<form onSubmit={handleSubmit} className="flex gap-3">
							<Input
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder="说说你的想法吧..."
								className="flex-1 aura-input focus-visible:ring-emerald-500 px-6"
								disabled={isTyping}
							/>
							<Button
								type="submit"
								disabled={!inputValue.trim() || isTyping}
								className="aura-btn-primary rounded-full w-12 h-12 p-0"
							>
								<Send className="w-5 h-5" />
							</Button>
						</form>
					</div>
				</Card>
			</div>
		</div>
	)
}


