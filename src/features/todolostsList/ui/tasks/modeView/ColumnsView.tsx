import Grid from '@mui/material/Grid'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { TodoList } from 'features/todolostsList/ui/TodoList'

export const ColumnsView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {

	return (
			<Grid container spacing={2}>
				{todolists?.map((tl) => (
					<TodoList key={tl.id} todolist={tl} />
				))}
			</Grid>
	)
}

