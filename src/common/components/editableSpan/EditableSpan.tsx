import React, { MouseEvent, MouseEventHandler, useState } from 'react'
import s from './EditableSpan.styles.module.scss'
import { IconButton, ListItem, TextField, useTheme } from '@mui/material'
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { ResultCode } from 'common/enums/enum'
import OpenInNew from '@mui/icons-material/OpenInNew'
import { DraggableAttributes } from '@dnd-kit/core/dist/hooks/useDraggable'
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import { Box, Menu, MenuItem, Paper } from "@mui/material"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import MoreVertIcon from "@mui/icons-material/MoreVert"

type Props = {
	title: string
	onChange: (newTitle: string) => Promise<any>
	removeItemHandler: () => void
	disabled?: boolean
	isWithModal?: boolean
	unwrapModalHandler?: () => void
	attributes?: DraggableAttributes
	listeners?: Record<string, Function>;
}


export const EditableSpan = ({ title, disabled, onChange, removeItemHandler, isWithModal, attributes, listeners, unwrapModalHandler }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [hovered, setHovered] = useState(false)

	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>("")
	const [error, setError] = useState<null | string>(null)
	const [deleteModal, setDeleteModal] = React.useState(false);

	const theme = useTheme()
	const onInputBlur = () => {
		if (titleValue.trim()) {
			onChange(titleValue)
				.then((res) => {
					if (res.data.resultCode === ResultCode.Success) {
						setEditMode(false)
					}
				})
		} else {
			setError('Field is required')
		}
	}

	const editButtonClickHandler = () => {
		// e.stopPropagation()
		setEditMode(true)
		setTitleValue(title)
	}

	// const openTaskClickHandler = () => {
	// 	unwrapModalHandler?.()
	// }

	const spanClickHandler = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		console.log('hbj');
		if (!isWithModal) return;
		
		unwrapModalHandler?.()
	}

	const deleteButtonClickHandler = () => {
		// e.stopPropagation()
		setDeleteModal(true)
	}

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleItemClick = (callback?: () => void) => {
		if (callback) callback()
		handleMenuClose()
	}

	return (
		<ListItem disablePadding sx={ItemWithHoverStyle(theme)} 
		onClick={spanClickHandler}
		>
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
							e.stopPropagation()
							setTitleValue(e.currentTarget.value)
						}}
						onClick={(e) => e.stopPropagation()}
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
							{/* {!isWithModal &&
								<IconButton onClick={editButtonClickHandler} disabled={disabled}>
									<BorderColorIcon fontSize="small" />
								</IconButton>
							} */}
							{/* <IconButton onClick={deleteButtonClickHandler} disabled={disabled}>
								<DeleteOutlineIcon fontSize="small" />
							</IconButton> */}
							{listeners && <IconButton {...listeners} {...attributes} style={{ cursor: 'move' }}>
								<DragHandleOutlinedIcon fontSize="medium" />
							</IconButton>}

							<IconButton size="small" onClick={handleMenuOpen}>
								<MoreVertIcon fontSize="small" />
							</IconButton>

							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
								onClick={(e) => e.stopPropagation()}
							>
								<MenuItem onClick={() => {}}>Open</MenuItem>
								<MenuItem onClick={() => handleItemClick(editButtonClickHandler)}>Edit</MenuItem>
								<MenuItem onClick={() => handleItemClick(deleteButtonClickHandler)}>Remove</MenuItem>
							</Menu>
						</div>
					</>
			)}
			{deleteModal &&
				<DeleteConfirmationModal openModal={deleteModal} setOpenModal={setDeleteModal} removeItemHandler={removeItemHandler} />}
		</ListItem>
	)
}

