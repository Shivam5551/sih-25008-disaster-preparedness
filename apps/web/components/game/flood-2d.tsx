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
	CheckCircle,
	Droplets,
	Navigation
} from 'lucide-react';
import { GameStats } from './game-types';
import { GameRenderer } from './game-renderer';
import { HealthBar, StaminaBar, TimerDisplay, ObjectiveDisplay, WaterLevelIndicator, MiniMap } from './enhanced-ui';

interface FloodGame2DProps {
	gameStats: GameStats;
	setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
	onGameComplete: (finalStats: GameStats) => void;
}

interface FloodGameObject {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	type: 'player' | 'car' | 'house' | 'tree' | 'boat' | 'shelter' | 'debris' | 'rescue_point' | 'high_ground';
	color: string;
	interactive?: boolean;
	points?: number;
	floats?: boolean;
}

interface FloodLevel {
	id: string;
	name: string;
	description: string;
	background: string;
	objects: FloodGameObject[];
	playerStart: { x: number; y: number };
	objective: string;
	timeLimit: number;
	initialWaterLevel: number;
	maxWaterLevel: number;
	waterRiseSpeed: number;
	safeZones: { x: number; y: number; width: number; height: number; elevation: number }[];
	rescuePoints: { x: number; y: number; width: number; height: number }[];
	currentFlow: { x: number; y: number };
}

