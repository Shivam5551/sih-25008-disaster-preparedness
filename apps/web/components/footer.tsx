import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
	return (
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
							<li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Resources</h4>
						<ul className="space-y-2 text-sm">
							<li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
							<li><Link href="/guidelines" className="text-muted-foreground hover:text-foreground">Safety Guidelines</Link></li>
							<li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
							<li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Support</h4>
						<ul className="space-y-2 text-sm">
							<li><Link href="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
							<li><Link href="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
							<li><Link href="/emergency" className="text-muted-foreground hover:text-foreground">Emergency Contacts</Link></li>
							<li><Link href="/feedback" className="text-muted-foreground hover:text-foreground">Feedback</Link></li>
						</ul>
					</div>
				</div>
				<div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
					<p>&copy; 2025 SafeCampus. All rights reserved. Built for safer educational institutions.</p>
				</div>
			</div>
		</footer>
	);
}
