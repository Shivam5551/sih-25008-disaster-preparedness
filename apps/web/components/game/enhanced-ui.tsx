/**
 * Enhanced UI components for both earthquake and flood games
 * Provides better health bars, progress indicators, and game feedback
 */

import React from 'react';
import { Heart, Droplets, Timer, AlertTriangle, Shield, Target } from 'lucide-react';

interface HealthBarProps {
  health: number;
  maxHealth?: number;
  animated?: boolean;
  showNumbers?: boolean;
}

export function HealthBar({ health, maxHealth = 100, animated = true, showNumbers = true }: HealthBarProps) {
  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const isLowHealth = healthPercent < 30;
  const isCriticalHealth = healthPercent < 15;

  return (
    <div className="flex items-center space-x-2 bg-black/40 rounded-lg px-3 py-2 backdrop-blur-sm">
      <Heart 
        className={`w-5 h-5 ${
          isCriticalHealth ? 'text-red-500 animate-pulse' : 
          isLowHealth ? 'text-orange-500' : 'text-red-400'
        }`} 
      />
      <div className="relative w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-30" />
        
        {/* Health fill */}
        <div 
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
            animated ? 'transition-all duration-500 ease-out' : ''
          } ${
            isCriticalHealth ? 'bg-gradient-to-r from-red-600 to-red-500 animate-pulse' :
            isLowHealth ? 'bg-gradient-to-r from-orange-500 to-red-500' :
            'bg-gradient-to-r from-green-500 to-green-400'
          }`}
          style={{ width: `${healthPercent}%` }}
        />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
      
      {showNumbers && (
        <span className={`text-sm font-bold ${
          isCriticalHealth ? 'text-red-400' :
          isLowHealth ? 'text-orange-400' : 'text-green-400'
        }`}>
          {Math.round(health)}
        </span>
      )}
    </div>
  );
}

interface StaminaBarProps {
  stamina: number;
  maxStamina?: number;
  isActive?: boolean;
}

export function StaminaBar({ stamina, maxStamina = 100, isActive = false }: StaminaBarProps) {
  const staminaPercent = Math.max(0, Math.min(100, (stamina / maxStamina) * 100));
  const isLowStamina = staminaPercent < 25;

  return (
    <div className={`flex items-center space-x-2 bg-black/40 rounded-lg px-3 py-2 backdrop-blur-sm transition-all duration-300 ${
      isActive ? 'ring-2 ring-blue-400/50' : ''
    }`}>
      <Droplets 
        className={`w-4 h-4 ${
          isLowStamina ? 'text-yellow-500 animate-pulse' : 'text-blue-400'
        }`} 
      />
      <div className="relative w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
            isLowStamina ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
            'bg-gradient-to-r from-blue-500 to-cyan-400'
          }`}
          style={{ width: `${staminaPercent}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  isUrgent?: boolean;
}

export function TimerDisplay({ timeLeft, totalTime, isUrgent = false }: TimerDisplayProps) {
  const timePercent = (timeLeft / totalTime) * 100;
  const isLowTime = timePercent < 25;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`flex items-center space-x-2 bg-black/40 rounded-lg px-3 py-2 backdrop-blur-sm ${
      isUrgent || isLowTime ? 'ring-2 ring-red-400/50 animate-pulse' : ''
    }`}>
      <Timer 
        className={`w-5 h-5 ${
          isUrgent || isLowTime ? 'text-red-400' : 'text-white'
        }`} 
      />
      <div className="flex flex-col items-center">
        <span className={`text-lg font-bold ${
          isUrgent || isLowTime ? 'text-red-400' : 'text-white'
        }`}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
        <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              isLowTime ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

interface ObjectiveDisplayProps {
  objective: string;
  progress?: number;
  isComplete?: boolean;
}

export function ObjectiveDisplay({ objective, progress, isComplete = false }: ObjectiveDisplayProps) {
  return (
    <div className={`bg-black/50 rounded-lg p-3 backdrop-blur-sm border ${
      isComplete ? 'border-green-500/50 bg-green-900/20' : 'border-blue-500/50'
    }`}>
      <div className="flex items-start space-x-2">
        {isComplete ? (
          <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
        ) : (
          <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className={`text-sm font-medium ${
            isComplete ? 'text-green-400' : 'text-white'
          }`}>
            {objective}
          </p>
          {progress !== undefined && !isComplete && (
            <div className="mt-2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SafeZoneIndicatorProps {
  distance: number;
  direction: 'left' | 'right' | 'up' | 'down' | 'here';
  isInSafeZone?: boolean;
}

export function SafeZoneIndicator({ distance, direction, isInSafeZone = false }: SafeZoneIndicatorProps) {
  const getDirectionArrow = () => {
    switch (direction) {
      case 'left': return '←';
      case 'right': return '→';
      case 'up': return '↑';
      case 'down': return '↓';
      case 'here': return '✓';
      default: return '?';
    }
  };

  if (isInSafeZone) {
    return (
      <div className="bg-green-900/80 border border-green-500/50 rounded-lg px-3 py-2 backdrop-blur-sm animate-pulse">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-bold text-sm">SAFE ZONE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 border border-yellow-500/50 rounded-lg px-3 py-2 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-400 text-sm">
          Safety {getDirectionArrow()} {distance}m
        </span>
      </div>
    </div>
  );
}

interface WaterLevelIndicatorProps {
  currentLevel: number;
  maxLevel: number;
  minLevel: number;
  risingSpeed: number;
}

export function WaterLevelIndicator({ currentLevel, maxLevel, minLevel, risingSpeed }: WaterLevelIndicatorProps) {
  const waterPercent = ((minLevel - currentLevel) / (minLevel - maxLevel)) * 100;
  const isDangerous = waterPercent > 70;
  const isCritical = waterPercent > 90;

  return (
    <div className={`bg-black/50 rounded-lg p-3 backdrop-blur-sm border ${
      isCritical ? 'border-red-500/50 animate-pulse' :
      isDangerous ? 'border-orange-500/50' : 'border-blue-500/50'
    }`}>
      <div className="flex items-center space-x-3">
        <Droplets className={`w-5 h-5 ${
          isCritical ? 'text-red-400' :
          isDangerous ? 'text-orange-400' : 'text-blue-400'
        }`} />
        
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white">Water Level</span>
            <span className={`font-bold ${
              isCritical ? 'text-red-400' :
              isDangerous ? 'text-orange-400' : 'text-blue-400'
            }`}>
              {Math.round(waterPercent)}%
            </span>
          </div>
          
          <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            {/* Water level fill */}
            <div 
              className={`absolute bottom-0 left-0 w-full rounded-full transition-all duration-500 ${
                isCritical ? 'bg-gradient-to-t from-red-600 to-red-400' :
                isDangerous ? 'bg-gradient-to-t from-orange-500 to-yellow-400' :
                'bg-gradient-to-t from-blue-600 to-cyan-400'
              }`}
              style={{ height: `${waterPercent}%` }}
            />
            
            {/* Wave effect */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 animate-pulse" 
                 style={{ bottom: `${waterPercent}%` }} />
          </div>
          
          <div className="flex justify-between text-xs mt-1 text-gray-400">
            <span>Rising: {risingSpeed.toFixed(1)}/s</span>
            <span>Max Danger</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GameControlsProps {
  gameState: 'playing' | 'paused' | 'completed' | 'failed';
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  disabled?: boolean;
}

export function GameControls({ gameState, onPause, onResume, onRestart, disabled = false }: GameControlsProps) {
  return (
    <div className="flex justify-center space-x-3">
      <button
        onClick={gameState === 'paused' ? onResume : onPause}
        disabled={disabled || gameState === 'completed' || gameState === 'failed'}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
      >
        {gameState === 'paused' ? (
          <>
            <span>▶</span>
            <span>Resume</span>
          </>
        ) : (
          <>
            <span>⏸</span>
            <span>Pause</span>
          </>
        )}
      </button>
      
      <button
        onClick={onRestart}
        disabled={disabled}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
      >
        <span>↻</span>
        <span>Restart</span>
      </button>
    </div>
  );
}

interface MiniMapProps {
  playerPosition: { x: number; y: number };
  safeZones: Array<{ x: number; y: number; width: number; height: number }>;
  hazards: Array<{ x: number; y: number; width: number; height: number }>;
  canvasSize: { width: number; height: number };
  waterLevel?: number;
}

export function MiniMap({ playerPosition, safeZones, hazards, canvasSize, waterLevel }: MiniMapProps) {
  const scale = 0.1; // 10% of actual size
  const mapWidth = canvasSize.width * scale;
  const mapHeight = canvasSize.height * scale;

  return (
    <div className="bg-black/60 rounded-lg p-2 backdrop-blur-sm border border-gray-600">
      <div className="text-xs text-white mb-2 text-center">Map</div>
      <div 
        className="relative border border-gray-500 bg-gray-800"
        style={{ width: mapWidth, height: mapHeight }}
      >
        {/* Water level */}
        {waterLevel && (
          <div 
            className="absolute bottom-0 left-0 w-full bg-blue-500/50"
            style={{ height: `${((canvasSize.height - waterLevel) / canvasSize.height) * 100}%` }}
          />
        )}
        
        {/* Safe zones */}
        {safeZones.map((zone, index) => (
          <div
            key={`safe-${index}`}
            className="absolute bg-green-500/70 rounded-sm"
            style={{
              left: zone.x * scale,
              top: zone.y * scale,
              width: zone.width * scale,
              height: zone.height * scale,
            }}
          />
        ))}
        
        {/* Hazards */}
        {hazards.map((hazard, index) => (
          <div
            key={`hazard-${index}`}
            className="absolute bg-red-500/70 rounded-sm"
            style={{
              left: hazard.x * scale,
              top: hazard.y * scale,
              width: hazard.width * scale,
              height: hazard.height * scale,
            }}
          />
        ))}
        
        {/* Player */}
        <div
          className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse border border-white"
          style={{
            left: playerPosition.x * scale - 1,
            top: playerPosition.y * scale - 1,
          }}
        />
      </div>
    </div>
  );
}