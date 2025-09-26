'use client';

import * as React from 'react';

interface ProgressProps {
	value: number;
	className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
	({ className, value, ...props }, ref) => (
		<div
			ref={ref}
			className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className || ''}`}
			{...props}
		>
			<div
				className="h-full bg-primary transition-all duration-300 ease-in-out"
				style={{ width: `${Math.min(100, Math.max(0, value || 0))}%` }}
			/>
		</div>
	)
);
Progress.displayName = 'Progress';

export { Progress };