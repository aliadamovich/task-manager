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
import { ViewModes } from "features/todolostsList/ui/todolistsModeView/ViewModes"
import { useGetTasksQuery } from "features/todolostsList/api/tasksApi"

export const AllTodolistsPage = () => {

	const appStatus = useAppSelector(selectAppStatus)
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
		skip: !isLoggedIn
	})
	// const {data, } = useGetTasksQuery()
	const [addTodolist] = useAddTodolistMutation()
	const {mode} = useViewMode()
	useEffect(() => {
		if (!isLoggedIn) {
			return
		}
	}, [])

	// useEffect(() => {
	// 	if (todolists) {
	// 		todolists.forEach(td => fetchTasks(td.id))
	// 	}
	// })
	const addTodoListHandler = (title: string) => {
		return addTodolist(title)
	}

		return (
			<div className={style.container}>
				{isLoading && <TodolistPageSkeleton />}
				<div className={style.addItem}>
					<AddItemInput addItem={addTodoListHandler} label="Add new TODO list" disabled={appStatus === "loading"} />
				</div>
				<ViewModes mode={mode} todolists={todolists} />
			</div>
		);
}

