import axios from "axios"
import { setAppError, setAppStatus } from "app/appSlice"
import { AppDispatch } from "app/store" 

// export const handleServerNetworkError_ = (	dispatch: Dispatch, err: {message: string}) => {
// 	dispatch(setAppError({ error: err.message }))
// 	dispatch(setAppStatus({ status: "failed" }))
// }

//переписали серверную ошибку
export const handleServerNetworkError = (dispatch: AppDispatch, err: unknown): void => {
	let errorMessage = "Some error occurred"

	// ❗Проверка на наличие axios ошибки
	if (axios.isAxiosError(err)) {
		// ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
		// ⏺️ err?.message - например при создании таски в offline режиме
		errorMessage = err.response?.data?.message || err?.message || errorMessage
		// ❗ Проверка на наличие нативной ошибки
	} else if (err instanceof Error) {
		errorMessage = `Native error: ${err.message}`
		// ❗Какой-то непонятный кейс
	} else {
		errorMessage = JSON.stringify(err)
	}

	dispatch(setAppError({ error: errorMessage }))
	dispatch(setAppStatus({ status: "failed" }))
}
