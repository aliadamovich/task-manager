import { RequestStatusType } from './../store/reducers/app-reducer';
import axios, { AxiosResponse } from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

//* todolists

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>,{ title: string }>("todo-lists", {
      title: title,
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: title,
    });
  },

  //*tasks

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title: title }
    );
  },
};




//* Types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<D = {}> = {
  data: D;
  resultCode: number;
  messages: Array<string>;
};

export type TaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TaskDomainType = TaskType & {
	taskEntityStatus: RequestStatusType
}

export enum TaskStatuses {
  New = 0,
  inProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type UpdateTaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

//* enum
export enum ResultCode {
	'Success' = 0,
	'Error' = 1
}