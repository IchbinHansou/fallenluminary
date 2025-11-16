import * as React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ className = '', variant = 'default', size = 'md', ...props },
		ref,
	) {
		const base =
			'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
		const variants: Record<string, string> = {
			default: 'bg-emerald-600 text-white hover:bg-emerald-700',
			outline:
				'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-50',
			ghost: 'bg-transparent hover:bg-emerald-50 text-emerald-700',
		}
		const sizes: Record<string, string> = {
			sm: 'h-8 px-3 text-sm rounded-md',
			md: 'h-10 px-4 text-sm rounded-md',
			icon: 'h-10 w-10 rounded-full',
		}
		return (
			<button
				ref={ref}
				className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
				{...props}
			/>
		)
	},
)


