import * as React from "react"
import Button from "@mui/material/Button"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { setAppError } from "app/appSlice"
import { useAppDispatch, useAppSelector } from "app/store"

export const ErrorSnackbar = () => {
	const error = useAppSelector((state) => state.app.error)
	const dispatch = useAppDispatch()

	const closeHandler = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
		if (reason === "clickaway") {
			return
		}
		dispatch(setAppError({ error: null }))
	}

	return (
		<Snackbar open={error !== null} autoHideDuration={6000} onClose={closeHandler}>
			<Alert
				onClose={closeHandler}
				severity="error"
				variant="filled"
				sx={{
					width: "100%",
				}}
			>
				{error}
			</Alert>
		</Snackbar>
	)
}
