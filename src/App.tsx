import { v1 } from 'uuid';
import { Accordeon } from './Accordeon';
import './App.css';
import { Modal } from './Modal';
import { TodoList } from './TodoList';

function App() {

	const tasks: { id: string, title: string, isDone: boolean }[] = 
	[
		{ id: v1(), title: 'HTML&CSS', isDone: true }, 
		{ id: v1(), title: 'JS', isDone: true }, 
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Rest API', isDone: false },
		{ id: v1(), title: 'GraphQL', isDone: false },
	]


	return (
			<div className='App'>
			<TodoList tasks={tasks}/>
			{/* <Accordeon/> */}
			{/* <Modal /> */}
			</div>
	);
}

export default App;
