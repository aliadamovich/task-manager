import { useContext } from "react"
import { MaterialUISwitch } from "styles/SwitchStyled"
import { ColorModeContext } from "styles/Theme"
import { useAppDispatch } from "app/store"
import { useLogoutMutation } from "features/login/api/authApi"
import { setIsLoggedIn } from "app/appSlice"
import { ResultCode } from "common/enums/enum"
import { clearData } from "features/todolostsList/model/todolistSlice"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"
import Button from "@mui/material/Button"
import { PATH } from "routes/router"
import logo from '../../../assets/images/logoo.png'
import { NavLink } from "react-router-dom"
import s from './Header.module.scss'
import { baseApi } from "app/baseApi"


export const Header = () => {
	const colorMode = useContext(ColorModeContext)
	const [logout] = useLogoutMutation()

	const dispatch = useAppDispatch()
	const onLogoutHandler = () => {
		logout()
			.then((res) => {
			if (res.data?.resultCode === ResultCode.Success) {
				dispatch(setIsLoggedIn({isLoggedIn: false}))
				dispatch(clearData())
				dispatch(baseApi.util.resetApiState())
			}
		})
	}

	return (
		<AppBar color="secondary" position="static" sx={{zIndex: '10'}}>
			<Toolbar className={s.header}>
				<NavLink to={PATH.ROOT} className={s.headerLogo}>
						<img src={logo} alt="logo"/>
					<Typography
						variant="h4"
						component="span"
						color="#fff"
					>
						Taskify
					</Typography>
				</NavLink>

				<Button
					variant="text"
					onClick={onLogoutHandler}
					className={s.logoutButton}>
					Logout
				</Button>

				<FormControlLabel
					control={
						<MaterialUISwitch
							defaultChecked
						/>
					}
					label=""
					onChange={colorMode.toggleColorMode}
				/>
			</Toolbar>
		</AppBar>
	)
}
