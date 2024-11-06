import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { setAppIsInitialized, setAppStatus } from "app/appSlice"
import { clearData } from "features/todolostsList/model/todolistSlice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { LoginType } from "features/login/api/authApi.types"
import { authAPI } from "features/login/api/authApi"
import { ResultCode } from "common/enums/enum"

//* Thunks

export const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>("auth/login", async (data, { rejectWithValue } ) => {
	const res = await authAPI.login(data)
	if (res.data.resultCode === ResultCode.Success) {
		return { isLoggedIn: true }
	} else {
		return rejectWithValue(res.data)
	}
})

export const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/logout", async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	const res = await authAPI.logout()
	if (res.data.resultCode === ResultCode.Success) {
		dispatch(clearData())
		return { isLoggedIn: false }
	} else {
		return rejectWithValue(res.data)
	}
})

export const initializeAppTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
	"auth/me",
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		const res = await authAPI.me().finally(() => {
			dispatch(setAppIsInitialized({ isInitialized: true }))
		})
		if (res.data.resultCode === ResultCode.Success) {
			return { isLoggedIn: true }
		} else {
			return rejectWithValue(null)
		}
	},
)

const authSlice = createSlice({
	name: "auth",

	initialState: {
		isLoggedIn: false,
	},

	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(loginTC.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(logoutTC.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(initializeAppTC.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addMatcher(isFulfilled(loginTC, logoutTC, initializeAppTC),
		(state, action: PayloadAction<{isLoggedIn: boolean}>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
	},

	selectors: {
		selectAuthIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
	},
})

export const authReducer = authSlice.reducer
export const { selectAuthIsLoggedIn } = authSlice.selectors
