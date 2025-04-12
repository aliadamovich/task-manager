import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { SortableTodolist } from 'features/todolostsList/ui/todolistsModeView/SortableTodolist'
import { NavLink } from 'react-router-dom'
import { PATH } from 'routes/router'
import s from './ViewModes.module.scss'
import clsx from 'clsx'
import { useGetTasksQuery } from 'features/todolostsList/api/tasksApi'

export const ListView = ({todolists}: {todolists: TodolistDomainType[] | undefined}) => {
	return (
		<Stack spacing={2} style={{ width: '100%' }}>
			{todolists?.map(tl => <TodolistCard key={tl.id} todolist={tl}/>)}
		</Stack>
	)
}

const TodolistCard = ({ todolist }: { todolist: TodolistDomainType}) => {
	const { data } = useGetTasksQuery({ todolistId: todolist.id })
	const taskCount = data?.totalCount ?? 0
	return (
		<SortableTodolist item={todolist}>
			{({ listeners, attributes }) => <Paper
				sx={{
					p: 2,
					width: '100%',
					maxWidth: '95%',
					transition: 'all 0.3s ease-in-out',
				}}
				{...listeners} {...attributes} style={{ cursor: 'grab' }}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
					<NavLink to={`${PATH.TODOLISTS}/${todolist.id}`} key={todolist.id} className={clsx(s.link, s.customLink)}>
						<Typography variant="h6">{todolist.title}</Typography>
					</NavLink>
					<Badge color="primary" badgeContent={taskCount} showZero>
						<Typography variant="body2">Tasks To Complete</Typography>
					</Badge>
				</Box>
			</Paper>}
		</SortableTodolist>
	)
}