import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography, useTheme} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import cover from "./../../assets//images/cover_login.jpg";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../store/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../routes/router";
import { loginTC } from "store/reducers/authSlice";

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

const validate = (values: FormikErrorType) => {
  const errors: FormikErrorType = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};

export const Login = () => {
  const theme = useTheme();
  const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate,
    onSubmit: (values) => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={PATH.ROOT} />;
  }

  return (
    <Grid
      container
      component="main"
      style={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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

          <form
            style={{
              width: "100%",
              marginTop: theme.spacing(1),
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!formik.errors.email && formik.touched.email} //для подсвечивания бордера инпута
              // name="email"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.email}
              {...formik.getFieldProps("email")} //этот метод позвояет сократить код и не писать 4 пропса выше
            />
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!formik.errors.password && formik.touched.password} //для подсвечивания бордера инпута
              {...formik.getFieldProps("password")} //этот метод позвояет сократить код и не писать 4 пропса выше
            />
            {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={formik.values.rememberMe} //его нужно оставить- иначе бажится
              {...formik.getFieldProps("rememberMe")}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                margin: theme.spacing(3, 0, 2),
              }}
            >
              Sign In
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

function Copyright() {
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
