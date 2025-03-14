import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/appSlice"
import { BaseResponseType } from "common/types/types"

export const handleServerAppErrors = <T>(dispatch: Dispatch, data: BaseResponseType<T>, showError: boolean = true) => {
	if (showError) {
		dispatch(setAppError({ error: data.messages ? data.messages[0] : "Some error occurred" }))
	}
	dispatch(setAppStatus({ status: "failed" }))
}
