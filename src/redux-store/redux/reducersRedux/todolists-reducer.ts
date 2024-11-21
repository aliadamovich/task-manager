
import { TodolistType } from "features/todolostsList/api/api.types"
import { RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "./app-reducer"
import { AppThunk } from "redux-store/redux/store_redux"
import { todolistsAPI } from "redux-store/api_rtk/todolistApi_rtk"
import { handleServerNetworkError } from "common/utils/handleNetworkError"
import { Dispatch } from "redux"
import { ResultCode } from "common/enums/enum"
import { handleServerAppErrors } from "common/utils/handleAppError.ts"

const initialState: TodolistDomainType[] = []

//* Reducer
export const todolistReducer = (todolists = initialState, action: TodolistsActionType): TodolistDomainType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST":
			return todolists.filter((tl) => tl.id !== action.id)

		case "ADD-TODOLIST":
			return [{ ...action.todolist, filter: "All", entityStatus: "idle" }, ...todolists]

		case "CHANGE-TODOLIST-TITLE":
			return todolists.map((td) => (td.id === action.id ? { ...td, title: action.title } : td))

		case "CHANGE-TODOLIST-FILTER":
			return todolists.map((td) => (td.id === action.id ? { ...td, filter: action.filter } : td))

		case "SET-TODOLISTS":
			return action.todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))

		case "CHANGE-TODOLIST-ENTITY-STATUS":
			return todolists.map((td) => (td.id === action.id ? { ...td, entityStatus: action.entityStatus } : td))
		default:
			return todolists
	}
}

//* Action Creators
export const removeTodolistAС = (id: string) => ({ type: "REMOVE-TODOLIST", id }) as const
export const addTodolistAС = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist }) as const
export const changeTodolistTitleAС = (id: string, title: string) =>
	({ type: "CHANGE-TODOLIST-TITLE", id, title }) as const
export const changeTodolistFilterAС = (id: string, filter: FilterValueType) =>
	({ type: "CHANGE-TODOLIST-FILTER", id, filter }) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists }) as const
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
	({ type: "CHANGE-TODOLIST-ENTITY-STATUS", id, entityStatus }) as const

//*Thunk Creators

export const getTodolistsTC = (): AppThunk => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))
		todolistsAPI
			.getTodolists()
			.then((res) => {
				dispatch(setTodolistsAC(res.data))
				dispatch(setAppStatusAC("succeeded"))
			})
			.catch((err) => handleServerNetworkError(dispatch, err))
	}
}

export const removeTodolistTC = (id: string): AppThunk => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))
		dispatch(changeTodolistEntityStatusAC(id, "loading"))
		todolistsAPI
			.deleteTodolist(id)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(removeTodolistAС(id))
					dispatch(setAppStatusAC("succeeded"))
				} else {
					handleServerAppErrors(dispatch, res.data)
				}
			})
			.catch((err) => handleServerNetworkError(dispatch, err))
	}
}

export const addTodolistTC = (title: string): AppThunk => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))
		todolistsAPI
			.createTodolist(title)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(addTodolistAС(res.data.data.item))
					dispatch(setAppStatusAC("succeeded"))
				} else {
					handleServerAppErrors(dispatch, res.data)
				}
			})
			.catch((err) => handleServerNetworkError(dispatch, err))
	}
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC("loading"))
		dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
		todolistsAPI
			.updateTodolist({todolistId, title})
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(changeTodolistTitleAС(todolistId, title))
					dispatch(setAppStatusAC("succeeded"))
					dispatch(changeTodolistEntityStatusAC(todolistId, "idle"))
				} else {
					handleServerAppErrors(dispatch, res.data)
					dispatch(changeTodolistEntityStatusAC(todolistId, "failed"))
				}
			})
			.catch((err) => handleServerNetworkError(dispatch, err))
	}
}

// *Types

export type addTodolistActionType = ReturnType<typeof addTodolistAС>
export type removeTodolistActionType = ReturnType<typeof removeTodolistAС>
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistsActionType =
	| removeTodolistActionType
	| addTodolistActionType
	| ReturnType<typeof changeTodolistTitleAС>
	| ReturnType<typeof changeTodolistFilterAС>
	| setTodolistsActionType
	| SetAppStatusActionType
	| SetAppErrorActionType
	| ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValueType = "All" | "Completed" | "Active"

export type TodolistDomainType = TodolistType & {
	filter: FilterValueType
	entityStatus: RequestStatusType
}
