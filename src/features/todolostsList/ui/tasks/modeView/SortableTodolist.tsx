import {
	useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react'
import s from './ViewModes.module.scss'
export type DragParams = {
	setNodeRef?: (el: HTMLElement | null) => void,
	style?: CSSProperties,
	isDragging?: boolean,
	listeners?: ReturnType<typeof useSortable>['listeners'],
	attributes?: ReturnType<typeof useSortable>['attributes'],
}

type Props = {
	item: { id: string }
	children: (params: DragParams) => React.ReactNode
}

export const SortableTodolist = ({ item, children }: Props) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id })

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div ref={setNodeRef} style={style} className={s.sortable}>
			{children({ setNodeRef, style, isDragging, listeners, attributes })}
		</div>
	)
}