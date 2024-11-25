import { Chip, Divider } from '@mui/material'
import { FilterValueType, TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { selectFilteredTasks, TaskDomainType } from 'features/todolostsList/model/tasksSlice'
import { useAppDispatch, useAppSelector } from 'app/store'
import { TaskStatuses } from 'features/todolostsList/lib/enums/enum'
import { useGetTasksQuery } from 'features/todolostsList/api/tasksApi'
import { Task } from './Task'
import { TasksSkeleton } from '../skeletons/TaskSkeleton'
import { setAppError } from 'app/appSlice'
import { TasksPagination } from './tasksPagination/TasksPagination'
import { useState } from 'react'

type Props = {
	todolist: TodolistDomainType
}

export const Tasks = ({todolist}: Props) => {
	const {id, filter} = todolist;
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetTasksQuery({todolistId: id, args: {page}})
	let tasks = data?.items
	const dispatch = useAppDispatch()
	if (filter === "Completed") {
		tasks = tasks?.filter((t) => t.status === TaskStatuses.Completed)
	} else if (filter === "Active") {
		tasks = tasks?.filter((t) => t.status === TaskStatuses.New)
	}

	const mappedTasks = (status: TaskStatuses): JSX.Element[] => {
		return tasks
			?.filter(ft => ft.status === status)
			.map((t) => <Task task={t} key={t.id} todolistId={id} page={page} />) || []
	}

	if (isLoading) {
		return <TasksSkeleton/>
	}
	return (
		<>
			{tasks?.length ? mappedTasks(TaskStatuses.New) : <div>No tasks</div>}

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

