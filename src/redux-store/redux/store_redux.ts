import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { todolistReducer } from "../../features/todolostsList/model/todolistSlice"
import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "../../app/appSlice"
import { authReducer } from "../rtk/slices/authSlice_rtk"
import { tasksReducer } from "features/todolostsList/model/tasksSlice"
import { TodolistsActionType } from "redux-store/redux/reducersRedux/todolists-reducer"
import { TasksActionsType } from "redux-store/redux/reducersRedux/tasks-reducer"
//* types
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//создаем тип диспатча который принимает как AC, так и TC
export type AppDispatch = ThunkDispatch<AppRootStateType, any, UnknownAction>

//общий тип для всех экшнов (не нужен в RTK)
export type AppActionsType = TodolistsActionType | TasksActionsType

//общий тип для всех thunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>

//* RootReducer
// объединяя reducer-ы с помощью combineReducers,  мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistReducer,
	app: appReducer,
	auth: authReducer,
})

//* store
// непосредственно создаём store и передаем в него рутовый редюсер  + middleware для thunk обернутое в compose от плагина reduxDevTools
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//*custom hook useDispatch
// создали кастомный хук useAppDispatch, при его вызове вы получаете специализированный dispatch, уже адаптированный для работы как с обычными actions, так и с thunks.
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppDispatch = useDispatch<AppDispatch>

//кастомный хук для селектора
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
window.store = store
