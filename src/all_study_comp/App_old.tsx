import { v1 } from 'uuid';
import { TodoList } from './TodoListOld';
import { useState } from 'react';
import { AddItemInput } from '../components/addItemInput/AddItemInput';
import Header from '../components/layout/header/Header';
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type TodoListsType = { 
	id: string,
	title: string
	filter: FilterValueType 
}

export type TaskStateType = {
	[todolistId: string]: Task[]
}



export type FilterValueType = 'All' | 'Completed' | 'Active'

function AppOld() {

	//массив с тудулистами
	const todoList1 = v1();
	const todoList2 = v1();
	const todoList3 = v1();
	const todoList4 = v1();
	const todoList5 = v1();
	const todoList6 = v1();

	const [todoLists, setTodoLists] = useState<TodoListsType[]>([
		{ id: todoList1, title: 'What to learn:', filter: 'All'},
		{ id: todoList2, title: 'What to buy:', filter: 'All'},
		{ id: todoList3, title: 'What to read:', filter: 'All'},
		{ id: todoList4, title: 'What to do:', filter: 'All'},
		{ id: todoList5, title: 'What to clean:', filter: 'All'},
		{ id: todoList6, title: 'Where to go:', filter: 'All'},
	])

	const [allTasks, setAllTasks] = useState<TaskStateType>({
		[todoList1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false }
		],
		[todoList2]: [
			{ id: v1(), title: 'Bread', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		],
		[todoList3]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false }
		],
		[todoList4]: [
			{ id: v1(), title: 'Bread', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		],
		[todoList5]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false }
		],
		[todoList6]: [
			{ id: v1(), title: 'Bread', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		]
	})

	//* tasks

	//добавление новой таски
	const addTask = (value: string, todoListId: string) => {
			let newTask = {
				id: v1(),
				title: value,
				isDone: false
			}
		setAllTasks({ ...allTasks, [todoListId]: [newTask, ...allTasks[todoListId]]})
	}

	//удаление таски
	const removeTask = (taskId: string, todoListId: string) => {
		setAllTasks({...allTasks, [todoListId]: allTasks[todoListId].filter(t => t.id !== taskId)})
	}

	//смена статуса таски isDone
	const changeTaskStatus = (taskId: string, status: boolean, todoListId: string) => {
		setAllTasks({ ...allTasks, [todoListId]: allTasks[todoListId].map(t => t.id === taskId ? {...t, isDone: status} : t)})
	}

	//изменение названия таски
	const changeTaskTitle = (value: string, taskId: string, todoListId: string) => {
		setAllTasks({ ...allTasks, [todoListId]: allTasks[todoListId].map(t => t.id === taskId ? { ...t, title: value } : t) })
	}

	//* todolists

	//Создание нового тудулиста
	const addTodoList = (titleValue: string) => {
		const newTodo: TodoListsType = { id: v1(), title: titleValue, filter: 'All' }
		setTodoLists([...todoLists, newTodo])
		setAllTasks({...allTasks, [newTodo.id] : []})
	}

	//удаление целиком тудулиста
	const removeTodoList = (todolistId: string) => {
		setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
		delete allTasks[todolistId]
		setAllTasks({ ...allTasks })
	}

	//изменение фильтра и перерисовка todoLists
	const changeTodoFilter = (filterValue: FilterValueType, todoListId: string) => {
		const nextState: TodoListsType[] = todoLists.map(td => td.id === todoListId ? { ...td, filter: filterValue } : td)
		setTodoLists(nextState)
	}

	//изменение названия тудулиста
	const changeTodoTitle = (title: string, todoListId: string) => {
		setTodoLists(todoLists.map(td => td.id === todoListId ? { ...td, title: title } : td))
	}

	//* UI

	/* маппим все туду-листы, в каждый передаем фильтр чтобы свой filteredtasks создавался в каждой в завис-ти от значения фильтра */
	const todolistComponent: Array<JSX.Element> = todoLists.map(tl => {
		//фильтрация
		let filteredTasks = allTasks[tl.id];

		if (tl.filter === 'Completed') {
			filteredTasks = filteredTasks.filter(t => t.isDone === true)
		} else if (tl.filter === 'Active') {
			filteredTasks = filteredTasks.filter(t => t.isDone === false)
		}

		return <TodoList key={tl.id}
						todoListId={tl.id}
						title={tl.title}
						tasks={filteredTasks}
						filter={tl.filter}

						addTask={addTask}
						changeFilter={changeTodoFilter}
						removeTask={removeTask}
						changeTaskStatus={changeTaskStatus}
						removeTodoList={removeTodoList}
						changeTaskTitle={changeTaskTitle}
						changeTodoTitle={changeTodoTitle}
					/>
	})

	const [isLight, setIsLight] = useState(true);


  const theme = createTheme({

		palette: {
			primary: {
				main: '#6DDAEF',
			},
			secondary: {
				main: '#AE86A0', // Используйте однотонный цвет здесь
			},
			mode: isLight ? 'light' : 'dark',
		},
	});

	//стейт для селекта (тренировка)
	// const [value, setValue] = useState('2')

	// const selectItems = [
	// 	{ value: '1', title: 'Minsk' },
	// 	{ value: '2', title: 'Moscow' },
	// 	{ value: '3', title: 'Kiev' },
	// ];

	// const onChange = (val: string) => {
	// 	setValue(val)
	// }

	return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
					<div className='App'>
					<Header setIsLight={setIsLight} isLight={isLight}/>
					<Container sx={{ mt: '1rem' }} fixed>
						<Grid container sx={{ mb: '2rem' }}>
							<AddItemInput addItem={addTodoList} label='Add new TODO list' />
						</Grid>
	
						<Grid container spacing={5}>
							{todolistComponent}
						</Grid>
				</Container>
				</div>
				</ThemeProvider>
	);
}

export default AppOld;
