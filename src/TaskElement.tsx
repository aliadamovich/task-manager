import { Task } from "./App";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getListItemSx } from "./Todolost.styles";

type TaskElementType = Task & {
	removeTaskHandler: (taskId: string) => void
	changeTaskStatusHandler: (taskId: string, status: boolean) => void
	changeTitleValue: (value: string, id: string) => void
}

export const TaskElement = ({ id, title, isDone, removeTaskHandler, changeTaskStatusHandler, changeTitleValue }:TaskElementType) => {

	return (
		<ListItem disablePadding sx={getListItemSx(isDone)}>

			<div style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
				<Checkbox checked={isDone} size="small" color="secondary"
					onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} 
				/>
				<EditableSpan title={title}
					onChange={(value) => {changeTitleValue(value, id)}}
				/>
			</div>

			<IconButton onClick={() => { removeTaskHandler(id) }} sx={{display: 'none', p: '2px'}}>
				<DeleteOutlineIcon fontSize="small" />
			</IconButton>

		 </ListItem>

	)
}
