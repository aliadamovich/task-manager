import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import {  NavLink } from 'react-router-dom'
import { SortableTodolist } from 'features/todolostsList/ui/tasks/modeView/SortableTodolist'

export const GalleryView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {
	
	return (
		<Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
			{todolists?.map(tl => (
				<SortableTodolist item={tl} key={tl.id}>
					<Paper
						sx={{
							width: 200, height: 150, p: 2, textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transition: '0.2s',
							'&:hover': {
								boxShadow: 4,
								backgroundColor: 'secondary.light',
							}
						}}>
						<NavLink to={tl.id}>
							{tl.title}
						</NavLink>
					</Paper>
				</SortableTodolist>
			))}
		</Box>
	)
}

