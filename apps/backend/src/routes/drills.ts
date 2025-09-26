import { Router, Request, Response } from 'express';

const router: Router = Router();

// Get all virtual drills
router.get('/', (req: Request, res: Response) => {
  const drills = [
    {
      id: 'earthquake-evacuation',
      title: 'Earthquake Evacuation',
      description: 'Practice Drop, Cover, and Hold procedures followed by safe evacuation routes.',
      duration: '15 mins',
      difficulty: 'Beginner',
      participants: '1-50',
      type: 'Evacuation',
      completed: true,
      lastScore: 95,
      scenarios: 3,
      avgCompletionTime: '12 mins'
    },
    {
      id: 'fire-emergency',
      title: 'Fire Emergency Response',
      description: 'Learn fire detection, alarm procedures, and emergency evacuation protocols.',
      duration: '20 mins',
      difficulty: 'Beginner',
      participants: '1-30',
      type: 'Fire Safety',
      completed: false,
      lastScore: null,
      scenarios: 4,
      avgCompletionTime: '18 mins'
    },
    {
      id: 'flood-response',
      title: 'Flood Response Simulation',
      description: 'Practice flood evacuation, water safety, and emergency communication.',
      duration: '25 mins',
      difficulty: 'Intermediate',
      participants: '5-40',
      type: 'Natural Disaster',
      completed: true,
      lastScore: 88,
      scenarios: 5,
      avgCompletionTime: '22 mins'
    }
  ];

  res.json({ drills });
});

// Get specific drill details
router.get('/:drillId', (req: Request, res: Response) => {
  const { drillId } = req.params;

  const drillDetails = {
    id: drillId,
    title: 'Earthquake Evacuation',
    description: 'Practice Drop, Cover, and Hold procedures followed by safe evacuation routes.',
    duration: '15 mins',
    difficulty: 'Beginner',
    participants: '1-50',
    type: 'Evacuation',
    scenarios: [
      {
        id: 1,
        name: 'Classroom Earthquake',
        description: 'You are in a classroom when an earthquake begins',
        duration: '5 mins',
        objectives: ['Drop under desk', 'Cover head and neck', 'Hold position until shaking stops', 'Evacuate safely']
      },
      {
        id: 2,
        name: 'Hallway Emergency',
        description: 'Earthquake occurs while walking in school hallway',
        duration: '4 mins',
        objectives: ['Find nearest cover', 'Avoid windows and fixtures', 'Move to open area', 'Follow evacuation route']
      },
      {
        id: 3,
        name: 'Assembly Drill',
        description: 'Large group evacuation from assembly hall',
        duration: '6 mins',
        objectives: ['Maintain calm', 'Follow staff instructions', 'Use designated exits', 'Reach muster point']
      }
    ],
    scoring: {
      responseTime: 30,
      safetyActions: 40,
      evacuationRoute: 20,
      communication: 10
    },
    tips: [
      'Stay calm and move quickly but safely',
      'Follow the Drop, Cover, Hold protocol',
      'Use stairs, never elevators during evacuation',
      'Help others if safe to do so'
    ]
  };

  res.json({ drill: drillDetails });
});

// Start a drill session
router.post('/:drillId/start', (req: Request, res: Response) => {
  const { drillId } = req.params;
  const { participants, selectedScenario } = req.body;

  const session = {
    id: 'session_' + Math.random().toString(36).substr(2, 9),
    drillId,
    participants: participants || 1,
    scenario: selectedScenario || 1,
    startedAt: new Date().toISOString(),
    status: 'active',
    currentStep: 1,
    totalSteps: 4
  };

  res.json({
    message: 'Drill session started',
    session
  });
});

// Submit drill completion
router.post('/:drillId/complete', (req: Request, res: Response) => {
  const { drillId } = req.params;
  const { sessionId, responses, timeSpent } = req.body;

  // Calculate mock score based on responses
  const score = Math.floor(Math.random() * 20) + 80; // Random score between 80-100

  const result = {
    sessionId,
    drillId,
    score,
    timeSpent: timeSpent || '12 mins',
    completedAt: new Date().toISOString(),
    feedback: {
      strengths: ['Quick response time', 'Proper safety positioning'],
      improvements: ['Communication during evacuation', 'Route optimization'],
      tips: ['Practice the Drop, Cover, Hold technique regularly', 'Familiarize yourself with all evacuation routes']
    },
    badges: score >= 90 ? ['Earthquake Response Expert'] : [],
    nextRecommendation: score < 85 ? 'fire-emergency' : 'flood-response'
  };

  res.json({
    message: 'Drill completed successfully',
    result
  });
});

// Get user drill statistics
router.get('/stats/:userId', (req: Request, res: Response) => {
  const stats = {
    totalDrills: 15,
    completedDrills: 12,
    averageScore: 91,
    totalTimeSpent: '4h 30m',
    bestScore: 98,
    favoriteType: 'Evacuation',
    recentActivity: [
      { drill: 'Earthquake Evacuation', score: 95, date: '2025-01-14' },
      { drill: 'Flood Response', score: 88, date: '2025-01-12' },
      { drill: 'Fire Emergency', score: 92, date: '2025-01-10' }
    ],
    performance: {
      responseTime: 2.3,
      accuracyRate: 91,
      completionRate: 85
    }
  };

  res.json({ stats });
});

export default router;
