// components/aura/AuraApp.tsx
'use client'

import { useState } from 'react'
import { WelcomeScreen } from '@/components/aura/WelcomeScreen'
import { UserSurveyScreen, UserSurveyData } from '@/components/aura/UserSurveyScreen'
import { ChatScreen } from '@/components/aura/ChatScreen'

export function AuraApp() {
	const [currentScreen, setCurrentScreen] = useState<'welcome' | 'survey' | 'chat'>('welcome')
	const [selectedMood, setSelectedMood] = useState<string | null>(null)
	const [userData, setUserData] = useState<UserSurveyData | null>(null)

	const handleStart = (mood?: string) => {
		if (mood) {
			setSelectedMood(mood)
		}
		setCurrentScreen('survey')
	}

	const handleSurveyComplete = (data: UserSurveyData) => {
		setUserData(data)
		setCurrentScreen('chat')
	}

	const handleBackToWelcome = () => {
		setCurrentScreen('welcome')
		setSelectedMood(null)
	}

	const handleBackToSurvey = () => {
		setCurrentScreen('survey')
	}

	return (
		<div className="aura-container min-h-screen bg-emerald-50/30 pt-16">
			{currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
			{currentScreen === 'survey' && (
				<UserSurveyScreen
					onComplete={handleSurveyComplete}
					onBack={handleBackToWelcome}
					initialMood={selectedMood}
				/>
			)}
			{currentScreen === 'chat' && (
				<ChatScreen initialMood={selectedMood} userData={userData} onBack={handleBackToSurvey} />
			)}
		</div>
	)
}


