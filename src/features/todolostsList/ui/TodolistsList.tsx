import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "app/store"
import { selectAppStatus, selectIsLoggedIn } from "app/appSlice"
import { AddItemInput } from "common/components"
import { useAddTodolistMutation, useGetTodolistsQuery } from "../api/todolistApi"
import { TodolistPageSkeleton } from "./skeletons/TodolistSkeleton"
import style from './Todolist.module.scss'
import Grid from "@mui/material/Grid"
import { useViewMode } from "features/todolostsList/lib/hooks/useViewMode"
import { ViewModes } from "features/todolostsList/ui/tasks/modeView/ViewModes"

export const TodolistsList = () => {

	const appStatus = useAppSelector(selectAppStatus)
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const dispatch = useAppDispatch()
	const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
		skip: !isLoggedIn
	})
	const [addTodolist] = useAddTodolistMutation()
	const {mode} = useViewMode()
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
				<ViewModes mode={mode} todolists={todolists} />
			</div>
		);
}

