import { GetTasksRTKResponse } from './api.types';
import { BaseResponseType } from "common/types/types"
import {
	GetTasksResponse,
	TaskType,
	UpdataskArgs,
} from "features/todolostsList/api/api.types"
import { baseApi } from "app/baseApi"

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
		updateTask: build.mutation<BaseResponseType<{ item: TaskType }>, UpdataskArgs>({
			query: ({ apiModel, taskId, todolistId }) => ({
				url: `todo-lists/${todolistId}/tasks/${taskId}`,
				method: "PUT",
				body: apiModel,
			}),
			invalidatesTags: ["Tasks"],
		}),
	}),
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksAPI
