import { useState } from 'react';
import { Header } from './layout/header/Header';
import { Sidebar } from './layout/sidebar/Sidebar';
import { TodolistsList } from './layout/todolostsList/TodolistsList';
import LinearProgress  from '@mui/material/LinearProgress';
import { useAppSelector } from './store/store';
import { ErrorSnackbar } from './components/error-snackbar/ErrorSnackbar';

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const status = useAppSelector(state => state.app.status)

	//тоггл сайдбара
	const toggleSidebar = (newOpen: boolean) => () => {setSidebarOpen(newOpen)};

	
	return (

		<div className='App'>
			<Header toggleSidebar={toggleSidebar}/>
			<Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
			
			<div style={{position:'absolute', width: '100%'}}>
				{status === 'loading' && <LinearProgress />}
			</div>
			<TodolistsList />
			<ErrorSnackbar/>
		</div>

	);
}

export default App;
