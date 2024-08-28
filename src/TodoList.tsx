import { FilterValueType, TodoListsType } from "./all_study_comp/App_old";
import { AddItemInput } from "./components/addItemInput/AddItemInput";
import { Button, Chip, Divider, Grid, List, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store/store";
import { addTaskAС } from "./store/reducers/tasks-reducer";
import { changeTodolistFilterAС, changeTodolistTitleAС, removeTodolistAС } from "./store/reducers/todolist-reducer";
import { todolistTitleStyle } from "./styles/Todolost.styles";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import React, { useCallback, useMemo } from "react";
import { FilterButton } from "./components/FilterButton";
import { TaskType } from "./App";
import { Task } from "./Task";


export type TodoListProps = {
	todolist: TodoListsType
}

export const TodoList = React.memo(({ todolist }: TodoListProps) => {

	const {id, filter, title} = todolist ;

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
	const dispatch = useDispatch();

	//*tasks
	// добавление таски
	const addTaskCallback = useCallback((value: string) => {
		dispatch(addTaskAС(id, value))
	}, [addTaskAС, id, dispatch])


	//* todolists
	//удаление всего тудулиста
	const removeTodoListHandler = useCallback(() => {
		dispatch(removeTodolistAС(id))
	}, [id, dispatch])

	//изменение названия тудулиста
	const changeTodoTitleCallback = useCallback((newTitle: string) => {
		dispatch(changeTodolistTitleAС(id, newTitle))
	}, [id, dispatch])


	//фильтрация
	const changeFilterHandler = (filter: FilterValueType) => {
		dispatch(changeTodolistFilterAС(id, filter))
	}

	//функции для смены фильтра по наажтию на ryjgre
	const onAllClickHandler = useCallback(() => changeFilterHandler('All'), [])
	const onActiveClickHandler = useCallback(() => changeFilterHandler('Active'), [])
	const onCompletedClickHandler = useCallback(() => changeFilterHandler('Completed'), [])

//создаю фиьтрующую функцию чтобы в разных местах разместить таски сделанные и невыполненные
	const filterTasks = (isDone: boolean): JSX.Element[] => {
		let tasksForFilter = tasks;

		if (filter === 'Completed') {
			tasksForFilter = tasks.filter(t => t.isDone === true)
		} else if (filter === 'Active') {
			tasksForFilter = tasks.filter(t => t.isDone === false)
		}

		return tasksForFilter.filter(t => t.isDone === isDone).map(t =>
				<Task
					{...t}
					key={t.id}
					todolistId={id}
			/>)
	}

	return(
		<Grid item xs={12} md={4} >
			<Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>

				<h2 style={todolistTitleStyle}>
					<EditableSpan title={title} onChange={changeTodoTitleCallback} removeItem={removeTodoListHandler}/>
				</h2>

				<List sx={{flex: '1 1 auto', mt: '10px'}}>

					{!filterTasks(false).length
						? <div>No tasks</div>
						: filterTasks(false)}

					{filterTasks(true).length > 0
						&& <>
								<Divider textAlign="right" sx={{m: '10px 0'}}><Chip label="Done" size="small" /></Divider>
						{filterTasks(true)}
							</>
					}

				</List>
				
				<div style={{ margin: '20px 0', display: 'flex', gap: '8px'}}>
					<FilterButton children="All" onClick={onAllClickHandler} variant={filter === 'All' ? 'contained' : 'text'}/>
					<FilterButton children="Active" onClick={onActiveClickHandler} variant={filter === 'Active' ? 'contained' : 'text'}/>
					<FilterButton children="Completed" onClick={onCompletedClickHandler} variant={filter === 'Completed' ? 'contained' : 'text'}/>
				</div>

				<AddItemInput addItem={addTaskCallback} label="Add new task" />
			</Paper>
		</Grid>
	)
})
