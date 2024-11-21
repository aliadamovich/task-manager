import { Chip, Divider, Grid, List, Paper } from "@mui/material"
import { useSelector } from "react-redux"
import {TodolistDomainType} from "features/todolostsList/model/todolistSlice"
import React, { useCallback } from "react"
import { AddItemInput, EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { AppRootStateType, useAppDispatch } from "app/store"
import { todolistTitleStyle } from "styles/Todolost.styles"
import { Task } from "features/todolostsList/ui/tasks/Task"
import { FilterTasksButtons } from "./filterButtons/FilterTasksButtons"
import {Tasks} from "./tasks/Tasks"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../api/todolistApi"
import { useCreateTaskMutation } from "../api/tasksApi"
import { updateTodolistStatusQueryData } from "../lib/utils/updateStatusQueryData"

type Props = {
	todolist: TodolistDomainType
}

export const TodoList = React.memo(({ todolist }: Props) => {
	const { id, filter, title, entityStatus, ...restProps } = todolist
	const [deleteTodolist] = useDeleteTodolistMutation()
	const [updateTodolist] = useUpdateTodolistMutation()
	const dispatch = useAppDispatch()
	const [createTask] = useCreateTaskMutation()
	//*tasks
	const addTaskHandler = useCallback((title: string) => {
		return createTask({todolistId: id, title})
	}, [ id, dispatch])

	//* todolists
	const removeTodoListHandler = () => {
		deleteTodolist(id)
	}

	const changeTodolistTitleHandler = useCallback((title: string) => {
		updateTodolistStatusQueryData(dispatch, id, 'loading')
		return updateTodolist({title, todolistId: id})
			.unwrap()
			.finally(() => {
				updateTodolistStatusQueryData(dispatch, id, 'idle')
			})
	},
		[id, dispatch],
	)

	return (
		<Grid item xs={12} md={6}>
			<Paper elevation={3}
				sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%", }}>

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
