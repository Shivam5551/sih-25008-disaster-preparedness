'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { 
	Shield, 
	Menu, 
	X,
	User
} from 'lucide-react';
import { ModeToggle } from './mode-toggle';

interface NavbarProps {
	currentPage?: string;
}

export function Navbar({ currentPage }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/modules', label: 'Learning Modules' },
		{ href: '/game', label: 'Emergency Game' },
		{ href: '/drills', label: 'Virtual Drills' },
		{ href: '/alerts', label: 'Alerts' },
		{ href: '/dashboard', label: 'Dashboard' },
	];

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link href="/" className="flex items-center space-x-2">
					<Shield className="h-8 w-8 text-primary" />
					<span className="text-xl font-bold">SafeCampus</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`transition-all duration-200 px-3 py-2 rounded-md ${
								`/${currentPage?.split('/')[1]}` === item.href
									? 'text-primary font-semibold bg-primary/10 border-b-2 border-primary'
									: 'text-muted-foreground/60 hover:text-foreground hover:bg-accent/50 hover:font-medium'
							}`}
						>
							{item.label}
						</Link>
					))}
				</nav>

				{/* Desktop Actions */}
				<div className="hidden md:flex items-center space-x-4">
					<ModeToggle/>
					<Button variant="outline" size="sm" asChild>
						<Link href="/profile">
							<User className="h-4 w-4 mr-2" />
							Profile
						</Link>
					</Button>
					<Button size="sm" asChild>
						<Link href="/auth/login">Login</Link>
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden border-t bg-background">
					<div className="container mx-auto px-4 py-4 space-y-4">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`block transition-all duration-200 px-3 py-2 rounded-md ${
									currentPage === item.href
										? 'text-primary font-semibold bg-primary/10 border-l-4 border-primary'
										: 'text-muted-foreground/60 hover:text-foreground hover:bg-accent/50 hover:font-medium'
								}`}
								onClick={() => setIsOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<div className="pt-4 border-t space-y-2">
							<Button variant="outline" size="sm" className="w-full" asChild>
								<ModeToggle/>
								<Link href="/profile">
									<User className="h-4 w-4 mr-2" />
									Profile
								</Link>
							</Button>
							<Button size="sm" className="w-full" asChild>
								<Link href="/auth/login">Login</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
