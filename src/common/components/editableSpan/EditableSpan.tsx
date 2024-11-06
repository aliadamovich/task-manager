import { IconButton, ListItem, TextField } from "@mui/material"
import React, { useState } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { unwrapResult } from "@reduxjs/toolkit"
import s from './EditableSpan.styles.module.scss'

type Props = {
	title: string
	onChange: (newTitle: string) => Promise<any>
	removeItem: () => void
	disabled?: boolean
}

export const EditableSpan = React.memo(({ title, disabled, onChange, removeItem }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>("")
	const [error, setError] = useState<null | string>(null)

	const onInputBlur = () => {

		onChange(titleValue)
			.then(unwrapResult)
			.then(() => {
				setEditMode(false)
			})
			.catch((err) => {
				if (err.messages) {
					setError(err.messages[0])
				}
			})
	}

	const onEditButtonClick = () => {
		setEditMode(true)
		setTitleValue(title)
	}

	const onRemoveButtonClick = () => {
		removeItem()
	}

	return (
		<ListItem disablePadding sx={ItemWithHoverStyle}>
			{editMode ? (
				<>
					<TextField
						type="text"
						variant="standard"
						color="secondary"
						autoFocus
						value={titleValue}
						error={!!error}
						helperText={error}
						sx={{width: "100%"}}
						onBlur={onInputBlur}
						onChange={(e) => {
							setTitleValue(e.currentTarget.value)
						}}
					/>
					<IconButton
						sx={{
							display: "block",
							p: "2px",
						}}
					>
						<BorderColorIcon fontSize="small" />
					</IconButton>
				</>
			) : (
				<>
					<span className={s.spanText}>{title}</span>
					<div className={s.buttonsContainer}>
						<IconButton onClick={onEditButtonClick} disabled={disabled}>
							<BorderColorIcon fontSize="small" />
						</IconButton>

						<IconButton onClick={onRemoveButtonClick} disabled={disabled}>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton>
					</div>
				</>
			)}
		</ListItem>
	)
})
