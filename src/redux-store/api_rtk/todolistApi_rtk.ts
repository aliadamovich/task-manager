import { AxiosResponse } from "axios"
import { BaseResponseType } from "common/types/types"
import { instance } from "common/axios-instance/instance"
import {
	CreateTaskArgs,
	GetTasksResponse,
	RemoveTaskArgs,
	TaskType,
	TodolistType,
	UpdataskArgs,
	updateTodolistArgs,
} from "features/todolostsList/api/api.types"

//* todolists

export const todolistsAPI = {
	getTodolists() {
		return instance.get<Array<TodolistType>>("todo-lists")
	},

	createTodolist(title: string) {
		return instance.post<
			BaseResponseType<{
				item: TodolistType
			}>,
			AxiosResponse<
				BaseResponseType<{
					item: TodolistType
				}>
			>,
			{
				title: string
			}
		>("todo-lists", {
			title: title,
		})
	},

	deleteTodolist(todolistId: string) {
		return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
	},

	updateTodolist(args: updateTodolistArgs) {
		const { todolistId, title } = args
		return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {
			title: title,
		})
	},

	//*tasks

	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},

	deleteTask(args: RemoveTaskArgs) {
		const { todolistId, taskId } = args
		return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},

	updateTask(args: UpdataskArgs) {
		const { apiModel, taskId, todolistId } = args
		return instance.put<
			BaseResponseType<{
				item: TaskType
			}>
		>(`todo-lists/${todolistId}/tasks/${taskId}`, apiModel)
	},

	createTask(args: CreateTaskArgs) {
		const { todolistId, title } = args
		return instance.post<
			BaseResponseType<{
				item: TaskType
			}>
		>(`todo-lists/${todolistId}/tasks`, {
			title: title,
		})
	},
}
