import React from 'react'
import { TaskSelect } from './TaskSelect';
import { TaskPriorities, TaskStatuses } from 'features/todolostsList/lib/enums/enum';
import { useAppDispatch } from 'app/store';
import { TaskDomainType } from 'features/todolostsList/model/tasksSlice';
import { useUpdateTaskMutation } from 'features/todolostsList/api/tasksApi';
import { updateTaskApiModel } from 'features/todolostsList/lib/utils/updateTaskModel';
import Typography from '@mui/material/Typography';

type Props = {
	task: TaskDomainType
	todolistId: string
}

export const priorityOptions = [
	{
		label: 'Low',
		color: '#A8D5BA', 
		value: '0'
	},
	{
		label: 'Middle',
		color: '#90CAF9',
		value: '1'
	},
	{
		label: 'High',
		color: '#EF9A9A', 
		value: '2'
	},
	{
		label: 'Urgent',
		color: '#727171', 
		value: '3'
	},
	{
		label: 'Later',
		color: '#CE93D8',
		value: '4'
	},
];

const statusesOptions = [
	{
		label: 'New',
		color: '#2196F3',
		value: '0'
	},
	// {
	// 	label: 'In progress',
	// 	color: '#e913f0',
	// 	value: '1'
	// },
	{
		label: 'Completed',
		color: '#4CAF50',
		value: '2'
	},
	// {
	// 	label: 'Draft',
	// 	color: '#D32F2F',
	// 	value: '3'
	// },
];

export const TaskSelects = ({ task, todolistId }: Props) => {
	const { status, priority, id: taskId } = task;
	const [updateTask] = useUpdateTaskMutation()
	const dispatch = useAppDispatch()
	const changeStatusSelectHandler = (e: any, value: string) => {
		
		let newStatus = Number(value)
		if (newStatus === status) return
		const updatedModel = updateTaskApiModel(task, { status: newStatus })
		updateTask({ taskId, todolistId, apiModel: updatedModel })
	}

	const changePrioritySelectHandler = (e: any, value: string) => {
		// debugger
		let newPriority = Number(value)
		if (newPriority === priority) return
		const updatedModel = updateTaskApiModel(task, { priority: newPriority })
		updateTask({ taskId, todolistId, apiModel: updatedModel })
		// dispatch(updateTaskTC({ todolistId, taskId, model: { priority: newPriority } }))
	}

	return (
		<div style={{width:'100%'}}>
			<Typography variant="body2" component="p" sx={{ margin: '15px 0 5px' }}>Task priority:</Typography>
			<TaskSelect defaultValue={priority} onChange={changePrioritySelectHandler} options={priorityOptions}/>

			<Typography variant="body2" component="p" sx={{ margin: '15px 0 5px' }}>Task Status:</Typography>
			<TaskSelect defaultValue={status} onChange={changeStatusSelectHandler} options={statusesOptions}/>
		</div>
	)
}

