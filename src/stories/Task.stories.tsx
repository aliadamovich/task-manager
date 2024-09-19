import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ChangeEvent, useState } from "react";
import { Task } from "../layout/todolostsList/todolist/tasks/Task";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";
import { Box, Checkbox } from "@mui/material";
import { EditableSpan } from "../components/editableSpan/EditableSpan";
import { getListItemSx } from "../styles/Todolost.styles";
import { TaskStatuses } from "../api/todolists-api";




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
		id: "taskId1",
		title: "Learn Storybook",
		status: TaskStatuses.New,
		todolistId: "todolistId1", // ID тудулиста, который существует в initialGlobalState
	},
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
	args: {
		status: TaskStatuses.New,
	},
};


export const TaskIsDoneStory: Story = {
	args: {
		status: TaskStatuses.Completed
	},
};

 const ToggleTask = () => {
	const [task, setTask] = useState({ id: '23342dfijd', title: 'CSS', isDone: false})
	
	 function changeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
		setTask({ ...task, isDone: e.currentTarget.checked })
		 action('Task status changed')(e.currentTarget.checked);
	}
	function changeTaskTitle( newTitle: string) {
		setTask({...task, title: newTitle})
		action('Task title changed')(newTitle);
	}
	 return (
		 <Box sx={getListItemSx(task.isDone)}>
			 <Checkbox checked={task.isDone} size="small" color="secondary" sx={{ marginRight: '10px' }}
				 onChange={changeTaskStatus}
			 />
			 <EditableSpan title={task.title}
				 onChange={changeTaskTitle}
				 removeItem={action('removeTask')}
			 />

		 </Box>
	 )
}
export const ToggleTaskStory = {render: () => <ToggleTask />}