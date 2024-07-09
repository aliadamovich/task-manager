import { Button } from "./Button"
import s from './TodoList.module.css';
import { Task } from "./App";

type TaskElementType = Task & {
	removeTaskHandler: (taskId: string) => void
	changeTaskStatusHandler: (taskId: string, status: boolean) => void
}

export const TaskElement = ({ id, title, isDone, removeTaskHandler, changeTaskStatusHandler }:TaskElementType) => {


	return (
		<li className={isDone ? s.isDone : ''}>
			<Button title="X" onClick={() => { removeTaskHandler(id) } }/>
			<input type="checkbox" checked={isDone} onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} />
			<span>{title}</span>
		</li>
	)
}