import * as React from 'react'

export function ScrollArea({
	className = '',
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={`overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent ${className}`}
			{...props}
		/>
	)
}


