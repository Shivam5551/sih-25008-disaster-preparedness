export interface GameStats {
	score: number;
	level: number;
	lives: number;
	timeRemaining: number;
	correctAnswers: number;
	totalQuestions: number;
	achievements: string[];
}

// Re-export from API for consistency
export type { GameScenario } from '../../lib/game-api';