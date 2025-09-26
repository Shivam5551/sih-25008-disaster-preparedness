'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@workspace/ui/components/button';
import { 
	Heart, 
	AlertTriangle,
	Trophy,
	Timer,
	RotateCcw,
	Play,
	Pause,
	CheckCircle
} from 'lucide-react';
import { GameStats } from './game-types';
import { GameRenderer } from './game-renderer';
import { HealthBar, TimerDisplay, ObjectiveDisplay, SafeZoneIndicator, MiniMap } from './enhanced-ui';

interface Game2DProps {
	gameStats: GameStats;
	setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
	onGameComplete: (finalStats: GameStats) => void;
}

interface GameObject {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	type: 'player' | 'table' | 'debris' | 'exit' | 'hazard' | 'safe_zone';
	color: string;
	interactive?: boolean;
	points?: number;
}

interface GameLevel {
	id: string;
	name: string;
	description: string;
	background: string;
	objects: GameObject[];
	playerStart: { x: number; y: number };
	objective: string;
	timeLimit: number;
	safeZones: { x: number; y: number; width: number; height: number }[];
	hazards: { x: number; y: number; width: number; height: number; damage: number }[];
}

const GAME_LEVELS: GameLevel[] = [
	{
		id: 'home',
		name: '🏠 Living Room Emergency',
		description: 'You\'re relaxing at home when the ground starts shaking! React quickly to stay safe.',
		background: '#f3f4f6',
		playerStart: { x: 50, y: 300 },
		objective: '🛡️ DUCK, COVER & HOLD! Get under the sturdy table before debris falls!',
		timeLimit: 15,
		objects: [
			// Sturdy table (safe zone)
			{ id: 'table1', x: 300, y: 250, width: 120, height: 80, type: 'table', color: '#8b4513', interactive: true, points: 100 },
			// TV (hazard - will fall)
			{ id: 'tv', x: 500, y: 200, width: 100, height: 60, type: 'hazard', color: '#2d2d2d' },
			// Bookshelf (hazard)
			{ id: 'bookshelf', x: 650, y: 150, width: 50, height: 200, type: 'hazard', color: '#654321' },
			// Window (hazard - glass can break)
			{ id: 'window', x: 750, y: 100, width: 100, height: 150, type: 'hazard', color: '#87ceeb' },
			// Couch (not safe enough)
			{ id: 'couch', x: 100, y: 280, width: 150, height: 80, type: 'debris', color: '#8b4513' },
		],
		safeZones: [
			{ x: 300, y: 250, width: 120, height: 80 } // Under the table
		],
		hazards: [
			{ x: 500, y: 200, width: 100, height: 60, damage: 30 }, // TV
			{ x: 650, y: 150, width: 50, height: 200, damage: 40 }, // Bookshelf
			{ x: 750, y: 100, width: 100, height: 150, damage: 20 }, // Window
		]
	},
	{
		id: 'school',
		name: '🏫 Classroom Crisis',
		description: 'You\'re in class when an earthquake strikes! Follow safety protocols immediately.',
		background: '#fff7ed',
		playerStart: { x: 100, y: 200 },
		objective: '📚 Drop to your knees, take cover under a desk, and hold on!',
		timeLimit: 12,
		objects: [
			// Student desks
			{ id: 'desk1', x: 200, y: 180, width: 80, height: 60, type: 'table', color: '#deb887', interactive: true, points: 100 },
			{ id: 'desk2', x: 350, y: 180, width: 80, height: 60, type: 'table', color: '#deb887', interactive: true, points: 100 },
			{ id: 'desk3', x: 500, y: 180, width: 80, height: 60, type: 'table', color: '#deb887', interactive: true, points: 100 },
			// Teacher's desk
			{ id: 'teacher_desk', x: 650, y: 120, width: 100, height: 80, type: 'table', color: '#8b4513', interactive: true, points: 100 },
			// Whiteboard (hazard)
			{ id: 'whiteboard', x: 750, y: 50, width: 120, height: 100, type: 'hazard', color: '#ffffff' },
			// Light fixtures (will fall)
			{ id: 'light1', x: 300, y: 50, width: 60, height: 20, type: 'hazard', color: '#ffff99' },
			{ id: 'light2', x: 550, y: 50, width: 60, height: 20, type: 'hazard', color: '#ffff99' },
		],
		safeZones: [
			{ x: 200, y: 180, width: 80, height: 60 },
			{ x: 350, y: 180, width: 80, height: 60 },
			{ x: 500, y: 180, width: 80, height: 60 },
			{ x: 650, y: 120, width: 100, height: 80 }
		],
		hazards: [
			{ x: 750, y: 50, width: 120, height: 100, damage: 35 },
			{ x: 300, y: 50, width: 60, height: 20, damage: 25 },
			{ x: 550, y: 50, width: 60, height: 20, damage: 25 },
		]
	},
	{
		id: 'outdoor',
		name: '🌳 Outdoor Escape',
		description: 'You\'re walking downtown when buildings start swaying! Navigate to safety.',
		background: '#e5f3ff',
		playerStart: { x: 50, y: 250 },
		objective: '🏃‍♂️ Move away from buildings! Reach the open park area for safety!',
		timeLimit: 20,
		objects: [
			// Buildings (hazards)
			{ id: 'building1', x: 150, y: 50, width: 80, height: 200, type: 'hazard', color: '#696969' },
			{ id: 'building2', x: 300, y: 100, width: 100, height: 150, type: 'hazard', color: '#708090' },
			{ id: 'building3', x: 500, y: 80, width: 90, height: 170, type: 'hazard', color: '#778899' },
			// Trees (hazards)
			{ id: 'tree1', x: 200, y: 280, width: 30, height: 50, type: 'hazard', color: '#228b22' },
			{ id: 'tree2', x: 400, y: 290, width: 30, height: 50, type: 'hazard', color: '#228b22' },
			// Power lines (hazards)
			{ id: 'powerline', x: 250, y: 200, width: 200, height: 10, type: 'hazard', color: '#000000' },
			// Open park area (safe zone)
			{ id: 'park', x: 650, y: 200, width: 200, height: 150, type: 'safe_zone', color: '#90ee90', interactive: true, points: 150 },
		],
		safeZones: [
			{ x: 650, y: 200, width: 200, height: 150 } // Park area
		],
		hazards: [
			{ x: 150, y: 50, width: 80, height: 200, damage: 50 },
			{ x: 300, y: 100, width: 100, height: 150, damage: 50 },
			{ x: 500, y: 80, width: 90, height: 170, damage: 50 },
			{ x: 200, y: 280, width: 30, height: 50, damage: 30 },
			{ x: 400, y: 290, width: 30, height: 50, damage: 30 },
			{ x: 250, y: 200, width: 200, height: 10, damage: 40 },
		]
	}
];

