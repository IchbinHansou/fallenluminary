// components/aura/EmotionCards.tsx
import { Button } from '@/components/aura/ui/button'
import { Heart } from 'lucide-react'

interface EmotionCardsProps {
	onSelect: (emotion: string) => void
}

const emotions = [
	{ label: '焦虑', color: 'bg-emerald-50 hover:bg-emerald-100' },
	{ label: '失落', color: 'bg-emerald-50 hover:bg-emerald-100' },
	{ label: '压抑', color: 'bg-emerald-50 hover:bg-emerald-100' },
	{ label: '担心', color: 'bg-emerald-50 hover:bg-emerald-100' },
	{ label: '委屈', color: 'bg-emerald-50 hover:bg-emerald-100' },
	{ label: '疲惫', color: 'bg-emerald-50 hover:bg-emerald-100' },
]

export function EmotionCards({ onSelect }: EmotionCardsProps) {
	return (
		<div className="bg-white rounded-3xl p-6 space-y-4 border border-emerald-100">
			<div className="flex items-center gap-2 text-emerald-700">
				<Heart className="w-4 h-4" />
				<span>这些词更接近你的感受吗？</span>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{emotions.map((emotion) => (
					<Button
						key={emotion.label}
						onClick={() => onSelect(emotion.label)}
						variant="outline"
						className={`${emotion.color} border border-emerald-200 py-6 text-emerald-900 transition-all hover:scale-105`}
					>
						{emotion.label}
					</Button>
				))}
			</div>
			<p className="text-center text-slate-400">或者继续用自己的话表达</p>
		</div>
	)
}


