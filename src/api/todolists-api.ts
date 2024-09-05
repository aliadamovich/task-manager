import axios from 'axios'

export type TodolisType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type ResponseType<D> = {
	data: D
	resultCode: number;
	messages: Array<string>;
};


const settings = {
	withCredentials: true,
	headers: {
		"API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b"
	}
}

export const todolistsAPI = {
  getTodolists() {
    return axios.get<Array<TodolisType>>(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      settings
    );
  },

  createTodolists(title: string) {
    return axios.post<ResponseType<{item: TodolisType}>>(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      { title: title },
      settings
    );
  },

  deleteTodolist(todolistId: string) {
    return axios.delete<ResponseType<{}>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      settings
    );
  },

  updateTodolist(todolistId: string, title: string) {
    return axios.put<ResponseType<{}>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      { title: title },
      settings
    );
  },

	//*tasks

	getTasks(todolistId: string ) {
	return axios.get<ResponseType<{}>>(
    `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
    settings
  );
	}
};

//!=============================================================================//


