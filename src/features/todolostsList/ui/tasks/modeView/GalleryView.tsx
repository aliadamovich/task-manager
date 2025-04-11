import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import {  NavLink } from 'react-router-dom'
import { SortableTodolist } from 'features/todolostsList/ui/tasks/modeView/SortableTodolist'
import s from './ViewModes.module.scss'
import clsx from 'clsx'

export const GalleryView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {
	return (
		<Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
			{todolists?.map(tl => (
				<SortableTodolist item={tl} key={tl.id}>
					{({ listeners, attributes }) => <Paper className={s.galleryView}
						{...listeners} {...attributes} style={{ cursor: 'grab' }}
							sx={{
								'&:hover': {
									boxShadow: 4,
									backgroundColor: 'secondary.light',
								}
							}}>
						<NavLink to={tl.id} className={clsx(s.link, s.customLink)}>
								{tl.title}
						</NavLink>
						</Paper>
					}
					
				</SortableTodolist>
			))}
		</Box>
	)
}

