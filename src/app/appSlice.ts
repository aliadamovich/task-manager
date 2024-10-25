import { action } from '@storybook/addon-actions';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

// const initialState = {
//   status: "idle" as RequestStatusType,
//   error: null as string | null,
//   isInitialized: false,
// };


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

	selectors: {
		selectAppStatus: (sliceState) => sliceState.status,
		selectAppError: (sliceState) => sliceState.error,
		selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
	},
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized } = appSlice.actions
export const {selectAppError, selectAppIsInitialized, selectAppStatus} = appSlice.selectors