import { ChangeEvent, useState } from "react"

type EditableSpanType = {
	title: string
	onChange: (value: string) => void
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
			editMode ? 
				<input type="text" value={titleValue} onBlur={onBlurHandler} onChange={onInputChangeHandler} autoFocus/> 
			: <span onDoubleClick={onSpanClickHandler}>{title}</span> 
		)
}