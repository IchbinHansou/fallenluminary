import * as React from 'react'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	function Input({ className = '', ...props }, ref) {
		return (
			<input
				ref={ref}
				className={`block w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-emerald-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${className}`}
				{...props}
			/>
		)
	},
)


