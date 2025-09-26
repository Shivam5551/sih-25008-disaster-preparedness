/**
 * Enhanced game rendering utilities for both earthquake and flood games
 * Provides better graphics, animations, and visual effects
 */

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  timestamp: number;
  gameState: 'playing' | 'paused' | 'completed' | 'failed';
  isShaking?: boolean;
  waterLevel?: number;
}

export interface EnhancedGameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  color: string;
  interactive?: boolean;
  points?: number;
  floats?: boolean;
}

export class GameRenderer {
  private static particleCache: Array<{x: number, y: number, vx: number, vy: number, life: number, type: string}> = [];

  /**
   * Enhanced player rendering with animations and state-based appearance
   */
  static renderPlayer(
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    health: number, 
    state: 'normal' | 'swimming' | 'hiding' | 'running' | 'safe',
    timestamp: number = Date.now()
  ) {
    ctx.save();
    ctx.translate(x + 10, y + 10);

    // Health-based coloring
    let bodyColor = '#4A90E2';
    let glowColor = '#4A90E2';
    let shadowBlur = 5;

    if (state === 'safe') {
      bodyColor = '#00FF00';
      glowColor = '#00FF00';
      shadowBlur = 15;
    } else if (health < 30) {
      bodyColor = '#FF4444';
      glowColor = '#FF0000';
      shadowBlur = 8;
    } else if (health < 60) {
      bodyColor = '#FFA500';
      glowColor = '#FFA500';
      shadowBlur = 6;
    }

    // Add pulsing glow effect
    const pulseIntensity = 0.5 + 0.3 * Math.sin(timestamp * 0.005);
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = shadowBlur * pulseIntensity;

    // Animation based on state
    const bobOffset = state === 'swimming' ? Math.sin(timestamp * 0.01) * 2 : 0;
    const runCycle = state === 'running' ? Math.sin(timestamp * 0.02) * 1.5 : 0;

    ctx.translate(0, bobOffset);

    // Enhanced player shape
    ctx.fillStyle = bodyColor;
    
    // Head with facial expression
    const headRadius = state === 'hiding' ? 6 : 8;
    ctx.beginPath();
    ctx.arc(0, -5, headRadius, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (simple dot representation)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-2, -7, 1.5, 0, Math.PI * 2);
    ctx.arc(2, -7, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = bodyColor;
    const bodyWidth = state === 'hiding' ? 8 : 12;
    const bodyHeight = state === 'hiding' ? 10 : 15;
    ctx.fillRect(-bodyWidth/2, -5, bodyWidth, bodyHeight);

    // Arms with animation
    const armOffset = runCycle;
    if (state !== 'hiding') {
      // Left arm
      ctx.fillRect(-10, -2 + armOffset, 4, 8);
      // Right arm
      ctx.fillRect(6, -2 - armOffset, 4, 8);
    }

    // Legs with running animation
    if (state !== 'hiding') {
      const legOffset = state === 'running' ? runCycle * 2 : 0;
      // Left leg
      ctx.fillRect(-4, 10, 3, 8 - legOffset);
      // Right leg  
      ctx.fillRect(1, 10, 3, 8 + legOffset);
    }

    // Add state-specific indicators
    if (state === 'swimming') {
      // Water ripples around player
      ctx.strokeStyle = 'rgba(100, 149, 237, 0.6)';
      ctx.lineWidth = 2;
      const rippleRadius = 15 + Math.sin(timestamp * 0.008) * 3;
      ctx.beginPath();
      ctx.arc(0, 5, rippleRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    ctx.restore();
  }

  /**
   * Enhanced house rendering with detailed architecture
   */
  static renderHouse(ctx: CanvasRenderingContext2D, obj: EnhancedGameObject, timestamp: number = Date.now()) {
    ctx.save();
    
    const isFlooded = obj.floats && obj.y > 300; // Assume flood level
    
    // House body with gradient
    const gradient = ctx.createLinearGradient(obj.x, obj.y, obj.x, obj.y + obj.height);
    gradient.addColorStop(0, obj.color);
    gradient.addColorStop(1, this.darkenColor(obj.color, 20));
    ctx.fillStyle = gradient;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

    // Roof with shingles texture
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.moveTo(obj.x - 8, obj.y);
    ctx.lineTo(obj.x + obj.width/2, obj.y - 25);
    ctx.lineTo(obj.x + obj.width + 8, obj.y);
    ctx.closePath();
    ctx.fill();

    // Roof shingles pattern
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const y = obj.y - 20 + i * 7;
      ctx.beginPath();
      ctx.moveTo(obj.x - 5, y);
      ctx.lineTo(obj.x + obj.width + 5, y);
      ctx.stroke();
    }

    // Windows with frames and reflections
    ctx.fillStyle = '#654321'; // Window frame
    ctx.fillRect(obj.x + 10, obj.y + 20, 18, 18);
    ctx.fillRect(obj.x + obj.width - 28, obj.y + 20, 18, 18);
    
    ctx.fillStyle = isFlooded ? '#4682B4' : '#87CEEB'; // Glass (water if flooded)
    ctx.fillRect(obj.x + 12, obj.y + 22, 14, 14);
    ctx.fillRect(obj.x + obj.width - 26, obj.y + 22, 14, 14);

    // Window reflections
    if (!isFlooded) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(obj.x + 12, obj.y + 22, 6, 6);
      ctx.fillRect(obj.x + obj.width - 26, obj.y + 22, 6, 6);
    }

    // Door with details
    ctx.fillStyle = '#654321';
    ctx.fillRect(obj.x + obj.width/2 - 10, obj.y + 40, 20, 30);
    
    // Door handle
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(obj.x + obj.width/2 + 5, obj.y + 55, 2, 0, Math.PI * 2);
    ctx.fill();

    // Chimney
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(obj.x + obj.width - 20, obj.y - 35, 12, 25);

    // Smoke from chimney (animated)
    if (!isFlooded) {
      ctx.fillStyle = `rgba(169, 169, 169, ${0.3 + 0.2 * Math.sin(timestamp * 0.003)})`;
      for (let i = 0; i < 3; i++) {
        const smokeX = obj.x + obj.width - 14 + Math.sin(timestamp * 0.002 + i) * 3;
        const smokeY = obj.y - 35 - (i * 8);
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, 3 + i, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  /**
   * Enhanced shelter rendering with emergency symbols
   */
  static renderShelter(ctx: CanvasRenderingContext2D, obj: EnhancedGameObject, timestamp: number = Date.now()) {
    ctx.save();

    // Building body with reinforced appearance
    const gradient = ctx.createLinearGradient(obj.x, obj.y, obj.x, obj.y + obj.height);
    gradient.addColorStop(0, obj.color);
    gradient.addColorStop(0.5, this.lightenColor(obj.color, 10));
    gradient.addColorStop(1, this.darkenColor(obj.color, 15));
    ctx.fillStyle = gradient;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

    // Reinforced corners
    ctx.fillStyle = this.darkenColor(obj.color, 30);
    ctx.fillRect(obj.x, obj.y, 8, 8);
    ctx.fillRect(obj.x + obj.width - 8, obj.y, 8, 8);
    ctx.fillRect(obj.x, obj.y + obj.height - 8, 8, 8);
    ctx.fillRect(obj.x + obj.width - 8, obj.y + obj.height - 8, 8, 8);

    // Emergency sign (flashing)
    const flashIntensity = Math.sin(timestamp * 0.01) > 0 ? 1 : 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity})`;
    ctx.fillRect(obj.x + 10, obj.y + 10, obj.width - 20, 30);

    // Red cross
    ctx.fillStyle = `rgba(255, 0, 0, ${flashIntensity})`;
    ctx.fillRect(obj.x + obj.width/2 - 3, obj.y + 15, 6, 20);
    ctx.fillRect(obj.x + 20, obj.y + obj.height/2 - 3, obj.width - 40, 6);

    // Emergency text
    ctx.fillStyle = `rgba(255, 0, 0, ${flashIntensity})`;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SHELTER', obj.x + obj.width/2, obj.y + obj.height - 10);

    // Safety beacon (rotating light)
    const beaconRotation = timestamp * 0.005;
    ctx.save();
    ctx.translate(obj.x + obj.width/2, obj.y - 10);
    ctx.rotate(beaconRotation);
    
    ctx.fillStyle = `rgba(255, 0, 0, ${0.8 + 0.2 * Math.sin(timestamp * 0.02)})`;
    ctx.fillRect(-5, -5, 10, 10);
    
    // Light beam
    ctx.fillStyle = `rgba(255, 0, 0, 0.2)`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-20, -30);
    ctx.lineTo(20, -30);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();

    ctx.restore();
  }

  /**
   * Enhanced car rendering with realistic details
   */
  static renderCar(ctx: CanvasRenderingContext2D, obj: EnhancedGameObject, isFloating: boolean = false, timestamp: number = Date.now()) {
    ctx.save();

    // Car body with gradient and floating animation
    const bobOffset = isFloating ? Math.sin(timestamp * 0.008) * 2 : 0;
    ctx.translate(0, bobOffset);

    const gradient = ctx.createLinearGradient(obj.x, obj.y, obj.x, obj.y + obj.height);
    gradient.addColorStop(0, this.lightenColor(obj.color, 20));
    gradient.addColorStop(0.5, obj.color);
    gradient.addColorStop(1, this.darkenColor(obj.color, 20));
    ctx.fillStyle = gradient;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

    // Car roof
    ctx.fillStyle = this.darkenColor(obj.color, 15);
    ctx.fillRect(obj.x + 8, obj.y - 8, obj.width - 16, 12);

    // Windows
    ctx.fillStyle = isFloating ? '#4682B4' : '#87CEEB';
    ctx.fillRect(obj.x + 5, obj.y + 3, obj.width - 10, obj.height - 12);

    // Window frames
    ctx.strokeStyle = '#2F2F2F';
    ctx.lineWidth = 1;
    ctx.strokeRect(obj.x + 5, obj.y + 3, obj.width - 10, obj.height - 12);
    ctx.beginPath();
    ctx.moveTo(obj.x + obj.width/2, obj.y + 3);
    ctx.lineTo(obj.x + obj.width/2, obj.y + obj.height - 9);
    ctx.stroke();

    // Headlights
    ctx.fillStyle = '#FFFACD';
    ctx.beginPath();
    ctx.arc(obj.x + 5, obj.y + obj.height/2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Taillights
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(obj.x + obj.width - 5, obj.y + obj.height/2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Wheels
    ctx.fillStyle = '#2F2F2F';
    ctx.beginPath();
    ctx.arc(obj.x + 12, obj.y + obj.height + 2, 6, 0, Math.PI * 2);
    ctx.arc(obj.x + obj.width - 12, obj.y + obj.height + 2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Wheel rims
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.arc(obj.x + 12, obj.y + obj.height + 2, 3, 0, Math.PI * 2);
    ctx.arc(obj.x + obj.width - 12, obj.y + obj.height + 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Water splash effects if floating
    if (isFloating) {
      this.addSplashEffect(ctx, obj.x + obj.width/2, obj.y + obj.height + 5, timestamp);
    }

    ctx.restore();
  }

  /**
   * Enhanced boat rendering
   */
  static renderBoat(ctx: CanvasRenderingContext2D, obj: EnhancedGameObject, timestamp: number = Date.now()) {
    ctx.save();

    // Boat floating animation
    const bobOffset = Math.sin(timestamp * 0.01) * 3;
    ctx.translate(0, bobOffset);

    // Boat hull with curve
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.moveTo(obj.x, obj.y + obj.height * 0.7);
    ctx.quadraticCurveTo(obj.x, obj.y + obj.height, obj.x + 15, obj.y + obj.height);
    ctx.lineTo(obj.x + obj.width - 15, obj.y + obj.height);
    ctx.quadraticCurveTo(obj.x + obj.width, obj.y + obj.height, obj.x + obj.width, obj.y + obj.height * 0.7);
    ctx.lineTo(obj.x + obj.width - 8, obj.y);
    ctx.lineTo(obj.x + 8, obj.y);
    ctx.closePath();
    ctx.fill();

    // Boat deck
    ctx.fillStyle = this.lightenColor(obj.color, 30);
    ctx.fillRect(obj.x + 5, obj.y + 5, obj.width - 10, obj.height * 0.4);

    // Mast
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(obj.x + obj.width/2 - 1, obj.y - 25, 3, 30);

    // Sail
    ctx.fillStyle = '#F5F5DC';
    ctx.beginPath();
    ctx.moveTo(obj.x + obj.width/2 + 2, obj.y - 20);
    ctx.lineTo(obj.x + obj.width/2 + 20, obj.y - 15);
    ctx.lineTo(obj.x + obj.width/2 + 15, obj.y + 5);
    ctx.lineTo(obj.x + obj.width/2 + 2, obj.y);
    ctx.closePath();
    ctx.fill();

    // Wake behind boat
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(obj.x - 10, obj.y + obj.height);
    ctx.lineTo(obj.x, obj.y + obj.height + 5);
    ctx.moveTo(obj.x - 10, obj.y + obj.height + 10);
    ctx.lineTo(obj.x, obj.y + obj.height + 5);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Enhanced tree rendering
   */
  static renderTree(ctx: CanvasRenderingContext2D, obj: EnhancedGameObject, timestamp: number = Date.now()) {
    ctx.save();

    // Tree trunk with texture
    const gradient = ctx.createLinearGradient(obj.x, obj.y, obj.x + obj.width, obj.y);
    gradient.addColorStop(0, '#654321');
    gradient.addColorStop(0.5, '#8B4513');
    gradient.addColorStop(1, '#654321');
    ctx.fillStyle = gradient;
    ctx.fillRect(obj.x + obj.width/2 - 4, obj.y + obj.height - 25, 8, 25);

    // Bark texture lines
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(obj.x + obj.width/2 - 3, obj.y + obj.height - 20 + i * 6);
      ctx.lineTo(obj.x + obj.width/2 + 3, obj.y + obj.height - 20 + i * 6);
      ctx.stroke();
    }

    // Tree foliage with wind animation
    const windOffset = Math.sin(timestamp * 0.003) * 2;
    ctx.save();
    ctx.translate(windOffset, 0);

    // Multiple layers of leaves for depth
    const leafColors = ['#228B22', '#32CD32', '#006400'];
    const leafSizes = [18, 15, 12];
    
    for (let i = 0; i < leafColors.length; i++) {
      const color = leafColors[i];
      const size = leafSizes[i];
      if (color && size !== undefined) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(obj.x + obj.width/2, obj.y + obj.height - 35, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Falling leaves animation
    if (Math.random() < 0.02) {
      this.addFallingLeaf(obj.x + obj.width/2, obj.y + obj.height - 35);
    }

    ctx.restore();
    ctx.restore();
  }

  /**
   * Enhanced table rendering with 3D effect
   */
  static renderTable(ctx: CanvasRenderingContext2D, obj: EnhancedGameObject) {
    ctx.save();

    // Table top with wood grain effect
    const gradient = ctx.createLinearGradient(obj.x, obj.y, obj.x, obj.y + obj.height);
    gradient.addColorStop(0, '#DEB887');
    gradient.addColorStop(0.3, '#D2691E');
    gradient.addColorStop(0.7, '#8B4513');
    gradient.addColorStop(1, '#654321');
    ctx.fillStyle = gradient;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height * 0.2);

    // Table body
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(obj.x + 5, obj.y + obj.height * 0.2, obj.width - 10, obj.height * 0.6);

    // Table legs with perspective
    ctx.fillStyle = '#654321';
    const legWidth = 6;
    const legHeight = obj.height * 0.6;
    
    // Front legs
    ctx.fillRect(obj.x + 8, obj.y + obj.height * 0.2, legWidth, legHeight);
    ctx.fillRect(obj.x + obj.width - 14, obj.y + obj.height * 0.2, legWidth, legHeight);
    
    // Back legs (slightly visible)
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(obj.x + 12, obj.y + obj.height * 0.25, legWidth - 2, legHeight * 0.9);
    ctx.fillRect(obj.x + obj.width - 18, obj.y + obj.height * 0.25, legWidth - 2, legHeight * 0.9);

    // Wood grain lines
    ctx.strokeStyle = 'rgba(101, 67, 33, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(obj.x + 5, obj.y + 5 + i * 3);
      ctx.lineTo(obj.x + obj.width - 5, obj.y + 5 + i * 3);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Add interactive glow effect
   */
  static addInteractiveGlow(
    ctx: CanvasRenderingContext2D, 
    obj: EnhancedGameObject, 
    intensity: number = 1,
    timestamp: number = Date.now()
  ) {
    if (!obj.interactive) return;

    ctx.save();
    
    // Pulsing glow effect
    const pulseIntensity = 0.5 + 0.3 * Math.sin(timestamp * 0.008) * intensity;
    const glowSize = 4 + 2 * Math.sin(timestamp * 0.006);
    
    ctx.shadowColor = '#00FF00';
    ctx.shadowBlur = 15 * pulseIntensity;
    ctx.strokeStyle = `rgba(0, 255, 0, ${0.6 * pulseIntensity})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(obj.x - glowSize, obj.y - glowSize, obj.width + glowSize * 2, obj.height + glowSize * 2);
    
    // Corner indicators
    ctx.fillStyle = `rgba(0, 255, 0, ${0.8 * pulseIntensity})`;
    const cornerSize = 6;
    // Top-left
    ctx.fillRect(obj.x - glowSize, obj.y - glowSize, cornerSize, cornerSize);
    // Top-right
    ctx.fillRect(obj.x + obj.width + glowSize - cornerSize, obj.y - glowSize, cornerSize, cornerSize);
    // Bottom-left
    ctx.fillRect(obj.x - glowSize, obj.y + obj.height + glowSize - cornerSize, cornerSize, cornerSize);
    // Bottom-right
    ctx.fillRect(obj.x + obj.width + glowSize - cornerSize, obj.y + obj.height + glowSize - cornerSize, cornerSize, cornerSize);
    
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  /**
   * Add water splash effect
   */
  private static addSplashEffect(ctx: CanvasRenderingContext2D, x: number, y: number, timestamp: number) {
    ctx.save();
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 5 + Math.sin(timestamp * 0.01 + i) * 3;
      const splashX = x + Math.cos(angle) * distance;
      const splashY = y + Math.sin(angle) * distance * 0.5;
      
      ctx.fillStyle = `rgba(100, 149, 237, ${0.6 - distance * 0.08})`;
      ctx.beginPath();
      ctx.arc(splashX, splashY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  /**
   * Add falling leaf particle
   */
  private static addFallingLeaf(x: number, y: number) {
    this.particleCache.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      life: 1,
      type: 'leaf'
    });
  }

  /**
   * Update and render particles
   */
  static updateParticles(ctx: CanvasRenderingContext2D, deltaTime: number) {
    this.particleCache = this.particleCache.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= deltaTime * 0.01;
      
      if (particle.life > 0) {
        ctx.save();
        ctx.globalAlpha = particle.life;
        
        if (particle.type === 'leaf') {
          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
        return true;
      }
      return false;
    });
  }

  /**
   * Color utility functions
   */
  private static lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  private static darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }
}