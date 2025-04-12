import { GetTasksRTKResponse } from './api.types';
import { BaseResponseType } from "common/types/types"
import {
	GetTasksResponse,
	TaskType,
	UpdataskArgs,
} from "features/todolostsList/api/api.types"
import { baseApi } from "app/baseApi"
export const PAGE_SIZE = 4;

export const tasksAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<GetTasksRTKResponse, { todolistId: string; args?: { page: number } }>({
			query: ({ todolistId, args }) => ({
				url: `todo-lists/${todolistId}/tasks`,
				params: { ...args, count: PAGE_SIZE },
			}),
			transformResponse(res: GetTasksResponse): GetTasksRTKResponse {
				return { ...res, items: res.items.map((t) => ({ ...t, taskEntityStatus: "idle" })) }
			},
			providesTags: (res, err, { todolistId }) =>
				res
					? [...res.items.map(({ id }) => ({ type: "Tasks", id }) as const), { type: "Tasks", id: todolistId }]
					: ["Tasks"],
		}),
		createTask: build.mutation<BaseResponseType<{ item: TaskType }>, { todolistId: string; title: string }>({
			query: ({ todolistId, title }) => ({
				url: `todo-lists/${todolistId}/tasks`,
				method: "POST",
				body: { title },
			}),
			invalidatesTags: (res, err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
		}),
		deleteTask: build.mutation<BaseResponseType, { todolistId: string; taskId: string }>({
			query: ({ todolistId, taskId }) => ({
				url: `todo-lists/${todolistId}/tasks/${taskId}`,
				method: "DELETE",
			}),
			invalidatesTags: (res, err, { taskId }) => [{ type: "Tasks", id: taskId }],
		}),
		updateTask: build.mutation<BaseResponseType<{ item: TaskType }>, UpdataskArgs>({
			query: ({ apiModel, taskId, todolistId }) => ({
				url: `todo-lists/${todolistId}/tasks/${taskId}`,
				method: "PUT",
				body: apiModel,
			}),
			invalidatesTags: (res, err, { taskId }) => [{ type: "Tasks", id: taskId }],
		}),
	}),
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksAPI
