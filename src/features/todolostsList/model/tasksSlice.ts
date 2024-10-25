import { RequestStatusType, setAppStatus } from "app/appSlice"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolistTC, clearData, removeTodolistTC } from "features/todolostsList/model/todolistSlice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { handleServerNetworkError } from "common/utils/handleNetworkError"
import { handleServerAppErrors } from "common/utils/handleAppError.ts"
import { ResultCode } from "common/enums/enum"
import { RemoveTaskArgs, TaskType, CreateTaskArgs, UpdateTaskType } from "features/todolostsList/api/todolistApi.types"
import { todolistsAPI } from "features/todolostsList/api/todolistApi"

//*Thunk Creators
//получение всех тасок с сервера и отправка в стейт
export const setTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
	"tasks/getTasks",
	async (todolistId: string, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(setAppStatus({ status: "loading" }))
			const res = await todolistsAPI.getTasks(todolistId)
			dispatch(setAppStatus({ status: "succeeded" }))
			return { tasks: res.data.items, todolistId }
		} catch (err) {
			handleServerNetworkError(dispatch, err)
			return rejectWithValue(null)
		}
	},
)

//создание таски
export const createTaskTC = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(
	"tasks/createTask",
	async (args, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(setAppStatus({ status: "loading" }))
			const res = await todolistsAPI.createTask(args)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: "succeeded" }))
				return { task: res.data.data.item }
			} else {
				handleServerAppErrors(dispatch, res.data)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		}
	},
)

//удаление таски с сервера + из стейта
export const removeTaskTC = createAppAsyncThunk<{ todolistId: string; taskId: string }, RemoveTaskArgs>(
	"tasks/removeTask",
	async ({ todolistId, taskId }, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(setAppStatus({ status: "loading" }))
			dispatch(changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }))
			const res = await todolistsAPI.deleteTask({ todolistId, taskId })
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: "succeeded" }))
				return { taskId, todolistId }
			} else {
				handleServerAppErrors(dispatch, res.data)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		}
	},
)

//изменение любого свойства в таске
export const updateTaskTC = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
	"task/updateTask",
	async (args, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI

		try {
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
			dispatch(setAppStatus({ status: "loading" }))
			const res = await todolistsAPI.updateTask({ todolistId: args.todolistId, taskId: args.taskId, apiModel })

			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: "succeeded" }))
				return args
			} else {
				handleServerAppErrors(dispatch, res.data)
				return rejectWithValue(null)
			}
		} catch (error) {
			handleServerNetworkError(dispatch, error)
			return rejectWithValue(null)
		} finally {
			dispatch(changeTaskEntityStatus({ todolistId: args.todolistId, taskId: args.taskId, entityStatus: "succeeded" }))
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
		builder.addCase(setTasksTC.fulfilled, (state, action) => {
			state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
				...t,
				taskEntityStatus: "idle",
			}))
		})
		builder.addCase(createTaskTC.fulfilled, (state, action) => {
			const currentTasks = state[action.payload.task.todoListId]
			currentTasks.unshift({ ...action.payload.task, taskEntityStatus: "idle" })
		})
		builder.addCase(removeTaskTC.fulfilled, (state, action) => {
			const currentTasks = state[action.payload.todolistId]
			const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
			if (index !== -1) currentTasks.splice(index, 1)
		})
		builder.addCase(updateTaskTC.fulfilled, (state, action) => {
			const currentTasks = state[action.payload.todolistId]
			const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
			if (index !== -1) currentTasks[index] = { ...currentTasks[index], ...action.payload.model }
		})
	},

	selectors: {
		// selectAllTasks: sliceState => sliceState,
		selectTasks: createSelector(
			[(state: TaskStateType) => state, (_, id) => id], //массив входных селекторов
			(tasks, id) => tasks[id],
		),
	},
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskEntityStatus } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

//* Types
export type TaskDomainType = TaskType & {
	taskEntityStatus: RequestStatusType
}

type TaskStateType = {
	[todolistId: string]: TaskDomainType[]
}

//спец тип для модели в которой все свойства необязатеьные, и мы передаем только одно - что делает
//изменения универсаьными и позволяет создать одну санку на все измпнения таски
type UpdateDomainTaskModelType = {
	description?: string
	title?: string
	status?: number
	priority?: number
	startDate?: string
	deadline?: string
}

type UpdateTaskArgs = {
	todolistId: string
	taskId: string
	model: UpdateDomainTaskModelType
}

//тип для тестов
export type TaskInitialState = ReturnType<typeof tasksSlice.getInitialState>