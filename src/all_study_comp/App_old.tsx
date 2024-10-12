import { v1 } from "uuid";
import { useState } from "react";
import { AddItemInput } from "../components/addItemInput/AddItemInput";
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { TodoListOld } from "./TodoListOld";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolists-api";
import { FilterValueType, TodolistDomainType } from "../store/reducers/todolistSlice";

export type TaskStateType = {
  [todolistId: string]: TaskType[];
};

function AppOld() {
  //массив с тудулистами
  const todoList1 = v1();
  const todoList2 = v1();

  const [todoLists, setTodoLists] = useState<TodolistDomainType[]>([
    {
      id: todoList1,
      title: "What to learn:",
      filter: "All",
      addedDate: "",
      order: 0,
    },
    {
      id: todoList2,
      title: "What to buy:",
      filter: "All",
      addedDate: "",
      order: 0,
    },
  ]);

  const [allTasks, setAllTasks] = useState<TaskStateType>({
    [todoList1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todoList1,
        order: 0,
        addedDate: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todoList1,
        order: 0,
        addedDate: "",
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todoList1,
        order: 0,
        addedDate: "",
      },
    ],
    [todoList2]: [
      {
        id: v1(),
        title: "Bread",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todoList1,
        order: 0,
        addedDate: "",
      },
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todoList1,
        order: 0,
        addedDate: "",
      },
    ],
  });

  //* tasks

  //добавление новой таски
  const addTask = (value: string, todoListId: string) => {
    let newTask = {
      id: v1(),
      title: value,
      status: TaskStatuses.New,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: todoListId,
      order: 0,
      addedDate: "",
    };
    setAllTasks({
      ...allTasks,
      [todoListId]: [newTask, ...allTasks[todoListId]],
    });
  };

  //удаление таски
  const removeTask = (taskId: string, todoListId: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: allTasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  //смена статуса таски isDone
  const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: allTasks[todoListId].map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: status,
            }
          : t,
      ),
    });
  };

  //изменение названия таски
  const changeTaskTitle = (value: string, taskId: string, todoListId: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: allTasks[todoListId].map((t) =>
        t.id === taskId
          ? {
              ...t,
              title: value,
            }
          : t,
      ),
    });
  };

  //* todolists

  //Создание нового тудулиста
  const addTodoList = (titleValue: string) => {
    const newTodo: TodolistDomainType = {
      id: v1(),
      title: titleValue,
      filter: "All",
      addedDate: "",
      order: 0,
    };
    setTodoLists([...todoLists, newTodo]);
    setAllTasks({
      ...allTasks,
      [newTodo.id]: [],
    });
  };

  //удаление целиком тудулиста
  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todolistId));
    delete allTasks[todolistId];
    setAllTasks({
      ...allTasks,
    });
  };

  //изменение фильтра и перерисовка todoLists
  const changeTodoFilter = (filterValue: FilterValueType, todoListId: string) => {
    const nextState: TodolistDomainType[] = todoLists.map((td) =>
      td.id === todoListId
        ? {
            ...td,
            filter: filterValue,
          }
        : td,
    );
    setTodoLists(nextState);
  };

  //изменение названия тудулиста
  const changeTodoTitle = (title: string, todoListId: string) => {
    setTodoLists(
      todoLists.map((td) =>
        td.id === todoListId
          ? {
              ...td,
              title: title,
            }
          : td,
      ),
    );
  };

  //* UI

  /* маппим все туду-листы, в каждый передаем фильтр чтобы свой filteredtasks создавался в каждой в завис-ти от значения фильтра */
  const todolistComponent: Array<JSX.Element> = todoLists.map((tl) => {
    //фильтрация
    let filteredTasks = allTasks[tl.id];

    if (tl.filter === "Completed") {
      filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed);
    } else if (tl.filter === "Active") {
      filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New);
    }

    return (
      <TodoListOld
        key={tl.id}
        todoListId={tl.id}
        title={tl.title}
        tasks={filteredTasks}
        filter={tl.filter}
        addTask={addTask}
        changeFilter={changeTodoFilter}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        removeTodoList={removeTodoList}
        changeTaskTitle={changeTaskTitle}
        changeTodoTitle={changeTodoTitle}
      />
    );
  });

  const [isLight, setIsLight] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#6DDAEF",
      },
      secondary: {
        main: "#AE86A0", // Используйте однотонный цвет здесь
      },
      mode: isLight ? "light" : "dark",
    },
  });

  //стейт для селекта (тренировка)
  // const [value, setValue] = useState('2')

  // const selectItems = [
  // 	{ value: '1', title: 'Minsk' },
  // 	{ value: '2', title: 'Moscow' },
  // 	{ value: '3', title: 'Kiev' },
  // ];

  // const onChange = (val: string) => {
  // 	setValue(val)
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* <Heade setIsLight={setIsLight} isLight={isLight}/> */}
        <Container
          sx={{
            mt: "1rem",
          }}
          fixed
        >
          <Grid
            container
            sx={{
              mb: "2rem",
            }}
          >
            <AddItemInput addItem={addTodoList} label="Add new TODO list" />
          </Grid>

          <Grid container spacing={5}>
            {todolistComponent}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default AppOld;
