import { Button } from "./Button"
import s from './TodoList.module.css';
import { Task } from "./App";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type TaskElementType = Task & {
	removeTaskHandler: (taskId: string) => void
	changeTaskStatusHandler: (taskId: string, status: boolean) => void
	changeTitleValue: (value: string, id: string) => void
}

export const TaskElement = ({ id, title, isDone, removeTaskHandler, changeTaskStatusHandler, changeTitleValue }:TaskElementType) => {

	const onChangeHandler = (value: string) => {
		changeTitleValue(value, id)
	}

	return (
		<ListItem disablePadding 
							sx={{ justifyContent: 'space-between', opacity: isDone ? 0.3 : 1 }}>
			

			<div>
				<Checkbox 
					checked={isDone}
					size="small"
					color="secondary"
					onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} />
				<EditableSpan title={title} onChange={onChangeHandler}/>
			</div>

			<IconButton title='X' onClick={() => { removeTaskHandler(id) }}>
				<DeleteOutlineIcon fontSize="small" />
			</IconButton>
		</ListItem>
	)
}
