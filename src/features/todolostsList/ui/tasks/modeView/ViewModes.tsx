import { ViewModeType } from 'common/types/viewTypes'
import { useDragAndDrop } from 'features/todolostsList/lib/hooks/useDragAndDrop'
import { ColumnsView } from 'features/todolostsList/ui/tasks/modeView/ColumnsView'
import { GalleryView } from 'features/todolostsList/ui/tasks/modeView/GalleryView'
import {ListView} from 'features/todolostsList/ui/tasks/modeView/ListView'
import {
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	rectSortingStrategy,
	SortableContext
} from '@dnd-kit/sortable';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'

type Props = {
	mode: ViewModeType
	todolists: TodolistDomainType[] | undefined
}

export const ViewModes = ({ mode, todolists }: Props) => {
	const { items, sensors, handleDragEnd } = useDragAndDrop(todolists)
	const strategy =
		mode === 'list'
			? verticalListSortingStrategy
			: mode === 'columns'
				? horizontalListSortingStrategy
				: rectSortingStrategy;


	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
			<SortableContext items={items ?? []} strategy={strategy}>
				{mode === 'list' && <ListView todolists={items} />}
				{mode === 'columns' && <ColumnsView todolists={items}/>}
				{mode === 'gallery' && <GalleryView todolists={items}/>}
			</SortableContext>
		</DndContext>
	)
}