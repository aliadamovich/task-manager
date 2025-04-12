import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
	const theme = useTheme()
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: theme.palette.background.default,
				color: theme.palette.text.primary,
				textAlign: 'center',
				padding: 4,
			}}
		>
			<Typography variant="h1" fontWeight="bold" fontSize={{ xs: 80, sm: 120 }}>
				404
			</Typography>
			<Typography variant="h5" mb={2}>
				Упс! Такой страницы не существует.
			</Typography>
			<Typography variant="body1" mb={4}>
				Возможно, вы ввели неправильный адрес или страница была перемещена.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={() => navigate('/')}
			>
				На главную
			</Button>
		</Box>
	)
}