export function Game2D({ gameStats, setGameStats, onGameComplete }: Game2DProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [gameState, setGameState] = useState<'playing' | 'paused' | 'completed' | 'failed'>('playing');
	const [timeLeft, setTimeLeft] = useState(GAME_LEVELS[0]?.timeLimit || 15);
	const [playerPosition, setPlayerPosition] = useState(GAME_LEVELS[0]?.playerStart || { x: 50, y: 300 });
	const [playerHealth, setPlayerHealth] = useState(100);
	const [isShaking, setIsShaking] = useState(true);
	const [debris, setDebris] = useState<Array<{ x: number; y: number; speed: number; id: string }>>([]);
	const [levelComplete, setLevelComplete] = useState(false);
	const [showInstructions, setShowInstructions] = useState(true);

	const level = GAME_LEVELS[currentLevel] || GAME_LEVELS[0];

	const updateGame = useCallback(() => {
		if (!level) return;

		// Update falling debris
		setDebris(prev => prev
			.map(d => ({ ...d, y: d.y + d.speed }))
			.filter(d => d.y < 400) // Remove debris that fell off screen
		);

		// Check collisions with debris
		debris.forEach(d => {
			if (
				playerPosition.x < d.x + 10 &&
				playerPosition.x + 20 > d.x &&
				playerPosition.y < d.y + 10 &&
				playerPosition.y + 20 > d.y
			) {
				setPlayerHealth(prev => {
					const newHealth = Math.max(0, prev - 10);
					if (newHealth <= 0) {
						setGameState('failed');
					}
					return newHealth;
				});
				// Remove the debris that hit the player
				setDebris(prev => prev.filter(debris => debris.id !== d.id));
			}
		});

		// Check if player is in safe zone
		const inSafeZone = level.safeZones?.some(zone => 
			playerPosition.x >= zone.x &&
			playerPosition.x <= zone.x + zone.width &&
			playerPosition.y >= zone.y &&
			playerPosition.y <= zone.y + zone.height
		);

		if (inSafeZone && !levelComplete) {
			setLevelComplete(true);
			setIsShaking(false);
			
			// Award points
			const points = level.objects?.find(obj => obj.interactive)?.points || 100;
			setGameStats(prev => ({
				...prev,
				score: prev.score + points + Math.floor(timeLeft * 5), // Bonus for remaining time
				correctAnswers: prev.correctAnswers + 1,
				totalQuestions: prev.totalQuestions + 1
			}));

			// Move to next level after delay
			setTimeout(() => {
				if (currentLevel + 1 >= GAME_LEVELS.length) {
					onGameComplete(gameStats);
				} else {
					const nextLevel = GAME_LEVELS[currentLevel + 1];
					if (nextLevel) {
						setCurrentLevel(prev => prev + 1);
						setPlayerPosition(nextLevel.playerStart);
						setTimeLeft(nextLevel.timeLimit);
						setLevelComplete(false);
						setIsShaking(true);
						setDebris([]);
						setShowInstructions(true);
					}
				}
			}, 2000);
		}
	}, [debris, playerPosition, level, timeLeft, currentLevel, levelComplete, gameStats, onGameComplete, setGameStats]);

	const renderGame = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas || !level) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas with gradient background
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		if (level.id === 'outdoor') {
			gradient.addColorStop(0, '#87CEEB'); // Sky blue
			gradient.addColorStop(0.7, '#98FB98'); // Light green
			gradient.addColorStop(1, '#228B22'); // Forest green
		} else {
			gradient.addColorStop(0, '#F5F5DC'); // Beige ceiling
			gradient.addColorStop(0.3, '#FFFFFF'); // White walls
			gradient.addColorStop(1, '#8B4513'); // Brown floor
		}
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Earthquake shake effect
		if (isShaking) {
			ctx.save();
			ctx.translate(
				(Math.random() - 0.5) * 6,
				(Math.random() - 0.5) * 6
			);
		}

		// Update and render particles
		const timestamp = Date.now();
		GameRenderer.updateParticles(ctx, 16.67);

		// Draw game objects with enhanced graphics
		level.objects?.forEach(obj => {
			switch (obj.type) {
				case 'table':
					GameRenderer.renderTable(ctx, obj);
					break;
				case 'hazard':
					// Keep specialized hazard rendering for earthquake game
					if (obj.id.includes('building')) {
						// Enhanced building rendering with windows
						ctx.save();
						ctx.fillStyle = '#696969';
						ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
						ctx.fillStyle = '#87CEEB';
						// Windows with frames
						for (let i = 0; i < 3; i++) {
							for (let j = 0; j < Math.floor(obj.height / 40); j++) {
								const winX = obj.x + 10 + i * 25;
								const winY = obj.y + 20 + j * 40;
								// Window frame
								ctx.fillStyle = '#654321';
								ctx.fillRect(winX - 2, winY - 2, 19, 24);
								// Glass
								ctx.fillStyle = '#87CEEB';
								ctx.fillRect(winX, winY, 15, 20);
								// Reflection
								ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
								ctx.fillRect(winX, winY, 7, 10);
							}
						}
						ctx.restore();
					} else if (obj.id.includes('tv')) {
						// Enhanced TV rendering
						ctx.save();
						const gradient = ctx.createLinearGradient(obj.x, obj.y, obj.x, obj.y + obj.height);
						gradient.addColorStop(0, '#4F4F4F');
						gradient.addColorStop(1, '#2F2F2F');
						ctx.fillStyle = gradient;
						ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
						// Screen
						ctx.fillStyle = '#000080';
						ctx.fillRect(obj.x + 5, obj.y + 5, obj.width - 10, obj.height - 15);
						// Power indicator
						ctx.fillStyle = isShaking ? '#FF0000' : '#00FF00';
						ctx.beginPath();
						ctx.arc(obj.x + obj.width - 10, obj.y + obj.height - 5, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.restore();
					} else {
						// Default hazard with warning effect
						ctx.save();
						ctx.fillStyle = obj.color;
						ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
						if (isShaking) {
							ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
							ctx.lineWidth = 2;
							ctx.strokeRect(obj.x - 1, obj.y - 1, obj.width + 2, obj.height + 2);
						}
						ctx.restore();
					}
					break;
				case 'safe_zone':
					// Enhanced park area
					ctx.save();
					ctx.fillStyle = '#90EE90';
					ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
					// Enhanced trees
					for (let i = 0; i < 3; i++) {
						const treeX = obj.x + 20 + i * 60;
						const treeY = obj.y + 30;
						GameRenderer.renderTree(ctx, {
							id: `parktree_${i}`,
							x: treeX - 15,
							y: treeY - 50,
							width: 30,
							height: 70,
							type: 'tree',
							color: '#228B22'
						}, timestamp);
					}
					ctx.restore();
					break;
				default:
					ctx.save();
					ctx.fillStyle = obj.color;
					ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
					ctx.restore();
			}
			
			// Add interactive glow effect
			GameRenderer.addInteractiveGlow(ctx, obj, 1, timestamp);
		});

		// Draw safe zones with animated pulsing effect
		level.safeZones?.forEach(zone => {
			const pulseAlpha = 0.2 + 0.1 * Math.sin(Date.now() * 0.005);
			ctx.fillStyle = `rgba(0, 255, 0, ${pulseAlpha})`;
			ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
			
			// Add safety zone border
			ctx.strokeStyle = '#00FF00';
			ctx.lineWidth = 2;
			ctx.setLineDash([5, 5]);
			ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
			ctx.setLineDash([]);
		});

		// Draw debris with rotation and better graphics
		debris.forEach(d => {
			ctx.save();
			ctx.translate(d.x + 5, d.y + 5);
			ctx.rotate(Date.now() * 0.01);
			
			// Draw falling debris as broken pieces
			ctx.fillStyle = '#8B4513';
			ctx.fillRect(-5, -5, 10, 10);
			ctx.fillStyle = '#A0522D';
			ctx.fillRect(-3, -3, 6, 6);
			ctx.fillStyle = '#654321';
			ctx.fillRect(-2, -2, 4, 4);
			
			ctx.restore();
		});

		// Draw player with enhanced renderer
		const playerState = levelComplete ? 'safe' : 
						   level.safeZones?.some(zone => 
							   playerPosition.x >= zone.x &&
							   playerPosition.x <= zone.x + zone.width &&
							   playerPosition.y >= zone.y &&
							   playerPosition.y <= zone.y + zone.height
						   ) ? 'hiding' : 'running';
		
		GameRenderer.renderPlayer(ctx, playerPosition.x, playerPosition.y, playerHealth, playerState, timestamp);

		// Enhanced particle effects during earthquake
		if (isShaking) {
			// Animated dust clouds
			for (let i = 0; i < 25; i++) {
				const dustX = Math.random() * canvas.width;
				const dustY = Math.random() * canvas.height;
				const dustSize = Math.random() * 4 + 1;
				const opacity = Math.random() * 0.4 + 0.2;
				const movement = Math.sin(timestamp * 0.01 + i) * 2;
				
				ctx.fillStyle = `rgba(139, 69, 19, ${opacity})`;
				ctx.beginPath();
				ctx.arc(dustX + movement, dustY, dustSize, 0, Math.PI * 2);
				ctx.fill();
			}
			
			// Screen shake screen overlay
			const shakeIntensity = Math.sin(timestamp * 0.02) * 0.1;
			ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(shakeIntensity)})`;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			// Enhanced crack lines with branching
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			
			for (let i = 0; i < 8; i++) {
				const startX = Math.random() * canvas.width;
				const crackLength = Math.random() * 80 + 40;
				const branches = Math.floor(Math.random() * 3) + 1;
				
				ctx.beginPath();
				ctx.moveTo(startX, canvas.height - 10);
				
				let currentX = startX;
				let currentY = canvas.height - 10;
				
				for (let j = 0; j < branches; j++) {
					const segmentLength = crackLength / branches;
					const endX = currentX + (Math.random() - 0.5) * 30;
					const endY = currentY - segmentLength;
					
					ctx.lineTo(endX, endY);
					currentX = endX;
					currentY = endY;
				}
				ctx.stroke();
			}
			
			// Falling debris with better physics
			debris.forEach(d => {
				ctx.save();
				ctx.translate(d.x + 5, d.y + 5);
				ctx.rotate(timestamp * 0.008 + d.id.length);
				
				// Enhanced debris with fragments
				const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 8);
				gradient.addColorStop(0, '#8B4513');
				gradient.addColorStop(0.7, '#A0522D');
				gradient.addColorStop(1, '#654321');
				
				ctx.fillStyle = gradient;
				ctx.fillRect(-6, -6, 12, 12);
				
				// Add sparks/dust trail
				for (let i = 0; i < 3; i++) {
					ctx.fillStyle = `rgba(255, 200, 100, ${Math.random() * 0.6})`;
					const sparkX = (Math.random() - 0.5) * 8;
					const sparkY = (Math.random() - 0.5) * 8;
					ctx.fillRect(sparkX, sparkY, 2, 2);
				}
				
				ctx.restore();
			});
		}

		// Enhanced warning indicators with danger zones
		if (isShaking) {
			level.hazards?.forEach(hazard => {
				// Danger zone indicator
				const pulseIntensity = 0.3 + 0.4 * Math.sin(timestamp * 0.015);
				ctx.fillStyle = `rgba(255, 0, 0, ${pulseIntensity * 0.2})`;
				ctx.fillRect(hazard.x - 10, hazard.y - 10, hazard.width + 20, hazard.height + 20);
				
				// Warning icon with glow effect
				ctx.save();
				ctx.translate(hazard.x + hazard.width/2, hazard.y - 25);
				ctx.shadowColor = '#FF0000';
				ctx.shadowBlur = 15 * pulseIntensity;
				ctx.fillStyle = `rgba(255, 0, 0, ${0.8 + 0.2 * Math.sin(timestamp * 0.02)})`;
				ctx.font = 'bold 20px Arial';
				ctx.textAlign = 'center';
				ctx.fillText('⚠️', 0, 0);
				
				// Danger text
				ctx.shadowBlur = 5;
				ctx.fillStyle = `rgba(255, 255, 255, ${pulseIntensity})`;
				ctx.font = 'bold 10px Arial';
				ctx.fillText('DANGER', 0, 15);
				
				ctx.restore();
				
				// Electrical sparks for electronics
				if (hazard.damage > 25 && Math.random() < 0.1) {
					for (let i = 0; i < 3; i++) {
						const sparkX = hazard.x + Math.random() * hazard.width;
						const sparkY = hazard.y + Math.random() * hazard.height;
						
						ctx.strokeStyle = `rgba(255, 255, 0, ${Math.random()})`;
						ctx.lineWidth = 2;
						ctx.beginPath();
						ctx.moveTo(sparkX, sparkY);
						ctx.lineTo(sparkX + (Math.random() - 0.5) * 20, sparkY + (Math.random() - 0.5) * 20);
						ctx.stroke();
					}
				}
			});
		}

		if (isShaking) {
			ctx.restore();
		}
	}, [level, playerPosition, debris, isShaking, levelComplete, playerHealth]);

	// Game loop
	useEffect(() => {
		if (gameState !== 'playing') return;

		const gameLoop = setInterval(() => {
			updateGame();
			renderGame();
		}, 1000 / 60); // 60 FPS

		return () => clearInterval(gameLoop);
	}, [gameState, updateGame, renderGame]);

	// Timer
	useEffect(() => {
		if (gameState !== 'playing') return;

		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) {
					setGameState('failed');
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [gameState]);

	// Earthquake shaking effect
	useEffect(() => {
		if (!isShaking || !level?.hazards?.length) return;

		const shakeInterval = setInterval(() => {
			// Create falling debris
			if (Math.random() < 0.3) {
				const hazard = level.hazards[Math.floor(Math.random() * level.hazards.length)];
				if (hazard) {
					setDebris(prev => [...prev, {
						x: hazard.x + Math.random() * hazard.width,
						y: hazard.y,
						speed: 2 + Math.random() * 3,
						id: `debris_${Date.now()}_${Math.random()}`
					}]);
				}
			}
		}, 1000);

		return () => clearInterval(shakeInterval);
	}, [isShaking, level]);

	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if (gameState !== 'playing' || levelComplete) return;

		const moveSpeed = 5;
		const newPosition = { ...playerPosition };

		switch (e.key) {
			case 'ArrowUp':
			case 'w':
				newPosition.y = Math.max(0, newPosition.y - moveSpeed);
				break;
			case 'ArrowDown':
			case 's':
				newPosition.y = Math.min(360, newPosition.y + moveSpeed);
				break;
			case 'ArrowLeft':
			case 'a':
				newPosition.x = Math.max(0, newPosition.x - moveSpeed);
				break;
			case 'ArrowRight':
			case 'd':
				newPosition.x = Math.min(860, newPosition.x + moveSpeed);
				break;
		}

		setPlayerPosition(newPosition);
	}, [gameState, playerPosition, levelComplete]);

	// Add keyboard listeners
	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	const handleRestart = () => {
		const firstLevel = GAME_LEVELS[0];
		if (!firstLevel) return;

		setCurrentLevel(0);
		setGameState('playing');
		setTimeLeft(firstLevel.timeLimit);
		setPlayerPosition(firstLevel.playerStart);
		setPlayerHealth(100);
		setIsShaking(true);
		setDebris([]);
		setLevelComplete(false);
		setShowInstructions(true);
		setGameStats(prev => ({
			...prev,
			lives: Math.max(0, prev.lives - 1),
			totalQuestions: prev.totalQuestions + 1
		}));
	};

	if (gameState === 'failed') {
		return (
			<div className="max-w-4xl mx-auto text-center">
				<div className="bg-card rounded-lg border p-8">
					<AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
					<h3 className="text-2xl font-bold mb-4 text-red-600">Emergency Response Failed!</h3>
					<p className="text-lg text-muted-foreground mb-6">
						{playerHealth <= 0 
							? "You were injured by falling debris. Remember: safety first!"
							: "Time ran out! In real emergencies, quick action saves lives."
						}
					</p>
					<div className="flex gap-4 justify-center">
						<Button onClick={handleRestart} size="lg">
							<RotateCcw className="w-5 h-5 mr-2" />
							Try Again
						</Button>
						<Button onClick={() => onGameComplete(gameStats)} variant="outline" size="lg">
							End Game
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto">
			{/* Enhanced Game Header */}
			<div className="bg-card rounded-lg border p-4 mb-4">
				<div className="flex justify-between items-start mb-3">
					<div>
						<h3 className="text-xl font-bold">{level?.name || 'Loading...'}</h3>
						<p className="text-sm text-muted-foreground">{level?.description || ''}</p>
					</div>
					
					{/* Safe zone distance indicator */}
					{level && level.safeZones.length > 0 && (
						<SafeZoneIndicator
							distance={Math.round(Math.min(
								...level.safeZones.map(zone => 
									Math.sqrt(
										Math.pow(playerPosition.x - (zone.x + zone.width/2), 2) + 
										Math.pow(playerPosition.y - (zone.y + zone.height/2), 2)
									)
								)
							))}
							direction={(level.safeZones[0]?.x ?? 0) > playerPosition.x ? 'right' : 'left'}
							isInSafeZone={level.safeZones.some(zone => 
								playerPosition.x >= zone.x &&
								playerPosition.x <= zone.x + zone.width &&
								playerPosition.y >= zone.y &&
								playerPosition.y <= zone.y + zone.height
							)}
						/>
					)}
				</div>
				
				<div className="flex flex-wrap items-center gap-3 mb-3">
					<div className="flex items-center space-x-2 bg-yellow-500/10 rounded-lg px-3 py-2">
						<Trophy className="w-5 h-5 text-yellow-500" />
						<span className="font-bold text-yellow-600">{gameStats.score}</span>
					</div>
					<TimerDisplay 
						timeLeft={timeLeft} 
						totalTime={level?.timeLimit || 15} 
						isUrgent={timeLeft <= 5}
					/>
					<HealthBar health={playerHealth} animated={true} />
				</div>
				
				<ObjectiveDisplay 
					objective={level?.objective || 'Loading objective...'}
					isComplete={levelComplete}
				/>
			</div>

			{/* Instructions */}
			{showInstructions && (
				<div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
					<div className="flex justify-between items-start">
						<div>
							<h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">How to Play</h4>
							<ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
								<li>• Use <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">WASD</kbd> or <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">Arrow Keys</kbd> to move</li>
								<li>• Avoid falling debris (brown squares)</li>
								<li>• Reach the green safe zones to complete the level</li>
								<li>• Green-bordered objects are interactive safe spots</li>
							</ul>
						</div>
						<Button 
							size="sm" 
							variant="outline" 
							onClick={() => setShowInstructions(false)}
						>
							Got it!
						</Button>
					</div>
				</div>
			)}

			{/* Game Canvas */}
			<div className="relative bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border-4 border-slate-300 dark:border-slate-700 overflow-hidden shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 pointer-events-none"></div>
				<canvas
					ref={canvasRef}
					width={900}
					height={400}
					className="block relative z-10"
					style={{ 
						imageRendering: 'pixelated',
						filter: isShaking ? 'blur(0.5px)' : 'none'
					}}
				/>
				
				{/* Earthquake intensity indicator */}
				<div className="absolute top-2 left-2 flex items-center space-x-2 bg-black/40 rounded-lg px-3 py-2 backdrop-blur-sm">
					<AlertTriangle className={`w-5 h-5 ${isShaking ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`} />
					<span className="text-white text-sm font-bold">
						{isShaking ? 'EARTHQUAKE!' : 'SAFE'}
					</span>
				</div>
				
				{/* Mini Map */}
				{level && (
					<div className="absolute bottom-2 right-2">
						<MiniMap
							playerPosition={playerPosition}
							safeZones={level.safeZones || []}
							hazards={level.hazards || []}
							canvasSize={{ width: 900, height: 400 }}
						/>
					</div>
				)}
			</div>

			{/* Level Progress Indicator */}
			<div className="mt-4 bg-card rounded-lg border p-4">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium">Level Progress</span>
					<span className="text-sm text-muted-foreground">
						{currentLevel + 1} / {GAME_LEVELS.length}
					</span>
				</div>
				<div className="flex space-x-2">
					{GAME_LEVELS.map((_, index) => (
						<div
							key={index}
							className={`h-2 flex-1 rounded-full ${
								index < currentLevel 
									? 'bg-green-500' 
									: index === currentLevel 
										? levelComplete 
											? 'bg-green-500' 
											: 'bg-blue-500'
										: 'bg-gray-300 dark:bg-gray-600'
							}`}
						/>
					))}
				</div>
			</div>

			{/* Level Complete */}
			{levelComplete && (
				<div className="mt-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6 text-center animate-pulse">
					<CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
					<h4 className="font-bold text-xl text-green-700 dark:text-green-400 mb-2">🎉 Level Complete!</h4>
					<p className="text-green-600 dark:text-green-300 mb-2">
						Excellent earthquake response! You followed proper safety protocols.
					</p>
					<p className="text-sm text-green-600 dark:text-green-300">
						{currentLevel + 1 < GAME_LEVELS.length ? '🔄 Loading next scenario...' : '🏆 All scenarios completed!'}
					</p>
				</div>
			)}

			{/* Game Controls */}
			<div className="mt-4 flex justify-center space-x-4">
				<Button 
					onClick={() => setGameState(gameState === 'paused' ? 'playing' : 'paused')}
					variant="outline"
				>
					{gameState === 'paused' ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
					{gameState === 'paused' ? 'Resume' : 'Pause'}
				</Button>
				<Button onClick={handleRestart} variant="outline">
					<RotateCcw className="w-4 h-4 mr-2" />
					Restart Level
				</Button>
			</div>
		</div>
	);
}