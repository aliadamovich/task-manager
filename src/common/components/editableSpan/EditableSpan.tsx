import React, { MouseEvent, useState } from 'react'
import s from './EditableSpan.styles.module.scss'
import { IconButton, ListItem, TextField } from '@mui/material'
import { EditableButtons } from './EditableButtons'
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { DraggableAttributes } from '@dnd-kit/core'
import { unwrapResult } from '@reduxjs/toolkit'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { RiDragMove2Fill } from "react-icons/ri";

type Props = {
	title: string
	onChange: (newTitle: string) => Promise<any>
	removeItemHandler: () => void
	disabled?: boolean
	attributes?: DraggableAttributes
	listeners?: Record<string, Function>
	isWithModal?: boolean
	unwrapModalHandler?: () => void
}


export const EditableSpan = ({ title, disabled, onChange, removeItemHandler, attributes, listeners, isWithModal, unwrapModalHandler }: Props) => {

	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>("")
	const [error, setError] = useState<null | string>(null)
	const [deleteModal, setDeleteModal] = React.useState(false);

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

	const editButtonClickHandler = () => {
		setEditMode(true)
		setTitleValue(title)
	}

	const spanClickHandler = () => {
		if (!isWithModal) return;
		unwrapModalHandler?.()
	}

	const deleteButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setDeleteModal(true)
	}

	return (
		<ListItem disablePadding sx={ItemWithHoverStyle} onClick={spanClickHandler}>
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
						sx={{ width: "100%" }}
						onBlur={onInputBlur}
						onChange={(e) => {
							setTitleValue(e.currentTarget.value)
						}}
					/>
					<IconButton
						disabled={disabled}
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
						<IconButton onClick={editButtonClickHandler} disabled={disabled}>
							<BorderColorIcon fontSize="small" />
						</IconButton>

						<IconButton onClick={deleteButtonClickHandler} disabled={disabled}>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton>

						{listeners && <IconButton {...listeners} {...attributes} style={{ cursor: 'move' }}>
							<RiDragMove2Fill fontSize="medium" />
						</IconButton>}
					</div>
				</>
			)}
			{deleteModal &&
				<DeleteConfirmationModal openModal={deleteModal} setOpenModal={setDeleteModal} removeItemHandler={removeItemHandler} />}
		</ListItem>
	)
}

