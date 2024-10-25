import { createSlice } from "@reduxjs/toolkit";
import { setAppIsInitialized, setAppStatus } from "app/appSlice";
import { clearData } from "features/todolostsList/model/todolistSlice";
import { handleServerAppErrors } from "common/utils/handleAppError.ts";
import { handleServerNetworkError } from "common/utils/handleNetworkError";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { LoginType } from "features/login/api/authApi.types";
import { authAPI } from "features/login/api/authApi";
import { ResultCode } from "common/enums/enum";

//* Thunks

export const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean}, LoginType>("auth/login", async (data, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		const res = await authAPI.login(data)
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(setAppStatus({ status: "succeeded" }))
			return { isLoggedIn: true }
		} else {
			handleServerAppErrors(dispatch, res.data)
			return rejectWithValue(null)
		}
	} catch (error) {
		handleServerNetworkError(dispatch, error)
		return rejectWithValue(null)
	}
})


export const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }>("auth/logout", async(_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		const res = await authAPI.logout()
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(clearData())
			dispatch(setAppStatus({ status: "succeeded" }))
			return { isLoggedIn: false }
		} else {
			handleServerAppErrors(dispatch, res.data)
			return rejectWithValue(null)
		}
	} catch (error) {
		handleServerNetworkError(dispatch, error)
		return rejectWithValue(null)
	}
})

export const meTC = createAppAsyncThunk<{ isLoggedIn: boolean }>("auth/me", async(_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(setAppStatus({ status: "loading" }))
		const res = await authAPI.me()
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(setAppStatus({ status: "succeeded" }))
			return { isLoggedIn: true }
		} else {
			handleServerAppErrors(dispatch, res.data)
			return rejectWithValue(null)
		}
	} catch (error) {
		handleServerNetworkError(dispatch, error)
		return rejectWithValue(null)
	} finally {
		dispatch(setAppIsInitialized({ isInitialized: true }))
	}
})



const authSlice = createSlice({
	name: "auth",

	initialState: {
		isLoggedIn: false,
	},

	reducers: {
		// setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
		// 	state.isLoggedIn = action.payload.isLoggedIn
		// },
	},

	extraReducers: (builder) => {
		builder.addCase(loginTC.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
		builder.addCase(logoutTC.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
		builder.addCase(meTC.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
	},

	selectors: {
		selectAuthIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
	},
})

export const authReducer = authSlice.reducer
export const { selectAuthIsLoggedIn } = authSlice.selectors


