import { BaseResponseType } from "common/types/types"
import { instance } from "common/axios-instance/instance"
import {
	CreateTaskArgs,
	GetTasksResponse,
	RemoveTaskArgs,
	ReorderTasksArgs,
	TaskType,
	UpdataskArgs,
} from "features/todolostsList/api/api.types"

export const tasksAPI = {
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

	reorderTasks(args: ReorderTasksArgs) {
		const { replacedTaskId, taskId, todolistId } = args
		return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, replacedTaskId)
	},
}
