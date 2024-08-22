import './App.css';
import { useState } from 'react';
import { AddItemInput } from './components/addItemInput/AddItemInput';
import Header from './components/layout/header/Header';
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { addTodolistAС } from './store/reducers/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { TodoListWitRedux } from './TodoListWithRedux';

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

function AppWithRedux() {

	let todolists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todolists )
	const dispatch = useDispatch();

	const [isLight, setIsLight] = useState(true);
	//Создание нового тудулиста
	const addTodoList = (titleValue: string) => { dispatch(addTodolistAС(titleValue))}

	//* UI

	/* маппим все туду-листы, в каждый передаем фильтр чтобы свой filteredtasks создавался в каждой в завис-ти от значения фильтра */
	const todolistComponent: Array<JSX.Element> = todolists.map(tl => {
		return <TodoListWitRedux key={tl.id} todolist={tl}/>
	})

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

					{/* <Select items={selectItems} initialValue={value} onChange={onChange} /> */}
				</div>
				</ThemeProvider>
	);
}

export default AppWithRedux;
