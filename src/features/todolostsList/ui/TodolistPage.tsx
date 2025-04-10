import { useParams, useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { TodoList } from "features/todolostsList/ui/TodoList"
import { useGetTodolistsQuery } from "features/todolostsList/api/todolistApi"

export const TodolistPage = () => {
	const { id } = useParams()
	const { data: todolists, isLoading, error } = useGetTodolistsQuery()
	const todolist = todolists?.find((t) => t.id === id)
	const navigate = useNavigate()

	if (isLoading) return <CircularProgress />

	if (error) return <Typography color="error">Error has occured...</Typography>
	if (!todolist) {
		return (
			<Container>
				<Typography variant="h5" mt={5}>No todolist found...</Typography>
				<Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
					<ArrowBackIcon sx={{ mr: 1 }} />
					Back
				</Button>
			</Container>
		)
	}

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Button
				variant="outlined"
				startIcon={<ArrowBackIcon />}
				onClick={() => navigate(-1)}
				sx={{ mb: 3 }}
			>
				Back
			</Button>
			<Box>
				<TodoList todolist={todolist} fullScreen />
			</Box>
		</Container>
	)
}