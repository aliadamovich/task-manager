import { Box, Checkbox } from "@mui/material";
import { getListItemSx } from "./styles/Todolost.styles";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import React, { ChangeEvent, useCallback } from "react";
import { changeTaskTitleAC, removeTaskFromServerTC, updateTaskStatusTC } from "./store/reducers/tasks-reducer";
import { TaskStatuses, TaskType } from "./api/todolists-api";
import { useAppDispatch } from "./store/store";

type TaskElementType = TaskType & {
	todolistId: string
}

export const Task = React.memo(({ id, title, status, todolistId}: TaskElementType) => {

	const dispatch = useAppDispatch()

	const onInputChange = useCallback((value: string) => {
		dispatch(changeTaskTitleAC(todolistId, id, value))
	}, [id, todolistId, dispatch])

	const removeItemHandler = useCallback(() => {
		// dispatch(removeTaskAC(id, todolistId))
		dispatch(removeTaskFromServerTC(todolistId, id))
	}, [id, todolistId, dispatch])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let isChecked = e.currentTarget.checked
		// dispatch(changeTaskStatusAC(todolistId, id, isChecked ? TaskStatuses.Completed : TaskStatuses.New))
		dispatch(updateTaskStatusTC(todolistId, id, isChecked ? TaskStatuses.Completed : TaskStatuses.New))
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
