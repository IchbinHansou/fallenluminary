// components/aura/UserSurveyScreen.tsx
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/aura/ui/button'
import { Card } from '@/components/aura/ui/card'
import { Input } from '@/components/aura/ui/input'
import { Label } from '@/components/aura/ui/label'
import { Textarea } from '@/components/aura/ui/textarea'

interface UserSurveyScreenProps {
	onComplete: (data: UserSurveyData) => void
	onBack: () => void
	initialMood?: string | null
}

export interface UserSurveyData {
	nickname: string
	ageGroup: string
	currentFeeling: string
}

const ageGroups = [
	{ value: '12-14', label: '12-14岁' },
	{ value: '15-17', label: '15-17岁' },
	{ value: '18-22', label: '18-22岁' },
	{ value: '23+', label: '23岁以上' },
]

export function UserSurveyScreen({
	onComplete,
	onBack,
	initialMood,
}: UserSurveyScreenProps) {
	const [nickname, setNickname] = useState('')
	const [ageGroup, setAgeGroup] = useState('')
	const [currentFeeling, setCurrentFeeling] = useState(initialMood || '')

	const auraCharacter = '/images/kaura/AURA1.png'

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (nickname && ageGroup) {
			onComplete({ nickname, ageGroup, currentFeeling })
		}
	}

	const isValid = nickname.trim() && ageGroup

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-2xl w-full">
				<Card className="bg-white border border-emerald-100 overflow-visible relative">
					<div className="bg-emerald-600 text-white relative pb-[30px] pt-[24px] pr-[24px] pl-[24px]">
						<div className="mb-4">
							<div className="flex items-center gap-3 mb-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={onBack}
									className="text-white hover:bg-white/20 h-8 w-8 flex-shrink-0"
								>
									<ArrowLeft className="w-5 h-5" />
								</Button>
								<h2>开始前，让我们先认识一下吧！</h2>
							</div>
							<p className="text-white/90 ml-11">
								以下信息能帮助我更好地理解和陪伴你，请认真填写哦。
							</p>
						</div>
					</div>

					<div className="absolute right-0 top-0 z-10 pointer-events-none">
						<img
							src={auraCharacter}
							alt="AURA"
							className="w-64 h-64 object-contain drop-shadow-2xl"
						/>
					</div>

					<form onSubmit={handleSubmit} className="p-8 pt-3 space-y-6">
						<div className="space-y-2 max-w-md">
							<Label htmlFor="nickname" className="text-emerald-900">
								* 你希望我怎么称呼你？
							</Label>
							<Input
								id="nickname"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								placeholder="例如：小明、阿星、小宇..."
								className="border border-emerald-200 focus-visible:ring-emerald-500"
								required
							/>
							<p className="text-slate-400">可以是昵称、代号，任何你喜欢的</p>
						</div>

						<div className="space-y-3">
							<Label className="text-emerald-900">* 你的年龄段是？</Label>
							<div className="grid grid-cols-2 gap-3">
								{ageGroups.map((group) => (
									<Button
										key={group.value}
										type="button"
										onClick={() => setAgeGroup(group.value)}
										variant="outline"
										className={`h-auto py-4 border transition-all ${
											ageGroup === group.value
												? 'border-emerald-600 bg-emerald-50 text-emerald-900'
												: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
										}`}
									>
										{group.label}
									</Button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="feeling" className="text-emerald-900">
								现在想和我聊什么？（选填）
							</Label>
							<Textarea
								id="feeling"
								value={currentFeeling}
								onChange={(e) => setCurrentFeeling(e.target.value)}
								placeholder="可以简单说说你现在的感受，或者想聊的话题..."
								className="border border-emerald-200 focus-visible:ring-emerald-500 min-h-[100px] resize-none"
							/>
							<p className="text-slate-400">也可以进入后再慢慢说</p>
						</div>

						<div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
							<p className="text-emerald-800">
								🔒 你的信息只用于改善对话体验，我们重视你的隐私
							</p>
						</div>

						<Button
							type="submit"
							disabled={!isValid}
							className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-full gap-2"
						>
							<span>开始对话</span>
							<ArrowRight className="w-5 h-5" />
						</Button>
					</form>
				</Card>
			</div>
		</div>
	)
}


