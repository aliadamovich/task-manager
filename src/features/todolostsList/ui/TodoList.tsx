import { Chip, Divider, Grid, List, Paper } from "@mui/material"
import { useSelector } from "react-redux"
import {changeTodolistTitleTC,removeTodolistTC,TodolistDomainType} from "features/todolostsList/model/todolistSlice"
import React, { useCallback } from "react"
import { AddItemInput, EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { AppRootStateType, useAppDispatch } from "app/store"
import { createTaskTC, selectTasks } from "features/todolostsList/model/tasksSlice"
import { todolistTitleStyle } from "styles/Todolost.styles"
import { Task } from "features/todolostsList/ui/tasks/Task"
import { FilterTasksButtons } from "./filterButtons/FilterTasksButtons"
import {Tasks} from "./tasks/Tasks"
import { SortableTasks } from "./tasks/SortableTasks"

type Props = {
	todolist: TodolistDomainType
}

export const TodoList = React.memo(({ todolist }: Props) => {
	const { id, filter, title, entityStatus, ...restProps } = todolist

	const dispatch = useAppDispatch()

	//*tasks
	// добавление таски
	const addTaskHandler = useCallback((title: string) => {
		return dispatch(createTaskTC({ todolistId: id, title }))
	}, [createTaskTC, id, dispatch])

	//* todolists
	const removeTodoListHandler = useCallback(() => {
		dispatch(removeTodolistTC(id))
	}, [id, dispatch])


	const changeTodolistTitleHandler = useCallback((title: string) => {
			return dispatch(changeTodolistTitleTC({ todolistId: id, title }))
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
						removeItem={removeTodoListHandler}
						disabled={entityStatus === "loading"}
					/>
				</h2>

				<List sx={{ flex: "1 1 auto", mt: "10px" }}>
					{/* <Tasks todolist={todolist}/> */}
					<SortableTasks todolist={todolist}/>
				</List>

				<div style={{ margin: "20px 0", display: "flex", gap: "8px" }}>
					<FilterTasksButtons todolist={todolist} />
				</div>

				<AddItemInput addItem={addTaskHandler} label="Add new task" disabled={entityStatus === "loading"} />
			</Paper>
		</Grid>
	)
})
