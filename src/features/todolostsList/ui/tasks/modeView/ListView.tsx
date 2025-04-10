import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useGetTasksQuery } from 'features/todolostsList/api/tasksApi'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { NavLink } from 'react-router-dom'
import { PATH } from 'routes/router'

export const ListView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {

	return (
			<Stack spacing={2} style={{width: '100%'}}>
				{todolists?.map(item => {
					const taskCount = 4
					return <NavLink to={`${PATH.TODOLISTS}/${item.id}`} key={item.id} style={{textDecoration: 'none'}}>
						<Paper
								sx={{
									p: 2,
									cursor: 'pointer',
									width: '100%',
									maxWidth: '95%',
									transition: 'all 0.3s ease-in-out',
									'&:hover': {
										boxShadow: 2,
										transform: 'scale(1.01)',
										backgroundColor: 'secondary.light',
									},
								}}>
		
								<Box display="flex" justifyContent="space-between" alignItems="center">
									<Typography variant="h6">{item.title}</Typography>
									<Badge color="primary" badgeContent={taskCount} showZero>
										<Typography variant="body2">Tasks To Complete</Typography>
									</Badge>
								</Box>
							</Paper>
					</NavLink>
			})}
		</Stack>
	)
}

