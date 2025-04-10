import {TodolistDomainType} from "features/todolostsList/model/todolistSlice"
import React, { useCallback } from "react"
import { AddItemInput, EditableSpan } from "common/components"
import { useAppDispatch } from "app/store"
import { todolistTitleStyle } from "styles/Todolost.styles"
import { FilterTasksButtons } from "./filterButtons/FilterTasksButtons"
import {Tasks} from "./tasks/Tasks"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../api/todolistApi"
import { useCreateTaskMutation } from "../api/tasksApi"
import { updateTodolistStatusQueryData } from "../lib/utils/updateStatusQueryData"
import Paper from "@mui/material/Paper"
import Grid from '@mui/material/Grid';
import List from "@mui/material/List"
import { NavLink } from "react-router-dom"

type Props = {
	todolist: TodolistDomainType
	fullScreen?: boolean
}

export const TodoList = React.memo(({ todolist, fullScreen }: Props) => {
	const { id, filter, title, entityStatus, ...restProps } = todolist
	const [deleteTodolist] = useDeleteTodolistMutation()
	const [updateTodolist] = useUpdateTodolistMutation()
	const dispatch = useAppDispatch()
	const [createTask] = useCreateTaskMutation()
	//*tasks
	const addTaskHandler = useCallback((title: string) => {
		return createTask({todolistId: id, title}).unwrap()
	}, [ id, dispatch])

	//* todolists
	const removeTodoListHandler = () => {
		deleteTodolist(id)
	}

	const changeTodolistTitleHandler = useCallback((title: string) => {
		updateTodolistStatusQueryData(dispatch, id, 'loading')
		return updateTodolist({title, todolistId: id})
			.finally(() => {
				updateTodolistStatusQueryData(dispatch, id, 'idle')
			})
	},
		[id, dispatch],
	)

	return (
			<Grid size={{ xs: 12, md: 4, sm: 12 }}>
				<Paper elevation={3}
					sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%", width: fullScreen ? "100%" : "auto"}}>
	
					<h2 style={todolistTitleStyle}>
						<EditableSpan
							title={title}
							onChange={changeTodolistTitleHandler}
							removeItemHandler={removeTodoListHandler}
							disabled={entityStatus === "loading"}
						/>
					</h2>
	
					<List sx={{ flex: "1 1 auto", mt: "10px" }}>
						<Tasks todolist={todolist}/>
					</List>
	
					<div style={{ margin: "20px 0", display: "flex", gap: "8px" }}>
						<FilterTasksButtons todolist={todolist} />
					</div>
	
					<AddItemInput addItem={addTaskHandler} label="Add new task" disabled={entityStatus === "loading"} />
				</Paper>
			</Grid>
	)
})
