import { Router, Request, Response } from 'express';

const router: Router = Router();

// Get all active alerts
router.get('/', (req: Request, res: Response) => {
  const alerts = [
    {
      id: '1',
      type: 'warning',
      severity: 'High',
      title: 'Heavy Rainfall Warning',
      description: 'Intense rainfall expected in Mumbai and surrounding areas. Risk of waterlogging and flooding.',
      location: 'Mumbai, Maharashtra',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      validUntil: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
      source: 'India Meteorological Department',
      actions: [
        'Avoid low-lying areas',
        'Keep emergency supplies ready',
        'Monitor local weather updates'
      ],
      affectedInstitutions: 45,
      estimatedImpact: 'Medium'
    },
    {
      id: '2',
      type: 'alert',
      severity: 'Critical',
      title: 'Earthquake Advisory',
      description: 'Seismic activity detected in Delhi NCR region. Schools advised to review evacuation procedures.',
      location: 'Delhi NCR',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      issuedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      validUntil: 'Ongoing monitoring',
      source: 'National Center for Seismology',
      actions: [
        'Review evacuation routes',
        'Conduct safety briefings',
        'Ensure emergency kits are accessible'
      ],
      affectedInstitutions: 120,
      estimatedImpact: 'High'
    },
    {
      id: '3',
      type: 'info',
      severity: 'Medium',
      title: 'Cyclone Update',
      description: 'Cyclone Biparjoy moving towards Gujarat coast. Educational institutions in coastal areas should prepare.',
      location: 'Gujarat Coast',
      coordinates: { lat: 22.2587, lng: 71.1924 },
      issuedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      validUntil: new Date(Date.now() + 42 * 60 * 60 * 1000).toISOString(), // 42 hours from now
      source: 'National Disaster Management Authority',
      actions: [
        'Secure loose objects',
        'Stock emergency supplies',
        'Coordinate with local authorities'
      ],
      affectedInstitutions: 78,
      estimatedImpact: 'High'
    }
  ];

  res.json({ alerts });
});

// Get alerts by location
router.get('/location/:state', (req: Request, res: Response) => {
  const { state } = req.params;
  const { city } = req.query;
  
  // Mock location-based filtering
  const locationAlerts = [
    {
      id: '1',
      type: 'warning',
      severity: 'High',
      title: `Weather Alert for ${city || state}`,
      description: `Location-specific weather warning for ${city ? city + ', ' : ''}${state}`,
      location: `${city ? city + ', ' : ''}${state}`,
      issuedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      source: 'Regional Meteorological Center',
      actions: ['Stay indoors', 'Monitor updates', 'Keep emergency kit ready']
    }
  ];

  res.json({ alerts: locationAlerts, location: `${city ? city + ', ' : ''}${state}` });
});

// Get alert details
router.get('/:alertId', (req: Request, res: Response) => {
  const { alertId } = req.params;

  const alertDetails = {
    id: alertId,
    type: 'warning',
    severity: 'High',
    title: 'Heavy Rainfall Warning',
    description: 'Intense rainfall expected in Mumbai and surrounding areas. Risk of waterlogging and flooding.',
    detailedDescription: 'The India Meteorological Department has issued a heavy rainfall warning for Mumbai and surrounding areas. Rainfall intensity is expected to be 100-150mm in 3 hours. Low-lying areas are at high risk of waterlogging. Citizens are advised to avoid unnecessary travel.',
    location: 'Mumbai, Maharashtra',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    affectedAreas: ['Andheri', 'Bandra', 'Colaba', 'Dahisar', 'Ghatkopar'],
    issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    source: 'India Meteorological Department',
    sourceContact: {
      phone: '1077',
      email: 'imd.mumbai@gov.in',
      website: 'https://mausam.imd.gov.in'
    },
    actions: [
      'Avoid low-lying areas',
      'Keep emergency supplies ready',
      'Monitor local weather updates',
      'Ensure drainage systems are clear',
      'Have emergency contacts ready'
    ],
    affectedInstitutions: 45,
    estimatedImpact: 'Medium',
    relatedAlerts: ['2', '3'],
    updates: [
      {
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        message: 'Rainfall intensity increased. Exercise extreme caution.'
      },
      {
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        message: 'Alert extended to include Thane and Navi Mumbai.'
      }
    ]
  };

  res.json({ alert: alertDetails });
});

// Subscribe to alerts
router.post('/subscribe', (req: Request, res: Response) => {
  const { userId, location, alertTypes, notificationMethods } = req.body;

  const subscription = {
    id: 'sub_' + Math.random().toString(36).substr(2, 9),
    userId,
    location: location || 'All India',
    alertTypes: alertTypes || ['warning', 'alert', 'info'],
    notificationMethods: notificationMethods || ['push', 'email'],
    createdAt: new Date().toISOString(),
    active: true
  };

  res.json({
    message: 'Alert subscription created successfully',
    subscription
  });
});

// Update alert subscription
router.put('/subscribe/:subscriptionId', (req: Request, res: Response) => {
  const { subscriptionId } = req.params;
  const updates = req.body;

  res.json({
    message: 'Subscription updated successfully',
    subscriptionId,
    updates,
    updatedAt: new Date().toISOString()
  });
});

// Get emergency contacts
router.get('/emergency-contacts/:location', (req: Request, res: Response) => {
  const { location } = req.params;

  const emergencyContacts = {
    national: [
      { name: 'National Emergency', number: '112', description: 'All-in-one emergency number' },
      { name: 'Police', number: '100', description: 'Police emergency response' },
      { name: 'Fire Service', number: '101', description: 'Fire emergency services' },
      { name: 'Ambulance', number: '102', description: 'Medical emergency services' },
      { name: 'NDRF Helpline', number: '011-26701700', description: 'National Disaster Response Force' }
    ],
    regional: location ? [
      { name: `${location} Control Room`, number: '1077', description: 'Local emergency control room' },
      { name: `${location} Disaster Management`, number: '1070', description: 'Local disaster management office' }
    ] : [],
    institutional: [
      { name: 'School Emergency Coordinator', number: '+91-98765-43210', description: 'Primary emergency contact' },
      { name: 'Principal Office', number: '+91-98765-43211', description: 'School administration' },
      { name: 'Security Office', number: '+91-98765-43212', description: '24/7 security desk' }
    ]
  };

  res.json({ contacts: emergencyContacts, location: location || 'All India' });
});

export default router;
