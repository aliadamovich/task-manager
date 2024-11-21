import React, { useContext } from "react"
import { AppBar, Button, FormControlLabel, IconButton, Toolbar, Typography } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu"
import { MaterialUISwitch } from "styles/SwitchStyled"
import { ColorModeContext } from "styles/Theme"
import { useAppDispatch } from "app/store"
import { useLogoutMutation } from "features/login/api/authApi"
import { setIsLoggedIn } from "app/appSlice"
import { ResultCode } from "common/enums/enum"
import { clearData } from "features/todolostsList/model/todolistSlice"
import { baseApi } from "app/baseApi"

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
				// dispatch(clearData())
			}
		})
			.then(() => {
				dispatch(baseApi.util.invalidateTags(['Tasks', 'Todolist']))
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
