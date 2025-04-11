import Box from "@mui/material/Box"
import ViewModule from "@mui/icons-material/ViewModule"
import s from './Sidebar.module.scss'
import GridViewIcon from '@mui/icons-material/GridView';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { ViewModeType } from "common/types/viewTypes"
import { useNavigate } from "react-router-dom";
import { PATH } from "routes/router";

type Props = {
	onChange: (mode: ViewModeType) => void
	currentMode: ViewModeType
}

export const Sidebar = ({ onChange, currentMode }: Props) => {
	const navigate = useNavigate()
	const handleChangeView = (mode: ViewModeType) => {
		onChange(mode)
		navigate(PATH.ROOT)
	}
	
	return (
		<div className={s.sidebar}>
			<Box className={s.sidebarContent}>
				<Tooltip title="List View" placement="right">
					<IconButton size="large"
						color={currentMode === "list" ? "secondary" : "default"}
						onClick={() => handleChangeView("list")}
					>
						<ViewHeadlineIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title="Column View" placement="right">
					<IconButton size="large"
						color={currentMode === "columns" ? "secondary" : "default"}
						onClick={() => handleChangeView("columns")}
					>
						<ViewModule />
					</IconButton>
				</Tooltip>

				<Tooltip title="Gallery View" placement="right">
					<IconButton size="large"
						color={currentMode === "gallery" ? "secondary" : "default"}
						onClick={() => handleChangeView("gallery")}
					>
						<GridViewIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</div>
	)
}
