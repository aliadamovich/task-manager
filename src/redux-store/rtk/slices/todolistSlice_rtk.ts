import { RequestStatusType, setAppStatus } from "app/appSlice"
import { todolistsAPI } from "redux-store/api_rtk/todolistApi_rtk"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { handleServerAppErrors } from "common/utils/handleAppError.ts"
import { ResultCode } from "common/enums/enum"
import { TodolistType, updateTodolistArgs } from "features/todolostsList/api/api.types"
import { setTasksTC } from "./tasksSlice_rtk"

//*Thunk Creators
export const setTodolistsTC = createAppAsyncThunk<{ todolists: TodolistType[] }>(
	"todolists/setTodolists", async (_, thunkAPI) => {
		const { dispatch } = thunkAPI
		const res = await todolistsAPI.getTodolists()
		//! выяснить как диспатчить чужую санку в rtk
		res.data.forEach((td) => dispatch(setTasksTC(td.id)))
		return { todolists: res.data }
	},
)
//* Thunks
export const removeTodolistTC = createAppAsyncThunk<{ id: string }, string>(
	"todolists/remodeTodolist", async (id, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
		const res = await todolistsAPI.deleteTodolist(id).finally(() => {
			dispatch(changeTodolistEntityStatus({ id, entityStatus: "idle" }))
		})
		if (res.data.resultCode === ResultCode.Success) {
			return { id }
		} else {
			return rejectWithValue(res.data)
		}
	},
)

export const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
	"todolists/addTodolist",
	async ({ title }, {rejectWithValue}) => {
		const res = await todolistsAPI.createTodolist(title)
		if (res.data.resultCode === ResultCode.Success) {
			return { todolist: res.data.data.item }
		} else {
			return rejectWithValue(res.data)
		}
	},
)

export const changeTodolistTitleTC = createAppAsyncThunk<updateTodolistArgs, updateTodolistArgs>(
	"todolists/changeTodolistTitle",
	async ({ todolistId, title }, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "loading" }))
		const res = await todolistsAPI.updateTodolist({ todolistId, title }).finally(() => {
			dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: "idle" }))
		})
		if (res.data.resultCode === ResultCode.Success) {
			return { todolistId, title }
		} else {
			return rejectWithValue(res.data)
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
