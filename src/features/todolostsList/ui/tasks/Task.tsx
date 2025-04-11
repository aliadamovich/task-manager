import { TaskEditableSpanBoxSX } from "styles/Todolost.styles"
import React, { ChangeEvent, useCallback } from "react"
import { TaskDomainType } from "features/todolostsList/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { TaskModal } from "./taskModal/TaskModal"
import { TaskPriorityPopover } from "./TaskPriorityPopover"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/todolostsList/api/tasksApi"
import { updateTaskApiModel } from "features/todolostsList/lib/utils/updateTaskModel"
import { updateTaskStatusQueryData } from "features/todolostsList/lib/utils/updateStatusQueryData"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
	todolistId: string
	task: TaskDomainType
	page: number
}
export const Task = React.memo(({ task, todolistId, page}: Props) => {
	const {id, title, status, priority, taskEntityStatus} = task

	const dispatch = useAppDispatch()
	const [openTaskModal, setOpenTaskModal] = React.useState(false);
	const [deleteTask] = useDeleteTaskMutation()
	const [updateTask] = useUpdateTaskMutation()

	const removeTaskHandler =() => {
		updateTaskStatusQueryData({ dispatch, id, todolistId, status: 'loading', page })
		return deleteTask({todolistId, taskId: id})
		.finally(() => {
			updateTaskStatusQueryData({ dispatch, id, todolistId, status: 'idle', page })
		})
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		updateTaskStatusQueryData({ dispatch, id, todolistId, status: 'loading', page })
		let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
		const updatedModel = updateTaskApiModel(task, {status})
		updateTask({ todolistId, taskId: id, apiModel: updatedModel })
			.finally(() => {
				updateTaskStatusQueryData({ dispatch, id, todolistId, status: 'idle', page })
			})
	}

	const changeTaskTitleHandler = useCallback((title: string) => {
		updateTaskStatusQueryData({ dispatch, id, todolistId, status: 'loading', page })
		const updatedModel = updateTaskApiModel(task, { title })
		return updateTask({ todolistId, taskId: id, apiModel: updatedModel })
			.finally(() => {
				updateTaskStatusQueryData({dispatch, id, todolistId, status: 'idle', page})
			})

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
		console.log(11112222);
		
		if (taskEntityStatus === 'loading') return
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
				{openTaskModal && 
				<TaskModal 
					openModal={openTaskModal} 
					setOpenModal={setOpenTaskModal} 
					task={task} 
					todolistId={todolistId} 
					changeTaskTitle={changeTaskTitleHandler}
					removeTask={removeTaskHandler}
					/>
				}
			</Box>
    </div>
		
	)
})
