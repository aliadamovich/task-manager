import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"

//ф-ция toggleSidebar -двойная обертка коллбэк
type Props = {
	toggleSidebar: (isOpen: boolean) => () => void
	sidebarOpen: boolean
}

export const Sidebar = ({ toggleSidebar, sidebarOpen }: Props) => {
	const DrawerList = (
		<Box
			sx={{
				width: 250,
			}}
			role="presentation"
			onClick={toggleSidebar(false)}
		>
			<List>
				{["Draft", "Old", "Recent", "Done"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Settings"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			<Drawer open={sidebarOpen} onClose={toggleSidebar(false)}>
				{DrawerList}
			</Drawer>
		</div>
	)
}
