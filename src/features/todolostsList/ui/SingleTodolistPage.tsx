import { useParams, useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { TodoList } from "features/todolostsList/ui/TodoList"
import { useGetTodolistsQuery } from "features/todolostsList/api/todolistApi"
import style from './Todolist.module.scss'
import { NotFoundPage } from "common/components"

export const SingleTodolistPage = () => {
	const { id } = useParams()
	const { data: todolists, isLoading, error } = useGetTodolistsQuery()
	const todolist = todolists?.find((t) => t.id === id)
	const navigate = useNavigate()

	if (isLoading) return <CircularProgress />

	if (error) return <NotFoundPage />

	return (
		<div className={style.container}>
			<Container maxWidth="md" sx={{ py: 4 }}>
				<Button
					variant="outlined"
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate(-1)}
					sx={{ mb: 3 }}
				>
					Back
				</Button>
				{todolist 
				? <Box>
					<TodoList todolist={todolist} fullScreen />
				</Box>
				: <Typography variant="h5" mt={5} textAlign='center'>No todolist found...</Typography>
				}
				</Container>
		</div>
	)
}