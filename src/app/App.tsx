import { useEffect, useState } from "react"
import { Sidebar } from "../common/components/sidebar/Sidebar"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "./store"
import { Outlet } from "react-router-dom"
import { initializeAppTC } from "../features/login/model/authSlice"
import CircularProgress from "@mui/material/CircularProgress"
import { ErrorSnackbar } from "common/components"
import { useSelector } from "react-redux"
import { selectAppStatus } from "./appSlice"
import { Header } from "common/components/header/Header"
import s from './App.styles.module.scss'

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const appStatus = useSelector(selectAppStatus)
	const isInitialized = useAppSelector((state) => state.app.isInitialized)
	const dispatch = useAppDispatch()

	const toggleSidebar = (newOpen: boolean) => () => {
		setSidebarOpen(newOpen)
	}

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	if (!isInitialized) {
		return (
			<div className={s.appProgress}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<div>
			{/* <Header toggleSidebar={toggleSidebar} /> */}
			<Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

			<div className={s.linearProgress}>{appStatus === "loading" && <LinearProgress />}</div>
			<Outlet />
			<ErrorSnackbar />
		</div>
	)
}

export default App
