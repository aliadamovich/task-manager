import { RequestStatusType } from "app/appSlice"

export type CreateTaskArgs = {
	todolistId: string
	title: string
}

export type RemoveTaskArgs = {
	todolistId: string
	taskId: string
}

export type UpdataskArgs = RemoveTaskArgs & {
	apiModel: UpdateTaskType
}
export type ReorderTasksArgs = RemoveTaskArgs & {
	replacedTaskId: string
}

export type updateTodolistArgs = {
	todolistId: string
	title: string
}

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type TaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type TaskDomainType = TaskType & {
	taskEntityStatus: RequestStatusType
}


export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export type GetTasksRTKResponse = {
	error: string | null
	totalCount: number
	items: TaskDomainType[]
}

export type UpdateTaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
}
