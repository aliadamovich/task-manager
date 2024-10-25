import { Avatar, Box, Grid, Link, Paper, Typography, useTheme} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import cover from "assets/images/cover_login.jpg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PATH } from "routes/router";
import { AppRootStateType } from "app/store";
import { ErrorSnackbar } from "common/components";
import { LoginForm } from "./LoginForm";



export const LoginPage = () => {
  const theme = useTheme();
  const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={PATH.ROOT} />;
  }

  return (
    <Grid container component="main" style={{  height: "100vh", }} >
      <Grid item xs={false} sm={4} md={7}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{
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
  );
};

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
  );
}