const FLOOD_LEVELS: FloodLevel[] = [
	{
		id: 'residential',
		name: '🏘️ Residential Area Flood',
		description: 'Heavy rains have caused street flooding in your neighborhood. Get to higher ground!',
		background: '#87CEEB',
		playerStart: { x: 100, y: 200 },
		objective: '🏠 Get to the 2-story house or evacuation shelter before water gets too deep!',
		timeLimit: 25,
		initialWaterLevel: 350,
		maxWaterLevel: 250,
		waterRiseSpeed: 2,
		currentFlow: { x: 1, y: 0 },
		objects: [
			// Ground level house (will flood)
			{ id: 'house1', x: 150, y: 280, width: 100, height: 80, type: 'house', color: '#8B4513', interactive: false },
			// Two-story house (safe)
			{ id: 'house2', x: 400, y: 220, width: 120, height: 140, type: 'shelter', color: '#654321', interactive: true, points: 150 },
			// Cars (obstacles, will float)
			{ id: 'car1', x: 250, y: 320, width: 60, height: 30, type: 'car', color: '#FF4444', floats: true },
			{ id: 'car2', x: 500, y: 330, width: 60, height: 30, type: 'car', color: '#4444FF', floats: true },
			// Trees (can climb for temporary safety)
			{ id: 'tree1', x: 350, y: 250, width: 30, height: 80, type: 'tree', color: '#228B22', interactive: true, points: 50 },
			{ id: 'tree2', x: 650, y: 270, width: 30, height: 80, type: 'tree', color: '#228B22', interactive: true, points: 50 },
			// Evacuation shelter (ultimate safety)
			{ id: 'shelter', x: 700, y: 180, width: 150, height: 100, type: 'shelter', color: '#FF6B35', interactive: true, points: 200 },
			// Debris
			{ id: 'debris1', x: 300, y: 340, width: 40, height: 20, type: 'debris', color: '#8B4513', floats: true },
		],
		safeZones: [
			{ x: 400, y: 220, width: 120, height: 140, elevation: 2 }, // Two-story house
			{ x: 700, y: 180, width: 150, height: 100, elevation: 3 }, // Evacuation shelter
		],
		rescuePoints: [
			{ x: 700, y: 180, width: 150, height: 100 },
		]
	},
	{
		id: 'urban',
		name: '🏙️ Urban Flash Flood',
		description: 'Sudden urban flooding from blocked storm drains. Navigate through the city to safety.',
		background: '#696969',
		playerStart: { x: 50, y: 300 },
		objective: '🚁 Reach the helicopter landing pad on the tall building roof!',
		timeLimit: 30,
		initialWaterLevel: 380,
		maxWaterLevel: 200,
		waterRiseSpeed: 1.5,
		currentFlow: { x: 2, y: 0 },
		objects: [
			// Ground level buildings
			{ id: 'building1', x: 120, y: 200, width: 80, height: 160, type: 'house', color: '#708090' },
			{ id: 'building2', x: 250, y: 180, width: 100, height: 180, type: 'house', color: '#778899' },
			// Tall building with helipad (safe zone)
			{ id: 'tallbuilding', x: 600, y: 100, width: 120, height: 260, type: 'shelter', color: '#2F4F4F', interactive: true, points: 300 },
			// Vehicles that will float
			{ id: 'bus', x: 300, y: 320, width: 100, height: 40, type: 'car', color: '#FFD700', floats: true },
			{ id: 'truck', x: 450, y: 330, width: 80, height: 35, type: 'car', color: '#FF6347', floats: true },
			// Rescue boat
			{ id: 'boat', x: 400, y: 200, width: 60, height: 30, type: 'boat', color: '#FF8C00', interactive: true, points: 100, floats: true },
			// Street furniture and debris
			{ id: 'bench', x: 180, y: 340, width: 50, height: 20, type: 'debris', color: '#8B4513', floats: true },
			{ id: 'signpost', x: 380, y: 320, width: 10, height: 40, type: 'tree', color: '#696969', interactive: true, points: 25 },
		],
		safeZones: [
			{ x: 600, y: 100, width: 120, height: 260, elevation: 5 }, // Tall building
		],
		rescuePoints: [
			{ x: 600, y: 100, width: 120, height: 40 }, // Helipad
		]
	},
	{
		id: 'riverside',
		name: '🌊 River Overflow Emergency',
		description: 'The river has burst its banks! Swift current and rising water threaten the area.',
		background: '#4682B4',
		playerStart: { x: 80, y: 280 },
		objective: '⛵ Use the rescue boat to reach the emergency shelter on high ground!',
		timeLimit: 35,
		initialWaterLevel: 360,
		maxWaterLevel: 180,
		waterRiseSpeed: 1,
		currentFlow: { x: 3, y: 0.5 },
		objects: [
			// Riverside cabin (will flood quickly)
			{ id: 'cabin', x: 150, y: 300, width: 80, height: 60, type: 'house', color: '#8B4513' },
			// Bridge (partially safe)
			{ id: 'bridge', x: 300, y: 250, width: 200, height: 20, type: 'tree', color: '#654321', interactive: true, points: 75 },
			// Emergency shelter on hill
			{ id: 'emergency_shelter', x: 650, y: 150, width: 180, height: 120, type: 'shelter', color: '#DC143C', interactive: true, points: 400 },
			// Rescue boats
			{ id: 'boat1', x: 250, y: 200, width: 70, height: 35, type: 'boat', color: '#FF4500', interactive: true, points: 150, floats: true },
			{ id: 'boat2', x: 450, y: 220, width: 70, height: 35, type: 'boat', color: '#FF6347', interactive: true, points: 150, floats: true },
			// Trees along riverbank
			{ id: 'rivertree1', x: 200, y: 220, width: 25, height: 60, type: 'tree', color: '#228B22', interactive: true, points: 40 },
			{ id: 'rivertree2', x: 380, y: 200, width: 25, height: 60, type: 'tree', color: '#228B22', interactive: true, points: 40 },
			// Floating debris from upstream
			{ id: 'log1', x: 100, y: 250, width: 60, height: 15, type: 'debris', color: '#8B4513', floats: true },
			{ id: 'log2', x: 520, y: 280, width: 50, height: 15, type: 'debris', color: '#8B4513', floats: true },
		],
		safeZones: [
			{ x: 300, y: 250, width: 200, height: 20, elevation: 2 }, // Bridge
			{ x: 650, y: 150, width: 180, height: 120, elevation: 4 }, // Emergency shelter
		],
		rescuePoints: [
			{ x: 650, y: 150, width: 180, height: 120 },
		]
	}
];

