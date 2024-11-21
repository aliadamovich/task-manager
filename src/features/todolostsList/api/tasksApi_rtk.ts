import { GetTasksRTKResponse } from './api.types';
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
import { baseApi } from "app/baseApi"
import { TaskDomainType } from "../model/tasksSlice"

export const tasksAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<GetTasksRTKResponse, string>({
			query: (todolistId) => `todo-lists/${todolistId}/tasks`,
			transformResponse(res: GetTasksResponse): GetTasksRTKResponse {
				return { ...res, items: res.items.map((t) => ({ ...t, taskEntityStatus: "idle" })) }
			},
			providesTags: ["Tasks"],
		}),
		createTask: build.mutation<BaseResponseType<{ item: TaskType }>, { todolistId: string; title: string }>({
			query: ({ todolistId, title }) => ({
				url: `todo-lists/${todolistId}/tasks`,
				method: "POST",
				body: { title },
			}),
			invalidatesTags: ["Tasks"],
		}),
		deleteTask: build.mutation<BaseResponseType, { todolistId: string; taskId: string }>({
			query: ({ todolistId, taskId }) => ({
				url: `todo-lists/${todolistId}/tasks/${taskId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tasks"],
		}),
	}),
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation} = tasksAPI

export const _tasksAPI = {
	// getTasks(todolistId: string) {
	// 	return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	// },

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

	// createTask(args: CreateTaskArgs) {
	// 	const { todolistId, title } = args
	// 	return instance.post<
	// 		BaseResponseType<{item: TaskType}>
	// 	>(`todo-lists/${todolistId}/tasks`, {
	// 		title: title,
	// 	})
	// },

	reorderTasks(args: ReorderTasksArgs) {
		const { replacedTaskId, taskId, todolistId } = args
		return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, replacedTaskId)
	},
}
