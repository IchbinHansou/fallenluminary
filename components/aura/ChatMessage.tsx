// components/aura/ChatMessage.tsx
import { Sparkles, User } from 'lucide-react'

interface Message {
	id: string
	text: string
	sender: 'user' | 'ai'
	timestamp: Date
}

interface ChatMessageProps {
	message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
	const isAI = message.sender === 'ai'
	const auraIcon = '/images/kaura/AURA1.jpg'

	return (
		<div className={`flex items-start gap-3 ${!isAI ? 'flex-row-reverse' : ''}`}>
			<div
				className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
					isAI ? 'bg-white border border-emerald-200' : 'bg-emerald-100'
				}`}
			>
				{isAI ? (
					<img src={auraIcon} alt="AURA" className="w-8 h-8 object-contain" />
				) : (
					<User className="w-5 h-5 text-emerald-700" />
				)}
			</div>
			<div className={`max-w-[75%] ${!isAI ? 'flex flex-col items-end' : ''}`}>
				<div className={`rounded-3xl px-6 py-4 ${isAI ? 'aura-bubble-ai rounded-tl-sm' : 'aura-bubble-user rounded-tr-sm'}`}>
					<p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
				</div>
				<span className="text-slate-400 mt-2 px-2">
					{message.timestamp.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</span>
			</div>
		</div>
	)
}


