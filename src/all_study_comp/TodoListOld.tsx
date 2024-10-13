import s from "./TodoList.module.css";
import { AddItemInput } from "../components/addItemInput/AddItemInput";
import { EditableSpan } from "../components/editableSpan/EditableSpan";
import { Button, Chip, Divider, Grid, IconButton, List, Paper, useTheme } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TaskOld } from "./Task_old";
import { TaskStatuses, TaskType } from "../api/todolists-api";
import { FilterValueType } from "../store/slices/todolistSlice";

export type TodoListProps = {
  todoListId: string;
  tasks: TaskType[];
  filter: FilterValueType;
  title: string;
  addTask: (value: string, todoListId: string) => void;
  changeFilter: (filter: FilterValueType, todoListId: string) => void;
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (taskId: string, value: string, todoListId: string) => void;
  changeTodoTitle: (value: string, todoListId: string) => void;
};

export const TodoListOld = ({
  tasks,
  filter,
  title,
  todoListId,
  addTask,
  changeFilter,
  removeTask,
  changeTaskStatus,
  removeTodoList,
  changeTaskTitle,
  changeTodoTitle,
}: TodoListProps) => {
  const theme = useTheme();

  const addTaskCallback = (value: string) => {
    addTask(value, todoListId);
  };

  //удаление таски
  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId, todoListId);
  };

  //смена статуса таски isDone
  const changeTaskStatusHandler = (taskId: string, status: TaskStatuses) => {
    changeTaskStatus(taskId, status, todoListId);
  };

  //изменение текста таски
  const changeTitleHandler = (value: string, id: string) => {
    changeTaskTitle(value, id, todoListId);
  };

  //удаление всего тудулиста
  const removeTodoListHandler = () => {
    removeTodoList(todoListId);
  };

  //изменение названия тудулиста
  const changeTodoTitleCallback = (newTitle: string) => {
    changeTodoTitle(newTitle, todoListId);
  };

  //фильтрация
  const changeFilterHandler = (filter: FilterValueType) => {
    changeFilter(filter, todoListId);
  };
  //создаю фиьтрующую функцию чтобы в разных местах разместить таски сделанные и невыполненные
  const filteredTasks = (filter: 0 | 2): JSX.Element[] => {
    return tasks
      .filter((t) => t.status === filter)
      .map((t) => (
        <TaskOld
          {...t}
          key={t.id}
          removeTaskHandler={removeTaskHandler}
          changeTaskStatusHandler={changeTaskStatusHandler}
          changeTitleValue={changeTitleHandler}
        />
      ));
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0 20px",
          }}
        >
          <EditableSpan title={title} onChange={changeTodoTitleCallback} removeItem={removeTodoListHandler} />
          <IconButton onClick={removeTodoListHandler}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </h3>

        <Divider />

        <List
          sx={{
            flex: "1 1 auto",
            mt: "10px",
          }}
        >
          {filteredTasks(0).length === 0 ? <div>No tasks</div> : filteredTasks(0)}

          {filteredTasks(2).length > 0 && (
            <>
              <Divider
                textAlign="right"
                sx={{
                  m: "10px 0",
                }}
              >
                <Chip label="Done" size="small" />
              </Divider>
              {filteredTasks(2)}
            </>
          )}
        </List>

        <div
          className={s.buttons}
          style={{
            marginBottom: "20px",
          }}
        >
          <Button
            size="small"
            variant={filter === "All" ? "contained" : "text"}
            onClick={() => changeFilterHandler("All")}
          >
            All
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => changeFilterHandler("Active")}
            variant={filter === "Active" ? "contained" : "text"}
          >
            Active
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => changeFilterHandler("Completed")}
            variant={filter === "Completed" ? "contained" : "text"}
          >
            Completed
          </Button>
        </div>

        <AddItemInput addItem={addTaskCallback} label="Add new task" />
      </Paper>
    </Grid>
  );
};
