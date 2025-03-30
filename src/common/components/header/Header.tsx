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

type Props = {
	toggleSidebar: (isOpen: boolean) => () => void
}
export const Header = ({ toggleSidebar }: Props) => {
	//компонент, вызывающий useContext, получает доступ к value обозначенному в провайдере контекста
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
		<AppBar color="secondary" position="static">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					sx={{
						mr: 2,
					}}
					onClick={toggleSidebar(true)}
				>
					<MenuIcon />
				</IconButton>

				<Typography
					variant="h4"
					component="span"
					sx={{
						flexGrow: 1,
					}}
				>
					My Todo
				</Typography>

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
