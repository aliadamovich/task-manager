import { Dispatch } from "redux";
import { v1 } from "uuid";
import { addTodolistActionType, removeTodolistActionType,  setTodolistsActionType } from "./todolist-reducer";
import {  TaskPriorities, TaskStatuses, TaskType, todolistsAPI, } from "../../api/todolists-api";
import { AppRootStateType } from "../store";


//* Reducer
export const tasksReducer = (
  tasks = initialState,
  action: ActionsType
): TaskStateType => {
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
    case "CHANGE-TASK-STATUS":
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].map(
          (t) =>
            t.id === action.taskId
              ? { ...t, status: action.status }
              : t
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...tasks,
        [action.todolistId]: tasks[action.todolistId].map(
          (t) =>
            t.id === action.taskId
              ? { ...t, title: action.title }
              : t
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
      action.todolists.forEach(tl => copy[tl.id] = []);
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

export const changeTaskStatusAC = ( todolistId: string, taskId: string, status: TaskStatuses) =>
  ({ type: "CHANGE-TASK-STATUS", todolistId, taskId, status}) as const;

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
  ({ type: "CHANGE-TASK-TITLE", todolistId, taskId, title }) as const;

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({ type: "SET-TASKS", tasks, todolistId}) as const;

//*Thunk Creators
//получение всех тасок с сервера и отправка в стейт
export const getTasksFromServerTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
  };
};

//добавление таски на сервер + в стейт
export const addTaskToServerTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
      dispatch(addTaskAС(res.data.data.item));
    });
  };
};

//удаление таски с сервера + из стейта
export const removeTaskFromServerTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
  };
};

//изменение статуса таски на сервере + в стейте
export const updateTaskStatusTC = ( todolistId: string, taskId: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let allTasks = getState().tasks;
    let currentTask = allTasks[todolistId].find((t) => t.id === taskId);
    if (currentTask) {
      todolistsAPI.updateTask(todolistId, taskId, {
          description: currentTask.description,
          title: currentTask.title,
          status: status,
          priority: currentTask.priority,
          startDate: currentTask.startDate,
          deadline: currentTask.deadline,
        })
        .then(() => dispatch(changeTaskStatusAC(todolistId, taskId, status)));
    }
  };
};








//* Types

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAС>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | addTodolistActionType
  | removeTodolistActionType
  | setTodolistsActionType
  | ReturnType<typeof setTasksAC>;

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

const initialState: TaskStateType = {};
