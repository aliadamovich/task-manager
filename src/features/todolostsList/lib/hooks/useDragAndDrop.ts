import {
		KeyboardSensor,
		PointerSensor,
		useSensor,
		useSensors,
		DragEndEvent } from '@dnd-kit/core';

import { arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';


type ItemsWithId = {id: string}

export const useDragAndDrop = <T extends ItemsWithId>(initialItems: T[] | undefined) => {

	const [items, setItems] = useState<T[] | undefined>(initialItems);
		
			const handleDragEnd = (event: DragEndEvent) => {
				const { active, over } = event;
				if (over && active.id !== over.id) {
					setItems((items) => {
						if (!items) return []
							const oldIndex = items?.findIndex(item => item.id === active.id)
							const newIndex = items?.findIndex(item => item.id === over.id)
							return arrayMove(items, oldIndex, newIndex);
					})
				}
			}
			const sensors = useSensors(
				useSensor(PointerSensor),
				useSensor(KeyboardSensor, {
					coordinateGetter: sortableKeyboardCoordinates,
				})
			);

	useEffect(() => {
		setItems(initialItems)
	}, [initialItems])


			return {
				items, 
				setItems,
				sensors,
				handleDragEnd,
			}

}