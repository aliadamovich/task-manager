import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { ChangeEvent, useState } from "react"
import { Task } from "../features/todolostsList/ui/tasks/Task"
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator"
import { Box, Checkbox } from "@mui/material"
import { TaskStatuses } from "features/todolostsList/lib/enums/enum"
import { TaskEditableSpanBoxSX } from "styles/Todolost.styles"
import { EditableSpan } from "common/components"

const meta: Meta<typeof Task> = {
	title: "TODOLISTS/Task",
	component: Task,
	parameters: {
		//статические св-ва (располложение на странице)
		layout: "centered",
	},
	tags: ["autodocs"], //создание вкладки Docs
	decorators: [ReduxStoreProviderDecorator],

	args: {
		// id: "taskId1",
		// title: "Learn Storybook",
		// status: TaskStatuses.New,
		task : {id: 'taskid',addedDate: '', deadline: '', description: '', order: 1, priority: 1, startDate: '', status: 0, taskEntityStatus: 'idle',title: 'd', todoListId: 'de'},
		todolistId: "todolistId1", // ID тудулиста, который существует в initialGlobalState
	},

}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {
	args: {
		task: { id: 'taskid', addedDate: '', deadline: '', description: '', order: 1, priority: 1, startDate: '', status: TaskStatuses.New, taskEntityStatus: 'idle', title: 'd', todoListId: 'de' },
	},
}

export const TaskIsDoneStory: Story = {
	args: {
		task: { id: 'taskid', addedDate: '', deadline: '', description: '', order: 1, priority: 1, startDate: '', status: TaskStatuses.Completed, taskEntityStatus: 'idle', title: 'd', todoListId: 'de' },

	},
}

const ToggleTask = () => {
	const [task, setTask] = useState({
		id: "23342dfijd",
		title: "CSS",
		isDone: false,
	})

	function changeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
		setTask({
			...task,
			isDone: e.currentTarget.checked,
		})
		action("Task status changed")(e.currentTarget.checked)
	}
	function changeTaskTitle(newTitle: string) {
		setTask({
			...task,
			title: newTitle,
		})
		action("Task title changed")(newTitle)
		return Promise.resolve(2)
	}
	return (
		<Box sx={TaskEditableSpanBoxSX(task.isDone)}>
			<Checkbox
				checked={task.isDone}
				size="small"
				color="secondary"
				sx={{
					marginRight: "10px",
				}}
				onChange={changeTaskStatus}
			/>
			<EditableSpan title={task.title} onChange={changeTaskTitle} removeItemHandler={action("removeTask")} 
				availableActions={['edit', 'open', "remove"]}/>
		</Box>
	)
}
export const ToggleTaskStory = {
	render: () => <ToggleTask />,
}
