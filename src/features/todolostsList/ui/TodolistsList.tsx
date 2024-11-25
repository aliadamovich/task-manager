import { Container, Grid, Skeleton } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "app/store"
import { TodoList } from "./TodoList"
import { Navigate } from "react-router-dom"
import { PATH } from "../../../routes/router"
import { selectAppStatus, selectIsLoggedIn } from "app/appSlice"
import { AddItemInput } from "common/components"
import { useAddTodolistMutation, useGetTodolistsQuery } from "../api/todolistApi"
import { TodolistPageSkeleton } from "./skeletons/TodolistSkeleton"
import s from './skeletons/TodolistSkeleton.module.scss'

export const TodolistsList = () => {
	const {data: todolists, isLoading } = useGetTodolistsQuery()
	const [addTodolist] = useAddTodolistMutation()
	let appStatus = useAppSelector(selectAppStatus)
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!isLoggedIn) {
			return
		}
	}, [])

	const addTodoListHandler = (title: string) => {
		return addTodolist(title)
	}
	if (isLoading) {
		return <TodolistPageSkeleton />}

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

