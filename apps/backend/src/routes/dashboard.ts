import { Router, Request, Response } from 'express';

const router: Router = Router();

// Get user dashboard data
router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  const dashboardData = {
    user: {
      id: userId,
      name: 'John Doe',
      role: 'student',
      institution: 'Delhi Public School',
      joinedAt: '2024-01-15T00:00:00.000Z'
    },
    stats: {
      modulesCompleted: 4,
      totalModules: 6,
      drillsCompleted: 12,
      totalDrills: 15,
      badgesEarned: 8,
      safetyScore: 92,
      hoursLearned: 25.5,
      streakDays: 7
    },
    recentActivities: [
      {
        id: '1',
        type: 'module_completed',
        title: 'Completed Fire Safety Module',
        description: 'Earned Fire Safety Expert badge',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        icon: 'CheckCircle2',
        color: 'text-green-500'
      },
      {
        id: '2',
        type: 'drill_completed',
        title: 'Participated in Earthquake Drill',
        description: 'Scored 95% in evacuation simulation',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        icon: 'Target',
        color: 'text-blue-500'
      },
      {
        id: '3',
        type: 'alert_received',
        title: 'Received Weather Alert',
        description: 'Heavy rainfall warning for your region',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        icon: 'Bell',
        color: 'text-orange-500'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'Flood Safety Workshop',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        time: '2:00 PM',
        type: 'workshop',
        location: 'Main Auditorium'
      },
      {
        id: '2',
        title: 'Monthly Fire Drill',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM',
        type: 'drill',
        location: 'School Campus'
      },
      {
        id: '3',
        title: 'First Aid Training',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM',
        type: 'training',
        location: 'Health Center'
      }
    ],
    learningProgress: [
      { module: 'Earthquake Safety', progress: 100, color: 'green' },
      { module: 'Fire Safety', progress: 100, color: 'green' },
      { module: 'Flood Management', progress: 75, color: 'blue' },
      { module: 'First Aid', progress: 60, color: 'yellow' },
      { module: 'Cyclone Preparedness', progress: 0, color: 'gray' },
      { module: 'Emergency Communication', progress: 0, color: 'gray' }
    ],
    recommendations: [
      {
        type: 'module',
        title: 'Complete Flood Management Module',
        description: 'You\'re 75% through this module. Finish it to earn your certificate!',
        action: 'Continue Learning',
        href: '/modules/flood-management'
      },
      {
        type: 'drill',
        title: 'Practice Medical Emergency Drill',
        description: 'Based on your learning progress, this drill will help reinforce your skills.',
        action: 'Start Drill',
        href: '/drills/medical-emergency'
      }
    ]
  };

  res.json({ dashboard: dashboardData });
});

