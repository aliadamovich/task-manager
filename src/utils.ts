import { Dispatch } from "redux";
import { setAppErrorAC, setAppStatusAC } from "./store/reducers/app-reducer";
import { ResponseType } from "./api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch, err: {message: string}) => {
		dispatch(setAppErrorAC(err.message));
    dispatch(setAppStatusAC("failed"));
}

export const handleServerAppErrors = <T>(dispatch: Dispatch, data: ResponseType<T> ) => {
	dispatch(setAppErrorAC(data.messages ? data.messages[0] : "Some error occurred"));
  dispatch(setAppStatusAC("failed"));
}