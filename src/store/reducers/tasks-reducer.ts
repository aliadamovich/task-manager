import { Dispatch } from "redux";
import { v1 } from "uuid";
import {
  addTodolistActionType,
  removeTodolistActionType,
  setTodolistsActionType,
} from "./todolist-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
} from "../../api/todolists-api";
import { AppRootStateType } from "../store";

//* Types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAС>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | addTodolistActionType
  | removeTodolistActionType
  | setTodolistsActionType
  | SetTasksActionType;

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

const initialState: TaskStateType = {};

//* Reducer
export const tasksReducer = (
  tasks = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...tasks,
        [action.payload.todolistId]: [
          action.payload.task,
          ...tasks[action.payload.todolistId],
        ],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].map(
          (t) =>
            t.id === action.payload.taskId
              ? { ...t, status: action.payload.status }
              : t
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].map(
          (t) =>
            t.id === action.payload.taskId
              ? { ...t, title: action.payload.title }
              : t
        ),
      };
    case "ADD-TODOLIST":
      return { ...tasks, [action.payload.id]: [] };

    case "REMOVE-TODOLIST":
      let copyTasks = { ...tasks };
      delete copyTasks[action.payload.id];
      return copyTasks;
    //при деструктуризации рождается новый объект, поэтому можно удалить св-во через дестр-ю - присваиваем свойству
    // const {[action.payload.id]: [], ...rest} = tasks;
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

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({
    type: "REMOVE-TASK",
    payload: {
      taskId: taskId,
      todolistId: todolistId,
    },
  }) as const;

export const addTaskAС = (todolistId: string, task: TaskType) =>
  ({
    type: "ADD-TASK",
    payload: {
      todolistId,
      task,
    },
  }) as const;

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: TaskStatuses
) =>
  ({
    type: "CHANGE-TASK-STATUS",
    payload: {
      todolistId: todolistId,
      taskId: taskId,
      status: status,
    },
  }) as const;

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
) =>
  ({
    type: "CHANGE-TASK-TITLE",
    payload: {
      todolistId: todolistId,
      taskId: taskId,
      title: title,
    },
  }) as const;

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
  ({
    type: "SET-TASKS",
    tasks,
    todolistId,
  }) as const;

//*Thunk Creators
//получение всех таско с сервера и отправка в стейт
export const getTasksFromServerTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
  };
};

//добавление такси на сервер + в стейт
export const addTaskToServerTC = (todolistId: string, title: string) => {
  return (diapstch: Dispatch) => {
    todolistsAPI.createTasks(todolistId, title).then((res) => {
      diapstch(addTaskAС(todolistId, res.data.data.item));
    });
  };
};

//удаление таски с сервера + из стейта
export const removeTaskFromServerTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTasks(todolistId, taskId).then((res) => {
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
      todolistsAPI.updateTasks(todolistId, taskId, {
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