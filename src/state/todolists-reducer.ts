import { v1 } from "uuid";
import { FilterValueType, todoListsType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
  };
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

type ActionsType = | RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer = ( state: todoListsType[], action: ActionsType ): todoListsType[] => {
	switch (action.type) {

		case "REMOVE-TODOLIST":
			return state.filter((td) => td.id !== action.payload.id);

		case "ADD-TODOLIST":
			const newTodo: todoListsType = { id: v1(), title: action.payload.title, filter: 'All' }
			return [...state, newTodo];

		case "CHANGE-TODOLIST-TITLE": 
		 return state.map(td => td.id === action.payload.id ? { ...td, title: action.payload.title } : td)

		case "CHANGE-TODOLIST-FILTER": 
			return state.map((td) => td.id === action.payload.id ? { ...td, filter: action.payload.filter } : td);

		default:
			throw new Error('I dont understand this type')
  }
};

//Action Creators

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
  type: "REMOVE-TODOLIST",
  payload: {
    id: todolistId
  }
})

export const AddTodolistAC = (todolistTitle: string): AddTodolistActionType => ({
  type: "ADD-TODOLIST",
  payload: {
    title: todolistTitle,
  },
});

export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id: todolistId,
      title: todolistTitle,
    },
  });

	export const ChangeTodolistFilterAC = (todolistId: string, todolistFilter: FilterValueType): ChangeTodolistFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id: todolistId,
      filter: todolistFilter,
    },
  });