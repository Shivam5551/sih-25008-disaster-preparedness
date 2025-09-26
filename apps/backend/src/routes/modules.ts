import { Router, Request, Response } from 'express';

const router: Router = Router();

// Get all learning modules
router.get('/', (req: Request, res: Response) => {
  const modules = [
    {
      id: 'earthquake',
      title: 'Earthquake Preparedness',
      description: 'Learn essential earthquake safety measures, early warning signs, and proper response protocols.',
      duration: '45 mins',
      difficulty: 'Beginner',
      region: 'All Regions',
      completed: false,
      lessons: 5,
      icon: 'AlertTriangle',
      color: 'text-red-500'
    },
    {
      id: 'fire-safety',
      title: 'Fire Safety & Evacuation',
      description: 'Comprehensive fire prevention, detection, and evacuation procedures for educational institutions.',
      duration: '35 mins',
      difficulty: 'Beginner',
      region: 'All Regions',
      completed: true,
      lessons: 4,
      icon: 'Shield',
      color: 'text-orange-500'
    },
    {
      id: 'flood-management',
      title: 'Flood Emergency Response',
      description: 'Flood preparedness strategies, water safety, and emergency response for flood-prone areas.',
      duration: '40 mins',
      difficulty: 'Intermediate',
      region: 'Coastal & River Areas',
      completed: false,
      lessons: 6,
      icon: 'Users',
      color: 'text-blue-500'
    }
  ];

  res.json({ modules });
});

// Get specific module details
router.get('/:moduleId', (req: Request, res: Response) => {
  const { moduleId } = req.params;
  
  const moduleDetails = {
    id: moduleId,
    title: 'Earthquake Preparedness',
    description: 'Learn essential earthquake safety measures, early warning signs, and proper response protocols.',
    duration: '45 mins',
    difficulty: 'Beginner',
    region: 'All Regions',
    completed: false,
    progress: 0,
    lessons: [
      {
        id: 1,
        title: 'Understanding Earthquakes',
        description: 'Learn about earthquake causes, types, and how they are measured.',
        duration: '8 mins',
        completed: false,
        videoUrl: '/videos/earthquake-lesson-1.mp4',
        resources: [
          { type: 'pdf', title: 'Earthquake Basics Guide', url: '/resources/earthquake-basics.pdf' },
          { type: 'quiz', title: 'Knowledge Check', questions: 5 }
        ]
      },
      {
        id: 2,
        title: 'Before an Earthquake',
        description: 'Preparation strategies and creating emergency plans.',
        duration: '10 mins',
        completed: false,
        videoUrl: '/videos/earthquake-lesson-2.mp4',
        resources: [
          { type: 'pdf', title: 'Emergency Planning Checklist', url: '/resources/emergency-plan.pdf' },
          { type: 'interactive', title: 'Create Your Plan', url: '/interactive/emergency-plan' }
        ]
      }
    ],
    objectives: [
      'Understand earthquake science and causes',
      'Master Drop, Cover, and Hold technique',
      'Create personal emergency plans',
      'Know post-earthquake safety procedures',
      'Apply school-specific protocols'
    ],
    certificate: {
      available: true,
      requirements: ['Complete all lessons', 'Pass final quiz with 80%', 'Complete practical drill']
    }
  };

  res.json({ module: moduleDetails });
});

// Mark lesson as completed
router.post('/:moduleId/lessons/:lessonId/complete', (req: Request, res: Response) => {
  const { moduleId, lessonId } = req.params;
  const { score, timeSpent } = req.body;

  res.json({
    message: 'Lesson completed successfully',
    progress: {
      moduleId,
      lessonId,
      completed: true,
      score: score || 100,
      timeSpent: timeSpent || '8 mins',
      completedAt: new Date().toISOString()
    }
  });
});

export default router;
