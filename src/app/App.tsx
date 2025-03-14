import { useEffect, useState } from "react"
import { Sidebar } from "../common/components/sidebar/Sidebar"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch } from "./store"
import { Outlet } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import { ErrorSnackbar } from "common/components"
import { useSelector } from "react-redux"
import { selectAppStatus, setIsLoggedIn } from "./appSlice"
import { Header } from "common/components/header/Header"
import s from './App.styles.module.scss'
import { useMeQuery } from "features/login/api/authApi"
import { ResultCode } from "common/enums/enum"
import { Footer } from "common/components/footer/Footer"

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const appStatus = useSelector(selectAppStatus)
	const [isInitialized, setIsInitialized] = useState(false)
	const {data, isLoading} = useMeQuery()
	const dispatch = useAppDispatch()
	
	const toggleSidebar = (newOpen: boolean) => () => {
		setSidebarOpen(newOpen)
	}

	useEffect(() => {
		if (!isLoading) {
			setIsInitialized(true)
			if (data?.resultCode === ResultCode.Success) {
				dispatch(setIsLoggedIn({ isLoggedIn: true }))
			}
		}
		
	}, [isLoading, data])

	//RTK
	// const isInitialized = useAppSelector((state) => state.app.isInitialized)
	// useEffect(() => {
		// dispatch(initializeAppTC())
	// }, [])

	if (!isInitialized) {
		return (
			<div className={s.appProgress}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<div>
			<Header toggleSidebar={toggleSidebar} />
			<Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

			<div className={s.linearProgress}>{appStatus === "loading" && <LinearProgress />}</div>
			<Outlet />
			<Footer />
			<ErrorSnackbar />
		</div>
	)
}

export default App
