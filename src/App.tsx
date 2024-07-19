import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './TodoList';
import { useState } from 'react';
import { AddItemInput } from './components/addItemInput/AddItemInput';


export type Task = {
	id: string
	title: string
	isDone: boolean
}
type todoListsType = { 
	id: string,
	title: string
	filter: FilterValueType 
}

type TaskStateType = {
	[todolistId: string]: Task[]
}


export type FilterValueType = 'All' | 'Completed' | 'Active'

function App() {

	//массив с тудулистами
	const todoList1 = v1();
	const todoList2 = v1();

	const [todoLists, setTodoLists] = useState<todoListsType[]>([
		{ id: todoList1, title: 'What to learn:', filter: 'All'},
		{ id: todoList2, title: 'What to buy:', filter: 'All'},
	])

	const [allTasks, setAllTasks] = useState<TaskStateType>({
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

		// const newTodoListArray = [newTask, ...allTasks[todoListId]];
		// setAllTasks({ ...allTasks, [todoListId]: newTodoListArray })

		setAllTasks({ ...allTasks, [todoListId]: [newTask, ...allTasks[todoListId]]})
	}

	//удаление таски
	const removeTask = (taskId: string, todoListId: string) => {
		// const newTodoListArray = allTasks[todoListId].filter(t => t.id !== taskId);
		// setAllTasks({ ...allTasks, [todoListId]: newTodoListArray });

		setAllTasks({...allTasks, [todoListId]: allTasks[todoListId].filter(t => t.id !== taskId)})
	}

	//смена статуса таски isDone
	const changeTaskStatus = (taskId: string, status: boolean, todoListId: string) => {
		// const newTodoListArray = allTasks[todoListId].map(task => task.id === taskId ? {...task, isDone: status} : task);
		// setAllTasks({ ...allTasks, [todoListId]: newTodoListArray })

		setAllTasks({ ...allTasks, [todoListId]: allTasks[todoListId].map(t => t.id === taskId ? {...t, isDone: status} : t)})
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

	//Создание нового тудулиста
	const addTodoListHandler = (titleValue: string) => {
		const newTodo: todoListsType = { id: v1(), title: titleValue, filter: 'All' }
		setTodoLists([...todoLists, newTodo])
		setAllTasks({...allTasks, [newTodo.id] : []})
	}

	const changeTitleValue = (value: string, taskId: string, todoListId: string) => {

		setAllTasks({ ...allTasks, [todoListId]: allTasks[todoListId].map(t => t.id === taskId ? {...t, title: value} : t)})

	}

	/* маппим все туду-листы, в каждый передаем фильтр чтобы свой filteredtasks создавался в каждой в завис-ти от значения фильтра */
	const todolistComponent: Array<JSX.Element> = todoLists.map(tl => {
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
						changeTitleValue={changeTitleValue}
					/>
	})


	return (
		<div className='App'>
			<h1>Create new TodoList: <AddItemInput addItem={addTodoListHandler} /></h1>
		
			{ todolistComponent }
		
		</div>
	);
}

export default App;
