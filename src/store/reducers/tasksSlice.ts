import { Dispatch } from "redux";
import { TaskDomainType, TaskType, todolistsAPI, UpdateTaskType } from "../../api/todolists-api";
import { AppRootStateType } from "../store";
import { handleServerAppErrors, handleServerNetworkError } from "../../utils";
import { ResultCode } from "../../features/lib/enums/enums";
import { RequestStatusType, setAppStatus } from "store/reducers/appSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodolist, removeTodolist, setTodolists } from 'store/reducers/todolistSlice';
import { setTasksAC } from "store/reducers/reducersRedux/tasks-reducer";


const tasksSlice = createSlice({
	name: "tasks",

	initialState: {} as TaskStateType,

	reducers: {
		removeTask(state, action: PayloadAction<{ taskId: string; todolistId: string }>) {
			const currentTasks = state[action.payload.todolistId]
			const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
			if (index !== -1) currentTasks.splice(index, 1)
		},
		addTask(state, action: PayloadAction<{ task: TaskType }>) {
			const currentTasks = state[action.payload.task.todoListId]
			currentTasks.unshift({ ...action.payload.task, taskEntityStatus: "idle" })
		},
		updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>) {
			const currentTasks = state[action.payload.todolistId]
			const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
			if (index !== -1) currentTasks[index] = { ...currentTasks[index], ...action.payload.model }
		},
		changeTaskEntityStatus(
			state, action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatusType }>) {
				const currentTasks = state[action.payload.todolistId]
				const index = currentTasks.findIndex((t) => t.id === action.payload.taskId)
				if (index !== -1) currentTasks[index].taskEntityStatus = action.payload.entityStatus
		},
		setTasks(state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>) {
			state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
				...t,
				taskEntityStatus: "idle",
			}))
		},
	},

	extraReducers: (builder) => {
		builder.addCase(addTodolist, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		.addCase(removeTodolist, (state, action) => {
			delete state[action.payload.id]
		})
		//если добавить проверку на пустой массив в компоненте то нет необходимости сетать тудулисты тут
		// .addCase(setTodolists, (state, action) => {
		// 	action.payload.todolists.forEach((tl) => state[tl.id] = [])
		// })
	}
})

export const tasksReducer = tasksSlice.reducer
export const { removeTask, addTask, updateTask, changeTaskEntityStatus, setTasks } = tasksSlice.actions



//*Thunk Creators
//получение всех тасок с сервера и отправка в стейт
export const getTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    todolistsAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasks({tasks: res.data.items, todolistId}));
        dispatch(setAppStatus({status: "succeeded"}));
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

//добавление таски на сервер + в стейт
export const createTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({task: res.data.data.item}));
          dispatch(setAppStatus({status: "succeeded"}));
        } else {
          handleServerAppErrors(dispatch, res.data);
        }
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

//удаление таски с сервера + из стейта
export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTaskEntityStatus({todolistId, taskId, entityStatus: "loading"}));
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTask({taskId, todolistId}));
          dispatch(setAppStatus({status:"succeeded"}));
        } else {
          handleServerAppErrors(dispatch, res.data);
        }
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

//изменение любого свойства в таске
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let allTasks = getState().tasks;
    let task = allTasks[todolistId].find((t) => t.id === taskId);
    if (!task) return;

    const apiModel: UpdateTaskType = {
      description: task.description,
      title: task.title,
      status: task?.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model, //тк в model сидит одно свойство, мы его перезатрем в объекте а все остальные оставим как есть
    };
    dispatch(changeTaskEntityStatus({todolistId, taskId, entityStatus: "loading"}));
    dispatch(setAppStatus({status:"loading"}));
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTask({todolistId, taskId, model}));
          dispatch(setAppStatus({status: "succeeded"}));
        } else {
          handleServerAppErrors(dispatch, res.data);
        }
        dispatch(changeTaskEntityStatus({todolistId, taskId, entityStatus: "succeeded"}));
      })
      .catch((err) => handleServerNetworkError(dispatch, err));
  };
};

//спец тип для модели в которой все свойства необязатеьные, и мы передаем тоько одно - что делает
//изменения универсаьными и позволяет создать одну санку на все измпнения таски
export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};


//* Types
export type TaskStateType = {
  [todolistId: string]: TaskDomainType[];
};


