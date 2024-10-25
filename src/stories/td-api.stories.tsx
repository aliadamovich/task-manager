import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { todolistsAPI } from "../features/todolostsList/api/todolistApi";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.createTodolist("bla bla bla").then((res) => {
      // debugger

      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "aaa33b36-bf24-41d1-acd6-d3c02abed11c";
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "3955828a-2d0d-48bf-8234-293a098890ad";
    todolistsAPI.updateTodolist(todolistId, "new title").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

//!=TASKS============================================================================//

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "6ca24bbe-6112-4bfc-830c-7f694726df4f";
    todolistsAPI.getTasks(todolistId).then((res) => {
      console.log(res.data.items);
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "6ca24bbe-6112-4bfc-830c-7f694726df4f";
    const taskId = " ";
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const createTask = () => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <input
        type="text"
        placeholder="Todolist Id"
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value);
        }}
      />
      <button onClick={createTask}>Create Task</button>
    </>
  );
};

export const updateTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("6ca24bbe-6112-4bfc-830c-7f694726df4f");
  const [tasktId, setTaskId] = useState("5aac269a-4ab0-4fe1-8557-a86f244b172e");
  const [title, setTitle] = useState("");

  const updateTask = () => {
    let model = {
      title: title,
      description: " ",
      status: 0,
      priority: 1,
      startDate: "",
      deadline: "",
    };

    todolistsAPI.updateTask(todolistId, tasktId, model).then((res) => {
      setState(res.data);
    });
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <input
        type="text"
        placeholder="Task Id"
        value={tasktId}
        onChange={(e) => {
          setTaskId(e.currentTarget.value);
        }}
      />
      <input
        type="text"
        placeholder="Todolist Id"
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value);
        }}
      />
      <button onClick={updateTask}>Update Task</button>
    </>
  );
};
