import { Box, Checkbox } from "@mui/material";
import { getListItemSx } from "./styles/Todolost.styles";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { TaskType } from "./App";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./store/reducers/tasks-reducer";

type TaskElementType = TaskType & {
	todolistId: string
}

export const Task = React.memo(({ id, title, isDone, todolistId}: TaskElementType) => {

	const dispatch = useDispatch()

	const onInputChange = useCallback((value: string) => {
		dispatch(changeTaskTitleAC(todolistId, id, value))
	}, [id, todolistId, dispatch])

	const removeItemHandler = useCallback(() => {
		dispatch(removeTaskAC(id, todolistId))
	}, [id, todolistId, dispatch])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeTaskStatusAC(todolistId, id, e.currentTarget.checked))
	}, [todolistId, dispatch])

	return (
		<Box sx={getListItemSx(isDone)}>
			<Checkbox checked={isDone} size="small" color="secondary" sx={{ marginRight: '10px' }}
				onChange={changeTaskStatusHandler}
			/>
			<EditableSpan title={title}
				onChange={onInputChange}
				removeItem={removeItemHandler}
			/>

		</Box>
	)
})
