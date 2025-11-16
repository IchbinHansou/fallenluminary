import * as React from 'react'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	function Textarea({ className = '', ...props }, ref) {
		return (
			<textarea
				ref={ref}
				className={`block w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-emerald-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${className}`}
				{...props}
			/>
		)
	},
)


