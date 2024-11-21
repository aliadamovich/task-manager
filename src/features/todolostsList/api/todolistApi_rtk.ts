import { TodolistDomainType } from './../model/todolistSlice';
import { BaseResponseType } from "common/types/types"
import {
	TodolistType,
} from "features/todolostsList/api/api.types"
import { baseApi } from "app/baseApi"

//* todolists

export const todolistsAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTodolists: build.query<TodolistDomainType[], void>({
			query: () => "todo-lists",
			transformResponse(todolists: TodolistType[]): TodolistDomainType[] {
				return todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
			},
			providesTags: ["Todolist"],
		}),
		addTodolist: build.mutation<BaseResponseType<{ item: TodolistType }>, string>({
			query: (title) => {
				return {
					url: "todo-lists",
					method: "POST",
					body: { title },
				}
			},
			invalidatesTags: ["Todolist"],
		}),
		deleteTodolist: build.mutation<BaseResponseType, string>({
			query: (todolistId) => {
				return {
					url: `todo-lists/${todolistId}`,
					method: "DELETE",
				}
			},
			invalidatesTags: ["Todolist"],
		}),
		updateTodolist: build.mutation<BaseResponseType, { todolistId: string; title: string }>({
			query: ({ todolistId, title }) => {
				return {
					url: `todo-lists/${todolistId}`,
					method: "PUT",
					body: { title },
				}
			},
			invalidatesTags: ["Todolist"],
		}),
	}),
})

export const {useGetTodolistsQuery, useAddTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation} = todolistsAPI


