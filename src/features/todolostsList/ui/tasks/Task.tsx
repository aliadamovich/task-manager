import { Box, Checkbox } from "@mui/material"
import { TaskEditableSpanBoxSX } from "styles/Todolost.styles"
import React, { ChangeEvent, useCallback } from "react"
import { removeTaskTC, TaskDomainType, updateTaskTC } from "features/todolostsList/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { TaskModal } from "./taskModal/TaskModal"
import { TaskPriorityPopover } from "./TaskPriorityPopover"
import { useDeleteTaskMutation } from "features/todolostsList/api/tasksApi_rtk"


type Props = {
	todolistId: string
	task: TaskDomainType
}
export const Task = React.memo(({ task, todolistId}: Props) => {
	const {id, title, status, priority, taskEntityStatus} = task

	const dispatch = useAppDispatch()
	const [openTaskModal, setOpenTaskModal] = React.useState(false);
	const [deleteTask] = useDeleteTaskMutation()

	const removeTaskHandler = useCallback(() => {
		// dispatch(removeTaskTC({ todolistId, taskId: id }))
		deleteTask({todolistId, taskId: id})
	}, [id, todolistId])

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


	const unwrapModalHandler = () => {
		setOpenTaskModal(true)
 }
	return (
		<div>
			<Box sx={TaskEditableSpanBoxSX(isTaskCompleted ? true : false)}>
				<Checkbox
					checked={isTaskCompleted && true}
					size="small"
					color="secondary"
					sx={{ marginRight: "5px", }}
					onChange={changeTaskStatusHandler}
					disabled={taskEntityStatus === "loading"}
				/>
				<TaskPriorityPopover priority={priority}/>
				<EditableSpan
					title={title}
					onChange={changeTaskTitleHandler}
					removeItemHandler={removeTaskHandler}
					disabled={taskEntityStatus === "loading"}
					isWithModal
					unwrapModalHandler={unwrapModalHandler}
				/>
				{openTaskModal && <TaskModal openModal={openTaskModal} setOpenModal={setOpenTaskModal} task={task} todolistId={todolistId}/>
				}
			</Box>
    </div>
		
	)
})
