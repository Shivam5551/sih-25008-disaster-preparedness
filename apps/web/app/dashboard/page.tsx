import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { 
	BookOpen, 
	AlertTriangle, 
	Award, 
	BarChart3,
	TrendingUp,
	Target,
	Bell,
	Calendar,
	CheckCircle2,
	XCircle,
	Activity
} from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<NavbarWrapper />

			{/* Dashboard Content */}
			<div className="container mx-auto px-4 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
					<p className="text-muted-foreground">Track your disaster preparedness progress and institutional safety metrics.</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="bg-card rounded-lg border p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
								<BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
							<TrendingUp className="h-4 w-4 text-green-500" />
						</div>
						<h3 className="text-2xl font-bold">4/6</h3>
						<p className="text-muted-foreground text-sm">Modules Completed</p>
					</div>

					<div className="bg-card rounded-lg border p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
								<Target className="h-6 w-6 text-green-600 dark:text-green-400" />
							</div>
							<TrendingUp className="h-4 w-4 text-green-500" />
						</div>
						<h3 className="text-2xl font-bold">12/15</h3>
						<p className="text-muted-foreground text-sm">Drills Completed</p>
					</div>

					<div className="bg-card rounded-lg border p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
								<Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
							</div>
							<TrendingUp className="h-4 w-4 text-green-500" />
						</div>
						<h3 className="text-2xl font-bold">8</h3>
						<p className="text-muted-foreground text-sm">Badges Earned</p>
					</div>

					<div className="bg-card rounded-lg border p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
								<BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
							</div>
							<div className="text-lg font-bold text-green-500">92%</div>
						</div>
						<h3 className="text-2xl font-bold">A+</h3>
						<p className="text-muted-foreground text-sm">Safety Score</p>
					</div>
				</div>

				<div className="grid lg:grid-cols-3 gap-8 mb-8">
					{/* Recent Activities */}
					<div className="lg:col-span-2">
						<div className="bg-card rounded-lg border p-6">
							<h2 className="text-xl font-semibold mb-4 flex items-center">
								<Activity className="h-5 w-5 mr-2" />
								Recent Activities
							</h2>
							<div className="space-y-4">
								<div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
									<CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
									<div className="flex-1">
										<p className="font-medium">Completed Fire Safety Module</p>
										<p className="text-sm text-muted-foreground">Earned Fire Safety Expert badge</p>
										<p className="text-xs text-muted-foreground">2 hours ago</p>
									</div>
								</div>
								<div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
									<CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
									<div className="flex-1">
										<p className="font-medium">Participated in Earthquake Drill</p>
										<p className="text-sm text-muted-foreground">Scored 95% in evacuation simulation</p>
										<p className="text-xs text-muted-foreground">1 day ago</p>
									</div>
								</div>
								<div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
									<Bell className="h-5 w-5 text-blue-500 mt-0.5" />
									<div className="flex-1">
										<p className="font-medium">Received Weather Alert</p>
										<p className="text-sm text-muted-foreground">Heavy rainfall warning for your region</p>
										<p className="text-xs text-muted-foreground">2 days ago</p>
									</div>
								</div>
								<div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
									<XCircle className="h-5 w-5 text-orange-500 mt-0.5" />
									<div className="flex-1">
										<p className="font-medium">Missed Monthly Drill</p>
										<p className="text-sm text-muted-foreground">Make sure to participate in upcoming drills</p>
										<p className="text-xs text-muted-foreground">1 week ago</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Upcoming Events */}
					<div>
						<div className="bg-card rounded-lg border p-6 mb-6">
							<h2 className="text-xl font-semibold mb-4 flex items-center">
								<Calendar className="h-5 w-5 mr-2" />
								Upcoming Events
							</h2>
							<div className="space-y-4">
								<div className="border-l-4 border-blue-500 pl-4">
									<p className="font-medium">Flood Safety Workshop</p>
									<p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
								</div>
								<div className="border-l-4 border-orange-500 pl-4">
									<p className="font-medium">Monthly Fire Drill</p>
									<p className="text-sm text-muted-foreground">Jan 20, 10:00 AM</p>
								</div>
								<div className="border-l-4 border-green-500 pl-4">
									<p className="font-medium">First Aid Training</p>
									<p className="text-sm text-muted-foreground">Jan 25, 9:00 AM</p>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="bg-card rounded-lg border p-6">
							<h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
							<div className="space-y-3">
								<Button className="w-full justify-start" variant="outline" asChild>
									<Link href="/modules">
										<BookOpen className="h-4 w-4 mr-2" />
										Continue Learning
									</Link>
								</Button>
								<Button className="w-full justify-start" variant="outline" asChild>
									<Link href="/drills">
										<Target className="h-4 w-4 mr-2" />
										Practice Drill
									</Link>
								</Button>
								<Button className="w-full justify-start" variant="outline" asChild>
									<Link href="/emergency">
										<AlertTriangle className="h-4 w-4 mr-2" />
										Emergency Contacts
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Progress Charts */}
				<div className="grid md:grid-cols-2 gap-8 mb-8">
					<div className="bg-card rounded-lg border p-6">
						<h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between text-sm mb-1">
									<span>Earthquake Safety</span>
									<span>100%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between text-sm mb-1">
									<span>Fire Safety</span>
									<span>100%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between text-sm mb-1">
									<span>Flood Management</span>
									<span>75%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between text-sm mb-1">
									<span>First Aid</span>
									<span>60%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-card rounded-lg border p-6">
						<h2 className="text-xl font-semibold mb-4">Institution Safety Score</h2>
						<div className="text-center">
							<div className="text-4xl font-bold text-green-500 mb-2">92%</div>
							<p className="text-muted-foreground mb-4">Excellent Safety Rating</p>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="text-center">
									<div className="font-semibold">95%</div>
									<div className="text-muted-foreground">Student Participation</div>
								</div>
								<div className="text-center">
									<div className="font-semibold">90%</div>
									<div className="text-muted-foreground">Staff Training</div>
								</div>
								<div className="text-center">
									<div className="font-semibold">88%</div>
									<div className="text-muted-foreground">Equipment Ready</div>
								</div>
								<div className="text-center">
									<div className="font-semibold">96%</div>
									<div className="text-muted-foreground">Drill Compliance</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Links */}
				<div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
					<h2 className="text-2xl font-bold mb-4">Continue Your Safety Journey</h2>
					<p className="text-muted-foreground mb-6">Stay prepared and help make your institution safer for everyone.</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" asChild>
							<Link href="/modules">
								<BookOpen className="h-4 w-4 mr-2" />
								Resume Learning
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/leaderboard">
								<Award className="h-4 w-4 mr-2" />
								View Leaderboard
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
