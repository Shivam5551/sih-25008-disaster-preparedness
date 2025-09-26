import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { 
	Shield, 
	AlertTriangle,
	Bell,
	MapPin,
	Clock,
	ExternalLink,
	Info,
	AlertCircle,
	CheckCircle
} from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';

const alerts = [
	{
		id: '1',
		type: 'warning',
		severity: 'High',
		title: 'Heavy Rainfall Warning',
		description: 'Intense rainfall expected in Mumbai and surrounding areas. Risk of waterlogging and flooding.',
		location: 'Mumbai, Maharashtra',
		issuedAt: '2 hours ago',
		validUntil: 'Next 24 hours',
		source: 'India Meteorological Department',
		actions: [
			'Avoid low-lying areas',
			'Keep emergency supplies ready',
			'Monitor local weather updates'
		],
		icon: AlertTriangle,
		color: 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
	},
	{
		id: '2',
		type: 'alert',
		severity: 'Critical',
		title: 'Earthquake Advisory',
		description: 'Seismic activity detected in Delhi NCR region. Schools advised to review evacuation procedures.',
		location: 'Delhi NCR',
		issuedAt: '4 hours ago',
		validUntil: 'Ongoing monitoring',
		source: 'National Center for Seismology',
		actions: [
			'Review evacuation routes',
			'Conduct safety briefings',
			'Ensure emergency kits are accessible'
		],
		icon: AlertCircle,
		color: 'border-red-500 bg-red-50 dark:bg-red-950/20'
	},
	{
		id: '3',
		type: 'info',
		severity: 'Medium',
		title: 'Cyclone Update',
		description: 'Cyclone Biparjoy moving towards Gujarat coast. Educational institutions in coastal areas should prepare.',
		location: 'Gujarat Coast',
		issuedAt: '6 hours ago',
		validUntil: 'Next 48 hours',
		source: 'National Disaster Management Authority',
		actions: [
			'Secure loose objects',
			'Stock emergency supplies',
			'Coordinate with local authorities'
		],
		icon: AlertTriangle,
		color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
	},
	{
		id: '4',
		type: 'success',
		severity: 'Low',
		title: 'Flood Warning Lifted',
		description: 'Water levels have receded in Assam. Normal activities can resume with continued caution.',
		location: 'Assam',
		issuedAt: '8 hours ago',
		validUntil: 'Completed',
		source: 'Central Water Commission',
		actions: [
			'Resume normal operations',
			'Inspect infrastructure',
			'Report any damage'
		],
		icon: CheckCircle,
		color: 'border-green-500 bg-green-50 dark:bg-green-950/20'
	}
];

const severityColors = {
	'Critical': 'text-red-600 bg-red-100 dark:bg-red-950/30',
	'High': 'text-orange-600 bg-orange-100 dark:bg-orange-950/30',
	'Medium': 'text-blue-600 bg-blue-100 dark:bg-blue-950/30',
	'Low': 'text-green-600 bg-green-100 dark:bg-green-950/30'
};

export default function AlertsPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<NavbarWrapper />
			
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Emergency Alerts & Warnings
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Stay informed with real-time disaster alerts, weather warnings, and emergency notifications for your region.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<div className="flex items-center space-x-2 text-sm">
							<Bell className="h-4 w-4 text-primary" />
							<span>Real-time Notifications</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<MapPin className="h-4 w-4 text-primary" />
							<span>Location-specific Alerts</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<Info className="h-4 w-4 text-primary" />
							<span>Official Sources</span>
						</div>
					</div>
				</div>
			</section>

			{/* Active Alerts Section */}
			<section className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">Active Alerts</h2>
					<Button variant="outline" size="sm">
						<Bell className="h-4 w-4 mr-2" />
						Notification Settings
					</Button>
				</div>

				<div className="space-y-4">
					{alerts.map((alert) => {
						const IconComponent = alert.icon;
						return (
							<div key={alert.id} className={`border rounded-lg p-6 ${alert.color}`}>
								<div className="flex items-start space-x-4">
									<div className="flex-shrink-0">
										<IconComponent className="h-6 w-6" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-2">
											<div>
												<h3 className="text-lg font-semibold">{alert.title}</h3>
												<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColors[alert.severity as keyof typeof severityColors]}`}>
													{alert.severity} Priority
												</span>
											</div>
											<Button variant="ghost" size="sm">
												<ExternalLink className="h-4 w-4" />
											</Button>
										</div>
										
										<p className="text-muted-foreground mb-4">{alert.description}</p>
										
										<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
											<div className="flex items-center space-x-1">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span>{alert.location}</span>
											</div>
											<div className="flex items-center space-x-1">
												<Clock className="h-4 w-4 text-muted-foreground" />
												<span>Issued {alert.issuedAt}</span>
											</div>
											<div className="flex items-center space-x-1">
												<Info className="h-4 w-4 text-muted-foreground" />
												<span>Valid: {alert.validUntil}</span>
											</div>
											<div className="text-muted-foreground">
												Source: {alert.source}
											</div>
										</div>
										
										<div>
											<h4 className="font-medium mb-2">Recommended Actions:</h4>
											<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
												{alert.actions.map((action, index) => (
													<li key={index}>{action}</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>

			{/* Emergency Contacts */}
			<section className="bg-muted py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Emergency Contacts</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-card p-6 rounded-lg text-center">
							<div className="p-3 bg-red-100 dark:bg-red-950/20 rounded-lg w-fit mx-auto mb-4">
								<AlertTriangle className="h-8 w-8 text-red-600" />
							</div>
							<h3 className="text-lg font-semibold mb-2">National Emergency</h3>
							<p className="text-2xl font-bold text-red-600 mb-2">112</p>
							<p className="text-muted-foreground text-sm">All-in-one emergency number</p>
						</div>
						<div className="bg-card p-6 rounded-lg text-center">
							<div className="p-3 bg-blue-100 dark:bg-blue-950/20 rounded-lg w-fit mx-auto mb-4">
								<Shield className="h-8 w-8 text-blue-600" />
							</div>
							<h3 className="text-lg font-semibold mb-2">NDRF Helpline</h3>
							<p className="text-2xl font-bold text-blue-600 mb-2">011-26701700</p>
							<p className="text-muted-foreground text-sm">National Disaster Response Force</p>
						</div>
						<div className="bg-card p-6 rounded-lg text-center">
							<div className="p-3 bg-green-100 dark:bg-green-950/20 rounded-lg w-fit mx-auto mb-4">
								<Bell className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Local Authority</h3>
							<p className="text-2xl font-bold text-green-600 mb-2">100</p>
							<p className="text-muted-foreground text-sm">Police emergency response</p>
						</div>
					</div>
				</div>
			</section>

			{/* Alert Subscription */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-3xl font-bold mb-4">Stay Alert, Stay Safe</h2>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Enable notifications to receive instant alerts about disasters and emergencies in your area.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg">
						<Bell className="h-4 w-4 mr-2" />
						Enable Notifications
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/settings">Customize Alerts</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
