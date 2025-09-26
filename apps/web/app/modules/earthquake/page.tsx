import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import {
	AlertTriangle,
	Play,
	Clock,
	Award,
	CheckCircle,
	ArrowLeft,
	BookOpen,
	Users,
	Target
} from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';

export default function EarthquakeModulePage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<NavbarWrapper />

			{/* Module Content */}
			<div className="container mx-auto px-4 py-8">
				{/* Back Navigation */}
				<div className="mb-6">
					<Button variant="ghost" asChild>
						<Link href="/modules">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Modules
						</Link>
					</Button>
				</div>

				{/* Module Header */}
				<div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-8 mb-8">
					<div className="flex items-start space-x-6">
						<div className="p-4 bg-red-500/20 rounded-lg">
							<AlertTriangle className="h-12 w-12 text-red-500" />
						</div>
						<div className="flex-1">
							<h1 className="text-3xl md:text-4xl font-bold mb-4">Earthquake Preparedness</h1>
							<p className="text-xl text-muted-foreground mb-6">
								Learn essential earthquake safety measures, early warning signs, and proper response protocols to protect yourself and others during seismic events.
							</p>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
								<div className="flex items-center space-x-2">
									<Clock className="h-4 w-4 text-red-500" />
									<span>45 minutes</span>
								</div>
								<div className="flex items-center space-x-2">
									<Users className="h-4 w-4 text-red-500" />
									<span>Beginner Level</span>
								</div>
								<div className="flex items-center space-x-2">
									<BookOpen className="h-4 w-4 text-red-500" />
									<span>5 Lessons</span>
								</div>
								<div className="flex items-center space-x-2">
									<Award className="h-4 w-4 text-red-500" />
									<span>Certificate Available</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Learning Progress */}
				<div className="bg-card rounded-lg border p-6 mb-8">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">Your Progress</h2>
						<span className="text-sm text-muted-foreground">0 of 5 lessons completed</span>
					</div>
					<div className="w-full bg-muted rounded-full h-2">
						<div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
					</div>
				</div>

				{/* Lesson List */}
				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<h2 className="text-2xl font-semibold mb-6">Module Lessons</h2>
						<div className="space-y-4">
							{[
								{
									id: 1,
									title: 'Understanding Earthquakes',
									description: 'Learn about earthquake causes, types, and how they are measured.',
									duration: '8 mins',
									completed: false
								},
								{
									id: 2,
									title: 'Before an Earthquake',
									description: 'Preparation strategies and creating emergency plans.',
									duration: '10 mins',
									completed: false
								},
								{
									id: 3,
									title: 'During an Earthquake',
									description: 'Drop, Cover, and Hold techniques and immediate response.',
									duration: '12 mins',
									completed: false
								},
								{
									id: 4,
									title: 'After an Earthquake',
									description: 'Post-earthquake safety checks and recovery procedures.',
									duration: '10 mins',
									completed: false
								},
								{
									id: 5,
									title: 'School-Specific Protocols',
									description: 'Educational institution specific earthquake response procedures.',
									duration: '5 mins',
									completed: false
								}
							].map((lesson) => (
								<div key={lesson.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
									<div className="flex items-center justify-between">
										<div className="flex items-start space-x-4">
											<div className="flex-shrink-0">
												{lesson.completed ? (
													<CheckCircle className="h-6 w-6 text-green-500" />
												) : (
													<div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
														<span className="text-xs font-medium">{lesson.id}</span>
													</div>
												)}
											</div>
											<div>
												<h3 className="text-lg font-semibold mb-1">{lesson.title}</h3>
												<p className="text-muted-foreground mb-2">{lesson.description}</p>
												<div className="flex items-center space-x-2 text-sm text-muted-foreground">
													<Clock className="h-4 w-4" />
													<span>{lesson.duration}</span>
												</div>
											</div>
										</div>
										<Button size="sm" variant={lesson.completed ? "outline" : "default"}>
											<Play className="h-4 w-4 mr-2" />
											{lesson.completed ? 'Review' : 'Start'}
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Quick Actions */}
						<div className="bg-card rounded-lg border p-6">
							<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
							<div className="space-y-3">
								<Button className="w-full" size="lg">
									<Play className="h-4 w-4 mr-2" />
									Start Learning
								</Button>
								<Button variant="outline" className="w-full">
									<Target className="h-4 w-4 mr-2" />
									Practice Drill
								</Button>
								<Button variant="outline" className="w-full">
									<BookOpen className="h-4 w-4 mr-2" />
									Download Notes
								</Button>
							</div>
						</div>

						{/* Learning Objectives */}
						<div className="bg-card rounded-lg border p-6">
							<h3 className="text-lg font-semibold mb-4">Learning Objectives</h3>
							<ul className="space-y-2 text-sm">
								<li className="flex items-start space-x-2">
									<CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
									<span>Understand earthquake science and causes</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
									<span>Master Drop, Cover, and Hold technique</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
									<span>Create personal emergency plans</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
									<span>Know post-earthquake safety procedures</span>
								</li>
								<li className="flex items-start space-x-2">
									<CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
									<span>Apply school-specific protocols</span>
								</li>
							</ul>
						</div>

						{/* Prerequisites */}
						<div className="bg-card rounded-lg border p-6">
							<h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
							<p className="text-sm text-muted-foreground">
								No prior knowledge required. This module is designed for beginners and covers all essential earthquake safety concepts.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
