import { Box, Checkbox } from "@mui/material";
import { getListItemSx } from "../../../../styles/Todolost.styles";
import { EditableSpan } from "../../../../components/editableSpan/EditableSpan";
import React, { ChangeEvent, useCallback } from "react";
import { removeTaskTC, updateTaskTC } from "../../../../store/reducers/tasks-reducer";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";
import { useAppDispatch } from "../../../../store/store";

type TaskElementType = TaskType & {
	todolistId: string
}

export const Task = React.memo(({ id, title, status, todolistId}: TaskElementType) => {

	const dispatch = useAppDispatch()

	const onInputChange = useCallback((value: string) => {
		dispatch(updateTaskTC(todolistId, id, {title: value}))
	}, [id, todolistId, dispatch])

	const removeItemHandler = useCallback(() => {
		dispatch(removeTaskTC(todolistId, id))
	}, [id, todolistId, dispatch])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
		dispatch(updateTaskTC(todolistId, id, {status}))
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
