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


type Props = {
	dispatch: AppDispatch
	id: string
	todolistId: string
	status: RequestStatusType
	page: number
}
export const updateTaskStatusQueryData = ({dispatch, id, todolistId, status, page}: Props) => {
	dispatch(
		tasksAPI.util.updateQueryData("getTasks", {todolistId, args: {page}}, (state) => {
			let tasks = state.items
			let index = tasks.findIndex((t) => t.id === id)
			tasks[index].taskEntityStatus = status
		}),
	)
}