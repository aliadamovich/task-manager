import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAppErrorAC } from '../../store/reducers/app-reducer';

export const ErrorSnackbar = () => {

	const error = useAppSelector(state => state.app.error)
	const dispatch = useAppDispatch();

	const handleClose = ( event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason ) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(setAppErrorAC(null))
	};

	return (
			<Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					{error}
				</Alert>
			</Snackbar>
	);
}