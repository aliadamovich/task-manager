import {TodolistDomainType} from "features/todolostsList/model/todolistSlice"
import React, { useCallback, useState } from "react"
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
import { DragParams } from "features/todolostsList/ui/todolistsModeView/SortableTodolist"
import s from './Todolist.module.scss'
import Typography from "@mui/material/Typography"
import { TodolistIconPicker } from "features/todolostsList/ui/TodolistIconPicker"
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { EmojiEmotions } from "@mui/icons-material"
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

	const addTaskHandler = useCallback((title: string) => {
		return createTask({todolistId: id, title}).unwrap()
	}, [ id, dispatch])
	

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

			<Typography className={s.todolistTitle} component={'h2'} variant="h5">
				<TodolistIconPicker todolistId={id} />
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
			</Typography>

			<List sx={{ flex: "1 1 auto", mt: "10px" }}>
				<Tasks todolist={todolist}/>
			</List>

			<div className={s.filterButtonsContainer} >
				<FilterTasksButtons todolist={todolist} />
			</div>

			<AddItemInput addItem={addTaskHandler} label="Add new task" disabled={entityStatus === "loading"} />
		</Paper>
	)
})
