import { Box, Checkbox } from "@mui/material"
import { TaskEditableSpanBoxSX } from "styles/Todolost.styles"
import React, { ChangeEvent, useCallback } from "react"
import { removeTaskTC, TaskDomainType, updateTaskTC } from "features/todolostsList/model/tasksSlice"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


type Props = TaskDomainType & {
	todolistId: string
}
export const SortableTask = React.memo(({ id, title, status, taskEntityStatus, todolistId }: Props) => {
	const dispatch = useAppDispatch()

	const removeTaskHandler = useCallback(() => {
		console.log('remove');
		dispatch(removeTaskTC({ todolistId, taskId: id }))
	}, [id, todolistId, dispatch])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
		dispatch(updateTaskTC({ todolistId, taskId: id, model: { status } }))
	},
		[todolistId, dispatch],
	)

	const changeTaskTitleHandler = useCallback((value: string) => {
		console.log('change');
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


	return (
		<div ref={setNodeRef} style={style} >
			<Box sx={TaskEditableSpanBoxSX(isTaskCompleted ? true : false)}>
				<Checkbox
					checked={isTaskCompleted && true}
					size="small"
					color="secondary"
					sx={{ marginRight: "10px", }}
					onChange={changeTaskStatusHandler}
					disabled={taskEntityStatus === "loading"}
				/>
				<EditableSpan
					attributes={attributes}
					listeners={listeners}
					title={title}
					onChange={changeTaskTitleHandler}
					removeItem={removeTaskHandler}
					disabled={taskEntityStatus === "loading"}
				/>
			</Box>
    </div>
		
	)
})
