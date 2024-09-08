import { useDispatch } from "react-redux";
import { tasksReducer } from "./reducers/tasks-reducer";
import { todolistReducer } from "./reducers/todolist-reducer";
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk, ThunkDispatch } from "redux-thunk";

//* types
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
//создаем тип диспатча который принимает как AC, так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

//* RootReducer
// объединяя reducer-ы с помощью combineReducers,  мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
});

//* store
// непосредственно создаём store и передаем в него рутовый редюсер  + middleware для thunk обернутое в compose от плагина reduxDevTools
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


//*custom dispatch
// создали кастомный хук useAppDispatch, при его вызове вы получаете специализированный dispatch, уже адаптированный для работы как с обычными actions, так и с thunks.
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();












// @ts-ignore
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
window.store = store;
