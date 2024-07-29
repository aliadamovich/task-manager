import { Button } from "./Button"
import s from './TodoList.module.css';
import { Task } from "./App";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

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
		<div className={isDone ? s.isDone : ''}>
			<IconButton title='X' onClick={() => { removeTaskHandler(id) }}>
				<ClearIcon fontSize="small" />
			</IconButton>

			<Checkbox 
				checked={isDone}
				size="small"
				color="secondary"
				onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} />
			<EditableSpan title={title} onChange={onChangeHandler}/>
		</div>
	)
}
