import { ResponseType } from "features/todolostsList/api/todolistApi"
import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/appSlice"

export const handleServerAppErrors = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
	dispatch(setAppError({ error: data.messages ? data.messages[0] : "Some error occurred" }))
	dispatch(setAppStatus({ status: "failed" }))
}


