// components/aura/WelcomeScreen.tsx
import { useState } from 'react'
import {
	MessageCircle,
	Sparkles,
	ArrowRight,
	Smile,
	Zap,
	BatteryLow,
	CloudRain,
	Flame,
	Meh,
	CircleDashed,
	Waves,
	MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/components/aura/ui/button'
import { Card } from '@/components/aura/ui/card'

interface WelcomeScreenProps {
	onStart: (mood?: string) => void
}

const moodOptions = [
	{
		label: '开心',
		icon: Smile,
		color:
			'bg-amber-50 border-amber-300 hover:bg-amber-100 text-amber-900',
		selectedColor: 'bg-amber-200 border-amber-500',
	},
	{
		label: '焦虑',
		icon: Zap,
		color:
			'bg-orange-50 border-orange-300 hover:bg-orange-100 text-orange-900',
		selectedColor: 'bg-orange-200 border-orange-500',
	},
	{
		label: '疲惫',
		icon: BatteryLow,
		color: 'bg-slate-50 border-slate-300 hover:bg-slate-100 text-slate-900',
		selectedColor: 'bg-slate-200 border-slate-500',
	},
	{
		label: '难过',
		icon: CloudRain,
		color: 'bg-blue-50 border-blue-300 hover:bg-blue-100 text-blue-900',
		selectedColor: 'bg-blue-200 border-blue-500',
	},
	{
		label: '生气',
		icon: Flame,
		color: 'bg-red-50 border-red-300 hover:bg-red-100 text-red-900',
		selectedColor: 'bg-red-200 border-red-500',
	},
	{
		label: '无感',
		icon: Meh,
		color:
			'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-900',
		selectedColor: 'bg-gray-200 border-gray-500',
	},
	{
		label: '空虚',
		icon: CircleDashed,
		color:
			'bg-purple-50 border-purple-300 hover:bg-purple-100 text-purple-900',
		selectedColor: 'bg-purple-200 border-purple-500',
	},
	{
		label: '平静',
		icon: Waves,
		color: 'bg-teal-50 border-teal-300 hover:bg-teal-100 text-teal-900',
		selectedColor: 'bg-teal-200 border-teal-500',
	},
	{
		label: '其他',
		icon: MoreHorizontal,
		color:
			'bg-neutral-50 border-neutral-300 hover:bg-neutral-100 text-neutral-900',
		selectedColor: 'bg-neutral-200 border-neutral-500',
	},
]

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
	const [selectedMoods, setSelectedMoods] = useState<string[]>([])
	const auraIcon = '/images/kaura/AURA3.png'

	const toggleMood = (mood: string) => {
		setSelectedMoods((prev) =>
			prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
		)
	}

	const handleStartWithMoods = () => {
		onStart(selectedMoods.length > 0 ? selectedMoods.join('、') : undefined)
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-2xl w-full space-y-6">
				<div className="text-center space-y-2">
					<div className="flex items-center justify-center gap-2 mb-4">
						<div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-2 border-emerald-200">
							<img src={auraIcon} alt="AURA" className="w-20 h-20 object-contain" />
						</div>
					</div>
					<h1 className="text-emerald-800">AURA</h1>
					<p className="text-emerald-700">你的专属情绪听众</p>
				</div>

				<Card className="bg-white border border-emerald-100 p-8">
					<div className="space-y-6">
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<MessageCircle className="w-5 h-5 text-emerald-600" />
								<h2>Hi，我是 AURA</h2>
							</div>
							<p className="text-slate-500 leading-relaxed">
								我一直在这儿听你说话。无论是&quot;我不想写作业&quot;还是&quot;这次考试排名我不满意&quot;，我都会温柔回应、陪你对话，并引导你一步步看清情绪背后的原因。
							</p>
						</div>

						<div className="bg-emerald-50/50 rounded-2xl p-6 space-y-3 border border-emerald-100">
							<p className="text-emerald-900">💡 我可以帮你：</p>
							<ul className="space-y-2 text-emerald-800">
								<li>• 更好地理解和表达自己的情绪</li>
								<li>• 从&quot;我学不下去&quot;到&quot;我需要更好地接受自己&quot;</li>
								<li>• 学习调节情绪的实用方法</li>
							</ul>
						</div>
					</div>
				</Card>

				<Card className="bg-white border border-emerald-100 p-6">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
							<div className="space-y-3">
								<p className="text-emerald-900">🧠 你现在的感受会帮助我更好地理解你。</p>
								<p className="text-slate-500 leading-relaxed">
									无论是想发泄、求建议，还是只是想被倾听，这里都是安全的空间。
								</p>
								<p className="text-emerald-800">📍选择一个你此刻的感受，我就能更准确地回应你。</p>
								<p className="text-slate-500">你也可以跳过这一项，直接跟我说说心里话哦～</p>
							</div>
						</div>
					</div>
				</Card>

				<Card className="bg-white border border-emerald-100 p-6">
					<div className="space-y-4">
						<p className="text-center text-emerald-900">
							现在你的感受像是……？（可多选）
						</p>
						<div className="grid grid-cols-3 gap-3">
							{moodOptions.map((mood) => {
								const Icon = mood.icon
								const isSelected = selectedMoods.includes(mood.label)
								return (
									<Button
										key={mood.label}
										onClick={() => toggleMood(mood.label)}
										variant="outline"
										className={`h-auto py-4 flex flex-col gap-2 border transition-all ${
											isSelected ? mood.selectedColor : mood.color
										} ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
									>
										<Icon className="w-6 h-6" />
										<span>{mood.label}</span>
									</Button>
								)
							})}
						</div>
						{selectedMoods.length > 0 && (
							<p className="text-center text-emerald-700">
								已选择：{selectedMoods.join('、')}
							</p>
						)}
					</div>
				</Card>

				<div className="flex justify-center">
					<Button
						onClick={handleStartWithMoods}
						className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-full gap-2"
					>
						<span>{selectedMoods.length > 0 ? '开始对话' : '跳过，直接开始'}</span>
						<ArrowRight className="w-5 h-5" />
					</Button>
				</div>

				<p className="text-center text-slate-500">
					我是 AI 助手，可以倾听和陪伴，但不能替代专业心理咨询
				</p>
			</div>
		</div>
	)
}


