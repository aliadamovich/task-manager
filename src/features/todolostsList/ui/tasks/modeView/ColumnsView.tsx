import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { SortableTodolist } from 'features/todolostsList/ui/tasks/modeView/SortableTodolist'
import { TodoList } from 'features/todolostsList/ui/TodoList'

export const ColumnsView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {

	return (
		<Grid container spacing={2}>
			{todolists?.map((tl) => (
				<Grid size={{ xs: 12, md: 4, sm: 12 }} key={tl.id}>
					<Paper style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
						<SortableTodolist item={tl}>
							{({ listeners, attributes }) => < TodoList todolist = { tl } dragHandleProps = {{ listeners, attributes }} />
							}
						</SortableTodolist>
					</Paper>
				</Grid>
			))}
		</Grid>
	)
}

