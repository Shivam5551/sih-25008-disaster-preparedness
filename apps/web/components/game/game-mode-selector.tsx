'use client';

import { Button } from '@workspace/ui/components/button';
import { 
	Brain, 
	Gamepad2, 
	Clock,
	Target,
	Users,
	Waves,
	Mountain
} from 'lucide-react';

export type GameMode = 'quiz' | '2d-earthquake' | '2d-flood';
export type DisasterType = 'earthquake' | 'flood';
interface GameModeSelectorProps {
	onSelectMode: (mode: GameMode) => void;
	onBack: () => void;
}

export function GameModeSelector({ onSelectMode, onBack }: GameModeSelectorProps) {
	return (
		<div className="max-w-6xl mx-auto">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold mb-4">Choose Your Disaster Learning Adventure</h2>
				<p className="text-lg text-muted-foreground">
					Select the type of disaster and how you&apos;d like to learn about safety
				</p>
			</div>

			{/* Disaster Types */}
			<div className="grid md:grid-cols-2 gap-8 mb-12">
				<div className="text-center">
					<div className="flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4 mx-auto">
						<Mountain className="w-10 h-10 text-orange-600" />
					</div>
					<h3 className="text-2xl font-bold mb-4 text-orange-700 dark:text-orange-400">🏔️ Earthquake Safety</h3>
					
					<div className="grid gap-4">
						{/* Earthquake Quiz */}
						<div className="bg-card rounded-xl border-2 border-border hover:border-blue-500 transition-all duration-200 overflow-hidden group cursor-pointer"
							 onClick={() => onSelectMode('quiz')}>
							<div className="p-4">
								<div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
									<Brain className="w-6 h-6 text-blue-600" />
								</div>
								<h4 className="font-bold text-center mb-2">Quiz Mode</h4>
								<p className="text-sm text-muted-foreground text-center mb-3">
									Test earthquake knowledge with interactive questions
								</p>
								<div className="flex justify-center items-center text-xs text-blue-500 mb-3">
									<Clock className="w-3 h-3 mr-1" />
									<span>5-10 min</span>
									<Target className="w-3 h-3 ml-3 mr-1" />
									<span>Multiple choice</span>
								</div>
								<Button className="w-full group-hover:bg-blue-600" size="sm">
									Start Quiz
								</Button>
							</div>
						</div>

						{/* Earthquake 2D Game */}
						<div className="bg-card rounded-xl border-2 border-border hover:border-green-500 transition-all duration-200 overflow-hidden group cursor-pointer"
							 onClick={() => onSelectMode('2d-earthquake')}>
							<div className="p-4">
								<div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
									<Gamepad2 className="w-6 h-6 text-green-600" />
								</div>
								<h4 className="font-bold text-center mb-2">2D Interactive</h4>
								<p className="text-sm text-muted-foreground text-center mb-3">
									Experience realistic earthquake scenarios
								</p>
								<div className="flex justify-center items-center text-xs text-green-500 mb-3">
									<Clock className="w-3 h-3 mr-1" />
									<span>10-15 min</span>
									<Users className="w-3 h-3 ml-3 mr-1" />
									<span>Real-time</span>
								</div>
								<Button className="w-full group-hover:bg-green-600" size="sm" variant="outline">
									Start 2D Game
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center">
					<div className="flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 mx-auto">
						<Waves className="w-10 h-10 text-blue-600" />
					</div>
					<h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">🌊 Flood Safety</h3>
					
					<div className="grid gap-4">
						{/* Flood 2D Game */}
						<div className="bg-card rounded-xl border-2 border-border hover:border-cyan-500 transition-all duration-200 overflow-hidden group cursor-pointer"
							 onClick={() => onSelectMode('2d-flood')}>
							<div className="p-4">
								<div className="flex items-center justify-center w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
									<Gamepad2 className="w-6 h-6 text-cyan-600" />
								</div>
								<h4 className="font-bold text-center mb-2">2D Flood Escape</h4>
								<p className="text-sm text-muted-foreground text-center mb-3">
									Navigate rising waters and find high ground
								</p>
								<div className="flex justify-center items-center text-xs text-cyan-500 mb-3">
									<Clock className="w-3 h-3 mr-1" />
									<span>12-18 min</span>
									<Users className="w-3 h-3 ml-3 mr-1" />
									<span>Water physics</span>
								</div>
								<Button className="w-full group-hover:bg-cyan-600" size="sm" variant="outline">
									Start Flood Game
								</Button>
							</div>
						</div>

						{/* Coming Soon - Flood Quiz */}
						<div className="bg-card rounded-xl border-2 border-dashed border-gray-300 overflow-hidden opacity-60">
							<div className="p-4">
								<div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-full mb-3 mx-auto">
									<Brain className="w-6 h-6 text-gray-400" />
								</div>
								<h4 className="font-bold text-center mb-2 text-gray-500">Quiz Mode</h4>
								<p className="text-sm text-muted-foreground text-center mb-3">
									Flood safety quiz coming soon
								</p>
								<div className="flex justify-center items-center text-xs text-gray-400 mb-3">
									<Clock className="w-3 h-3 mr-1" />
									<span>Coming soon</span>
								</div>
								<Button className="w-full" size="sm" disabled>
									Coming Soon
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="text-center">
				<Button onClick={onBack} variant="ghost" size="lg">
					← Back to Main Menu
				</Button>
			</div>
		</div>
	);
}