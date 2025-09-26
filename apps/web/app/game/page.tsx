'use client';

import { useState } from 'react';
import { NavbarWrapper } from '../../components/navbar-wrapper';
import { GameIntro } from '../../components/game/game-intro';
import { GameModeSelector, GameMode } from '../../components/game/game-mode-selector';
import { GamePlay } from '../../components/game/game-play';
import { Game2D } from '../../components/game/game-2d';
import { FloodGame2D } from '../../components/game/game-2d-flood';
import { GameResults } from '../../components/game/game-results';
import { Progress } from '../../components/ui/progress';
import { GameStats } from '../../components/game/game-types';
import { 
	Trophy, 
	Star, 
	Target
} from 'lucide-react';

type GameState = 'intro' | 'mode-select' | 'playing' | 'results';

export default function DisasterGamePage() {
	const [gameState, setGameState] = useState<GameState>('intro');
	const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
	const [gameStats, setGameStats] = useState<GameStats>({
		score: 0,
		level: 1,
		lives: 3,
		timeRemaining: 0,
		correctAnswers: 0,
		totalQuestions: 0,
		achievements: []
	});

	const handleStartGame = () => {
		setGameState('mode-select');
	};

	const handleModeSelect = (mode: GameMode) => {
		setSelectedMode(mode);
		setGameState('playing');
		setGameStats(prev => ({
			...prev,
			score: 0,
			level: 1,
			lives: 3,
			correctAnswers: 0,
			totalQuestions: 0,
			achievements: []
		}));
	};

	const handleGameComplete = (finalStats: GameStats) => {
		setGameStats(finalStats);
		setGameState('results');
	};

	const handleRestartGame = () => {
		setGameState('intro');
	};

	const handleBackToMenu = () => {
		setGameState('intro');
	};

	return (
		<div className="min-h-screen bg-background">
			<NavbarWrapper />
			
			<div className="container mx-auto px-4 py-8">
				{/* Game Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold">Earthquake Emergency Response Game</h1>
							<p className="text-lg text-muted-foreground mt-2">
								Test your disaster response skills in realistic scenarios
							</p>
						</div>
						{gameState === 'playing' && (
							<div className="flex items-center space-x-6 text-sm">
								<div className="flex items-center space-x-2">
									<Trophy className="h-4 w-4 text-yellow-500" />
									<span className="font-semibold">{gameStats.score} pts</span>
								</div>
								<div className="flex items-center space-x-2">
									<Target className="h-4 w-4 text-blue-500" />
									<span>Level {gameStats.level}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Star className="h-4 w-4 text-red-500" />
									<span>{gameStats.lives} lives</span>
								</div>
							</div>
						)}
					</div>
					
					{gameState === 'playing' && (
						<div className="bg-card rounded-lg border p-4">
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm font-medium">Game Progress</span>
								<span className="text-sm text-muted-foreground">
									{gameStats.correctAnswers} / {gameStats.totalQuestions} correct
								</span>
							</div>
							<Progress 
								value={(gameStats.correctAnswers / Math.max(gameStats.totalQuestions, 1)) * 100} 
								className="h-2"
							/>
						</div>
					)}
				</div>

				{/* Game Content */}
				{gameState === 'intro' && (
					<GameIntro onStartGame={handleStartGame} />
				)}
				
				{gameState === 'mode-select' && (
					<GameModeSelector 
						onSelectMode={handleModeSelect}
						onBack={() => setGameState('intro')}
					/>
				)}
				
				{gameState === 'playing' && selectedMode === 'quiz' && (
					<GamePlay 
						gameStats={gameStats}
						setGameStats={setGameStats}
						onGameComplete={handleGameComplete}
					/>
				)}
				
				{gameState === 'playing' && selectedMode === '2d-earthquake' && (
					<Game2D 
						gameStats={gameStats}
						setGameStats={setGameStats}
						onGameComplete={handleGameComplete}
					/>
				)}
				
				{gameState === 'playing' && selectedMode === '2d-flood' && (
					<FloodGame2D 
						gameStats={gameStats}
						setGameStats={setGameStats}
						onGameComplete={handleGameComplete}
					/>
				)}
				
				{gameState === 'results' && (
					<GameResults 
						gameStats={gameStats}
						onRestartGame={handleRestartGame}
						onBackToMenu={handleBackToMenu}
					/>
				)}
			</div>
		</div>
	);
}