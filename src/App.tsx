import { useState } from 'react';
import { Header } from './layout/header/Header';
import { Sidebar } from './layout/sidebar/Sidebar';
import { TodolistsList } from './layout/todolostsList/TodolistsList';
import { LinearProgress } from '@mui/material';

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	//тоггл сайдбара
	const toggleSidebar = (newOpen: boolean) => () => {
		setSidebarOpen(newOpen);
	};
	
	return (

		<div className='App'>
			<Header toggleSidebar={toggleSidebar}/>
			<Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
			{/* <LinearProgress /> */}
			<TodolistsList />
		</div>

	);
}

export default App;
