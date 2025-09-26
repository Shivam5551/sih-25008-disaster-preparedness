import { Router, Request, Response } from 'express';

const router: Router = Router();

// Game scenario data
const gameScenarios = [
  {
    id: 'home-shaking',
    title: 'At Home During Shaking',
    description: 'You are at home when you feel the ground start shaking.',
    situation: 'You are sitting in your living room watching TV when you suddenly feel the ground shaking. The shaking is getting stronger. What should you do first?',
    choices: [
      {
        id: 'run-outside',
        text: 'Run outside immediately',
        correct: false,
        explanation: 'Running outside during shaking is dangerous due to falling objects and debris. You could trip or be hit by falling glass.',
        points: 0
      },
      {
        id: 'drop-cover-hold',
        text: 'Drop, Cover, and Hold On under a sturdy table',
        correct: true,
        explanation: 'Correct! Drop to hands and knees, take cover under a sturdy table, and hold on. This protects you from falling objects.',
        points: 100
      },
      {
        id: 'doorway',
        text: 'Stand in a doorway',
        correct: false,
        explanation: 'Modern doorways are not stronger than other parts of the house. This is an outdated safety myth.',
        points: 0
      },
      {
        id: 'nothing',
        text: 'Stay seated and wait',
        correct: false,
        explanation: 'You need to protect yourself immediately. Staying seated leaves you vulnerable to falling objects.',
        points: 0
      }
    ],
    timeLimit: 15,
    difficulty: 'easy',
    category: 'earthquake',
    tags: ['home', 'indoor', 'basic-response']
  },
  {
    id: 'school-classroom',
    title: 'In the Classroom',
    description: 'An earthquake starts while you are in class.',
    situation: 'You are in a classroom on the second floor when an earthquake begins. Your teacher is instructing the class. What is the safest action?',
    choices: [
      {
        id: 'follow-teacher',
        text: 'Wait for teacher instructions and follow evacuation plan',
        correct: false,
        explanation: 'While following instructions is good, you should immediately drop, cover, and hold on first, then follow evacuation procedures after shaking stops.',
        points: 50
      },
      {
        id: 'under-desk',
        text: 'Immediately drop under your desk and hold on',
        correct: true,
        explanation: 'Perfect! Immediately protect yourself by getting under your desk. Follow evacuation procedures only after the shaking stops.',
        points: 100
      },
      {
        id: 'rush-stairs',
        text: 'Rush to the stairs to evacuate',
        correct: false,
        explanation: 'Never use stairs or elevators during an earthquake. You could fall or be trapped by debris.',
        points: 0
      },
      {
        id: 'window',
        text: 'Move away from windows',
        correct: false,
        explanation: 'While avoiding windows is good thinking, your first priority should be to drop, cover, and hold on immediately.',
        points: 25
      }
    ],
    timeLimit: 12,
    difficulty: 'medium',
    category: 'earthquake',
    tags: ['school', 'classroom', 'indoor', 'evacuation']
  },
  {
    id: 'outdoors-walking',
    title: 'Walking Outside',
    description: 'You are walking outside when an earthquake occurs.',
    situation: 'You are walking down a busy street with tall buildings on both sides when you feel strong earthquake shaking. Where should you move?',
    choices: [
      {
        id: 'building-entrance',
        text: 'Run into the nearest building',
        correct: false,
        explanation: 'Buildings can collapse or have falling debris near entrances. Do not enter buildings during shaking.',
        points: 0
      },
      {
        id: 'open-area',
        text: 'Move to an open area away from buildings, trees, and power lines',
        correct: true,
        explanation: 'Excellent! Open areas are safest outdoors. Avoid falling hazards like building facades, trees, and power lines.',
        points: 100
      },
      {
        id: 'car',
        text: 'Get into a parked car',
        correct: false,
        explanation: 'Cars can be damaged by falling debris. Open areas are safer than being inside or next to objects that could fall.',
        points: 0
      },
      {
        id: 'crouch-building',
        text: 'Crouch next to a building wall',
        correct: false,
        explanation: 'Building walls can collapse or drop debris. Stay away from structures during shaking.',
        points: 0
      }
    ],
    timeLimit: 10,
    difficulty: 'medium',
    category: 'earthquake',
    tags: ['outdoor', 'street', 'urban', 'open-space']
  },
  {
    id: 'elevator',
    title: 'Stuck in Elevator',
    description: 'The earthquake happens while you are in an elevator.',
    situation: 'You are in an elevator going to the 5th floor when you feel shaking and the elevator stops between floors. What should you do?',
    choices: [
      {
        id: 'force-doors',
        text: 'Try to force the doors open',
        correct: false,
        explanation: 'Forcing doors could be dangerous and you might fall into the shaft. Modern elevators have safety features.',
        points: 0
      },
      {
        id: 'emergency-button',
        text: 'Press the emergency button and wait for help',
        correct: true,
        explanation: 'Correct! Modern elevators are designed to stop safely. Use emergency communication and wait for professional rescue.',
        points: 100
      },
      {
        id: 'climb-out',
        text: 'Try to climb out through the ceiling',
        correct: false,
        explanation: 'This is extremely dangerous and should only be attempted by professionals. Elevator shafts have many hazards.',
        points: 0
      },
      {
        id: 'panic',
        text: 'Bang on the doors and shout for help',
        correct: false,
        explanation: 'While calling for help is natural, it wastes energy. Use the emergency button which connects to monitoring services.',
        points: 25
      }
    ],
    timeLimit: 15,
    difficulty: 'hard',
    category: 'earthquake',
    tags: ['elevator', 'confined-space', 'emergency-services']
  },
  {
    id: 'after-shaking',
    title: 'After the Shaking Stops',
    description: 'The earthquake shaking has stopped. What now?',
    situation: 'The earthquake shaking has stopped. You protected yourself well during the shaking. Now what is your first priority?',
    choices: [
      {
        id: 'check-injuries',
        text: 'Check yourself and others for injuries',
        correct: true,
        explanation: 'Perfect! Check for injuries first. Provide first aid if trained, but do not move seriously injured people unless in immediate danger.',
        points: 100
      },
      {
        id: 'social-media',
        text: 'Post on social media that you are safe',
        correct: false,
        explanation: 'While communication is important, checking for injuries and immediate safety hazards should come first.',
        points: 25
      },
      {
        id: 'clean-up',
        text: 'Start cleaning up broken items',
        correct: false,
        explanation: 'Cleanup can wait. First priority is checking for injuries and safety hazards like gas leaks or electrical damage.',
        points: 0
      },
      {
        id: 'evacuate-immediately',
        text: 'Evacuate the building immediately',
        correct: false,
        explanation: 'Only evacuate if the building is damaged or there are safety hazards. Check yourself and others first.',
        points: 50
      }
    ],
    timeLimit: 20,
    difficulty: 'medium',
    category: 'earthquake',
    tags: ['post-earthquake', 'first-aid', 'safety-assessment']
  },
  {
    id: 'kitchen-cooking',
    title: 'Cooking in the Kitchen',
    description: 'You are cooking when an earthquake starts.',
    situation: 'You are standing at the stove cooking dinner when you feel strong earthquake shaking. Hot oil is in the pan and the stove is on. What should you do?',
    choices: [
      {
        id: 'turn-off-stove-first',
        text: 'Turn off the stove before taking cover',
        correct: false,
        explanation: 'Your safety is more important than the stove. Drop, cover, and hold on immediately. Deal with hazards after shaking stops.',
        points: 25
      },
      {
        id: 'drop-cover-immediately',
        text: 'Immediately drop, cover, and hold on, ignoring the stove',
        correct: true,
        explanation: 'Correct! Your immediate safety is the priority. Protect yourself first, then deal with fire hazards after shaking stops.',
        points: 100
      },
      {
        id: 'run-from-kitchen',
        text: 'Run out of the kitchen to safety',
        correct: false,
        explanation: 'Running during shaking is dangerous. You could fall or be hit by falling objects. Drop and take cover where you are.',
        points: 0
      },
      {
        id: 'hold-onto-counter',
        text: 'Hold onto the kitchen counter for support',
        correct: false,
        explanation: 'Counters can move and objects can fall from them. Get under a sturdy table or against an interior wall.',
        points: 0
      }
    ],
    timeLimit: 8,
    difficulty: 'hard',
    category: 'earthquake',
    tags: ['kitchen', 'fire-hazard', 'cooking', 'immediate-response']
  },
  {
    id: 'bed-sleeping',
    title: 'Woken Up by Earthquake',
    description: 'You are woken up by earthquake shaking.',
    situation: 'You are sleeping in your bed when you are suddenly woken up by strong earthquake shaking. It is dark and you are disoriented. What should you do?',
    choices: [
      {
        id: 'stay-in-bed',
        text: 'Stay in bed and cover your head with a pillow',
        correct: true,
        explanation: 'Excellent! If you are in bed, stay there and protect your head with a pillow. Your bed provides some protection from falling objects.',
        points: 100
      },
      {
        id: 'get-up-and-hide',
        text: 'Get up and hide under a desk or table',
        correct: false,
        explanation: 'Do not try to move in the dark during shaking. You could fall or be injured. Stay in bed and protect your head.',
        points: 0
      },
      {
        id: 'turn-on-light',
        text: 'Turn on the light to see what is happening',
        correct: false,
        explanation: 'Do not waste time with lights during shaking. Focus on protecting yourself immediately. Lights may not work anyway.',
        points: 0
      },
      {
        id: 'run-outside',
        text: 'Jump up and run outside',
        correct: false,
        explanation: 'Never try to run outside in the dark during shaking. You could fall down stairs or be hit by falling glass.',
        points: 0
      }
    ],
    timeLimit: 10,
    difficulty: 'medium',
    category: 'earthquake',
    tags: ['bedroom', 'night', 'disorientation', 'bed-safety']
  },
  {
    id: 'driving-car',
    title: 'Driving During Earthquake',
    description: 'You are driving when an earthquake occurs.',
    situation: 'You are driving on a city street when you feel your car shaking and realize it is an earthquake. Other cars are swerving and you see debris falling from buildings. What should you do?',
    choices: [
      {
        id: 'stop-under-overpass',
        text: 'Quickly drive under an overpass for protection',
        correct: false,
        explanation: 'Overpasses can collapse during earthquakes. Avoid bridges, overpasses, and tunnels during shaking.',
        points: 0
      },
      {
        id: 'pull-over-safely',
        text: 'Pull over away from buildings, trees, and overpasses, then stay in the car',
        correct: true,
        explanation: 'Perfect! Pull over in an open area, stop, and stay in your car with seatbelt on. Your car protects you from most falling debris.',
        points: 100
      },
      {
        id: 'speed-up-escape',
        text: 'Speed up to quickly get away from the area',
        correct: false,
        explanation: 'Speeding during an earthquake is extremely dangerous. You cannot outrun an earthquake and risk serious accidents.',
        points: 0
      },
      {
        id: 'get-out-of-car',
        text: 'Stop and get out of the car immediately',
        correct: false,
        explanation: 'Your car provides protection from falling debris. Stay inside with your seatbelt on until shaking stops.',
        points: 25
      }
    ],
    timeLimit: 12,
    difficulty: 'hard',
    category: 'earthquake',
    tags: ['driving', 'vehicle', 'traffic', 'outdoor']
  }
];

