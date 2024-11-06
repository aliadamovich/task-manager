import { setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "./handleNetworkError"

export const thunkTryCatch = (thunkAPI: any, logic: () => any) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(setAppStatus({ status: "succeeded" }))
		return logic()
	} catch (error) {
		handleServerNetworkError(dispatch, error)
		return rejectWithValue(null)
	}
}
