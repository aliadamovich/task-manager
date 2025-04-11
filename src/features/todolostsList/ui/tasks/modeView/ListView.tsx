import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { SortableTodolist } from 'features/todolostsList/ui/tasks/modeView/SortableTodolist'
import { NavLink } from 'react-router-dom'
import { PATH } from 'routes/router'


export const ListView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {

	return (
		<Stack spacing={2} style={{ width: '100%' }}>
			{todolists?.map(tl => {
				const taskCount = 4
				return <SortableTodolist item={tl}>
					<Paper
						sx={{
							p: 2,
							width: '100%',
							maxWidth: '95%',
							transition: 'all 0.3s ease-in-out',
						}}>

						<Box display="flex" justifyContent="space-between" alignItems="center">
							<NavLink to={`${PATH.TODOLISTS}/${tl.id}`} key={tl.id} >
								<Typography variant="h6">{tl.title}</Typography>
							</NavLink>
							<Badge color="primary" badgeContent={taskCount} showZero>
								<Typography variant="body2">Tasks To Complete</Typography>
							</Badge>
						</Box>
					</Paper>
				</SortableTodolist>
			})}
		</Stack>
	)
}

