import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { 
	Shield, 
	Users, 
	BookOpen, 
	AlertTriangle, 
	Award,
	MapPin,
	Clock,
	Play,
	CheckCircle
} from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';

const modules = [
	{
		id: 'earthquake',
		title: 'Earthquake Preparedness',
		description: 'Learn essential earthquake safety measures, early warning signs, and proper response protocols.',
		duration: '45 mins',
		difficulty: 'Beginner',
		region: 'All Regions',
		completed: false,
		icon: AlertTriangle,
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
		icon: Shield,
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
		icon: Users,
		color: 'text-blue-500'
	},
	{
		id: 'cyclone-preparedness',
		title: 'Cyclone & Storm Safety',
		description: 'Understanding cyclone patterns, shelter protocols, and post-storm recovery measures.',
		duration: '50 mins',
		difficulty: 'Intermediate',
		region: 'Coastal Areas',
		completed: false,
		icon: AlertTriangle,
		color: 'text-purple-500'
	},
	{
		id: 'first-aid',
		title: 'Emergency First Aid',
		description: 'Basic first aid techniques, CPR, and medical emergency response for students and staff.',
		duration: '60 mins',
		difficulty: 'Beginner',
		region: 'All Regions',
		completed: true,
		icon: Shield,
		color: 'text-green-500'
	},
	{
		id: 'communication',
		title: 'Emergency Communication',
		description: 'Establishing communication protocols during disasters and coordinating with emergency services.',
		duration: '30 mins',
		difficulty: 'Advanced',
		region: 'All Regions',
		completed: false,
		icon: Users,
		color: 'text-indigo-500'
	}
];

export default function ModulesPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<NavbarWrapper />

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Interactive Learning Modules
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Master disaster preparedness with our comprehensive, region-specific education modules designed for Indian educational institutions.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<div className="flex items-center space-x-2 text-sm">
							<BookOpen className="h-4 w-4 text-primary" />
							<span>6 Comprehensive Modules</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<Clock className="h-4 w-4 text-primary" />
							<span>4+ Hours of Content</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<Award className="h-4 w-4 text-primary" />
							<span>Certification Available</span>
						</div>
					</div>
				</div>
			</section>

			{/* Progress Overview */}
			<section className="container mx-auto px-4 py-8">
				<div className="bg-card rounded-lg border p-6 mb-8">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
						<div>
							<h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
							<p className="text-muted-foreground">Complete all modules to earn your Disaster Preparedness Certificate</p>
						</div>
						<div className="text-right">
							<div className="text-3xl font-bold text-primary">33%</div>
							<p className="text-sm text-muted-foreground">2 of 6 modules completed</p>
						</div>
					</div>
					<div className="w-full bg-muted rounded-full h-2">
						<div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
					</div>
				</div>
			</section>

			{/* Learning Modules Grid */}
			<section className="container mx-auto px-4 pb-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{modules.map((module) => {
						const IconComponent = module.icon;
						return (
							<div key={module.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
								<div className="flex items-start justify-between mb-4">
									<div className={`p-3 rounded-lg bg-muted ${module.color}`}>
										<IconComponent className="h-6 w-6" />
									</div>
									{module.completed && (
										<CheckCircle className="h-6 w-6 text-green-500" />
									)}
								</div>
								
								<h3 className="text-xl font-semibold mb-2">{module.title}</h3>
								<p className="text-muted-foreground mb-4 text-sm">{module.description}</p>
								
								<div className="space-y-2 mb-4">
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center space-x-1">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span>{module.duration}</span>
										</div>
										<span className="px-2 py-1 bg-muted rounded text-xs">{module.difficulty}</span>
									</div>
									<div className="flex items-center space-x-1 text-sm">
										<MapPin className="h-4 w-4 text-muted-foreground" />
										<span>{module.region}</span>
									</div>
								</div>
								
								<Button 
									className="w-full" 
									variant={module.completed ? "outline" : "default"}
									asChild
								>
									<Link href={`/modules/${module.id}`}>
										<Play className="h-4 w-4 mr-2" />
										{module.completed ? 'Review Module' : 'Start Learning'}
									</Link>
								</Button>
							</div>
						);
					})}
				</div>
			</section>

			{/* Achievement Section */}
			<section className="bg-muted py-16">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-8">Earn Certificates & Badges</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-card p-6 rounded-lg">
							<Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">Module Completion</h3>
							<p className="text-muted-foreground text-sm">Earn badges for completing each learning module</p>
						</div>
						<div className="bg-card p-6 rounded-lg">
							<Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">Safety Expert</h3>
							<p className="text-muted-foreground text-sm">Complete all modules to become a certified Safety Expert</p>
						</div>
						<div className="bg-card p-6 rounded-lg">
							<Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">Peer Leader</h3>
							<p className="text-muted-foreground text-sm">Help train others and earn leadership recognition</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-3xl font-bold mb-4">Ready to Continue Learning?</h2>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Start with your next incomplete module or practice with our virtual drill simulations.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" asChild>
						<Link href="/modules/earthquake">Continue Learning</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/drills">Try Virtual Drills</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
