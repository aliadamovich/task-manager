import { Button } from "./Button"
import { Task } from "./TodoList"

type TaskElementType = Task & {
	onRemoveTask: (id: string) => void
}

export const TaskElement = ({ id, title, isDone, onRemoveTask }:TaskElementType) => {
	const RemoveTaskHandler = () => { onRemoveTask(id) }

	return (
		<li >
			<Button title="X" callBack={ RemoveTaskHandler }/>
			<input type="checkbox" checked={isDone} />
			<span>{title}</span>
		</li>
	)
}