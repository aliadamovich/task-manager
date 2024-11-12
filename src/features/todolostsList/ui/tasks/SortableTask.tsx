import { Box, Checkbox } from "@mui/material"
import { TaskEditableSpanBoxSX } from "styles/Todolost.styles"
import React, { ChangeEvent, useCallback } from "react"
import { removeTaskTC, TaskDomainType, updateTaskTC } from "features/todolostsList/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskModal } from "./taskModal/TaskModal"
import { TaskPriorityPopover } from "./TaskPriorityPopover"


type Props = {
	todolistId: string
	task: TaskDomainType
}
export const SortableTask = React.memo(({ task, todolistId}: Props) => {
	const {id, title, status, priority, taskEntityStatus} = task

	const dispatch = useAppDispatch()
	const [openTaskModal, setOpenTaskModal] = React.useState(false);

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

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const unwrapModalHandler = () => {
		setOpenTaskModal(true)
 }
	return (
		<div ref={setNodeRef} style={style} >
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
					attributes={attributes}
					listeners={listeners}
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
