import { RequestStatusType } from "app/appSlice"
import { AppDispatch } from "app/store"
import { tasksAPI } from "features/todolostsList/api/tasksApi"
import { todolistsAPI } from "features/todolostsList/api/todolistApi"

export const updateTodolistStatusQueryData = (dispatch: AppDispatch, id: string, status: RequestStatusType) => {
	dispatch(
		todolistsAPI.util.updateQueryData("getTodolists", undefined, (state) => {
			let index = state.findIndex((tl) => tl.id === id)
			state[index].entityStatus = status
		}),
	)
}

export const updateTaskStatusQueryData = (dispatch: AppDispatch, id: string, todolistId: string, status: RequestStatusType) => {
	dispatch(
		tasksAPI.util.updateQueryData("getTasks", todolistId, (state) => {
			let tasks = state.items
			let index = tasks.findIndex((t) => t.id === id)
			tasks[index].taskEntityStatus = status
		}),
	)
}