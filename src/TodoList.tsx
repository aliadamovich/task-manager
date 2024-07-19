import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { TaskElement } from "./TaskElement"
import s from './TodoList.module.css';
import { FilterValueType, Task } from "./App";
import { AddItemInput } from "./components/addItemInput/AddItemInput";

export type TodoListProps = {
	todoListId: string
	tasks: Task[]
	filter: FilterValueType
	title: string
	addTask: (value: string, todoListId: string) => void
	changeFilter: (filter: FilterValueType, todoListId: string) => void
	removeTask: (taskId: string, todoListId: string) => void
	changeTaskStatus: (taskId: string, status: boolean, todoListId: string) => void
	removeTodoList: (todoListId: string) => void
	changeTitleValue: (taskId: string, value: string, todoListId: string) => void
}


export const TodoList = ({ tasks, filter, title, todoListId, addTask, changeFilter, removeTask, changeTaskStatus, removeTodoList, changeTitleValue }: TodoListProps) => {
	//useState
	// const [taskValue, setTaskValue] = useState<string>('');
	// const [error, setError] = useState<null | string>(null);

	//добавление таски
	// const addTaskHandler = () => {
	// 	if (taskValue.trim()) {
	// 		addTask(taskValue.trim(), todoListId)
	// 		setTaskValue('')
	// 	} else {
	// 		setError('Field is required')
	// 	}
	// }

	const addTaskHandler = (value: string) => {
		addTask(value, todoListId)
	}

	//добавление таски по нажатию на Enter
	// const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	// 	setError(null)
	// 	if (e.key === 'Enter') {
	// 		addTaskHandler()
	// 	}
	// }
	//удаление таски
	const removeTaskHandler = (taskId: string) => {
		removeTask(taskId, todoListId)
	}

	//изменения в инпуте
	// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setTaskValue(e.currentTarget.value)
	// }

	//смена статуса таски isDone
	const changeTaskStatusHandler = (taskId: string, status: boolean) => {
		changeTaskStatus(taskId, status, todoListId)
	}

	//изменение текста таски 
	const changeTitleHandler = (value: string, id: string) => {
		changeTitleValue(value, id, todoListId)
	}

	//удаление всего тудулиста
	const removeTodoListHandler = () => {
		removeTodoList(todoListId)
	}

	//фильтрация
	const changeFilterHandler = (filter: FilterValueType) => {
		changeFilter(filter, todoListId)
	}

	const mappedTasks = !tasks.length 
		? <div>No tasks</div>
		: tasks.map(t => 
		<TaskElement
			{...t} 
			key={t.id} 
			removeTaskHandler={removeTaskHandler} 
			changeTaskStatusHandler={changeTaskStatusHandler}
			changeTitleValue={changeTitleHandler}
		/>)

	return(
		<div>
			<h3>{title}
				<Button title='X' onClick={removeTodoListHandler} />
			</h3>
			
			{/* <div>
				<input value={taskValue} onChange={onChangeHandler} onKeyUp={onKeyPressHandler} className={error ? s.error : ''}
					// ref={inputRef}
				/>
				<Button title="+" onClick={addTaskHandler}/>
				{error && <div className={s.errorMessage}>{error}</div>}
			</div> */}

			<AddItemInput addItem={addTaskHandler}/>
			<ul>
				{ mappedTasks }
			</ul>
			<div className={s.buttons}>
				<Button title="All" onClick={()=>changeFilterHandler('All')}
				className={filter === 'All' ? `${s.active} ${s.button}` : s.button}
				/>
				<Button title="Active" onClick={() => changeFilterHandler('Active')}
				className={filter === 'Active' ? `${s.active} ${s.button}` : s.button}
				/>
				<Button title="Completed" onClick={() => changeFilterHandler('Completed')}
				className={filter === 'Completed' ? `${s.active} ${s.button}` : s.button}
				/>
			</div>
		</div>
	)
}