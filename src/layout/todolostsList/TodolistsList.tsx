import { Container, Grid } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { AddItemInput } from '../../components/addItemInput/AddItemInput'
import { useSelector } from 'react-redux'
import { TodolistDomainType, addTodolistTC, getTodolistsTC } from '../../store/reducers/todolist-reducer'
import { AppRootStateType, useAppDispatch } from '../../store/store'
import { TodoList } from './todolist/TodoList'

export const TodolistsList = () => {

	let todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTodolistsTC())
	}, [])
	
	//?Создание нового тудулиста
	const addTodoList = useCallback((titleValue: string) => { dispatch(addTodolistTC(titleValue)) }, [dispatch])

	return (
		<Container sx={{ mt: '1rem' }} fixed>

			<Grid container sx={{ mb: '2rem' }}>
				<AddItemInput addItem={addTodoList} label='Add new TODO list' />
			</Grid>

			<Grid container spacing={5}>
				{todolists.map(tl => <TodoList key={tl.id} todolist={tl} />)}
			</Grid>

		</Container>
	)
}

