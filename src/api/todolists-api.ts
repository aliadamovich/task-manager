import { LoginType } from "../layout/login/Login";
import { RequestStatusType } from "../store/reducers/appSlice";
import axios, { AxiosResponse } from "axios";

const settings = {
  withCredentials: true,
  headers: {
    // "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b",
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
};

const instance = axios.create({
  // baseURL: "https://social-network.samuraijs.com/api/1.1/",
  baseURL: process.env.REACT_APP_BASE_URL,
  ...settings,
});

//* todolists

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<
      ResponseType<{
        item: TodolistType;
      }>,
      AxiosResponse<
        ResponseType<{
          item: TodolistType;
        }>
      >,
      {
        title: string;
      }
    >("todo-lists", {
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
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<
      ResponseType<{
        item: TaskType;
      }>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },

  createTask(todolistId: string, title: string) {
    return instance.post<
      ResponseType<{
        item: TaskType;
      }>
    >(`todo-lists/${todolistId}/tasks`, {
      title: title,
    });
  },
};

export const authAPI = {
  login(data: LoginType) {
    return instance.post<
      ResponseType<{
        userId: number;
      }>
    >("auth/login", data);
  },

  logout() {
    return instance.delete<ResponseType<{}>>("auth/login");
  },

  me() {
    return instance.get<ResponseType<UserType>>("auth/me");
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
  taskEntityStatus: RequestStatusType;
};

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

type UserType = {
  id: number;
  email: string;
  login: string;
};
