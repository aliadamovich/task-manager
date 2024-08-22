import { Task } from "./all_study_comp/App_old";
import { Box, Checkbox } from "@mui/material";
import { getListItemSx } from "./styles/Todolost.styles";
import { EditableSpan } from "./components/editableSpan/EditableSpan";

type TaskElementType = Task & {
	removeTaskHandler: (taskId: string) => void
	changeTaskStatusHandler: (taskId: string, status: boolean) => void
	changeTitleValue: (value: string, id: string) => void
}

export const TaskElement = ({ id, title, isDone, removeTaskHandler, changeTaskStatusHandler, changeTitleValue }:TaskElementType) => {

	const onInputChange = (value: string) => {
		changeTitleValue(value, id)
	}


	return (
		<Box sx={getListItemSx(isDone)}>

			<Checkbox checked={isDone} size="small" color="secondary" sx={{marginRight: '10px'}}
				onChange={(e) => changeTaskStatusHandler(id, e.currentTarget.checked)} 
			/>
			<EditableSpan title={title} 
				onChange={onInputChange}
				removeItem={() => { removeTaskHandler(id) }}
			/>

		 </Box>
	)
}
