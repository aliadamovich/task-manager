import { Box, Checkbox } from "@mui/material";
import { getListItemSx } from "./styles/Todolost.styles";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Task } from "./App";
import React, { useCallback } from "react";

type TaskElementType = Task & {
	removeTaskHandler: (taskId: string) => void
	changeTaskStatusHandler: (taskId: string, status: boolean) => void
	changeTitleValue: (value: string, id: string) => void
}

export const TaskElement = React.memo(({ id, title, isDone, removeTaskHandler, changeTaskStatusHandler, changeTitleValue }:TaskElementType) => {

	const onInputChange = useCallback((value: string) => {
		changeTitleValue(value, id)
	}, [id])

	const removeItemHandler = useCallback(() => {
		removeTaskHandler(id)
	}, [id])

	return (
		<Box sx={getListItemSx(isDone)}>

			<Checkbox checked={isDone} size="small" color="secondary" sx={{marginRight: '10px'}}
				onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} 
			/>
			<EditableSpan title={title} 
				onChange={onInputChange}
				removeItem={removeItemHandler}
			/>

		 </Box>
	)
})
