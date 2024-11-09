import { Box, Checkbox } from "@mui/material"
import { TaskEditableSpanBoxSX } from "styles/Todolost.styles"
import React, { ChangeEvent, useCallback } from "react"
import { removeTaskTC, TaskDomainType, updateTaskTC } from "features/todolostsList/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { ModalContainer } from "common/components/modal/Modal"

type Props = TaskDomainType & {
	todolistId: string
}
export const Task = React.memo(({ id, title, status, taskEntityStatus, todolistId }: Props) => {
	const dispatch = useAppDispatch()

	const removeTaskHandler = useCallback(() => {
		dispatch(removeTaskTC({ todolistId, taskId: id }))
	}, [id, todolistId, dispatch])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
		dispatch(updateTaskTC({ todolistId, taskId: id, model: { status } }))
	},
		[todolistId, dispatch],
	)

	const changeTaskTitleHandler = useCallback((value: string) => {
		return dispatch(updateTaskTC({ todolistId, taskId: id, model: { title: value } }))
	},
		[id, todolistId, dispatch],
	)
	const isTaskCompleted = status === TaskStatuses.Completed
	


	return (
		<Box sx={TaskEditableSpanBoxSX(isTaskCompleted ? true : false)} >
			<Checkbox
				checked={isTaskCompleted && true}
				size="small"
				color="secondary"
				sx={{marginRight: "10px",}}
				onChange={changeTaskStatusHandler}
				disabled={taskEntityStatus === "loading"}
			/>
			<EditableSpan
				title={title}
				onChange={changeTaskTitleHandler}
				removeItemHandler={removeTaskHandler}
				disabled={taskEntityStatus === "loading"}
			/>
		</Box>
	)
})
