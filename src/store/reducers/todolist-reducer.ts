import { v1 } from "uuid";
import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { Dispatch } from "redux";

const initialState: TodolistDomainType[] = [];

//* Reducer
export const todolistReducer = (todolists = initialState, action: ActionType): TodolistDomainType[] => {
	switch (action.type) {
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.id);

    case "ADD-TODOLIST":
      return [{...action.todolist, filter: "All"}, ...todolists];

			case "CHANGE-TODOLIST-TITLE":
				return todolists.map(td => td.id === action.id ? { ...td, title: action.title } : td)

			case "CHANGE-TODOLIST-FILTER":
				return todolists.map(td => td.id === action.id ? { ...td, filter: action.filter } : td)

			case 'SET-TODOLISTS':
				return action.todolists.map(tl => ({
					...tl,
					filter: 'All'
				}))

    default:
      return todolists;
  }
}

//* Action Creators
export const removeTodolistAС = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAС = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist} as const);
export const changeTodolistTitleAС = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const);
export const changeTodolistFilterAС = (id: string, filter: FilterValueType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter } as const);
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists }) as const;


//*Thunk Creators

export const getTodolistsTC = () => {
	return (dispatch: Dispatch) => {
		todolistsAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
	}
}

export const removeTodolistTC = (id: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.deleteTodolist(id).then( () => {
			dispatch(removeTodolistAС(id))
		})
	}
}

export const addTodolistTC = (title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.createTodolist(title).then((res) => {
			dispatch(addTodolistAС(res.data.data.item));
		})
	}
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.updateTodolist(todolistId, title).then((res) => {
			dispatch(changeTodolistTitleAС(todolistId, title))
		})
	}
}


// *Types

export type addTodolistActionType = ReturnType<typeof addTodolistAС>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAС>;
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type ActionType =
  | removeTodolistActionType
  | addTodolistActionType
  | ReturnType<typeof changeTodolistTitleAС>
  | ReturnType<typeof changeTodolistFilterAС>
  | setTodolistsActionType;

export type FilterValueType = "All" | "Completed" | "Active";

export type TodolistDomainType = TodolistType & {
	filter: FilterValueType
}