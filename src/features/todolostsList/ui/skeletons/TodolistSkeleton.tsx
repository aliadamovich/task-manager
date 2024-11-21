import Paper from '@mui/material/Paper'
import s from './TodolistSkeleton.module.scss'
import Skeleton from '@mui/material/Skeleton'
import { Container, Grid } from '@mui/material'

export const TodolistPageSkeleton = () => {
	return (
		<Container sx={{ mt: "1rem" }} fixed>
			<div className={s.todolistTitle}>
				<Skeleton width={1200} height={60} />
				<Skeleton width={40} height={60} />
			</div>
			<Grid container spacing={5}>
				{Array(2)
					.fill(null)
					.map((_, id) => (
						<TodolistSkeleton key={id} />
					))}
			</Grid >
		</Container>
	)
}

 const TodolistSkeleton = () => {
	return (
		<Grid item xs={12} md={6} >
			
			<Paper elevation={3} sx={{ p: 4 }}>
			

				<div className={s.todolist}>
				{Array(4)
					.fill(null)
					.map((_, id) => (
						<div key={id} className={s.common}>
							<div className={s.tasks}>
								<Skeleton width={20} height={40} />
								<Skeleton width={300} height={40} />
							</div>
							<Skeleton width={20} height={40} />
						</div>
					))}
			</div>

			<div className={s.common}>
				{Array(3)
					.fill(null)
					.map((_, id) => (
						<Skeleton key={id} width={100} height={60} />
					))}
			</div>

				<div className={s.addItemForm}>
					<Skeleton width={250} height={60} />
					<Skeleton width={40} height={40} />
				</div>
		</Paper>
		</Grid>
	)
}