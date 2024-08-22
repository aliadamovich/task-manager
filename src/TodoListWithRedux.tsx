import { TaskElement } from "./TaskElement"
import { FilterValueType, Task, TodoListsType } from "./App";
import { AddItemInput } from "./components/addItemInput/AddItemInput";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Button, Chip, Divider, Grid, IconButton, List, Paper, Typography, useTheme } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store/store";
import { addTaskAС, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./store/reducers/tasks-reducer";
import { changeTodolistFilterAС, changeTodolistTitleAС, removeTodolistAС } from "./store/reducers/todolist-reducer";
import { todolistTitleStyle } from "./Todolost.styles";

export type TodoListProps = {
	todolist: TodoListsType
}


export const TodoListWitRedux = ({ todolist }: TodoListProps) => {
	const theme = useTheme();
	const {id, filter, title} = todolist ;

	let tasks = useSelector<AppRootStateType, Task[]>(state => state.tasks[id])
	const dispatch = useDispatch();

	const addTaskCallback = (value: string) => {
		dispatch(addTaskAС(id, value))
	}

	//удаление таски
	const removeTaskHandler = (taskId: string) => {
		dispatch(removeTaskAC(taskId, id))
	}

	//смена статуса таски isDone
	const changeTaskStatusHandler = (taskId: string, status: boolean) => {
		dispatch(changeTaskStatusAC(id, taskId, status))
	}

	//изменение текста таски 
	const changeTitleHandler = (value: string, taskId: string) => {
		dispatch(changeTaskTitleAC(id, taskId, value))
	}

	//удаление всего тудулиста
	const removeTodoListHandler = () => {
		dispatch(removeTodolistAС(id))
	}

	//изменение названия тудулиста
	const changeTodoTitleCallback = (newTitle: string) => {
		dispatch(changeTodolistTitleAС(id, newTitle))
	}

	//фильтрация
	const changeFilterHandler = (filter: FilterValueType) => {
		dispatch(changeTodolistFilterAС(id, filter))
	}


//создаю фиьтрующую функцию чтобы в разных местах разместить таски сделанные и невыполненные
	const filteredTasks = (isDone: boolean): JSX.Element[] => {

		if (filter === 'Completed') {
			tasks = tasks.filter(t => t.isDone === true)
		} else if (filter === 'Active') {
			tasks = tasks.filter(t => t.isDone === false)
		}

			return tasks.filter(t => t.isDone === isDone).map(t =>
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

				<h2 style={todolistTitleStyle}>
					<EditableSpan title={title} onChange={changeTodoTitleCallback} />
					<IconButton onClick={removeTodoListHandler}>
						<DeleteOutlineIcon fontSize="small"/>
					</IconButton>
				</h2>

				{/* <Divider /> */}

				<List sx={{flex: '1 1 auto', mt: '10px'}}>

					{filteredTasks(false).length === 0 
						? <div>No tasks</div>
						: filteredTasks(false)}

					{filteredTasks(true).length > 0
						&& <>
								<Divider textAlign="right" sx={{m: '10px 0'}}><Chip label="Done" size="small" /></Divider>
								{filteredTasks(true)}
							</>
					}
				</List>
				
				<div style={{marginBottom: '20px', display: 'flex', gap: '8px'}}>
					<Button
						size="small" variant={filter === 'All' ? 'contained' : 'text'}
						onClick={()=>changeFilterHandler('All')}>
						All
					</Button>
					<Button size="small" color="primary" variant={filter === 'Active' ? 'contained' : 'text'}
						onClick={() => changeFilterHandler('Active')}>
						Active
					</Button>
					<Button size="small" color="secondary" variant={filter === 'Completed' ? 'contained' : 'text'}
						onClick={() => changeFilterHandler('Completed')}> 
						Completed
					</Button>
				</div>

				<AddItemInput addItem={addTaskCallback} label="Add new task" />
			</Paper>
		</Grid>
	)
}