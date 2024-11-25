import { action } from "@storybook/addon-actions"
import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { todolistsAPI } from "features/todolostsList/api/todolistApi"
import { tasksAPI } from "features/todolostsList/api/tasksApi"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const appSlice = createSlice({
	name: "app",

	initialState: {
		status: "idle" as RequestStatusType,
		error: null as string | null,
		isInitialized: false,
		isLoggedIn: false,
	},

	reducers: {
		setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status
		},
		setAppError(state, action: PayloadAction<{ error: string | null }>) {
			state.error = action.payload.error
		},
		setAppIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
			state.isInitialized = action.payload.isInitialized
		},
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state, action) => {
				if (todolistsAPI.endpoints.getTodolists.matchPending(action) ||
						tasksAPI.endpoints.getTasks.matchPending(action)) {
							return
						}
						state.status = "loading"
			})
			.addMatcher(isRejected, (state, action: any) => {
				state.status = "failed"
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = "succeeded"
			})
	},

	selectors: {
		selectAppStatus: (sliceState) => sliceState.status,
		selectAppError: (sliceState) => sliceState.error,
		selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
		selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
	},
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized, setIsLoggedIn } = appSlice.actions
export const { selectAppError, selectAppIsInitialized, selectAppStatus, selectIsLoggedIn } = appSlice.selectors
