import { TextField, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react"

type EditableSpanType = {
	title: string
	onChange: (newTitle: string) => void
}

export const EditableSpan = ({ title, onChange }: EditableSpanType) => {
	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>('')

	const onSpanClickHandler = () => {
		setEditMode(true)
		setTitleValue(title)
	}

	const onBlurHandler = () => {
		setEditMode(false)
		onChange(titleValue)
	}

	const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleValue(e.currentTarget.value)
	} 

		return (
			editMode
			? <TextField type="text" variant="standard" color="secondary" value={titleValue} onBlur={onBlurHandler} onChange={onInputChangeHandler} autoFocus/>
			: <Typography 
			variant='body1' 
			component='span' 
			onDoubleClick={onSpanClickHandler}
					sx={{ flexGrow: 1, cursor: 'pointer'}}
			>{title}</Typography> 
		)
}