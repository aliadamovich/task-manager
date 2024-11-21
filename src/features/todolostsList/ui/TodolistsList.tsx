import { Container, Grid } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { addTodolistTC, setTodolistsTC, selectTodolists } from "features/todolostsList/model/todolistSlice"
import { useAppDispatch, useAppSelector } from "app/store"
import { TodoList } from "./TodoList"
import { Navigate } from "react-router-dom"
import { PATH } from "../../../routes/router"
import { selectAppStatus, selectIsLoggedIn } from "app/appSlice"
import { AddItemInput } from "common/components"
import { useAddTodolistMutation, useGetTodolistsQuery } from "../api/todolistApi_rtk"

export const TodolistsList = () => {
	const {data: todolists } = useGetTodolistsQuery()
	const [addTodolist] = useAddTodolistMutation()
	// let todolists = useSelector(selectTodolists)
	let appStatus = useAppSelector(selectAppStatus)
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!isLoggedIn) {
			return
		}
		// dispatch(setTodolistsTC())
	}, [])

	const addTodoListHandler = (title: string) => {
		// return dispatch(addTodolistTC({ title }))
		return addTodolist(title)
	}


	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN} />
	}

		return (
			<Container sx={{ mt: "1rem" }} fixed>
				<Grid container sx={{ mb: "2rem" }}>
					<AddItemInput addItem={addTodoListHandler} label="Add new TODO list" disabled={appStatus === "loading"} />
				</Grid>

				<Grid container spacing={5}>
					{todolists?.map((tl) => (
						<TodoList key={tl.id} todolist={tl} />
					))}
				</Grid>
			</Container>
		);
}

