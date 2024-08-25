import { tasksReducer } from "./reducers/tasks-reducer";
import { todolistReducer } from "./reducers/todolist-reducer";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

// объединяя reducer-ы с помощью combineReducers,  мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
});

// непосредственно создаём store и передаем в него рутовый редюсер (то что написано дальше - нужно чтобы работал редакс девтулз)
export const store = createStore(
  rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
