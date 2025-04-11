import Grid from '@mui/material/Grid'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { SortableTodolist } from 'features/todolostsList/ui/tasks/modeView/SortableTodolist'
import { TodoList } from 'features/todolostsList/ui/TodoList'

export const ColumnsView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {

	return (
		<Grid container spacing={2}>
			{todolists?.map((tl) => (
				<Grid size={{ xs: 12, md: 4, sm: 12 }} key={tl.id}>
					{/* <SortableTodolist item={tl}> */}
						<TodoList key={tl.id} todolist={tl} />
					{/* </SortableTodolist> */}
				</Grid>
			))}
		</Grid>
	)
}

