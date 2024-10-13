import { Container, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { AddItemInput } from "../../components/addItemInput/AddItemInput";
import { useSelector } from "react-redux";
import { addTodolistTC, getTodolistsTC, selectTodolists } from "store/slices/todolistSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import { TodoList } from "./todolist/TodoList";
import { Navigate } from "react-router-dom";
import { PATH } from "../../routes/router";
import { selectAuthIsLoggedIn } from "store/slices/authSlice";
import { selectAppStatus } from "store/slices/appSlice";

export const TodolistsList = () => {
	let todolists = useSelector(selectTodolists)
	let appStatus = useAppSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const dispatch = useAppDispatch();

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
        <AddItemInput addItem={addTodoList} label="Add new TODO list" disabled={appStatus === "loading"} />
      </Grid>

      <Grid container spacing={5}>
        {todolists.map((tl) => (
          <TodoList key={tl.id} todolist={tl} />
        ))}
      </Grid>
    </Container>
  );
};
