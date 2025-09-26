import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { Shield, Users, BookOpen, AlertTriangle, Award, BarChart3 } from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';
import Image from 'next/image';
import logo from './logo.png'

export default function HomePage() {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<NavbarWrapper />

			{/* Hero Section */}
			<section className="container mx-auto px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
				{/* Left Content */}
				<div className="text-center md:text-left space-y-6">
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
						Prepare, Learn, and Stay Safe
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
						Interactive disaster management education platform designed to make schools
						and colleges safer through comprehensive training, virtual drills, and
						real-time emergency response.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
						<Button size="lg" asChild>
							<Link href="/modules">Start Learning</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/game">Play Emergency Game</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/demo">Try Virtual Drill</Link>
						</Button>
					</div>
				</div>

				{/* Right Logo */}
				<div className="hidden mr-12 xl:mr-18 justify-center md:flex md:justify-end">
					<Image
						src={logo}
						alt="Logo Image"
						width={250}
						height={250}
						className="filter invert-0 dark:invert"
					/>
				</div>
			</section>


			{/* Features Section */}
			<section className="container mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold text-center mb-12">
					Comprehensive Disaster Education Platform
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="text-center p-6 rounded-lg border bg-card">
						<BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Interactive Learning Modules</h3>
						<p className="text-muted-foreground">
							Comprehensive disaster preparedness courses covering earthquakes, floods, fires, and more.
						</p>
					</div>
					<div className="text-center p-6 rounded-lg border bg-card">
						<Users className="h-12 w-12 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Virtual Drills</h3>
						<p className="text-muted-foreground">
							Realistic disaster simulations to practice emergency procedures in a safe environment.
						</p>
					</div>
					<div className="text-center p-6 rounded-lg border bg-card">
						<AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Regional Alerts</h3>
						<p className="text-muted-foreground">
							Location-specific disaster warnings and emergency notifications for your area.
						</p>
					</div>
					<div className="text-center p-6 rounded-lg border bg-card">
						<Award className="h-12 w-12 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
						<p className="text-muted-foreground">
							Earn badges and compete with peers while learning life-saving disaster response skills.
						</p>
					</div>
					<div className="text-center p-6 rounded-lg border bg-card">
						<BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
						<p className="text-muted-foreground">
							Track preparedness scores, drill participation, and institutional safety metrics.
						</p>
					</div>
					<div className="text-center p-6 rounded-lg border bg-card">
						<Shield className="h-12 w-12 text-primary mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Emergency Contacts</h3>
						<p className="text-muted-foreground">
							Quick access to local emergency services and institutional safety contacts.
						</p>
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section className="bg-muted py-16">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-12">Making a Difference</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div>
							<div className="text-4xl font-bold text-primary mb-2">75%</div>
							<p className="text-muted-foreground">Improvement in emergency response time</p>
						</div>
						<div>
							<div className="text-4xl font-bold text-primary mb-2">10,000+</div>
							<p className="text-muted-foreground">Students trained across India</p>
						</div>
						<div>
							<div className="text-4xl font-bold text-primary mb-2">500+</div>
							<p className="text-muted-foreground">Educational institutions onboarded</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-3xl font-bold mb-4">
					Ready to Make Your Institution Safer?
				</h2>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Join thousands of educational institutions across India in building a disaster-resilient future.
				</p>
				<Button size="lg" asChild>
					<Link href="/register">Get Started Today</Link>
				</Button>
			</section>

			{/* Footer */}
			<footer className="border-t bg-background">
				<div className="container mx-auto px-4 py-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<Shield className="h-6 w-6 text-primary" />
								<span className="font-bold">SafeCampus</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Building safer educational institutions through comprehensive disaster preparedness training.
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Platform</h4>
							<ul className="space-y-2 text-sm">
								<li><Link href="/modules" className="text-muted-foreground hover:text-foreground">Learning Modules</Link></li>
								<li><Link href="/drills" className="text-muted-foreground hover:text-foreground">Virtual Drills</Link></li>
								<li><Link href="/alerts" className="text-muted-foreground hover:text-foreground">Emergency Alerts</Link></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Resources</h4>
							<ul className="space-y-2 text-sm">
								<li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
								<li><Link href="/guidelines" className="text-muted-foreground hover:text-foreground">Safety Guidelines</Link></li>
								<li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Support</h4>
							<ul className="space-y-2 text-sm">
								<li><Link href="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
								<li><Link href="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
								<li><Link href="/emergency" className="text-muted-foreground hover:text-foreground">Emergency Contacts</Link></li>
							</ul>
						</div>
					</div>
					<div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
						<p>&copy; 2025 SafeCampus. All rights reserved. Built for safer educational institutions.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
