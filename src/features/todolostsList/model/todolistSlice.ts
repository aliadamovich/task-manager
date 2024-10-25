import { RequestStatusType, setAppStatus } from "app/appSlice"
import { todolistsAPI } from "features/todolostsList/api/todolistApi"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setTasksTC } from "features/todolostsList/model/tasksSlice"
import { handleServerNetworkError } from "common/utils/handleNetworkError"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { handleServerAppErrors } from "common/utils/handleAppError.ts"
import { ResultCode } from "common/enums/enum"
import { TodolistType, updateTodolistArgs } from "features/todolostsList/api/todolistApi.types"

//*Thunk Creators
export const setTodolistsTC = createAppAsyncThunk<{ todolists: TodolistType[] }>(
	"todolists/getTodolists",
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			const res = await todolistsAPI.getTodolists()
			dispatch(setAppStatus({ status: "succeeded" }))
			//! выяснить как диспатчить чужую санку в rtk
			res.data.forEach((td) => dispatch(setTasksTC(td.id)))
			return { todolists: res.data }
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		}
	},
)
//* Thunks
export const removeTodolistTC = createAppAsyncThunk<{ id: string }, string>(
	"todolists/remodeTodolist",
	async (id, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(setAppStatus({ status: "loading" }))
			dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
			const res = await todolistsAPI.deleteTodolist(id)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: "succeeded" }))
				return { id }
			} else {
				handleServerAppErrors(dispatch, res.data)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		}
	},
)

export const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
	"todolists/addTodolist",
	async ({ title }, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(setAppStatus({ status: "loading" }))
			const res = await todolistsAPI.createTodolist(title)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: "succeeded" }))
				return { todolist: res.data.data.item }
			} else {
				handleServerAppErrors(dispatch, res.data)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		}
	},
)

export const changeTodolistTitleTC = createAppAsyncThunk<updateTodolistArgs, updateTodolistArgs>(
	"todolists/changeTodolistTitle",
	async ({ todolistId, title }, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(setAppStatus({ status: "loading" }))
			dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "loading" }))
			const res = await todolistsAPI.updateTodolist({ todolistId, title })
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: "succeeded" }))
				dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "idle" }))
				return { todolistId, title }
			} else {
				handleServerAppErrors(dispatch, res.data)
				dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }))
				return rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		}
	},
)

//* Slice
const todolistsSlice = createSlice({
	name: "todolists",

	initialState: [] as TodolistDomainType[],

	reducers: {
		changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValueType }>) {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state[index].filter = action.payload.filter
		},
		changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state[index].entityStatus = action.payload.entityStatus
		},
		clearData() {
			return []
		},
	},

	extraReducers: (builder) => {
		builder.addCase(setTodolistsTC.fulfilled, (state, action) => {
			//1 var
			return action.payload.todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
			//2 var
			// action.payload.todolists.forEach(td => {
			// 	state.push({ ...td, filter: "All", entityStatus: "idle" })
			// })
		})
		builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
			const index = state.findIndex((td) => td.id === action.payload.id)
			if (index !== -1) state.splice(index, 1)
		})
		builder.addCase(addTodolistTC.fulfilled, (state, action) => {
			state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
		})
		builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
			const index = state.findIndex((td) => td.id === action.payload.todolistId)
			if (index !== -1) state[index].title = action.payload.title
		})
	},

	selectors: {
		selectTodolists: (sliceState) => sliceState,
	},
})

export const todolistReducer = todolistsSlice.reducer
export const { changeTodolistEntityStatus, changeTodolistFilter, clearData } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

// *Types

export type FilterValueType = "All" | "Completed" | "Active"

export type TodolistDomainType = TodolistType & {
	filter: FilterValueType
	entityStatus: RequestStatusType
}
//тип для тестов
export type TodolistsInitialState = ReturnType<typeof todolistsSlice.getInitialState>