import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './TodoList';
import { useState } from 'react';

export type TodoListProps = {
	tasks: Task[]
}
export type Task = {
	id: string
	title: string
	isDone: boolean
}
type todoListsType ={ 
	id: string,
	title: string
	filter: FilterValueType 
}


export type FilterValueType = 'All' | 'Completed' | 'Active'

function App() {

	const [tasks, setTasks] = useState([
		{id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Rest API', isDone: false },
		{ id: v1(), title: 'GraphQL', isDone: false },]);

	//массив с тудулистами
	const todoList1 = v1();
	const todoList2 = v1();

	const [todoLists, setTodoLists] = useState<todoListsType[]>([
		{ id: todoList1, title: 'What to learn:', filter: 'Active'},
		{ id: todoList2, title: 'What to buy:', filter: 'Completed'},
	])

	const [allTasks, setAllTasks] = useState({
		[todoList1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false }
		],
		[todoList2]: [
			{ id: v1(), title: 'Bread', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		]
	})

	//добавление новой таски
	const addTask = (value: string, todoListId: string) => {
			let newTask = {
				id: v1(),
				title: value,
				isDone: false
			}

		const newTodoListArray = [newTask, ...allTasks[todoListId]];

		setAllTasks({ ...allTasks, [todoListId]: newTodoListArray })

	}

	//удаление таски
	const removeTask = (taskId: string, todoListId: string) => {
		const newTodoListArray = allTasks[todoListId].filter(t => t.id !== taskId);
		setAllTasks({ ...allTasks, [todoListId]: newTodoListArray });
	}

	//смена статуса таски isDone
	const changeTaskStatus = (taskId: string, status: boolean, todoListId: string) => {
		const newTodoListArray = allTasks[todoListId].map(task => task.id === taskId ? {...task, isDone: status} : task);
		setAllTasks({ ...allTasks, [todoListId]: newTodoListArray })
	}

	//удаление целиом тудулиста
	const removeTodoList = (todolistId: string) => {
		setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
		delete allTasks[todolistId]
		setAllTasks({...allTasks})
	}

	//изменение значения фильтра по клику и перерисовка массива todoLists
	const changeFilter = (filterValue: FilterValueType, todoListId: string) => {
		setTodoLists(todoLists.map(td => td.id === todoListId ? { ...td, filter: filterValue } : td))
	}

	return (
		<div className='App'>
		{/* маппим все тудушки, в каждый передаем фильтр чтобы свой filteredtasks создавался в каждой в завис-ти от значения фильтра */}
		{
			todoLists.map(tl => {
				//фильтрация
				let filteredTasks = allTasks[tl.id];

				if (tl.filter === 'Completed') {
					filteredTasks = filteredTasks.filter(t => t.isDone === true)
				} else if (tl.filter === 'Active') {
					filteredTasks = filteredTasks.filter(t => t.isDone === false)
				}

				return <TodoList key={tl.id}
					todoListId={tl.id}
					title={tl.title}
					tasks={filteredTasks}
					filter={tl.filter}
					addTask={addTask}
					changeFilter={changeFilter}
					removeTask={removeTask}
					changeTaskStatus={changeTaskStatus} 
					removeTodoList={removeTodoList}
					/>
			})
		}
			</div>
	);
}

export default App;
