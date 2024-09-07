import { v1 } from 'uuid';
import { Reducer, useReducer, useState } from 'react';
import { AddItemInput } from '../components/addItemInput/AddItemInput';
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { ActionType, addTodolistAС, removeTodolistAС, changeTodolistTitleAС, todolistReducer, changeTodolistFilterAС } from '../store/reducers/todolist-reducer';
import { addTaskAС, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from '../store/reducers/tasks-reducer';
import { TodoListOld } from './TodoListOld';



function AppWithReducers() {

	//массив с тудулистами
	const todoList1 = v1();
	const todoList2 = v1();
	const todoList3 = v1();
	const todoList4 = v1();
	const todoList5 = v1();
	const todoList6 = v1();

	const initState: TodoListsType[] = []
	const initTodolist = (): TodoListsType[] => {
		return [
			{ id: todoList1, title: 'What to learn:', filter: 'All' },
			{ id: todoList2, title: 'What to buy:', filter: 'All' },
			{ id: todoList3, title: 'What to read:', filter: 'All' },
			{ id: todoList4, title: 'What to do:', filter: 'All' },
			{ id: todoList5, title: 'What to clean:', filter: 'All' },
			{ id: todoList6, title: 'Where to go:', filter: 'All' },
		]
	}

	//в типизации вставяем Reducer (импорт из React) + два параметра - тип стейта с которым работаем, второый - тип экшна с которым работаем)
	//для большей читаемости стейт выносим в отдельную функцию и сначала прописываем пустой массив
	// const [todoLists, dispatchToTodolists] = useReducer<Reducer<TodoListsType[], ActionType>>(todolistReducer, iTodoList, initTodolist)
	const [todoLists, dispatchToTodolists] = useReducer<Reducer<TodoListsType[], ActionType>>(todolistReducer, initTodolist())

	const [allTasks, dispatchToTasks] = useReducer(tasksReducer, {
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
		dispatchToTasks(addTaskAС(todoListId, value))
	}

	//удаление таски
	const removeTask = (taskId: string, todoListId: string) => {
		dispatchToTasks(removeTaskAC(taskId, todoListId))
	}

	//смена статуса таски isDone
	const changeTaskStatus = (taskId: string, status: boolean, todoListId: string) => {
		dispatchToTasks(changeTaskStatusAC(todoListId, taskId, status))
	}

	//изменение названия таски
	const changeTaskTitle = (value: string, taskId: string, todoListId: string) => {
		dispatchToTasks(changeTaskTitleAC(todoListId, taskId, value))
	}

	//* todolists

	//Создание нового тудулиста
	const addTodoList = (titleValue: string) => {
		//здесьобязательно создавать 1 экшн и его передавать в оба редюсера чтобы добавлялся один и тот же айдишник
		let action = addTodolistAС(titleValue)
		dispatchToTodolists(action)
		dispatchToTasks(action)
	}

	//удаление целиком тудулиста
	const removeTodoList = (todolistId: string) => {
		//здесь это не обязательно но чтобы не создавать два разных объекта экшн в памяти, создается также ожин экшн заранее и он диспатчится
		let action = removeTodolistAС(todolistId)
		dispatchToTodolists(action)
		dispatchToTasks(action)
	}

	//изменение фильтра и перерисовка todoLists
	const changeTodoFilter = (filterValue: FilterValueType, todoListId: string) => {
		dispatchToTodolists(changeTodolistFilterAС(todoListId, filterValue))
	}

	//изменение названия тудулиста
	const changeTodoTitle = (title: string, todoListId: string) => {
		dispatchToTodolists(changeTodolistTitleAС(todoListId, title))
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

		return <TodoListOld key={tl.id}
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
	const [value, setValue] = useState('2')

	const selectItems = [
		{ value: '1', title: 'Minsk' },
		{ value: '2', title: 'Moscow' },
		{ value: '3', title: 'Kiev' },
	];

	const onChange = (val: string) => {
		setValue(val)
	}

	return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
					<div className='App'>
					{/* <Header setIsLight={setIsLight} isLight={isLight}/> */}
					<Container sx={{ mt: '1rem' }} fixed>
						<Grid container sx={{ mb: '2rem' }}>
							<AddItemInput addItem={addTodoList} label='Add new TODO list' />
						</Grid>
	
						<Grid container spacing={5}>
							{todolistComponent}
						</Grid>
				</Container>
				
					{/* <Select items={selectItems} initialValue={value} onChange={onChange} /> */}
				</div>
				</ThemeProvider>
	);
}

export default AppWithReducers;
