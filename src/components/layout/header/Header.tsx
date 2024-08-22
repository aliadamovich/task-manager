import React, { useContext } from 'react'
import { AppBar, FormControlLabel, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import {MaterialUISwitch} from '../../../styles/SwitchStyled'
import {  ColorModeContext } from '../../../styles/Theme';


type HeaderPropsType = {
	toggleSidebar: (isOpen: boolean) => () => void
}
export const Header = ({ toggleSidebar }: HeaderPropsType) => {

	//компонент, вызывающий useContext, получает доступ к value обозначенному в провайдере контекста
	const colorMode = useContext(ColorModeContext)

	return (
		<AppBar color='secondary' position='static'>

			<Toolbar>

				<IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}
					onClick={toggleSidebar(true)}
				>
					<MenuIcon />
				</IconButton>

				<Typography variant='h4' component='span' sx={{ flexGrow: 1 }}>
					My Todo
				</Typography>

				<IconButton color="inherit" size="large">
					<AccountCircle />
				</IconButton>
				
				<FormControlLabel
					control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
					label=''
					onChange={colorMode.toggleColorMode}
				/>
			</Toolbar>

		</AppBar>
	)


}

