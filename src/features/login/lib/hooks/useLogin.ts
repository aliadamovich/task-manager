import { useTheme } from "@mui/material"
import { setIsLoggedIn } from "app/appSlice"
import { useAppDispatch } from "app/store"
import { ResultCode } from "common/enums/enum"
import { useLoginMutation } from "features/login/api/authApi"
import { useFormik } from "formik"

type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}

const validate = (values: FormikErrorType) => {
	const errors: FormikErrorType = {}
	if (!values.email) {
		errors.email = "Required"
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address"
	}

	if (!values.password) {
		errors.password = "Required"
	} else if (values.password.length < 6) {
		errors.password = "Password must be at least 6 characters"
	}
	return errors
}

export const useLogin = () => {
	const dispatch = useAppDispatch()
	const theme = useTheme()
	const [login] = useLoginMutation();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validate,
		onSubmit: (values, formikHelpers) => {
			login(values)
				.then((res) => {
					if (res.data?.resultCode === ResultCode.Success) {
						dispatch(setIsLoggedIn({ isLoggedIn: true }))
					}
				})
				.finally(() => {
					formik.resetForm()
				})
			// dispatch(loginTC(values))
			// 	.unwrap()
			// 	.catch((err: BaseResponseType) => {
			// 		err.fieldsErrors.forEach(el => {
			// 			formikHelpers.setFieldError(el.field, el.error)
			// 		})
			// })
			// formik.resetForm()
		},
	})

	return { formik, theme }
}
