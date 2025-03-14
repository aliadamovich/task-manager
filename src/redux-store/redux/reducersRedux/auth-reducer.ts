import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setAppIsInitializedAC, setAppStatusAC } from "./app-reducer"
import { authAPI } from "redux-store/api_rtk/authApi_rtk"
import { LoginType } from "features/login/api/authApi.types"
import { AppThunk } from "redux-store/redux/store_redux"
import { handleServerNetworkError } from "common/utils/handleNetworkError"
import { Dispatch } from "redux"
import { handleServerAppErrors } from "common/utils/handleAppError"
const initialState = {
	isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case "auth/SET-IS-LOGGED-IN":
			return { ...state, isLoggedIn: action.isLoggedIn }

		default:
			return state
	}
}

//* Action Creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: "auth/SET-IS-LOGGED-IN", isLoggedIn }) as const

//* Thunks
export const loginTC = (data: LoginType): AppThunk => {
	return async (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))
		try {
			const res = await authAPI.login(data)
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
				dispatch(setAppStatusAC("succeeded"))
			} else {
				handleServerAppErrors(dispatch, res.data)
			}
		} catch (error) {
			handleServerNetworkError(
				dispatch,
				error as {
					message: string
				},
			)
		}
	}
}

export const logoutTC = (): AppThunk => {
	return async (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))
		try {
			const res = await authAPI.logout()
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatusAC("succeeded"))
			} else {
				handleServerAppErrors(dispatch, res.data)
			}
		} catch (error) {
			handleServerNetworkError(
				dispatch,
				error as {
					message: string
				},
			)
		}
	}
}

export const meTC = (): AppThunk => {
	return async (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))

		try {
			const res = await authAPI.me()
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))

				dispatch(setAppStatusAC("succeeded"))
			} else {
				handleServerAppErrors(dispatch, res.data)
			}
		} catch (error) {
			handleServerNetworkError(
				dispatch,
				error as {
					message: string
				},
			)
		}

		dispatch(setAppIsInitializedAC(true))
	}
}

//* Types

type InitialStateType = typeof initialState
type ActionsType = setIsLoggedInActionType
export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