// Get institution dashboard (for admins)
router.get('/institution/:institutionId', (req: Request, res: Response) => {
  const { institutionId } = req.params;

  const institutionDashboard = {
    institution: {
      id: institutionId,
      name: 'Delhi Public School',
      location: 'New Delhi',
      type: 'School',
      totalStudents: 1250,
      totalStaff: 85
    },
    overallStats: {
      safetyScore: 88,
      studentsActive: 1150,
      staffActive: 78,
      drillsThisMonth: 8,
      emergencyReadiness: 92
    },
    preparednessMetrics: {
      studentParticipation: 95,
      staffTraining: 90,
      equipmentReady: 88,
      drillCompliance: 96,
      emergencyPlanUpdated: true,
      lastDrillDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    recentAlerts: [
      {
        id: '1',
        type: 'weather',
        title: 'Heavy Rain Alert',
        severity: 'Medium',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'drill',
        title: 'Scheduled Fire Drill',
        severity: 'Low',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    upcomingDrills: [
      {
        id: '1',
        type: 'Fire Evacuation',
        scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        participants: 'All Students & Staff',
        coordinator: 'Safety Officer'
      },
      {
        id: '2',
        type: 'Earthquake Response',
        scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        participants: 'Grade 6-12',
        coordinator: 'Principal'
      }
    ],
    departmentProgress: [
      { department: 'Primary Section', completion: 95, students: 400 },
      { department: 'Middle Section', completion: 88, students: 450 },
      { department: 'Senior Section', completion: 92, students: 400 },
      { department: 'Teaching Staff', completion: 96, members: 65 },
      { department: 'Non-Teaching Staff', completion: 85, members: 20 }
    ],
    recommendations: [
      {
        priority: 'High',
        title: 'Update Emergency Contact Database',
        description: 'Some emergency contacts are outdated. Update within 48 hours.',
        action: 'Update Now'
      },
      {
        priority: 'Medium',
        title: 'Schedule Additional First Aid Training',
        description: 'Consider organizing advanced first aid training for staff.',
        action: 'Schedule Training'
      }
    ]
  };

  res.json({ dashboard: institutionDashboard });
});

// Get analytics data
router.get('/analytics/:timeframe', (req: Request, res: Response) => {
  const { timeframe } = req.params; // weekly, monthly, yearly

  const analyticsData = {
    timeframe,
    period: timeframe === 'weekly' ? 'Last 7 days' : timeframe === 'monthly' ? 'Last 30 days' : 'Last 12 months',
    metrics: {
      moduleCompletions: {
        total: timeframe === 'weekly' ? 45 : timeframe === 'monthly' ? 180 : 2160,
        trend: '+12%',
        chartData: [
          { date: '2025-01-08', value: 5 },
          { date: '2025-01-09', value: 8 },
          { date: '2025-01-10', value: 6 },
          { date: '2025-01-11', value: 9 },
          { date: '2025-01-12', value: 7 },
          { date: '2025-01-13', value: 5 },
          { date: '2025-01-14', value: 5 }
        ]
      },
      drillParticipation: {
        total: timeframe === 'weekly' ? 120 : timeframe === 'monthly' ? 480 : 5760,
        trend: '+8%',
        chartData: [
          { date: '2025-01-08', value: 15 },
          { date: '2025-01-09', value: 18 },
          { date: '2025-01-10', value: 12 },
          { date: '2025-01-11', value: 22 },
          { date: '2025-01-12', value: 19 },
          { date: '2025-01-13', value: 16 },
          { date: '2025-01-14', value: 18 }
        ]
      },
      safetyScores: {
        average: 91,
        trend: '+5%',
        distribution: {
          excellent: 45, // 90-100
          good: 35,      // 80-89
          average: 15,   // 70-79
          needsWork: 5   // Below 70
        }
      }
    },
    topPerformers: [
      { name: 'Rahul Sharma', score: 98, modules: 6, drills: 15 },
      { name: 'Priya Patel', score: 96, modules: 6, drills: 14 },
      { name: 'Arjun Kumar', score: 95, modules: 5, drills: 16 }
    ],
    popularModules: [
      { name: 'Earthquake Safety', completions: 85 },
      { name: 'Fire Safety', completions: 78 },
      { name: 'First Aid', completions: 65 },
      { name: 'Flood Management', completions: 52 }
    ]
  };

  res.json({ analytics: analyticsData });
});

// Get leaderboard data
router.get('/leaderboard/:category', (req: Request, res: Response) => {
  const { category } = req.params; // overall, modules, drills, recent

  const leaderboardData = {
    category: category || 'overall',
    lastUpdated: new Date().toISOString(),
    rankings: [
      {
        rank: 1,
        userId: 'user123',
        name: 'Rahul Sharma',
        institution: 'Delhi Public School',
        score: 98,
        badges: 12,
        modulesCompleted: 6,
        drillsCompleted: 15,
        avatar: '/avatars/user123.jpg'
      },
      {
        rank: 2,
        userId: 'user456',
        name: 'Priya Patel',
        institution: 'Modern School',
        score: 96,
        badges: 11,
        modulesCompleted: 6,
        drillsCompleted: 14,
        avatar: '/avatars/user456.jpg'
      },
      {
        rank: 3,
        userId: 'user789',
        name: 'Arjun Kumar',
        institution: 'St. Mary\'s School',
        score: 95,
        badges: 10,
        modulesCompleted: 5,
        drillsCompleted: 16,
        avatar: '/avatars/user789.jpg'
      }
    ],
    userRank: {
      rank: 15,
      score: 92,
      nextRankScore: 93,
      pointsNeeded: 1
    }
  };

  res.json({ leaderboard: leaderboardData });
});

export default router;
