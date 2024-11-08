import { RequestStatusType, setAppStatus } from "app/appSlice"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolistTC, clearData, removeTodolistTC } from "features/todolostsList/model/todolistSlice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { ResultCode } from "common/enums/enum"
import { RemoveTaskArgs, TaskType, CreateTaskArgs, UpdateTaskType, ReorderTasksArgs } from "features/todolostsList/api/api.types"
import { tasksAPI } from "../api/tasksApi"
import { TaskStatuses } from "../lib/enums/enum"

//*Thunk Creators
//получение всех тасок с сервера и отправка в стейт
export const setTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
	"tasks/getTasks",
	async (todolistId: string, thunkAPI) => {
		const res = await tasksAPI.getTasks(todolistId)
		return { tasks: res.data.items, todolistId }
	},
)

//создание таски
export const createTaskTC = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(
	"tasks/createTask", async (args, { rejectWithValue }) => {
		const res = await tasksAPI.createTask(args)
		if (res.data.resultCode === ResultCode.Success) {
			return { task: res.data.data.item }
		} else {
			return rejectWithValue(res.data)
		}
	}
)

//удаление таски с сервера + из стейта
export const removeTaskTC = createAppAsyncThunk<{ todolistId: string; taskId: string }, RemoveTaskArgs>(
	"tasks/removeTask", async ({ todolistId, taskId }, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }))
		const res = await tasksAPI.deleteTask({ todolistId, taskId }).finally(() => {
			dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }))
		})
		if (res.data.resultCode === ResultCode.Success) {
			return { taskId, todolistId }
		} else {
			return rejectWithValue(res.data)
		}
	}
)

//изменение любого свойства в таске
export const updateTaskTC = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
	"task/updateTask",
	async (args, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI

		let allTasks = getState().tasks
		let task = allTasks[args.todolistId].find((t) => t.id === args.taskId)
		if (!task) return rejectWithValue(null)

		const apiModel: UpdateTaskType = {
			description: task.description,
			title: task.title,
			status: task?.status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
			...args.model, //тк в model сидит одно свойство, мы его перезатрем в объекте а все остальные оставим как есть
		}
		dispatch(changeTaskEntityStatus({ todolistId: args.todolistId, taskId: args.taskId, entityStatus: "loading" }))
		const res = await tasksAPI.updateTask({ todolistId: args.todolistId, taskId: args.taskId, apiModel }).finally(() => {
			dispatch(changeTaskEntityStatus({ todolistId: args.todolistId, taskId: args.taskId, entityStatus: "succeeded" }))
		})

		if (res.data.resultCode === ResultCode.Success) {
			return args
		} else {
			return rejectWithValue(res.data)
		}
	},
)

//
export const reorderTasksTC = createAppAsyncThunk<{ todolistId: string; taskId: string, replacedTaskId: string}, ReorderTasksArgs>("tasks/reorderTasks",
	async ({ todolistId, taskId, replacedTaskId }, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }))
		const res = await tasksAPI.reorderTasks({ replacedTaskId, todolistId, taskId }).finally(() => {
			dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }))
		})
		if (res.data.resultCode === ResultCode.Success) {
			return { taskId, todolistId, replacedTaskId }
		} else {
			return rejectWithValue(res.data)
		}
	},
)

const tasksSlice = createSlice({
	name: "tasks",

	initialState: {} as TaskStateType,

	reducers: {
		changeTaskEntityStatus(
			state,
			action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatusType }>,
		) {
			const currentTasks = state[action.payload.todolistId]
			const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
			if (index !== -1) currentTasks[index].taskEntityStatus = action.payload.entityStatus
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(addTodolistTC.fulfilled, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(removeTodolistTC.fulfilled, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(clearData, (state, action) => {
				return {}
			})
			//если добавить проверку на пустой массив в компоненте то нет необходимости сетать тудулисты тут
			// .addCase(setTodolists, (state, action) => {
			// 	action.payload.todolists.forEach((tl) => state[tl.id] = [])
			// })
			//* thunk actions
			.addCase(setTasksTC.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
					...t,
					taskEntityStatus: "idle",
				}))
			})
			.addCase(createTaskTC.fulfilled, (state, action) => {
				const currentTasks = state[action.payload.task.todoListId]
				currentTasks.unshift({ ...action.payload.task, taskEntityStatus: "idle" })
			})
			.addCase(removeTaskTC.fulfilled, (state, action) => {
				const currentTasks = state[action.payload.todolistId]
				const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
				if (index !== -1) currentTasks.splice(index, 1)
			})
			.addCase(updateTaskTC.fulfilled, (state, action) => {
				const currentTasks = state[action.payload.todolistId]
				const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
				if (index !== -1) currentTasks[index] = { ...currentTasks[index], ...action.payload.model }
			})
			.addCase(reorderTasksTC.fulfilled, (state, action) => {
				const tasksArray = state[action.payload.todolistId]
				const reorderedTaskIndex = tasksArray.findIndex((t) => t.id === action.payload.taskId)
				const newTaskIndex = tasksArray.findIndex((t) => t.id === action.payload.replacedTaskId)
				if (reorderedTaskIndex !== -1 && newTaskIndex !== -1 ) {
					const [movedTask] = tasksArray.splice(reorderedTaskIndex, 1)
					tasksArray.splice(newTaskIndex, 0, movedTask)
				}
		})
	},

	selectors: {
		selectTasks: createSelector(
			[(state: TaskStateType) => state, (_, id) => id], //массив входных селекторов
			(tasks, id) => tasks[id],
		),
		selectFilteredTasks: (state, filter, todolistId) => {
			let tasks = state[todolistId]
			if (filter === "Completed") {
				tasks = tasks.filter((t) => t.status === TaskStatuses.Completed)
			} else if (filter === "Active") {
				tasks = tasks.filter((t) => t.status === TaskStatuses.New)
			}
			return tasks
		},
	},
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskEntityStatus } = tasksSlice.actions
export const { selectTasks, selectFilteredTasks } = tasksSlice.selectors

//* Types
export type TaskDomainType = TaskType & {
	taskEntityStatus: RequestStatusType
}

export type TaskStateType = {
	[todolistId: string]: TaskDomainType[]
}

//спец тип для модели в которой все свойства необязатеьные, и мы передаем только одно - что делает
//изменения универсаьными и позволяет создать одну санку на все измпнения таски
type UpdateDomainTaskModelType = Partial<UpdateTaskType>

type UpdateTaskArgs = {
	todolistId: string
	taskId: string
	model: UpdateDomainTaskModelType
}

//тип для тестов
export type TaskInitialState = ReturnType<typeof tasksSlice.getInitialState>
