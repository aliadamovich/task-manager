import { AddItemInput } from './components/addItemInput/AddItemInput';
import { Container, Grid } from '@mui/material';
import { addTodolistAС, TodolistDomainType } from './store/reducers/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import {TodoList}  from './TodoList';
import { useCallback, useState } from 'react';
import { Header } from './layout/header/Header';
import { Sidebar } from './layout/sidebar/Sidebar';
import React from 'react';
import { TaskType } from './api/todolists-api';


export type TaskStateType = {
	[todolistId: string]: TaskType[]
}

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	let todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists )
	const dispatch = useDispatch();

	//тоггл сайдбара
	const toggleSidebar = (newOpen: boolean) => () => {
		setSidebarOpen(newOpen);
	};
	//?Создание нового тудулиста
	const addTodoList = useCallback((titleValue: string) => { dispatch(addTodolistAС(titleValue)) }, [dispatch])

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
