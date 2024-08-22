import { TextField, Typography } from "@mui/material"
import { useState } from "react"
import { editableSpanSx } from "../../Todolost.styles"

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

		return (
			editMode ?
				<TextField type="text" variant="standard" color="secondary" autoFocus value={titleValue} 
					onBlur={onBlurHandler} 
					onChange={(e) => { setTitleValue(e.currentTarget.value) }} 
				/>
				:
				<span onDoubleClick={onSpanClickHandler}>{title}</span>
		)
}