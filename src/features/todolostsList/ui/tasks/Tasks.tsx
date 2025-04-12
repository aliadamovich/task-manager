import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { useAppDispatch, useAppSelector } from 'app/store'
import { TaskStatuses } from 'features/todolostsList/lib/enums/enum'
import { useGetTasksQuery } from 'features/todolostsList/api/tasksApi'
import { Task } from './Task'
import { TasksSkeleton } from '../skeletons/TaskSkeleton'
import { setAppError } from 'app/appSlice'
import { TasksPagination } from './tasksPagination/TasksPagination'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import {
		DndContext,
		closestCenter,
		} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy} from '@dnd-kit/sortable';

import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import { useDragAndDrop } from 'features/todolostsList/lib/hooks/useDragAndDrop'


type Props = {
	todolist: TodolistDomainType
}

export const Tasks = ({todolist}: Props) => {
	const {id, filter} = todolist;
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetTasksQuery({todolistId: id, args: {page}})
	let tasks = data?.items;
	const dispatch = useAppDispatch()
	const { items: taskItems, setItems, sensors, handleDragEnd } = useDragAndDrop(tasks)
	if (filter === "Completed") {
		tasks = tasks?.filter((t) => t.status === TaskStatuses.Completed)
	} else if (filter === "Active") {
		tasks = tasks?.filter((t) => t.status === TaskStatuses.New)
	}

	const mappedTasks = (status: TaskStatuses): JSX.Element[] => {
		return taskItems
			?.filter(ft => ft.status === status)
			.map((t) => <Task task={t} key={t.id} todolistId={id} page={page} {...t} />) || []
	}

	useEffect(() => {
		setItems(tasks);
	}, [tasks]);


	if (isLoading) {
		return <TasksSkeleton/>
	}
	return (
		<>
			{tasks?.length 
			?
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={taskItems ?? []}
					strategy={verticalListSortingStrategy}
				>
					{mappedTasks(TaskStatuses.New) }

				</SortableContext>
			</DndContext>
			
			: <div>No tasks</div>}

			{tasks && tasks.length > 0 && (
				<>
					<Divider textAlign="right" sx={{ m: "10px 0" }}>
						<Chip label="Done" size="small" />
					</Divider>
					{mappedTasks(TaskStatuses.Completed)}
					<TasksPagination setPage={setPage} page={page} totalCount={data?.totalCount || 0}/>
				</>
			)}
		</>
	)
}

