import { Dispatch } from "redux";
import { v1 } from "uuid";
import { addTodolistActionType, removeTodolistActionType,  setTodolistsActionType } from "./todolist-reducer";
import {  TaskType, todolistsAPI, UpdateTaskType, } from "../../api/todolists-api";
import { AppActionsType, AppRootStateType } from "../store";


//* Reducer
export const tasksReducer = (tasks = initialState,  action: TasksActionsType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...tasks,
        [action.task.todoListId]: [
          action.task,
          ...tasks[action.task.todoListId],
        ],
      };
    case "UPDATE-TASK":
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model} : t
        ),
      };
    case "ADD-TODOLIST":
      return { ...tasks, [action.todolist.id]: [] };

    case "REMOVE-TODOLIST":
      let copyTasks = { ...tasks };
      delete copyTasks[action.id];
      return copyTasks;
    //при деструктуризации рождается новый объект, поэтому можно удалить св-во через дестр-ю - присваиваем свойству
    // const {[action.id]: [], ...rest} = tasks;
    // return rest

    case "SET-TODOLISTS":
      let copy = { ...tasks };
      action.todolists.forEach((tl) => (copy[tl.id] = []));
      return copy;

    case "SET-TASKS":
      return { ...tasks, [action.todolistId]: action.tasks };

    default:
      return tasks;
  }
};

//*Action Creators

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId } as const);
export const addTaskAС = ( task: TaskType) => ({ type: "ADD-TASK",task } as const);

export const updateTaskAC = ( todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  ({ type: "UPDATE-TASK", todolistId, taskId, model}) as const;


export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({ type: "SET-TASKS", tasks, todolistId}) as const;

//*Thunk Creators
//получение всех тасок с сервера и отправка в стейт
export const getTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
  };
};

//добавление таски на сервер + в стейт
export const createTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
      dispatch(addTaskAС(res.data.data.item));
    });
  };
};

//удаление таски с сервера + из стейта
export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
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
		...model //тк в model сидит одно свойство, мы его перезатрем в объекте а все остальные оставим как есть
	};
		todolistsAPI.updateTask(todolistId, taskId, apiModel).then(() => dispatch(updateTaskAC(todolistId, taskId, model)));
	}
}






//* Types

export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAС>
  | ReturnType<typeof updateTaskAC>
  | addTodolistActionType
  | removeTodolistActionType
  | setTodolistsActionType
  | ReturnType<typeof setTasksAC>;

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

const initialState: TaskStateType = {};
