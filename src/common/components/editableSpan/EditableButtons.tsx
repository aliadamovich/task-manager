import React, { MouseEvent } from 'react'
import s from './EditableSpan.styles.module.scss'
import { IconButton } from '@mui/material'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { RiDragMove2Fill } from "react-icons/ri";
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';

type Props = {
	disabled?: boolean
	onEditButtonClick: () => void
	deleteButtonHandler: () => void
}



export const EditableButtons = ({ disabled, onEditButtonClick, deleteButtonHandler }: Props) => {
	
	const onDeleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		deleteButtonHandler()
	}
	
	return (
		<div className={s.buttonsContainer}>
			<IconButton onClick={onEditButtonClick} disabled={disabled}>
				<BorderColorIcon fontSize="small" />
			</IconButton>

			<IconButton onClick={onDeleButtonClick} disabled={disabled}>
				<DeleteOutlineIcon fontSize="small" />
			</IconButton>

			{/* {listeners && <IconButton {...listeners} {...attributes} style={{ cursor: 'move' }}>
				<RiDragMove2Fill fontSize="medium" />
			</IconButton>} */}
		</div>
	)
}

