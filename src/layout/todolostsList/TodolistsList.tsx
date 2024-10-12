import { Container, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { AddItemInput } from "../../components/addItemInput/AddItemInput";
import { useSelector } from "react-redux";
import { TodolistDomainType, addTodolistTC, getTodolistsTC } from "../../store/reducers/todolistSlice";
import { AppRootStateType, useAppDispatch, useAppSelector } from "../../store/store";
import { TodoList } from "./todolist/TodoList";
import { Navigate } from "react-router-dom";
import { PATH } from "../../routes/router";

export const TodolistsList = () => {
  let todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists);
  let appstatus = useAppSelector((state) => state.app.status);
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getTodolistsTC());
  }, []);

  //?Создание нового тудулиста
  const addTodoList = useCallback(
    (titleValue: string) => {
      dispatch(addTodolistTC(titleValue));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return (
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
        <AddItemInput addItem={addTodoList} label="Add new TODO list" disabled={appstatus === "loading"} />
      </Grid>

      <Grid container spacing={5}>
        {todolists.map((tl) => (
          <TodoList key={tl.id} todolist={tl} />
        ))}
      </Grid>
    </Container>
  );
};
