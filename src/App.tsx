import { AddItemInput } from './components/addItemInput/AddItemInput';
import {Header} from './components/layout/header/Header';
import { Container, Grid } from '@mui/material';
import { addTodolistAС } from './store/reducers/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { TodoList } from './TodoList';
import { Sidebar } from './components/layout/sidebar/Sidebar';
import { useState } from 'react';

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

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	let todolists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todolists )
	const dispatch = useDispatch();

	//тоггл сайдбара
	const toggleSidebar = (newOpen: boolean) => () => {
		setSidebarOpen(newOpen);
	};
	//Создание нового тудулиста
	const addTodoList = (titleValue: string) => { dispatch(addTodolistAС(titleValue))}

	//* UI
	/* маппим все туду-листы, в каждый передаем фильтр чтобы свой filteredtasks создавался в каждой в завис-ти от значения фильтра */
	const todolistComponent: Array<JSX.Element> = todolists.map(tl => {
		return <TodoList key={tl.id} todolist={tl}/>
	})

	return (

		<div className='App'>
			<Header toggleSidebar={toggleSidebar}/>
			<Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
			<Container sx={{ mt: '1rem' }} fixed>

				<Grid container sx={{ mb: '2rem' }}>
					<AddItemInput addItem={addTodoList} label='Add new TODO list' />
				</Grid>

				<Grid container spacing={5}>
					{todolistComponent}
				</Grid>

			</Container>

		</div>

	);
}

export default App;