// Get all game scenarios
router.get('/scenarios', (req: Request, res: Response) => {
  try {
    const { category, difficulty, limit } = req.query;
    
    let filteredScenarios = [...gameScenarios];
    
    // Filter by category if provided
    if (category && typeof category === 'string') {
      filteredScenarios = filteredScenarios.filter(scenario => 
        scenario.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by difficulty if provided
    if (difficulty && typeof difficulty === 'string') {
      filteredScenarios = filteredScenarios.filter(scenario => 
        scenario.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }
    
    // Limit results if provided
    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        // Shuffle array and take first N items for variety
        filteredScenarios = filteredScenarios
          .sort(() => Math.random() - 0.5)
          .slice(0, limitNum);
      }
    }
    
    res.json({
      success: true,
      data: {
        scenarios: filteredScenarios,
        total: filteredScenarios.length,
        filters: {
          category: category || 'all',
          difficulty: difficulty || 'all',
          limit: limit || 'none'
        }
      }
    });
  } catch (error) {
    console.error('Error fetching game scenarios:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game scenarios',
      message: 'Internal server error'
    });
  }
});

// Get a specific scenario by ID
router.get('/scenarios/:scenarioId', (req: Request, res: Response) => {
  try {
    const { scenarioId } = req.params;
    
    const scenario = gameScenarios.find(s => s.id === scenarioId);
    
    if (!scenario) {
      return res.status(404).json({
        success: false,
        error: 'Scenario not found',
        message: `No scenario found with ID: ${scenarioId}`
      });
    }
    
    res.json({
      success: true,
      data: {
        scenario
      }
    });
  } catch (error) {
    console.error('Error fetching scenario:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scenario',
      message: 'Internal server error'
    });
  }
});

