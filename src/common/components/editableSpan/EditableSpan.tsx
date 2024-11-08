import { Box, Button, IconButton, ListItem, Modal, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { unwrapResult } from "@reduxjs/toolkit"
import s from './EditableSpan.styles.module.scss'
import { ModalContainer } from "../modal/Modal"
import { DraggableAttributes } from "@dnd-kit/core/dist/hooks/useDraggable"
import { RiDragMove2Fill } from "react-icons/ri";
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';

type Props = {
	title: string
	onChange: (newTitle: string) => Promise<any>
	removeItem: () => void
	disabled?: boolean
	attributes?: DraggableAttributes
	listeners?: Record<string, Function>;
}

export const EditableSpan = React.memo(({ title, disabled, onChange, removeItem, attributes, listeners }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>("")
	const [error, setError] = useState<null | string>(null)
	const [openModal, setOpenModal] = React.useState(false);

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
						<IconButton onClick={onEditButtonClick} disabled={disabled}>
							<BorderColorIcon fontSize="small" />
						</IconButton>

							<IconButton onClick={() => { setOpenModal(true) }} disabled={disabled}>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton>
							{listeners && <IconButton {...listeners} {...attributes} style={{cursor:'move'}}>
								<RiDragMove2Fill fontSize="medium" />
							</IconButton>}
					</div>
				</>
			)}
			{openModal && <ModalContainer modalText="Delete this item?" modalClickHandler={onRemoveButtonClick} openModal={openModal} setOpenModal={setOpenModal}/>}
		</ListItem>
	)
})
