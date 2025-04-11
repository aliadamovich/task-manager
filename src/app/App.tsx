import { useEffect, useState } from "react"
import { Sidebar } from "../common/components/sidebar/Sidebar"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch } from "./store"
import { Navigate, Outlet } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import { ErrorSnackbar } from "common/components"
import { useSelector } from "react-redux"
import { selectAppStatus, selectIsLoggedIn, setIsLoggedIn } from "./appSlice"
import { Header } from "common/components/header/Header"
import s from './App.styles.module.scss'
import { useMeQuery } from "features/login/api/authApi"
import { ResultCode } from "common/enums/enum"
import { Footer } from "common/components/footer/Footer"
import { PATH } from "routes/router"
import { useViewMode } from "features/todolostsList/lib/hooks/useViewMode"
import { ViewModeProvider } from "app/providers/ViewModeContext.ts/ViewModeContext"

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const appStatus = useSelector(selectAppStatus)
	const [isInitialized, setIsInitialized] = useState(false)
	const {data, isLoading} = useMeQuery()
	const dispatch = useAppDispatch()
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const { mode, setMode } = useViewMode()
	const toggleSidebar = (newOpen: boolean) => () => {
		setSidebarOpen(newOpen)
	}

	useEffect(() => {
		if (isLoading) return
		setIsInitialized(true)
		if (data?.resultCode === ResultCode.Success) {
			dispatch(setIsLoggedIn({ isLoggedIn: true }))
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

		if (!isLoggedIn) {
			return <Navigate to={PATH.LOGIN} />
		}

	return (
			<div className={s.appWrapper}>
				<Header />
				<Sidebar currentMode={mode} onChange={setMode} />
	
				<div className={s.linearProgress}>{appStatus === "loading" && <LinearProgress />}</div>
				<Outlet />
				<Footer />
				<ErrorSnackbar />
			</div>
	)
}

export default App
