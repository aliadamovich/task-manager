import { Button, Checkbox, FormControlLabel, TextField, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { loginTC } from 'store/slices/authSlice';
import { useAppDispatch } from 'store/store';


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

export const LoginForm = () => {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	
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

	return (
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

		</form>
	)
}
