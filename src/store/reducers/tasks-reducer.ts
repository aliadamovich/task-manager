import { v1 } from "uuid";
import { addTodolistActionType, removeTodolistActionType } from "./todolist-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "../../api/todolists-api";

//* Types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC> 
export type AddTaskActionType = ReturnType<typeof addTaskAС>; 
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>; 
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>; 

type ActionsType = RemoveTaskActionType| AddTaskActionType| ChangeTaskStatusActionType| ChangeTaskTitleActionType| addTodolistActionType| removeTodolistActionType;

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

const initialState: TaskStateType = {};

//* Reducer
export const tasksReducer = (tasks = initialState, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    case "ADD-TASK":
      let newTask = {
        id: v1(),
        title: action.payload.title,
				status: TaskStatuses.New, 
        description: '',
				priority: TaskPriorities.Low,
				startDate: '',
				deadline: '',
				todoListId: action.payload.todolistId,
				order: 0,
				addedDate: ''
      };
      return {
        ...tasks,
        [action.payload.todolistId]: [
          newTask,
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
    default:
      return tasks;
  }
};

//*Action Creators

export const removeTaskAC = (taskId: string, todolistId: string) => ({
  type: "REMOVE-TASK",
  payload: {
    taskId: taskId,
    todolistId: todolistId,
  },
} as const);

export const addTaskAС = (id: string, title: string) => ({
  type: "ADD-TASK",
  payload: {
    todolistId: id,
		title: title
  },
} as const);

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
  type: "CHANGE-TASK-STATUS",
  payload: {
    todolistId: todolistId,
    taskId: taskId,
    status: status,
  },
} as const);

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
  type: "CHANGE-TASK-TITLE",
  payload: {
    todolistId: todolistId,
    taskId: taskId,
    title: title,
  },
} as const);