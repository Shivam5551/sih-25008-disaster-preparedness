'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@workspace/ui/components/button';
import { 
	Heart, 
	AlertTriangle,
	CheckCircle,
	XCircle,
	Lightbulb,
	Timer,
	Home,
	School,
	Building,
	Loader2
} from 'lucide-react';
import { GameStats, GameScenario } from './game-types';
import { GameAPI, handleApiError } from '../../lib/game-api';

interface GamePlayProps {
	gameStats: GameStats;
	setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
	onGameComplete: (finalStats: GameStats) => void;
}

export function GamePlay({ gameStats, setGameStats, onGameComplete }: GamePlayProps) {
	const [scenarios, setScenarios] = useState<GameScenario[]>([]);
	const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState({
		time: 0,
		timeup: false,
	});
	const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [currentExplanation, setCurrentExplanation] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const currentScenario = scenarios[currentScenarioIndex];

	useEffect(() => {
		const loadScenarios = async () => {
			try {
				setLoading(true);
				setError(null);
				const fetchedScenarios = await GameAPI.getScenarios({
					category: 'earthquake',
					limit: 8 // Get 8 scenarios for variety
				});
				
				if (fetchedScenarios.length === 0) {
					throw new Error('No scenarios available');
				}
				
				setScenarios(fetchedScenarios);
			} catch (err) {
				const errorMessage = handleApiError(err);
				setError(errorMessage);
				console.error('Failed to load game scenarios:', err);
			} finally {
				setLoading(false);
			}
		};

		loadScenarios();
	}, []);

	const handleTimeUp = useCallback(() => {
		if (!showFeedback) {
			setGameStats(prev => ({
				...prev,
				lives: Math.max(0, prev.lives - 1),
				totalQuestions: prev.totalQuestions + 1
			}));
			setCurrentExplanation('Time ran out! In a real emergency, quick decisions save lives.');
			setIsCorrect(false);
			setShowFeedback(true);
		}
	}, [showFeedback, setGameStats]);

	// Initialize timer for current scenario
	useEffect(() => {
		if (!showFeedback && currentScenario) {
			setTimeLeft(prev => ({ ...prev, time: currentScenario.timeLimit}));
			const timer = setInterval(() => {
				setTimeLeft(prev => {
					if(prev.time === 0) {
						return ({
							...prev,
							timeup: true
						})
					}
					return ({
						...prev,
						time: Math.max(0, prev.time - 1)
					})
				});
			}, 1000);
			
			return () => clearInterval(timer);
		}
	}, [currentScenarioIndex, showFeedback, currentScenario, handleTimeUp]);

	useEffect(() => {
		if (timeLeft.time === 0 && timeLeft.timeup && !showFeedback && currentScenario) {
			handleTimeUp();
			setTimeLeft(prev => ({...prev, timeup: false}))
		}
	}, [timeLeft, showFeedback, currentScenario, handleTimeUp]);

	const handleChoiceSelect = (choiceId: string) => {
		if (showFeedback || !currentScenario) return;
		
		setSelectedChoice(choiceId);
		const choice = currentScenario.choices.find(c => c.id === choiceId);
		if (!choice) return;

		setIsCorrect(choice.correct);
		setCurrentExplanation(choice.explanation);
		setShowFeedback(true);

		// Calculate bonus for quick response
		const timeBonus = timeLeft.time > (currentScenario.timeLimit * 0.75) ? 50 : 0;
		const points = choice.correct ? choice.points + timeBonus : Math.max(0, choice.points - 25);

		setGameStats(prev => ({
			...prev,
			score: prev.score + points,
			correctAnswers: choice.correct ? prev.correctAnswers + 1 : prev.correctAnswers,
			totalQuestions: prev.totalQuestions + 1,
			lives: choice.correct ? prev.lives : Math.max(0, prev.lives - 1)
		}));
	};

	const handleNextScenario = () => {
		if (currentScenarioIndex + 1 >= scenarios.length) {
			// Game complete
			onGameComplete(gameStats);
			return;
		}

		if (gameStats.lives <= 0) {
			// Game over - no lives left
			onGameComplete(gameStats);
			return;
		}

		// Move to next scenario
		setCurrentScenarioIndex(prev => prev + 1);
		setSelectedChoice(null);
		setShowFeedback(false);
		setIsCorrect(false);
		setCurrentExplanation('');
	};

	// Handle loading state
	if (loading) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="bg-card rounded-lg border p-8 text-center">
					<Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
					<h3 className="text-xl font-semibold mb-2">Loading Game Scenarios</h3>
					<p className="text-muted-foreground">
						Preparing your earthquake emergency training scenarios...
					</p>
				</div>
			</div>
		);
	}

	// Handle error state
	if (error) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="bg-card rounded-lg border p-8 text-center">
					<AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
					<h3 className="text-xl font-semibold mb-2 text-red-600">Failed to Load Game</h3>
					<p className="text-muted-foreground mb-4">{error}</p>
					<Button 
						onClick={() => window.location.reload()} 
						variant="outline"
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	// Handle no scenarios
	if (!currentScenario || scenarios.length === 0) {
		onGameComplete(gameStats);
		return null;
	}

	return (
		<div className="max-w-4xl mx-auto">
			{/* Scenario Header */}
			<div className="bg-card rounded-lg border p-6 mb-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							{currentScenario.difficulty === 'easy' && <Home className="w-5 h-5 text-green-500" />}
							{currentScenario.difficulty === 'medium' && <School className="w-5 h-5 text-yellow-500" />}
							{currentScenario.difficulty === 'hard' && <Building className="w-5 h-5 text-red-500" />}
							<span className="text-sm font-medium capitalize">{currentScenario.difficulty}</span>
						</div>
						<div className="text-sm text-muted-foreground">
							Scenario {currentScenarioIndex + 1} of {scenarios.length}
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<Timer className="w-4 h-4 text-blue-500" />
							<span className={`font-mono text-lg ${timeLeft.time <= 5 ? 'text-red-500 font-bold' : 'text-blue-500'}`}>
								{timeLeft.time}s
							</span>
						</div>
						<div className="flex items-center space-x-1">
							{Array.from({ length: 3 }).map((_, i) => (
								<Heart 
									key={i} 
									className={`w-5 h-5 ${i < gameStats.lives ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
								/>
							))}
						</div>
					</div>
				</div>
				
				<h2 className="text-2xl font-bold mb-2">{currentScenario.title}</h2>
				<p className="text-muted-foreground">{currentScenario.description}</p>
			</div>

			{/* Scenario Situation */}
			<div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-6 mb-6 border border-orange-500/20">
				<div className="flex items-start space-x-4">
					<AlertTriangle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
					<div>
						<h3 className="font-semibold text-lg mb-2">Emergency Situation</h3>
						<p className="text-lg leading-relaxed">{currentScenario.situation}</p>
					</div>
				</div>
			</div>

			{/* Choices */}
			<div className="space-y-4 mb-6">
				<h3 className="text-xl font-semibold">What do you do?</h3>
				<div className="grid gap-4">
					{currentScenario.choices.map((choice) => (
						<button
							key={choice.id}
							onClick={() => handleChoiceSelect(choice.id)}
							disabled={showFeedback}
							className={`
								p-4 text-left rounded-lg border-2 transition-all duration-200
								${!showFeedback ? 'hover:border-primary hover:bg-primary/5' : ''}
								${selectedChoice === choice.id && showFeedback 
									? isCorrect 
										? 'border-green-500 bg-green-500/10' 
										: 'border-red-500 bg-red-500/10'
									: 'border-border bg-card'
								}
								${showFeedback && choice.correct && selectedChoice !== choice.id 
									? 'border-green-500/50 bg-green-500/5' 
									: ''
								}
								disabled:cursor-not-allowed
							`}
						>
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0 mt-1">
									{showFeedback && selectedChoice === choice.id && (
										isCorrect ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />
									)}
									{showFeedback && choice.correct && selectedChoice !== choice.id && (
										<CheckCircle className="w-5 h-5 text-green-500" />
									)}
								</div>
								<div className="flex-1">
									<p className="font-medium">{choice.text}</p>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Feedback */}
			{showFeedback && (
				<div className="bg-card rounded-lg border p-6 mb-6">
					<div className="flex items-start space-x-4">
						<Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
						<div className="flex-1">
							<h4 className="font-semibold mb-2 flex items-center">
								{isCorrect ? (
									<><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Correct!</>
								) : (
									<><XCircle className="w-5 h-5 text-red-500 mr-2" /> {timeLeft.time === 0 ? 'Time Up!' : 'Not Quite'}</>
								)}
							</h4>
							<p className="text-muted-foreground">{currentExplanation}</p>
						</div>
					</div>
				</div>
			)}

			{/* Next Button */}
			{showFeedback && (
				<div className="text-center">
					<Button onClick={handleNextScenario} size="lg">
						{currentScenarioIndex + 1 >= scenarios.length || gameStats.lives <= 0 
							? 'View Results' 
							: 'Next Scenario'
						}
					</Button>
				</div>
			)}
		</div>
	);
}