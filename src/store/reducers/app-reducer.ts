export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type InitialStateType = typeof initialState;
type ActionsType = SetAppStatusActionType | SetAppErrorActionType;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;

const initialState = {
  status: "loading" as RequestStatusType,
	error: null as string | null
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
    case "app/SET-STATUS":
      return { ...state, status: action.status };

    case "app/SET-ERROR":
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: "app/SET-STATUS", status } as const);
export const setAppErrorAC = (error: string | null) => ({ type: "app/SET-ERROR", error } as const);

