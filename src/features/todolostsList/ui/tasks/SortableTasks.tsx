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
import { act, useEffect, useRef, useState } from 'react'
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

	const mappedTasks = (tasksArray: TaskDomainType[]): JSX.Element[] => {
		return tasksArray?.map((t) => <SortableTask task={t} key={t.id} todolistId={id} />)
	}
	const prevActiveTasksRef = useRef<TaskDomainType[]>([]);
	useEffect(() => {
		if (JSON.stringify(prevActiveTasksRef.current) !== JSON.stringify(activeTasks)) {
			setTaskItems(activeTasks);
			prevActiveTasksRef.current = activeTasks;
		}
	}, [activeTasks]);

	const [taskItems, setTaskItems] = useState<TaskDomainType[]>(activeTasks);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			setTaskItems((items) => {
				const oldIndex = items.findIndex(item => item.id === active.id)
				const newIndex = items.findIndex(item => item.id === over.id)
				return arrayMove(items, oldIndex, newIndex);
			})
			// dispatch(reorderTasksTC({ todolistId: id, taskId: active.id as string, replacedTaskId:over.id as string }))
		}
	}

	return (
		<>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis]}
			>
				<SortableContext
					items={taskItems}
					strategy={verticalListSortingStrategy}
				>
				{ mappedTasks(taskItems) }

				</SortableContext>
			</DndContext>
			<>
				<Divider textAlign="right" sx={{ m: "10px 0" }}>
					<Chip label="Done" size="small" />
				</Divider>
				{mappedTasks(completedTasks)}
			</>
		</>
	)
}

