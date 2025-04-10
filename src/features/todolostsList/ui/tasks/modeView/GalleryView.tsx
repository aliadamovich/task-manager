import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import {  NavLink } from 'react-router-dom'

export const GalleryView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {
	return (
		<Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
			{todolists?.map((item, i) => (
				<NavLink to={item.id} style={{ textDecoration: 'none' }}>
					<Paper key={i}
						sx={{
							width: 200, height: 150, p: 2, textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
							transition: '0.2s',
							'&:hover': {
								boxShadow: 4,
								backgroundColor: 'secondary.light',
							}
						}}>
						{item.title}
					</Paper>
				</NavLink>
			))}
		</Box>
	)
}

