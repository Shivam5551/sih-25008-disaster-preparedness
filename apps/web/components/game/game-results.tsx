'use client';

import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { 
	Trophy, 
	Star, 
	Target, 
	Award,
	TrendingUp,
	RotateCcw,
	Home,
	Share2,
	Medal,
	Zap
} from 'lucide-react';
import { GameStats } from './game-types';
import { GameAPI, handleApiError } from '../../lib/game-api';

interface GameResultsProps {
	gameStats: GameStats;
	onRestartGame: () => void;
	onBackToMenu: () => void;
}

export function GameResults({ gameStats, onRestartGame, onBackToMenu }: GameResultsProps) {
	const accuracyPercentage = gameStats.totalQuestions > 0 
		? Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100) 
		: 0;

	// Submit results to backend on component mount
	React.useEffect(() => {
		const submitResults = async () => {
			try {
				await GameAPI.submitResults({
					score: gameStats.score,
					correctAnswers: gameStats.correctAnswers,
					totalQuestions: gameStats.totalQuestions,
					timeSpent: 0, // You could track this if needed
					difficulty: 'mixed', // Since we have multiple difficulties
					completedScenarios: [] // You could track scenario IDs
				});
			} catch (error) {
				// Silently fail - results submission is not critical for user experience
				console.warn('Failed to submit game results:', handleApiError(error));
			}
		};

		if (gameStats.totalQuestions > 0) {
			submitResults();
		}
	}, [gameStats]);

	const getPerformanceMessage = () => {
		if (accuracyPercentage >= 90) return { message: 'Outstanding Emergency Response!', color: 'text-green-600', icon: Trophy };
		if (accuracyPercentage >= 75) return { message: 'Great Emergency Skills!', color: 'text-blue-600', icon: Medal };
		if (accuracyPercentage >= 60) return { message: 'Good Safety Awareness!', color: 'text-yellow-600', icon: Star };
		return { message: 'Keep Learning and Practicing!', color: 'text-orange-600', icon: Target };
	};

	const performanceData = getPerformanceMessage();
	const PerformanceIcon = performanceData.icon;

	const achievements = [];
	if (gameStats.correctAnswers === gameStats.totalQuestions) {
		achievements.push({ name: 'Perfect Game', description: 'Answered all questions correctly!', icon: Trophy });
	}
	if (gameStats.score >= 500) {
		achievements.push({ name: 'High Scorer', description: 'Scored 500+ points!', icon: Star });
	}
	if (accuracyPercentage >= 90) {
		achievements.push({ name: 'Safety Expert', description: '90%+ accuracy achieved!', icon: Medal });
	}
	if (gameStats.lives === 3) {
		achievements.push({ name: 'Flawless Response', description: 'Completed without losing lives!', icon: Zap });
	}

	return (
		<div className="max-w-4xl mx-auto">
			{/* Results Header */}
			<div className="text-center mb-8">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
					<PerformanceIcon className={`w-10 h-10 ${performanceData.color}`} />
				</div>
				<h2 className={`text-3xl font-bold mb-2 ${performanceData.color}`}>
					{performanceData.message}
				</h2>
				<p className="text-lg text-muted-foreground">
					Your emergency response training session is complete
				</p>
			</div>

			{/* Score Overview */}
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-card rounded-lg border p-6 text-center">
					<div className="text-3xl font-bold text-primary mb-2">{gameStats.score}</div>
					<div className="text-sm text-muted-foreground">Total Points</div>
				</div>
				<div className="bg-card rounded-lg border p-6 text-center">
					<div className="text-3xl font-bold text-green-500 mb-2">{accuracyPercentage}%</div>
					<div className="text-sm text-muted-foreground">Accuracy</div>
				</div>
				<div className="bg-card rounded-lg border p-6 text-center">
					<div className="text-3xl font-bold text-blue-500 mb-2">
						{gameStats.correctAnswers}/{gameStats.totalQuestions}
					</div>
					<div className="text-sm text-muted-foreground">Correct Answers</div>
				</div>
				<div className="bg-card rounded-lg border p-6 text-center">
					<div className="text-3xl font-bold text-purple-500 mb-2">{gameStats.lives}</div>
					<div className="text-sm text-muted-foreground">Lives Remaining</div>
				</div>
			</div>

			{/* Performance Analysis */}
			<div className="bg-card rounded-lg border p-6 mb-8">
				<h3 className="text-xl font-semibold mb-4 flex items-center">
					<TrendingUp className="w-5 h-5 text-primary mr-2" />
					Performance Analysis
				</h3>
				<div className="grid lg:grid-cols-2 gap-6">
					<div>
						<h4 className="font-medium mb-3">Strengths</h4>
						<ul className="space-y-2 text-sm">
							{accuracyPercentage >= 75 && (
								<li className="flex items-center text-green-600">
									<Star className="w-4 h-4 mr-2" />
									Excellent safety knowledge
								</li>
							)}
							{gameStats.score >= 300 && (
								<li className="flex items-center text-green-600">
									<Award className="w-4 h-4 mr-2" />
									Quick decision making
								</li>
							)}
							{gameStats.lives > 1 && (
								<li className="flex items-center text-green-600">
									<Trophy className="w-4 h-4 mr-2" />
									Good risk assessment
								</li>
							)}
							{gameStats.correctAnswers > 0 && (
								<li className="flex items-center text-green-600">
									<Target className="w-4 h-4 mr-2" />
									Understanding of emergency protocols
								</li>
							)}
						</ul>
					</div>
					<div>
						<h4 className="font-medium mb-3">Areas for Improvement</h4>
						<ul className="space-y-2 text-sm">
							{accuracyPercentage < 75 && (
								<li className="flex items-center text-yellow-600">
									<Target className="w-4 h-4 mr-2" />
									Review emergency response procedures
								</li>
							)}
							{gameStats.lives < 2 && (
								<li className="flex items-center text-yellow-600">
									<Zap className="w-4 h-4 mr-2" />
									Practice decision-making under pressure
								</li>
							)}
							{gameStats.score < 300 && (
								<li className="flex items-center text-yellow-600">
									<TrendingUp className="w-4 h-4 mr-2" />
									Focus on quick, correct responses
								</li>
							)}
						</ul>
						<div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
							<p className="text-sm text-blue-600 dark:text-blue-400">
								💡 Tip: Review the earthquake module lessons to improve your emergency response knowledge!
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Achievements */}
			{achievements.length > 0 && (
				<div className="bg-card rounded-lg border p-6 mb-8">
					<h3 className="text-xl font-semibold mb-4 flex items-center">
						<Award className="w-5 h-5 text-primary mr-2" />
						Achievements Unlocked
					</h3>
					<div className="grid md:grid-cols-2 gap-4">
						{achievements.map((achievement, index) => {
							const AchievementIcon = achievement.icon;
							return (
								<div key={index} className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
									<AchievementIcon className="w-8 h-8 text-yellow-500" />
									<div>
										<div className="font-medium text-yellow-700 dark:text-yellow-400">{achievement.name}</div>
										<div className="text-sm text-yellow-600 dark:text-yellow-300">{achievement.description}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* Educational Summary */}
			<div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 mb-8 border border-blue-500/20">
				<h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
				<ul className="space-y-3 text-sm">
					<li className="flex items-start space-x-3">
						<div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<span className="text-blue-600 font-semibold text-xs">1</span>
						</div>
						<div>
							<strong>Drop, Cover, and Hold On</strong> is the most important response during earthquake shaking.
						</div>
					</li>
					<li className="flex items-start space-x-3">
						<div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<span className="text-blue-600 font-semibold text-xs">2</span>
						</div>
						<div>
							<strong>Do not run outside</strong> during shaking - most injuries occur from falling objects and debris.
						</div>
					</li>
					<li className="flex items-start space-x-3">
						<div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<span className="text-blue-600 font-semibold text-xs">3</span>
						</div>
						<div>
							<strong>After shaking stops</strong>, check for injuries and hazards before taking other actions.
						</div>
					</li>
					<li className="flex items-start space-x-3">
						<div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<span className="text-blue-600 font-semibold text-xs">4</span>
						</div>
						<div>
							<strong>Stay informed</strong> and have an emergency plan prepared before disasters strike.
						</div>
					</li>
				</ul>
			</div>

			{/* Action Buttons */}
			<div className="flex flex-col sm:flex-row gap-4 justify-center">
				<Button onClick={onRestartGame} size="lg" className="px-8">
					<RotateCcw className="w-5 h-5 mr-2" />
					Play Again
				</Button>
				<Button onClick={onBackToMenu} variant="outline" size="lg" className="px-8">
					<Home className="w-5 h-5 mr-2" />
					Back to Modules
				</Button>
				<Button variant="outline" size="lg" className="px-8">
					<Share2 className="w-5 h-5 mr-2" />
					Share Results
				</Button>
			</div>

			{/* Next Steps */}
			<div className="text-center mt-8 p-6 bg-card rounded-lg border">
				<h4 className="font-semibold mb-2">Continue Your Safety Education</h4>
				<p className="text-sm text-muted-foreground mb-4">
					Ready to learn more? Check out our comprehensive disaster preparedness modules.
				</p>
				<Button asChild>
					<a href="/modules">Explore Learning Modules</a>
				</Button>
			</div>
		</div>
	);
}