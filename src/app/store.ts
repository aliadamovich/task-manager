import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "features/todolostsList/model/tasksSlice"
import { todolistReducer } from "features/todolostsList/model/todolistSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/login/model/authSlice"

//* types (как в документации RTK)
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//* store
export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistReducer,
		app: appReducer,
		auth: authReducer,
	},
})

//*custom hook useDispatch
// создали кастомный хук useAppDispatch, при его вызове вы получаете специализированный dispatch, уже адаптированный для работы как с обычными actions, так и с thunks.
export const useAppDispatch = useDispatch<AppDispatch>

//кастомный хук для селектора
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
