import React, { useContext } from "react"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu"
import { MaterialUISwitch } from "styles/SwitchStyled"
import { ColorModeContext } from "styles/Theme"
import { useAppDispatch } from "app/store"
import { useLogoutMutation } from "features/login/api/authApi"
import { setIsLoggedIn } from "app/appSlice"
import { ResultCode } from "common/enums/enum"
import { clearData } from "features/todolostsList/model/todolistSlice"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"
import Button from "@mui/material/Button"
import { Link } from "@mui/material"
import { PATH } from "routes/router"
import logo from '../../../assets/images/logoo.png'
import { NavLink } from "react-router-dom"


type Props = {
	toggleSidebar: (isOpen: boolean) => () => void
}
export const Header = ({ toggleSidebar }: Props) => {
	const colorMode = useContext(ColorModeContext)
	const [logout] = useLogoutMutation()

	const dispatch = useAppDispatch()
	const onLogoutHandler = () => {
		logout()
			.then((res) => {
			if (res.data?.resultCode === ResultCode.Success) {
				dispatch(setIsLoggedIn({isLoggedIn: false}))
				dispatch(clearData())
			}
		})
	}

	return (
		<AppBar color="secondary" position="static" sx={{zIndex: '10'}}>
			<Toolbar >
				<NavLink to={PATH.ROOT} style={{textDecoration: 'none', flexGrow: 1, display: 'flex', alignItems: 'center', gap:'20px'}} >
					<span >
						<img src={logo} alt="logo" style={{width:' 40px', height: '40px'}}/>
					</span>
					<Typography
						variant="h4"
						component="span"
						color="#fff"
					>
						Taskify
					</Typography>
				</NavLink>

				<IconButton color="inherit" size="large">
					<AccountCircle />
				</IconButton>
				<Button
					variant="text"
					sx={{
						margin: "0 20px 0 0",
						color: "#fff",
					}}
					onClick={onLogoutHandler}
				>
					Logout
				</Button>

				<FormControlLabel
					control={
						<MaterialUISwitch
							sx={{
								m: 1,
							}}
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
