import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { TaskElement } from "./TaskElement"
import { v1 } from "uuid"

export type TodoListProps = {
	tasks: Task[]
}

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValueType = 'All' | 'Completed' | 'Active'

export const TodoList = ({ tasks }: TodoListProps) => {

	//useState
	const [filter, setFilter] = useState<FilterValueType>('All');
	const [activeTasks, setActiveTasks] = useState(tasks);
	const [taskValue, setTaskValue] = useState<string>('');
	
	//удаление таски
	const onRemoveTask = (id: string) => {
		setActiveTasks(activeTasks.filter(t => t.id !== id))
	}

	//фильтрация таски
	const filterringTasks = () => {
		let filteredTasks = activeTasks;

		if (filter === 'Completed') {
			return filteredTasks = activeTasks.filter(t => t.isDone === true)
		} else if (filter === 'Active') {
			return filteredTasks = activeTasks.filter(t => t.isDone === false)
		}
		return filteredTasks;
	}
	const setFiltersOnClick = (filter: FilterValueType) => {
		setFilter(filter)
	}

	//изменения в инпуте
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskValue(e.currentTarget.value)
	}

	//добавление новой таски
	const onAddTask = () => {
		if ( taskValue.trim() !== '') {
			let newTask = {
				id: v1(),
				title: taskValue,
				isDone: false
			}
			const addedTasks = [newTask, ...activeTasks]
			setActiveTasks(addedTasks)
			setTaskValue('')
		}
	}
	//добавление такси по нажатию на Enter
	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onAddTask()
		}
	}
	const mappedTasks = !filterringTasks().length 
		? <div>No tasks</div>
		: filterringTasks().map(t => <TaskElement {...t} key={t.id} onRemoveTask={onRemoveTask} />)


	return(
		<div>
			<h3></h3>
			<div>
				<input value={taskValue} 
					onChange={onChangeHandler}
					onKeyUp={onKeyPress}
				/>
				<Button title="+" callBack={onAddTask}/>
			</div>
			<ul>
				{ mappedTasks }
			</ul>
			<div>
				<Button title="All" callBack={()=>setFiltersOnClick('All')} />
				<Button title="Active" callBack={()=>setFiltersOnClick('Active')} />
				<Button title="Completed" callBack={()=>setFiltersOnClick('Completed')} />
			</div>
		</div>
	)
}