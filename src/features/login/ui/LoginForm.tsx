import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useLogin } from "../lib/hooks/useLogin"

export const LoginForm = () => {
	const { formik, theme } = useLogin()

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
				label="Email Ad			dress"
				autoComplete="email"
				autoFocus
				error={!!formik.errors.email && formik.touched.email} //для подсвечивания бордера инпута
				// name="email"
				// onChange={formik.handleChange}
				// onBlur={formik.handleBlur}
				// value={formik.values.email}
				{...formik.getFieldProps("email")} //этот метод позвояет сократить код и не писать 4 пропса выше
			/>
			{formik.errors.email && formik.touched.email ? (
				<div style={{ color: "#d32f2f" }}>{formik.errors.email}</div>
			) : null}

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
			{formik.errors.password && formik.touched.password ? (
				<div style={{ color: "#d32f2f" }}>{formik.errors.password}</div>
			) : null}

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