export function FloodGame2D({ gameStats, setGameStats, onGameComplete }: FloodGame2DProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [gameState, setGameState] = useState<'playing' | 'paused' | 'completed' | 'failed'>('playing');
	const [timeLeft, setTimeLeft] = useState(FLOOD_LEVELS[0]?.timeLimit || 25);
	const [playerPosition, setPlayerPosition] = useState(FLOOD_LEVELS[0]?.playerStart || { x: 50, y: 300 });
	const [waterLevel, setWaterLevel] = useState(FLOOD_LEVELS[0]?.initialWaterLevel || 350);
	const [playerHealth, setPlayerHealth] = useState(100);
	const [isSwimming, setIsSwimming] = useState(false);
	const [floatingObjects, setFloatingObjects] = useState<Array<{ id: string; x: number; y: number; vx: number; vy: number }>>([]);
	const [levelComplete, setLevelComplete] = useState(false);
	const [showInstructions, setShowInstructions] = useState(true);
	const [playerStamina, setPlayerStamina] = useState(100);

	const level = FLOOD_LEVELS[currentLevel] || FLOOD_LEVELS[0];

	// Game update logic
	const updateGame = useCallback(() => {
		if (!level) return;

		// Update floating objects
		setFloatingObjects(prev => {
			return level.objects
				.filter(obj => obj.floats && waterLevel < obj.y + obj.height)
				.map(obj => {
					const existing = prev.find(f => f.id === obj.id);
					if (existing) {
						return {
							...existing,
							x: existing.x + level.currentFlow.x + (Math.random() - 0.5) * 0.5,
							y: Math.min(existing.y, waterLevel - obj.height),
							vx: level.currentFlow.x * 0.8,
							vy: existing.vy * 0.9
						};
					} else {
						return {
							id: obj.id,
							x: obj.x,
							y: Math.min(obj.y, waterLevel - obj.height),
							vx: level.currentFlow.x,
							vy: 0
						};
					}
				});
		});

		// Check if player reached safe zone
		const inSafeZone = level.safeZones.some(zone => 
			playerPosition.x >= zone.x &&
			playerPosition.x <= zone.x + zone.width &&
			playerPosition.y >= zone.y &&
			playerPosition.y <= zone.y + zone.height &&
			waterLevel > zone.y + zone.height - (zone.elevation * 30) // Account for elevation
		);

		// Check if player reached rescue point
		const atRescuePoint = level.rescuePoints.some(point =>
			playerPosition.x >= point.x &&
			playerPosition.x <= point.x + point.width &&
			playerPosition.y >= point.y &&
			playerPosition.y <= point.y + point.height
		);

		if ((inSafeZone || atRescuePoint) && !levelComplete) {
			setLevelComplete(true);
			
			// Award points
			const basePoints = 200;
			const timeBonus = Math.floor(timeLeft * 3);
			const healthBonus = Math.floor(playerHealth * 2);
			const staminaBonus = Math.floor(playerStamina);
			
			setGameStats(prev => ({
				...prev,
				score: prev.score + basePoints + timeBonus + healthBonus + staminaBonus,
				correctAnswers: prev.correctAnswers + 1,
				totalQuestions: prev.totalQuestions + 1
			}));

			// Move to next level after delay
			setTimeout(() => {
				if (currentLevel + 1 >= FLOOD_LEVELS.length) {
					onGameComplete(gameStats);
				} else {
					const nextLevel = FLOOD_LEVELS[currentLevel + 1];
					if (nextLevel) {
						setCurrentLevel(prev => prev + 1);
						setPlayerPosition(nextLevel.playerStart);
						setTimeLeft(nextLevel.timeLimit);
						setWaterLevel(nextLevel.initialWaterLevel);
						setLevelComplete(false);
						setFloatingObjects([]);
						setShowInstructions(true);
						setPlayerHealth(100);
						setPlayerStamina(100);
						setIsSwimming(false);
					}
				}
			}, 2000);
		}

		// Check for health loss conditions
		if (playerHealth <= 0) {
			setGameState('failed');
		}

		// Check if water level is too high and player isn't in safe zone
		if (waterLevel < playerPosition.y - 50 && !inSafeZone && !atRescuePoint) {
			setPlayerHealth(prev => Math.max(0, prev - 0.1));
		}

	}, [level, playerPosition, waterLevel, timeLeft, currentLevel, levelComplete, gameStats, onGameComplete, playerHealth, playerStamina, setGameStats]);

	// Game rendering logic
	const renderGame = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas || !level) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas with sky gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, '#87CEEB'); // Sky blue
		gradient.addColorStop(0.6, '#E0F6FF'); // Light blue
		gradient.addColorStop(1, '#4682B4'); // Steel blue
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Update and render particles
		const timestamp = Date.now();
		GameRenderer.updateParticles(ctx, 16.67); // ~60fps

		// Draw ground/buildings before water
		level.objects?.forEach(obj => {
			// Check if object is floating
			const floating = floatingObjects.find(f => f.id === obj.id);
			const enhancedObj = {
				...obj,
				x: floating ? floating.x : obj.x,
				y: floating ? floating.y : obj.y,
			};
			
			// Use enhanced renderer based on type
			switch (obj.type) {
				case 'house':
					GameRenderer.renderHouse(ctx, enhancedObj, timestamp);
					break;
				case 'shelter':
					GameRenderer.renderShelter(ctx, enhancedObj, timestamp);
					break;
				case 'car':
					GameRenderer.renderCar(ctx, enhancedObj, !!floating, timestamp);
					break;
				case 'boat':
					GameRenderer.renderBoat(ctx, enhancedObj, timestamp);
					break;
				case 'tree':
					GameRenderer.renderTree(ctx, enhancedObj, timestamp);
					break;
				default:
					// Fallback to basic rendering
					ctx.save();
					ctx.fillStyle = obj.color;
					ctx.fillRect(enhancedObj.x, enhancedObj.y, obj.width, obj.height);
					ctx.restore();
			}
			
			// Add interactive glow effect
			GameRenderer.addInteractiveGlow(ctx, enhancedObj, 1, timestamp);
		});

		// Enhanced water rendering with multiple layers
		const waveOffset = timestamp * 0.003;
		
		// Main water body with gradient
		const waterGradient = ctx.createLinearGradient(0, waterLevel, 0, canvas.height);
		waterGradient.addColorStop(0, 'rgba(0, 150, 255, 0.8)');
		waterGradient.addColorStop(0.5, 'rgba(0, 100, 200, 0.9)');
		waterGradient.addColorStop(1, 'rgba(0, 50, 150, 1)');
		ctx.fillStyle = waterGradient;
		
		ctx.beginPath();
		ctx.moveTo(0, waterLevel);
		for (let x = 0; x <= canvas.width; x += 8) {
			const waveHeight = Math.sin(x * 0.02 + waveOffset) * 6 + Math.sin(x * 0.05 + waveOffset * 1.5) * 2;
			ctx.lineTo(x, waterLevel + waveHeight);
		}
		ctx.lineTo(canvas.width, canvas.height);
		ctx.lineTo(0, canvas.height);
		ctx.closePath();
		ctx.fill();

		// Water surface reflections and foam
		ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
		ctx.beginPath();
		ctx.moveTo(0, waterLevel);
		for (let x = 0; x <= canvas.width; x += 12) {
			const waveHeight = Math.sin(x * 0.03 + waveOffset * 2) * 4;
			ctx.lineTo(x, waterLevel + waveHeight - 2);
		}
		ctx.lineTo(canvas.width, waterLevel - 2);
		ctx.closePath();
		ctx.fill();

		// Foam bubbles and splash effects
		for (let i = 0; i < 15; i++) {
			const bubbleX = (timestamp * 0.05 + i * 60) % canvas.width;
			const bubbleY = waterLevel + Math.sin(timestamp * 0.008 + i) * 8;
			const bubbleSize = 2 + Math.sin(timestamp * 0.01 + i) * 1;
			
			ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(timestamp * 0.01 + i) * 0.2})`;
			ctx.beginPath();
			ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
			ctx.fill();
		}

		// Enhanced current flow indicators with particle trails
		if (level.currentFlow.x > 0) {
			// Main current arrows
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			
			for (let i = 0; i < 8; i++) {
				const x = (timestamp * 0.15 + i * 120) % (canvas.width + 40) - 20;
				const y = waterLevel + 15 + Math.sin(timestamp * 0.005 + i) * 5;
				const opacity = Math.max(0, Math.min(1, (canvas.width - Math.abs(x - canvas.width/2)) / (canvas.width/2)));
				
				ctx.globalAlpha = opacity * 0.8;
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + 25, y);
				// Arrow head
				ctx.moveTo(x + 20, y - 4);
				ctx.lineTo(x + 25, y);
				ctx.lineTo(x + 20, y + 4);
				ctx.stroke();
			}
			
			// Water particles showing current
			ctx.globalAlpha = 0.6;
			for (let i = 0; i < 20; i++) {
				const particleX = (timestamp * 0.2 + i * 45) % (canvas.width + 20) - 10;
				const particleY = waterLevel + 5 + Math.sin(timestamp * 0.008 + i) * 10;
				const size = 1 + Math.sin(timestamp * 0.01 + i) * 0.5;
				
				ctx.fillStyle = 'rgba(173, 216, 230, 0.8)';
				ctx.beginPath();
				ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
		}

		// Draw safe zones with elevation indicators
		level.safeZones?.forEach(zone => {
			if (waterLevel > zone.y + zone.height - (zone.elevation * 30)) {
				const pulseAlpha = 0.3 + 0.2 * Math.sin(Date.now() * 0.005);
				ctx.fillStyle = `rgba(0, 255, 0, ${pulseAlpha})`;
				ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
				
				// Elevation indicator
				ctx.fillStyle = '#00FF00';
				ctx.font = 'bold 12px Arial';
				ctx.textAlign = 'center';
				ctx.fillText(`${zone.elevation}F`, zone.x + zone.width/2, zone.y - 5);
			}
		});

		// Draw player with enhanced renderer
		const playerState = levelComplete ? 'safe' : 
						   isSwimming ? 'swimming' : 
						   'running';
		GameRenderer.renderPlayer(ctx, playerPosition.x, playerPosition.y, playerHealth, playerState, timestamp);

		// Draw water level indicator
		ctx.fillStyle = 'rgba(0, 100, 200, 0.8)';
		ctx.fillRect(10, 10, 20, 200);
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(12, 12, 16, 196);
		
		const waterHeight = ((level.initialWaterLevel - waterLevel) / (level.initialWaterLevel - level.maxWaterLevel)) * 192;
		ctx.fillStyle = '#0066CC';
		ctx.fillRect(12, 208 - waterHeight, 16, waterHeight);
		
		ctx.fillStyle = '#000000';
		ctx.font = '10px Arial';
		ctx.fillText('Water', 35, 20);
		ctx.fillText('Level', 35, 32);

		// Draw stamina bar if swimming
		if (isSwimming) {
			ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
			ctx.fillRect(playerPosition.x - 15, playerPosition.y - 25, 50, 6);
			ctx.fillStyle = '#FFD700';
			ctx.fillRect(playerPosition.x - 14, playerPosition.y - 24, (playerStamina / 100) * 48, 4);
			
			ctx.fillStyle = '#000000';
			ctx.font = '8px Arial';
			ctx.fillText('Stamina', playerPosition.x - 10, playerPosition.y - 28);
		}

	}, [level, playerPosition, waterLevel, isSwimming, levelComplete, playerHealth, playerStamina, floatingObjects]);

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

	// Water level rise
	useEffect(() => {
		if (gameState !== 'playing' || !level) return;

		const waterTimer = setInterval(() => {
			setWaterLevel(prev => {
				const newLevel = Math.max(level.maxWaterLevel, prev - level.waterRiseSpeed);
				
				// Check if player is drowning
				if (playerPosition.y + 20 > newLevel && playerPosition.y + 20 < newLevel + 50) {
					setIsSwimming(true);
					// Swimming drains stamina
					setPlayerStamina(stamina => {
						const newStamina = Math.max(0, stamina - 0.5);
						if (newStamina <= 0) {
							setPlayerHealth(health => Math.max(0, health - 2));
						}
						return newStamina;
					});
				} else {
					setIsSwimming(false);
					// Recover stamina on dry land
					setPlayerStamina(stamina => Math.min(100, stamina + 1));
				}

				return newLevel;
			});
		}, 100);

		return () => clearInterval(waterTimer);
	}, [gameState, level, playerPosition]);


	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if (gameState !== 'playing' || levelComplete) return;

		const moveSpeed = isSwimming ? 3 : 5; // Slower movement in water
		const newPosition = { ...playerPosition };

		switch (e.key) {
			case 'ArrowUp':
			case 'w': {
				newPosition.y = Math.max(0, newPosition.y - moveSpeed);
				break;
			}
			case 'ArrowDown':
			case 's': {
				newPosition.y = Math.min(360, newPosition.y + moveSpeed);
				break;
			}
			case 'ArrowLeft':
			case 'a': {
				// Swimming against current is harder
				const resistance = isSwimming ? (level?.currentFlow.x ?? 0) * 0.5 : 0;
				newPosition.x = Math.max(0, newPosition.x - moveSpeed + resistance);
				break;
			}
			case 'ArrowRight':
			case 'd': {
				// Swimming with current is easier
				const assistance = isSwimming ? (level?.currentFlow.x ?? 0) * 0.5 : 0;
				newPosition.x = Math.min(860, newPosition.x + moveSpeed + assistance);
				break;
			}
		}

		setPlayerPosition(newPosition);
	}, [gameState, playerPosition, levelComplete, isSwimming, level]);

	// Add keyboard listeners
	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	const handleRestart = () => {
		const firstLevel = FLOOD_LEVELS[0];
		if (!firstLevel) return;

		setCurrentLevel(0);
		setGameState('playing');
		setTimeLeft(firstLevel.timeLimit);
		setPlayerPosition(firstLevel.playerStart);
		setWaterLevel(firstLevel.initialWaterLevel);
		setPlayerHealth(100);
		setPlayerStamina(100);
		setIsSwimming(false);
		setFloatingObjects([]);
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
					<h3 className="text-2xl font-bold mb-4 text-red-600">Flood Emergency Failed!</h3>
					<p className="text-lg text-muted-foreground mb-6">
						{playerHealth <= 0 
							? "The flood waters were too dangerous. Remember: never underestimate flood risks!"
							: "Time ran out! In real floods, every second counts for evacuation."
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
					
					{level && (
						<WaterLevelIndicator
							currentLevel={waterLevel}
							maxLevel={level.maxWaterLevel}
							minLevel={level.initialWaterLevel}
							risingSpeed={level.waterRiseSpeed}
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
						totalTime={level?.timeLimit || 30} 
						isUrgent={timeLeft <= 10}
					/>
					<HealthBar health={playerHealth} animated={true} />
					{isSwimming && (
						<StaminaBar stamina={playerStamina} isActive={true} />
					)}
				</div>
				
				<ObjectiveDisplay 
					objective={level?.objective || 'Loading objective...'}
					isComplete={levelComplete}
				/>
			</div>

			{/* Instructions */}
			{showInstructions && (
				<div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-4">
					<div className="flex justify-between items-start">
						<div>
							<h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">🌊 Flood Safety Instructions</h4>
							<ul className="text-sm text-cyan-600 dark:text-cyan-300 space-y-1">
								<li>• Use <kbd className="px-1 py-0.5 bg-cyan-200 dark:bg-cyan-800 rounded text-xs">WASD</kbd> or <kbd className="px-1 py-0.5 bg-cyan-200 dark:bg-cyan-800 rounded text-xs">Arrow Keys</kbd> to move</li>
								<li>• 💧 Rising water slows movement and drains stamina</li>
								<li>• 🏠 Reach elevated safe zones before water gets too high</li>
								<li>• ⛵ Use boats and rescue vehicles when available</li>
								<li>• 🌊 Current flows will push you - plan accordingly!</li>
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
			<div className="relative bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border-4 border-cyan-300 dark:border-cyan-700 overflow-hidden shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
				<canvas
					ref={canvasRef}
					width={900}
					height={400}
					className="block relative z-10"
					style={{ 
						imageRendering: 'pixelated'
					}}
				/>
				
				{/* Enhanced overlay indicators */}
				<div className="absolute top-2 left-2 flex items-center space-x-2 bg-black/20 rounded px-2 py-1">
					<Droplets className="w-4 h-4 text-cyan-400" />
					<span className="text-white text-xs font-bold">
						{level ? Math.round(((level.initialWaterLevel - waterLevel) / ((level.initialWaterLevel - (level.maxWaterLevel ?? 1)) || 1)) * 100) : 0}%
					</span>
				</div>
				<div className="absolute top-2 right-2 flex items-center space-x-2 bg-black/20 rounded px-2 py-1">
					<Navigation className="w-4 h-4 text-white" />
					<span className="text-white text-xs">Current: {level?.currentFlow.x.toFixed(1) ?? '0.0'} m/s</span>
				</div>
				
				{/* Mini Map */}
				{level && (
					<div className="absolute bottom-2 right-2">
						<MiniMap
							playerPosition={playerPosition}
							safeZones={level.safeZones || []}
							hazards={level.objects?.filter(obj => obj.type === 'debris' || obj.type === 'car').map(obj => ({
								x: obj.x,
								y: obj.y,
								width: obj.width,
								height: obj.height
							})) || []}
							canvasSize={{ width: 900, height: 400 }}
							waterLevel={waterLevel}
						/>
					</div>
				)}
			</div>

			{/* Level Progress Indicator */}
			<div className="mt-4 bg-card rounded-lg border p-4">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium">Flood Response Progress</span>
					<span className="text-sm text-muted-foreground">
						{currentLevel + 1} / {FLOOD_LEVELS.length}
					</span>
				</div>
				<div className="flex space-x-2">
					{FLOOD_LEVELS.map((_, index) => (
						<div
							key={index}
							className={`h-2 flex-1 rounded-full ${
								index < currentLevel 
									? 'bg-cyan-500' 
									: index === currentLevel 
										? levelComplete 
											? 'bg-cyan-500' 
											: 'bg-blue-500'
										: 'bg-gray-300 dark:bg-gray-600'
							}`}
						/>
					))}
				</div>
			</div>

			{/* Level Complete */}
			{levelComplete && (
				<div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 text-center animate-pulse">
					<CheckCircle className="w-12 h-12 mx-auto mb-3 text-cyan-500" />
					<h4 className="font-bold text-xl text-cyan-700 dark:text-cyan-400 mb-2">🏆 Flood Response Complete!</h4>
					<p className="text-cyan-600 dark:text-cyan-300 mb-2">
						Excellent work! You safely navigated the flood emergency.
					</p>
					<p className="text-sm text-cyan-600 dark:text-cyan-300">
						{currentLevel + 1 < FLOOD_LEVELS.length ? '🌊 Loading next flood scenario...' : '🥇 All flood scenarios mastered!'}
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