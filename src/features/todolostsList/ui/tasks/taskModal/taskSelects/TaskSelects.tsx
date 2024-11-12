import React from 'react'
import { TaskSelect } from './TaskSelect';
import { TaskPriorities, TaskStatuses } from 'features/todolostsList/lib/enums/enum';
import { useAppDispatch } from 'app/store';
import { updateTaskTC } from 'features/todolostsList/model/tasksSlice';
import { Typography } from '@mui/material';

type Props = {
	status: TaskStatuses
	priority:TaskPriorities
	taskId: string
	todolistId: string
}
export const priorityOptions = [
	{
		label: 'Low',
		color: '#4CAF50',
		value: '0'
	},
	{
		label: 'Middle',
		color: '#2196F3',
		value: '1'
	},
	{
		label: 'High',
		color: '#D32F2F',
		value: '2'
	},
	{
		label: 'Urgent',
		color: '#030303',
		value: '3'
	},
	{
		label: 'Later',
		color: '#e913f0',
		value: '4'
	},
];
const statusesOptions = [
	{
		label: 'New',
		color: '#2196F3',
		value: '0'
	},
	{
		label: 'In progress',
		color: '#e913f0',
		value: '1'
	},
	{
		label: 'Completed',
		color: '#4CAF50',
		value: '2'
	},
	{
		label: 'Draft',
		color: '#D32F2F',
		value: '3'
	},
];

export const TaskSelects = ({ status, priority, taskId, todolistId }: Props) => {
	const dispatch = useAppDispatch()

	const changeStatusSelectHandler = (value: string) => {
		let newStatus = Number(value)
		if (newStatus === status) return
		dispatch(updateTaskTC({todolistId, taskId, model: {status: newStatus}}))
	}

	const changePrioritySelectHandler = (value: string) => {
		let newPriority = Number(value)
		if (newPriority === priority) return
		dispatch(updateTaskTC({ todolistId, taskId, model: { priority: newPriority } }))
	}

	return (
		<div style={{}}>
			<Typography variant="body2" component="p" sx={{ margin: '15px 0 5px' }}>Task priority:</Typography>
			<TaskSelect defaultValue={priority} onChange={changePrioritySelectHandler} options={priorityOptions}/>

			<Typography variant="body2" component="p" sx={{ margin: '15px 0 5px' }}>Task Status:</Typography>
			<TaskSelect defaultValue={status} onChange={changeStatusSelectHandler} options={statusesOptions}/>
		</div>
	)
}