// Get available categories and difficulties
router.get('/metadata', (req: Request, res: Response) => {
  try {
    const categories = [...new Set(gameScenarios.map(s => s.category))];
    const difficulties = [...new Set(gameScenarios.map(s => s.difficulty))];
    const tags = [...new Set(gameScenarios.flatMap(s => s.tags))].sort();
    
    res.json({
      success: true,
      data: {
        categories,
        difficulties,
        tags,
        totalScenarios: gameScenarios.length,
        stats: {
          easy: gameScenarios.filter(s => s.difficulty === 'easy').length,
          medium: gameScenarios.filter(s => s.difficulty === 'medium').length,
          hard: gameScenarios.filter(s => s.difficulty === 'hard').length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching game metadata:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game metadata',
      message: 'Internal server error'
    });
  }
});

// Submit game results (for future analytics/tracking)
router.post('/results', (req: Request, res: Response) => {
  try {
    const { 
      score, 
      correctAnswers, 
      totalQuestions, 
      timeSpent, 
      difficulty,
      completedScenarios 
    } = req.body;
    
    // Here you would typically save to a database
    // For now, we'll just validate and return success
    
    if (typeof score !== 'number' || typeof correctAnswers !== 'number' || typeof totalQuestions !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Invalid game results data',
        message: 'Score, correctAnswers, and totalQuestions must be numbers'
      });
    }
    
    // Calculate accuracy
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    
    // Return success with calculated stats
    res.json({
      success: true,
      data: {
        gameId: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString(),
        results: {
          score,
          correctAnswers,
          totalQuestions,
          accuracy: Math.round(accuracy * 100) / 100,
          timeSpent,
          difficulty,
          completedScenarios: completedScenarios || []
        },
        achievements: calculateAchievements(score, accuracy, correctAnswers, totalQuestions)
      }
    });
  } catch (error) {
    console.error('Error submitting game results:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit game results',
      message: 'Internal server error'
    });
  }
});

// Helper function to calculate achievements
function calculateAchievements(score: number, accuracy: number, correctAnswers: number, totalQuestions: number): string[] {
  const achievements: string[] = [];
  
  if (correctAnswers === totalQuestions && totalQuestions > 0) {
    achievements.push('perfect_game');
  }
  
  if (score >= 500) {
    achievements.push('high_scorer');
  }
  
  if (accuracy >= 90) {
    achievements.push('safety_expert');
  }
  
  if (accuracy >= 75) {
    achievements.push('safety_conscious');
  }
  
  if (totalQuestions >= 5) {
    achievements.push('dedicated_learner');
  }
  
  return achievements;
}

export default router;