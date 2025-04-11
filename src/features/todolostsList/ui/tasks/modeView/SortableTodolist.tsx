import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
	rectSortingStrategy,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'

export const SortableTodolist = ({ item, children }: { item: { id: string }, children: React.ReactNode }) => {
	const navigate = useNavigate()
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: item.id })

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		cursor: 'grab',
		// position: 'relative',
		// zIndex: isDragging ? 1000 : 'auto',
	}

	// let dragged = false

	// const handleMouseDown = () => {
	// 	dragged = false
	// }

	// const handleMouseMove = () => {
	// 	dragged = true
	// }

	// const handleClick = () => {
	// 	if (!dragged) {
	// 		navigate(`/todolists/${item.id}`)
	// 	}
	// }

	return (
		<div ref={setNodeRef} {...attributes} {...listeners} style={style} 
		// onMouseDown={handleMouseDown}
			// onMouseMove={handleMouseMove}
			// onClick={handleClick}
			>
			{children}
		</div>
	)
}