import { Dispatch } from "redux";
import { ResponseType } from "./api/todolists-api";
import { setAppError, setAppStatus } from "store/slices/appSlice";

export const handleServerNetworkError = (
  dispatch: Dispatch,
  err: {
    message: string;
  },
) => {
  dispatch(setAppError({error: err.message}));
  dispatch(setAppStatus({status: "failed"}));
};

export const handleServerAppErrors = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  dispatch(setAppError({error: data.messages ? data.messages[0] : "Some error occurred"}));
  dispatch(setAppStatus({status: "failed"}));
};
