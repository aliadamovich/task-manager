import {TodolistDomainType} from "features/todolostsList/model/todolistSlice"
import React, { useCallback } from "react"
import { AddItemInput, EditableSpan } from "common/components"
import { useAppDispatch } from "app/store"
import { FilterTasksButtons } from "./filterButtons/FilterTasksButtons"
import {Tasks} from "./tasks/Tasks"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../api/todolistApi"
import { useCreateTaskMutation } from "../api/tasksApi"
import { updateTodolistStatusQueryData } from "../lib/utils/updateStatusQueryData"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import { useNavigate } from "react-router-dom"
import { PATH } from "routes/router"
import { useSortable } from "@dnd-kit/sortable"
import { DragParams } from "features/todolostsList/ui/tasks/modeView/SortableTodolist"
import s from './Todolist.module.scss'

type Props = {
	todolist: TodolistDomainType
	fullScreen?: boolean
	dragHandleProps?: DragParams
} 
export const TodoList = React.memo(({ todolist, fullScreen, dragHandleProps }: Props) => {
	const { id, filter, title, entityStatus, ...restProps } = todolist
	const [deleteTodolist] = useDeleteTodolistMutation()
	const [updateTodolist] = useUpdateTodolistMutation()
	const dispatch = useAppDispatch()
	const [createTask] = useCreateTaskMutation()
	const navigate = useNavigate()
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
	const openTodolistHandler = () => {
		if (fullScreen) return
		navigate(`${PATH.TODOLISTS}/${id}`)
	}

	return (
		<Paper elevation={3}
			sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%", width: fullScreen ? "100%" : "auto"}}>

			<h2 className={s.todolistTitle}>
					<EditableSpan
						title={title}
						onChange={changeTodolistTitleHandler}
						onOpen={openTodolistHandler}
						removeItemHandler={removeTodoListHandler}
						availableActions={fullScreen ? ['edit', "remove"] : ['edit', 'open', "remove"] }
						disabled={entityStatus === "loading"}
						listeners={dragHandleProps?.listeners}
						attributes={dragHandleProps?.attributes}
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
	)
})
