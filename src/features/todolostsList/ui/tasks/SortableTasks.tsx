import { Chip, Divider } from '@mui/material'
import { Task } from './Task'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { reorderTasksTC, selectFilteredTasks, TaskDomainType } from 'features/todolostsList/model/tasksSlice'
import { useAppDispatch, useAppSelector } from 'app/store'
import { TaskStatuses } from 'features/todolostsList/lib/enums/enum'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react'
import { SortableTask } from './SortableTask'
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { unwrapResult } from '@reduxjs/toolkit'


type Props = {
	todolist: TodolistDomainType
}

export const SortableTasks = ({todolist}: Props) => {
	const {filter, id} = todolist;

	const tasks = useAppSelector((state) => selectFilteredTasks(state, filter, id));

	const activeTasks = tasks?.filter((task) => task.status === TaskStatuses.New) || [];
	const completedTasks = tasks?.filter((task) => task.status === TaskStatuses.Completed) || [];
	const dispatch = useAppDispatch()
	const mappedTasks = (tasksArray: TaskDomainType[]): JSX.Element[] => {
		return tasksArray.map((t) => <SortableTask {...t} key={t.id} todolistId={id} />)
	}

	useEffect(() => {
		setTaskItems(tasks || []);
	}, [tasks]);

	const [taskItems, setTaskItems] = useState<TaskDomainType[]>(tasks || []);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			 dispatch(reorderTasksTC({todolistId: id, taskId: active.id as string, replacedTaskId: over.id as string}))
				// .then(unwrapResult)
				// .then(() => {
					setTaskItems((items) => {
						const oldIndex = items.findIndex(item => item.id === active.id)
						const newIndex = items.findIndex(item => item.id === over.id)
						return arrayMove(items, oldIndex, newIndex);
					// });
				})
		}
	}

	return (
		<>
			{/* {activeTasks.length ? mappedTasks(activeTasks) : <div>No tasks</div>} */}
			{/* {completedTasks.length > 0 && (
				<>
					<Divider textAlign="right" sx={{ m: "10px 0" }}>
						<Chip label="Done" size="small" />
					</Divider>
					{mappedTasks(completedTasks)}
				</>
			)} */}

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
			>
				<SortableContext
					items={taskItems}
					strategy={verticalListSortingStrategy}
				>
				{activeTasks.length ? mappedTasks(activeTasks) : <div>No tasks</div>}

					
				</SortableContext>

				<SortableContext
					items={taskItems}
					strategy={verticalListSortingStrategy}>
				{completedTasks.length > 0 && (
					<>
						<Divider textAlign="right" sx={{ m: "10px 0" }}>
							<Chip label="Done" size="small" />
						</Divider>
						{mappedTasks(completedTasks)}
					</>
				)}
				</SortableContext>
			</DndContext>

			
		</>
	)
}

