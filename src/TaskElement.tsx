import { Button } from "./Button"
import s from './TodoList.module.css';
import { Task } from "./App";
import { EditableSpan } from "./components/editableSpan/EditableSpan";

type TaskElementType = Task & {
	removeTaskHandler: (taskId: string) => void
	changeTaskStatusHandler: (taskId: string, status: boolean) => void
	changeTitleValue: (value: string, id: string) => void
}

export const TaskElement = ({ id, title, isDone, removeTaskHandler, changeTaskStatusHandler, changeTitleValue }:TaskElementType) => {

	const onChange = (value: string) => {
		changeTitleValue(value, id)
	}

	return (
		<li className={isDone ? s.isDone : ''}>
			<Button title="X" onClick={() => { removeTaskHandler(id) } }/>
			<input type="checkbox" checked={isDone} onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} />
			<EditableSpan title={title} onChange={onChange}/>
		</li>
	)
}
