import { ChangeEvent, KeyboardEvent, useState } from "react"
import { TaskElement } from "./TaskElement"
import s from './TodoList.module.css';
import { FilterValueType, Task } from "./App";
import { AddItemInput } from "./components/addItemInput/AddItemInput";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export type TodoListProps = {
	todoListId: string
	tasks: Task[]
	filter: FilterValueType
	title: string
	addTask: (value: string, todoListId: string) => void
	changeFilter: (filter: FilterValueType, todoListId: string) => void
	removeTask: (taskId: string, todoListId: string) => void
	changeTaskStatus: (taskId: string, status: boolean, todoListId: string) => void
	removeTodoList: (todoListId: string) => void
	changeTaskTitle: (taskId: string, value: string, todoListId: string) => void
	changeTodoTitle: (value: string, todoListId: string) => void
}


export const TodoList = ({ tasks, filter, title, todoListId, addTask, changeFilter, removeTask, changeTaskStatus, removeTodoList, changeTaskTitle, changeTodoTitle }: TodoListProps) => {

	const addTaskCallback = (value: string) => {
		addTask(value, todoListId)
	}

	//удаление таски
	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId, todoListId)
	}

	//смена статуса таски isDone
	const changeTaskStatusHandler = (taskId: string, status: boolean) => {
		changeTaskStatus(taskId, status, todoListId)
	}

	//изменение текста таски 
	const changeTitleHandler = (value: string, id: string) => {
		changeTaskTitle(value, id, todoListId)
	}

	//удаление всего тудулиста
	const removeTodoListHandler = () => {
		removeTodoList(todoListId)
	}

	//изменение названия тудулиста
	const changeTodoTitleCallback = (newTitle: string) => {
		changeTodoTitle(newTitle, todoListId)
	}

	//фильтрация
	const changeFilterHandler = (filter: FilterValueType) => {
		changeFilter(filter, todoListId)
	}

	const mappedTasks = !tasks.length 
		? <div>No tasks</div>
		: tasks.map(t => 
		<TaskElement
			{...t} 
			key={t.id} 
			removeTaskHandler={removeTaskHandler} 
			changeTaskStatusHandler={changeTaskStatusHandler}
			changeTitleValue={changeTitleHandler}
		/>)

	return(
		<Grid item xs={12} md={4}>
			<Paper elevation={3} sx={{ padding: 2 }}>
				<Typography variant='h3' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '1rem'}}>
					<EditableSpan title={title} onChange={changeTodoTitleCallback}/>
					<IconButton title='X' onClick={removeTodoListHandler}>
						<ClearIcon/>
					</IconButton>
				</Typography>
	
				<AddItemInput addItem={addTaskCallback} label="Add new task"/>
				<ul>
					{ mappedTasks }
				</ul>
				<div className={s.buttons}>
					<Button 
						onClick={()=>changeFilterHandler('All')}
						variant={filter === 'All' ? 'contained' : 'text'}>
						All
					</Button>
					<Button 
						color="primary"
						onClick={() => changeFilterHandler('Active')}
						variant={filter === 'Active' ? 'contained' : 'text'}>
						Active
					</Button>
					<Button
						color="secondary"
						onClick={() => changeFilterHandler('Completed')}
						variant={filter === 'Completed' ? 'contained' : 'text'}>
						Completed
					</Button>
				</div>
			</Paper>
		</Grid>
	)
}