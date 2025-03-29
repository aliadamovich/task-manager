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
import style from './Todolist.module.scss'

export const TodolistsList = () => {

	const appStatus = useAppSelector(selectAppStatus)
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const dispatch = useAppDispatch()
	const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
		skip: !isLoggedIn
	})
	const [addTodolist] = useAddTodolistMutation()

	useEffect(() => {
		if (!isLoggedIn) {
			return
		}
	}, [])

	const addTodoListHandler = (title: string) => {
		return addTodolist(title)
	}

	// if (!isLoggedIn) {
	// 	return <Navigate to={PATH.LOGIN} />
	// }

		return (
			<div className={style.container}>
				{isLoading && <TodolistPageSkeleton />}
				<Grid container sx={{ mb: "2rem" }}>
					<AddItemInput addItem={addTodoListHandler} label="Add new TODO list" disabled={appStatus === "loading"} />
				</Grid>

				<Grid container spacing={5}>
					{todolists?.map((tl) => (
						<TodoList key={tl.id} todolist={tl} />
					))}
				</Grid>
			</div>
		);
}

