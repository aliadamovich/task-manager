import LockOpenIcon from "@mui/icons-material/LockOpen"
import cover from "assets/images/cover_login.jpg"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { PATH } from "routes/router"
import { ErrorSnackbar } from "common/components"
import { LoginForm } from "./LoginForm"
import { selectAppStatus, selectIsLoggedIn } from "app/appSlice"
import { useTheme } from '@mui/material/styles';
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"

export const LoginPage = () => {
	const theme = useTheme()
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const appStatus = useSelector(selectAppStatus)

	if (isLoggedIn) return <Navigate to={PATH.ROOT} />

	return (
		<>
			<div style={{ position: "absolute", width: "100%" }}>{appStatus === "loading" && <LinearProgress />}</div>
			<Grid container component="main" style={{ height: "100vh" }}>
				<Grid
					size={{ xs: false, md: 7, sm: 4 }}
					style={{
						backgroundImage: `url(${cover})`,
						backgroundRepeat: "no-repeat",
						backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid size={{ xs: 12, md: 5, sm: 8 }} component={Paper} elevation={6} square>
					<div
						style={{
							margin: theme.spacing(8, 4),
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar
							style={{
								margin: theme.spacing(1),
								backgroundColor: theme.palette.secondary.main,
							}}
						>
							<LockOpenIcon />
						</Avatar>

						<Typography component="h1" variant="h5">
							Sign in
						</Typography>

						<LoginForm />
						<Box mt={5}>
							<Copyright />
						</Box>
					</div>
				</Grid>
				<ErrorSnackbar />
			</Grid>
		</>
	)
}

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				My Todo
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}
