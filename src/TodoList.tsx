import { ChangeEvent, KeyboardEvent, useState } from "react"
import { TaskElement } from "./TaskElement"
import s from './TodoList.module.css';
import { FilterValueType, Task, TaskStateType } from "./App";
import { AddItemInput } from "./components/addItemInput/AddItemInput";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Button, Chip, Divider, Grid, IconButton, List, Paper, Typography, useTheme } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FilterButton, MenuButton } from "./FilterButton";

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

	const theme = useTheme();

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
//создаю фиьтрующую функцию чтобы в разных местах разместить таски сделанные и невыполненные
	const filteredTasks = (filter: boolean): JSX.Element[] => {

			return tasks.filter(t => t.isDone === filter).map(t =>
				<TaskElement
					{...t}
					key={t.id}
					removeTaskHandler={removeTaskHandler}
					changeTaskStatusHandler={changeTaskStatusHandler}
					changeTitleValue={changeTitleHandler}
				/>)
	}

	return(
		<Grid item xs={12} md={4} >
			<Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
				<h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 20px'}}>
					<EditableSpan title={title} onChange={changeTodoTitleCallback}/>
					<IconButton onClick={removeTodoListHandler}>
						<DeleteOutlineIcon fontSize="small"/>
					</IconButton>
				</h3>

				<Divider />

				<List sx={{flex: '1 1 auto', mt: '10px'}}>
					{filteredTasks(false).length === 0 
						? <div>No tasks</div>
						: filteredTasks(false)}

					{filteredTasks(true).length > 0
						&& <>
								<Divider textAlign="right" sx={{m: '10px 0'}}>
									<Chip label="Done" size="small" />
								</Divider>
								{filteredTasks(true)}
							</>
					}
				</List>
				
				<div className={s.buttons} style={{marginBottom: '20px'}}>
					<Button 
						size="small"
						variant={filter === 'All' ? 'contained' : 'text'}
						onClick={()=>changeFilterHandler('All')}>
						All
					</Button>
					<Button 
						size="small"
						color="primary"
						onClick={() => changeFilterHandler('Active')}
						variant={filter === 'Active' ? 'contained' : 'text'}>
						Active
					</Button>
					<Button
						size="small"
						color="secondary"
						onClick={() => changeFilterHandler('Completed')}
						variant={filter === 'Completed' ? 'contained' : 'text'}>
						Completed
					</Button>
				</div>

				<AddItemInput addItem={addTaskCallback} label="Add new task" />
			</Paper>
		</Grid>
	)
}