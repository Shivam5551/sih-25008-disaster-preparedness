import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { 
	Shield, 
	AlertTriangle, 
	Play,
	Clock,
	Users,
	Target,
	Award,
	CheckCircle2,
	Timer
} from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';

const drills = [
	{
		id: 'earthquake-evacuation',
		title: 'Earthquake Evacuation',
		description: 'Practice Drop, Cover, and Hold procedures followed by safe evacuation routes.',
		duration: '15 mins',
		difficulty: 'Beginner',
		participants: '1-50',
		type: 'Evacuation',
		icon: AlertTriangle,
		color: 'text-red-500',
		completed: true,
		lastScore: 95
	},
	{
		id: 'fire-emergency',
		title: 'Fire Emergency Response',
		description: 'Learn fire detection, alarm procedures, and emergency evacuation protocols.',
		duration: '20 mins',
		difficulty: 'Beginner',
		participants: '1-30',
		type: 'Fire Safety',
		icon: Shield,
		color: 'text-orange-500',
		completed: false,
		lastScore: null
	},
	{
		id: 'flood-response',
		title: 'Flood Response Simulation',
		description: 'Practice flood evacuation, water safety, and emergency communication.',
		duration: '25 mins',
		difficulty: 'Intermediate',
		participants: '5-40',
		type: 'Natural Disaster',
		icon: AlertTriangle,
		color: 'text-blue-500',
		completed: true,
		lastScore: 88
	},
	{
		id: 'medical-emergency',
		title: 'Medical Emergency Drill',
		description: 'Respond to medical emergencies with first aid and emergency services coordination.',
		duration: '18 mins',
		difficulty: 'Intermediate',
		participants: '2-20',
		type: 'Medical',
		icon: Shield,
		color: 'text-green-500',
		completed: false,
		lastScore: null
	},
	{
		id: 'lockdown-procedure',
		title: 'Security Lockdown',
		description: 'Practice security lockdown procedures and safe room protocols.',
		duration: '12 mins',
		difficulty: 'Advanced',
		participants: '1-100',
		type: 'Security',
		icon: Shield,
		color: 'text-purple-500',
		completed: false,
		lastScore: null
	},
	{
		id: 'multi-hazard',
		title: 'Multi-Hazard Scenario',
		description: 'Complex scenario combining multiple disaster types for advanced training.',
		duration: '35 mins',
		difficulty: 'Advanced',
		participants: '10-50',
		type: 'Combined',
		icon: Target,
		color: 'text-indigo-500',
		completed: false,
		lastScore: null
	}
];

export default function DrillsPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<NavbarWrapper />

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Virtual Drill Simulations
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Practice emergency procedures in realistic virtual environments. Build confidence and muscle memory for real disaster situations.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<div className="flex items-center space-x-2 text-sm">
							<Target className="h-4 w-4 text-primary" />
							<span>6 Simulation Types</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<Timer className="h-4 w-4 text-primary" />
							<span>12-35 Min Sessions</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<Award className="h-4 w-4 text-primary" />
							<span>Performance Tracking</span>
						</div>
					</div>
				</div>
			</section>

			{/* Progress Overview */}
			<section className="container mx-auto px-4 py-8">
				<div className="bg-card rounded-lg border p-6 mb-8">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
						<div>
							<h2 className="text-2xl font-semibold mb-2">Drill Progress</h2>
							<p className="text-muted-foreground">Complete drills to improve your emergency response skills</p>
						</div>
						<div className="text-right">
							<div className="text-3xl font-bold text-primary">33%</div>
							<p className="text-sm text-muted-foreground">2 of 6 drills completed</p>
						</div>
					</div>
					<div className="w-full bg-muted rounded-full h-2">
						<div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
					</div>
				</div>
			</section>

			{/* Virtual Drills Grid */}
			<section className="container mx-auto px-4 pb-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{drills.map((drill) => {
						const IconComponent = drill.icon;
						return (
							<div key={drill.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
								<div className="flex items-start justify-between mb-4">
									<div className={`p-3 rounded-lg bg-muted ${drill.color}`}>
										<IconComponent className="h-6 w-6" />
									</div>
									{drill.completed && (
										<div className="flex items-center space-x-1">
											<CheckCircle2 className="h-5 w-5 text-green-500" />
											<span className="text-sm font-medium text-green-600">{drill.lastScore}%</span>
										</div>
									)}
								</div>
								
								<h3 className="text-xl font-semibold mb-2">{drill.title}</h3>
								<p className="text-muted-foreground mb-4 text-sm">{drill.description}</p>
								
								<div className="space-y-2 mb-4">
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center space-x-1">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span>{drill.duration}</span>
										</div>
										<span className="px-2 py-1 bg-muted rounded text-xs">{drill.difficulty}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center space-x-1">
											<Users className="h-4 w-4 text-muted-foreground" />
											<span>{drill.participants} participants</span>
										</div>
										<span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{drill.type}</span>
									</div>
								</div>
								
								<Button 
									className="w-full" 
									variant={drill.completed ? "outline" : "default"}
									asChild
								>
									<Link href={`/drills/${drill.id}`}>
										<Play className="h-4 w-4 mr-2" />
										{drill.completed ? 'Practice Again' : 'Start Drill'}
									</Link>
								</Button>
							</div>
						);
					})}
				</div>
			</section>

			{/* Performance Section */}
			<section className="bg-muted py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Track Your Performance</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-card p-6 rounded-lg text-center">
							<Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">Response Time</h3>
							<div className="text-3xl font-bold text-blue-500 mb-2">2.3s</div>
							<p className="text-muted-foreground text-sm">Average reaction time to emergency signals</p>
						</div>
						<div className="bg-card p-6 rounded-lg text-center">
							<Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">Accuracy Rate</h3>
							<div className="text-3xl font-bold text-green-500 mb-2">91%</div>
							<p className="text-muted-foreground text-sm">Correct responses in emergency procedures</p>
						</div>
						<div className="bg-card p-6 rounded-lg text-center">
							<CheckCircle2 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
							<div className="text-3xl font-bold text-purple-500 mb-2">85%</div>
							<p className="text-muted-foreground text-sm">Successfully completed drill scenarios</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-3xl font-bold mb-4">Ready to Start Practicing?</h2>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Join thousands of students building critical emergency response skills through virtual training.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" asChild>
						<Link href="/drills/earthquake-evacuation">Start First Drill</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/leaderboard">View Leaderboard</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
