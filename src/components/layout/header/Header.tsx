import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';

type HeaderPropsTtype = {
	setIsLight: (isLight: boolean) => void
	isLight: boolean
}

const Header = ({ setIsLight, isLight }: HeaderPropsTtype) => {
	return (
		<AppBar color='secondary' position='static'>
			<Toolbar>

				<IconButton
					size="large"
					edge="start"
					color="inherit"
					sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>

				<Typography
					variant='h4'
					component='span'
					sx={{ flexGrow: 1 }}>
					My Todo
				</Typography>

				<IconButton
					color="inherit" 
					size="large">
					<AccountCircle />
				</IconButton>
				
				<Switch onChange={() => {setIsLight(!isLight)}} color='secondary'/>
			</Toolbar>
		</AppBar>
	)
}

export default Header
