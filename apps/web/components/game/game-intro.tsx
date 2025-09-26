'use client';

import { Button } from '@workspace/ui/components/button';
import { 
	Play, 
	Trophy, 
	Clock, 
	Target, 
	Shield,
	AlertTriangle,
	CheckCircle,
	Star
} from 'lucide-react';

interface GameIntroProps {
	onStartGame: () => void;
}

export function GameIntro({ onStartGame }: GameIntroProps) {
	return (
		<div className="max-w-4xl mx-auto">
			{/* Game Overview */}
			<div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-8 mb-8">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
						<AlertTriangle className="w-8 h-8 text-red-500" />
					</div>
					<h2 className="text-2xl font-bold mb-4">Ready to Test Your Emergency Skills?</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Face realistic earthquake scenarios and make life-saving decisions. Learn proper emergency 
						response while earning points and unlocking achievements!
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="text-center p-4 bg-card rounded-lg border">
						<Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
						<h3 className="font-semibold mb-1">Multiple Levels</h3>
						<p className="text-sm text-muted-foreground">Progress through increasingly challenging scenarios</p>
					</div>
					<div className="text-center p-4 bg-card rounded-lg border">
						<Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
						<h3 className="font-semibold mb-1">Time Pressure</h3>
						<p className="text-sm text-muted-foreground">Make quick decisions under realistic time constraints</p>
					</div>
					<div className="text-center p-4 bg-card rounded-lg border">
						<Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
						<h3 className="font-semibold mb-1">Score Points</h3>
						<p className="text-sm text-muted-foreground">Earn points for correct responses and safety actions</p>
					</div>
					<div className="text-center p-4 bg-card rounded-lg border">
						<Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
						<h3 className="font-semibold mb-1">Achievements</h3>
						<p className="text-sm text-muted-foreground">Unlock badges for mastering emergency skills</p>
					</div>
				</div>
			</div>

			{/* How to Play */}
			<div className="bg-card rounded-lg border p-6 mb-8">
				<h3 className="text-xl font-semibold mb-4 flex items-center">
					<Shield className="w-5 h-5 text-primary mr-2" />
					How to Play
				</h3>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
								1
							</div>
							<div>
								<h4 className="font-medium mb-1">Read the Scenario</h4>
								<p className="text-sm text-muted-foreground">
									Each level presents a realistic earthquake emergency situation
								</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
								2
							</div>
							<div>
								<h4 className="font-medium mb-1">Choose Your Action</h4>
								<p className="text-sm text-muted-foreground">
									Select the best response from multiple choice options
								</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
								3
							</div>
							<div>
								<h4 className="font-medium mb-1">Learn from Feedback</h4>
								<p className="text-sm text-muted-foreground">
									Get instant feedback and educational explanations
								</p>
							</div>
						</div>
					</div>
					<div className="space-y-4">
						<div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
							<h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
								<CheckCircle className="w-4 h-4 mr-2" />
								Scoring System
							</h4>
							<ul className="text-sm space-y-1 text-green-600 dark:text-green-300">
								<li>• Correct answers: +100 points</li>
								<li>• Quick responses: +50 bonus</li>
								<li>• Perfect level: +200 bonus</li>
								<li>• Wrong answers: -25 points</li>
							</ul>
						</div>
						<div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
							<h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
								💡 Pro Tips
							</h4>
							<ul className="text-sm space-y-1 text-blue-600 dark:text-blue-300">
								<li>• Think safety first</li>
								<li>• Consider your environment</li>
								<li>• Remember: Drop, Cover, Hold On</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Start Game Button */}
			<div className="text-center">
				<Button 
					size="lg" 
					onClick={onStartGame}
					className="px-8 py-3 text-lg"
				>
					<Play className="w-5 h-5 mr-2" />
					Start Emergency Training Game
				</Button>
				<p className="text-sm text-muted-foreground mt-4">
					Ready to save lives? Let&apos;s test your earthquake response skills!
				</p>
			</div>
		</div>
	);
}