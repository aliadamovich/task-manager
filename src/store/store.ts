import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TasksActionsType, tasksReducer } from "./reducers/tasksSlice";
import { todolistReducer, TodolistsActionType } from "./reducers/todolistSlice";
import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./reducers/appSlice";
import { authReducer } from "./reducers/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
//* types
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

//создаем тип диспатча который принимает как AC, так и TC
export type AppDispatch = ThunkDispatch<AppRootStateType, any, UnknownAction>;

//общий тип для всех экшнов
export type AppActionsType = TodolistsActionType | TasksActionsType;

//общий тип для всех thunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>;

//* RootReducer
// объединяя reducer-ы с помощью combineReducers,  мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
});

//* store
// непосредственно создаём store и передаем в него рутовый редюсер  + middleware для thunk обернутое в compose от плагина reduxDevTools
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  // prepend and concat calls can be chained
  // .concat(logger),
});

//*custom hook useDispatch
// создали кастомный хук useAppDispatch, при его вызове вы получаете специализированный dispatch, уже адаптированный для работы как с обычными actions, так и с thunks.
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppDispatch = useDispatch<AppDispatch>;

//кастомный хук для селектора
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
window.store = store;
