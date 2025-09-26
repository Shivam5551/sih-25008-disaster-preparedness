import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Mock user data
const users: any[] = [];

// Register endpoint
router.post('/register', (req: Request, res: Response) => {
  try {
    const { email, password, name, role, institution, location } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: role || 'student',
      institution: institution || '',
      location: location || '',
      createdAt: new Date().toISOString(),
      isActive: true,
      profile: {
        avatar: '',
        phone: '',
        emergencyContact: '',
        preparednessLevel: 'beginner'
      }
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          institution: newUser.institution,
          location: newUser.location
        },
        token: `mock_token_${newUser.id}`
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Login endpoint
router.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Mock authentication - in real app, verify password hash
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          institution: user.institution,
          location: user.location
        },
        token: `mock_token_${user.id}`
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get profile
router.get('/profile', (req: Request, res: Response) => {
  try {
    // Mock user from token
    const mockUser = {
      id: '1',
      email: 'student@example.com',
      name: 'John Doe',
      role: 'student',
      institution: 'Delhi Public School',
      location: 'New Delhi',
      profile: {
        avatar: '',
        phone: '+91 9876543210',
        emergencyContact: '+91 9876543211',
        preparednessLevel: 'intermediate'
      },
      statistics: {
        modulesCompleted: 4,
        drillsCompleted: 12,
        certificatesEarned: 2,
        safetyScore: 92
      }
    };

    res.json({
      success: true,
      data: { user: mockUser }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
});

export default router;
