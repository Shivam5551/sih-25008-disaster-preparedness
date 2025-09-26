// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Game-specific types
export interface GameScenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  choices: {
    id: string;
    text: string;
    correct: boolean;
    explanation: string;
    points: number;
  }[];
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
}

export interface GameMetadata {
  categories: string[];
  difficulties: string[];
  tags: string[];
  totalScenarios: number;
  stats: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface GameResults {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  difficulty: string;
  completedScenarios: string[];
}

// API functions
export class GameAPI {
  /**
   * Fetch game scenarios with optional filters
   */
  static async getScenarios(filters?: {
    category?: string;
    difficulty?: string;
    limit?: number;
  }): Promise<GameScenario[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.category) params.append('category', filters.category);
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      
      const queryString = params.toString();
      const url = `${API_BASE_URL}/game/scenarios${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<{ scenarios: GameScenario[] }> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch scenarios');
      }
      
      return result.data?.scenarios || [];
    } catch (error) {
      console.error('Error fetching game scenarios:', error);
      throw new Error('Failed to load game scenarios. Please try again.');
    }
  }

  /**
   * Fetch a specific scenario by ID
   */
  static async getScenario(scenarioId: string): Promise<GameScenario> {
    try {
      const response = await fetch(`${API_BASE_URL}/game/scenarios/${scenarioId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<{ scenario: GameScenario }> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch scenario');
      }
      
      if (!result.data?.scenario) {
        throw new Error('Scenario not found');
      }
      
      return result.data.scenario;
    } catch (error) {
      console.error('Error fetching scenario:', error);
      throw new Error('Failed to load scenario. Please try again.');
    }
  }

  /**
   * Get game metadata (categories, difficulties, etc.)
   */
  static async getMetadata(): Promise<GameMetadata> {
    try {
      const response = await fetch(`${API_BASE_URL}/game/metadata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<GameMetadata> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch game metadata');
      }
      
      return result.data || {
        categories: [],
        difficulties: [],
        tags: [],
        totalScenarios: 0,
        stats: { easy: 0, medium: 0, hard: 0 }
      };
    } catch (error) {
      console.error('Error fetching game metadata:', error);
      throw new Error('Failed to load game metadata. Please try again.');
    }
  }

  /**
   * Submit game results
   */
  static async submitResults(results: GameResults): Promise<{
    gameId: string;
    submittedAt: string;
    results: GameResults & { accuracy: number };
    achievements: string[];
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/game/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit results');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error submitting game results:', error);
      throw new Error('Failed to submit results. Please try again.');
    }
  }
}

// Helper function for error handling
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}