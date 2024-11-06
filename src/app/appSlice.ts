import { action } from "@storybook/addon-actions"
import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { addTodolistTC, changeTodolistTitleTC } from "features/todolostsList/model/todolistSlice"
import { createTaskTC } from "features/todolostsList/model/tasksSlice"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const appSlice = createSlice({
	name: "app",

	initialState: {
		status: "idle" as RequestStatusType,
		error: null as string | null,
		isInitialized: false,
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
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state) => {
				state.status = 'loading'
			},
		)
			.addMatcher(isRejected, (state, action: any) => {
				state.status = 'failed';
				
				if (action.payload) {
					if (
						action.type === addTodolistTC.rejected.type ||
						action.type === createTaskTC.rejected.type ||
						action.type === changeTodolistTitleTC.rejected.type
					) return
					state.error = action.payload.messages[0]
				} else {
					state.error = action.error.message ? action.error.message : 'Some error occurred'
				}
			},
		)
		.addMatcher(isFulfilled, (state) => {
				state.status = 'succeeded'
			},
		)
	},

	selectors: {
		selectAppStatus: (sliceState) => sliceState.status,
		selectAppError: (sliceState) => sliceState.error,
		selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
	},
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized } = appSlice.actions
export const { selectAppError, selectAppIsInitialized, selectAppStatus } = appSlice.selectors
