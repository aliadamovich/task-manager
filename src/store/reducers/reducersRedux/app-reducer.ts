export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
type InitialStateType = typeof initialState
type ActionsType = SetAppStatusActionType | SetAppErrorActionType | setAppIsInitializedActionType
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>

const initialState = {
	status: "loading" as RequestStatusType,
	error: null as string | null,
	isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case "app/SET-STATUS":
			return { ...state, status: action.status }

		case "app/SET-ERROR":
			return { ...state, error: action.error }

		case "app/SET-IS-INITIALIZED":
			return {
				...state,
				isInitialized: action.isInitialized,
			}

		default:
			return state
	}
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: "app/SET-STATUS", status }) as const
export const setAppErrorAC = (error: string | null) => ({ type: "app/SET-ERROR", error }) as const
export const setAppIsInitializedAC = (isInitialized: boolean) =>
	({
		type: "app/SET-IS-INITIALIZED",
		isInitialized,
	}) as const