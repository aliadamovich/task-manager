import Box from "@mui/material/Box"
import ViewModule from "@mui/icons-material/ViewModule"
import s from './Sidebar.module.scss'
import GridViewIcon from '@mui/icons-material/GridView';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { ViewModeType } from "common/types/viewTypes"

type Props = {
	onChange: (mode: ViewModeType) => void
	currentMode: ViewModeType
}

export const Sidebar = ({ onChange, currentMode }: Props) => {
	return (
		<div className={s.sidebar}>
			<Box display="flex" flexDirection="column" gap={3} >
				<Tooltip title="List View" placement="right">
					<IconButton size="large"
						color={currentMode === "list" ? "secondary" : "default"}
						onClick={() => onChange("list")}
					>
						<ViewHeadlineIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title="Column View" placement="right">
					<IconButton size="large"
						color={currentMode === "columns" ? "secondary" : "default"}
						onClick={() => onChange("columns")}
					>
						<ViewModule />
					</IconButton>
				</Tooltip>

				<Tooltip title="Gallery View" placement="right">
					<IconButton size="large"
						color={currentMode === "gallery" ? "secondary" : "default"}
						onClick={() => onChange("gallery")}
					>
						<GridViewIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</div>
	)
}
