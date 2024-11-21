import { Chip, Divider } from '@mui/material'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { selectFilteredTasks, TaskDomainType } from 'features/todolostsList/model/tasksSlice'
import { useAppSelector } from 'app/store'
import { TaskStatuses } from 'features/todolostsList/lib/enums/enum'
import { useGetTasksQuery } from 'features/todolostsList/api/tasksApi_rtk'
import { Task } from './Task'

type Props = {
	todolist: TodolistDomainType
}

export const Tasks = ({todolist}: Props) => {
	const {filter, id} = todolist;
	const { data } = useGetTasksQuery(id)
	const tasks = data?.items
	// const tasks = useAppSelector((state) => selectFilteredTasks(state, filter, id));

	const activeTasks = tasks?.filter((task) => task.status === TaskStatuses.New) || [];
	const completedTasks = tasks?.filter((task) => task.status === TaskStatuses.Completed) || [];

	const mappedTasks = (tasksArray: TaskDomainType[]): JSX.Element[] => {
		return tasksArray.map((t) => <Task task={t} key={t.id} todolistId={id} />)
	
	}
	return (
		<>
			{activeTasks.length ? mappedTasks(activeTasks) : <div>No tasks</div>}

			{completedTasks.length > 0 && (
				<>
					<Divider textAlign="right" sx={{ m: "10px 0" }}>
						<Chip label="Done" size="small" />
					</Divider>
					{mappedTasks(completedTasks)}
				</>
			)}
		</>
	)
}

