import { Box, Checkbox } from "@mui/material";
import { getListItemSx } from "./styles/Todolost.styles";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./store/reducers/tasks-reducer";
import { TaskStatuses, TaskType } from "./api/todolists-api";

type TaskElementType = TaskType & {
	todolistId: string
}

export const Task = React.memo(({ id, title, status, todolistId}: TaskElementType) => {

	const dispatch = useDispatch()

	const onInputChange = useCallback((value: string) => {
		dispatch(changeTaskTitleAC(todolistId, id, value))
	}, [id, todolistId, dispatch])

	const removeItemHandler = useCallback(() => {
		dispatch(removeTaskAC(id, todolistId))
	}, [id, todolistId, dispatch])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let isChecked = e.currentTarget.checked
		dispatch(changeTaskStatusAC(todolistId, id, isChecked ? TaskStatuses.Completed : TaskStatuses.New))
	}, [todolistId, dispatch])

	return (
		<Box sx={getListItemSx(status === TaskStatuses.Completed ? true : false)}>
			<Checkbox checked={status === TaskStatuses.Completed && true} size="small" color="secondary" sx={{ marginRight: '10px' }}
				onChange={changeTaskStatusHandler}
			/>
			<EditableSpan title={title}
				onChange={onInputChange}
				removeItem={removeItemHandler}
			/>

		</Box>
	)
})
