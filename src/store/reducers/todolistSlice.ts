import { RequestStatusType, setAppStatus } from "store/reducers/appSlice";
import { todolistsAPI, TodolistType } from "api/todolists-api";
import { ResultCode } from "features/lib/enums/enums";
import { handleServerAppErrors, handleServerNetworkError } from "utils";
import { AppThunk } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const todolistsSlice = createSlice({
	name: "todolists",

	initialState: [] as TodolistDomainType[],

	reducers: {
		removeTodolist(state, action: PayloadAction<{ id: string }>) {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state.splice(index, 1)
		},
		addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
			state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
		},
		changeTodolistTitle(state, action: PayloadAction<{ id: string; title: string }>) {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state[index].title = action.payload.title
		},
		changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValueType }>) {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state[index].filter = action.payload.filter
		},
		changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state[index].entityStatus = action.payload.entityStatus
		},
		setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
			//1 var
			return action.payload.todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))

			//2 var
			// action.payload.todolists.forEach(td => {
			// 	state.push({ ...td, filter: "All", entityStatus: "idle" })
			// })
		},
	},
})

export const todolistReducer = todolistsSlice.reducer
export const { removeTodolist, addTodolist, changeTodolistEntityStatus, changeTodolistFilter, changeTodolistTitle, setTodolists} = todolistsSlice.actions



//*Thunk Creators

export const getTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolists({todolists: res.data}));
        dispatch(setAppStatus({status: "succeeded"}));
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({id, entityStatus: "loading"}));
    todolistsAPI
      .deleteTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolist({id}));
          dispatch(setAppStatus({status: "succeeded"}));
        } else {
          handleServerAppErrors(dispatch, res.data);
        }
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    todolistsAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({todolist: res.data.data.item}));
          dispatch(setAppStatus({status: "succeeded"}));
        } else {
          handleServerAppErrors(dispatch, res.data);
        }
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({id, entityStatus: "loading"}));
    todolistsAPI
      .updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitle({id, title}));
          dispatch(setAppStatus({status: "succeeded"}));
          dispatch(changeTodolistEntityStatus({id, entityStatus: "idle"}));
        } else {
          handleServerAppErrors(dispatch, res.data);
          dispatch(changeTodolistEntityStatus({id, entityStatus: "failed"}));
        }
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

// *Types

export type FilterValueType = "All" | "Completed" | "Active";

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatusType;
};
