import { v1 } from "uuid";
import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { Dispatch } from "redux";

//* Action Types
export type removeTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	payload: {
		id: string
	}
}

export type addTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    id: string
		title: string
  }
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterValueType;
  };
};

export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionType = removeTodolistActionType | addTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | setTodolistsActionType;

//* state types
export type FilterValueType = "All" | "Completed" | "Active";

export type TodolistDomainType = TodolistType & {
	filter: FilterValueType
}

const initialState: TodolistDomainType[] = [];

//* Reducer
export const todolistReducer = (todolists = initialState, action: ActionType): TodolistDomainType[] => {
	switch (action.type) {
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.payload.id);

    case "ADD-TODOLIST":
      const newTodo: TodolistDomainType = {
        id: action.payload.id,
        title: action.payload.title,
				addedDate: '',
				order: 0,
        filter: "All",
      };
      return [...todolists, newTodo];

			case "CHANGE-TODOLIST-TITLE":
				return todolists.map(td => td.id === action.payload.id ? { ...td, title: action.payload.title } : td)

			case "CHANGE-TODOLIST-FILTER":
				return todolists.map(td => td.id === action.payload.id ? { ...td, filter: action.payload.filter } : td)

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
export const removeTodolistAС = (id: string): removeTodolistActionType => ({
	type: 'REMOVE-TODOLIST',
	payload: {
		id: id
	}
})

export const addTodolistAС = ( title: string): addTodolistActionType => ({
  type: "ADD-TODOLIST",
  payload: {
    id: v1(),
		title: title
  },
});

export const changeTodolistTitleAС = (id: string, title: string): ChangeTodolistTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  payload: {
    id: id,
    title: title,
  },
});

export const changeTodolistFilterAС = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  payload: {
    id: id,
    filter: filter,
  },
});

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: "SET-TODOLISTS", todolists }) as const;


//*Thunk Creators

export const getTodolistsFromServerTC = () => {

	return (dispatch: Dispatch) => {
		todolistsAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
	}
}