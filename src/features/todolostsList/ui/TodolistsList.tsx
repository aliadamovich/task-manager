import { Container, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { addTodolistTC, setTodolistsTC, selectTodolists } from "features/todolostsList/model/todolistSlice";
import { useAppDispatch, useAppSelector } from "app/store";
import { TodoList } from "./TodoList";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../routes/router";
import { selectAuthIsLoggedIn } from "features/login/model/authSlice";
import { selectAppStatus } from "app/appSlice";
import { AddItemInput } from "common/components";

export const TodolistsList = () => {
	let todolists = useSelector(selectTodolists)
	let appStatus = useAppSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(setTodolistsTC());
  }, []);

  //?Создание нового тудулиста
  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTC({title}));
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
