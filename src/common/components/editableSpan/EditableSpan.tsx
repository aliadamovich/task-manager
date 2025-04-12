import React, { CSSProperties, MouseEvent, MouseEventHandler, useState } from 'react'
import s from './EditableSpan.styles.module.scss'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { ResultCode } from 'common/enums/enum'
import OpenInNew from '@mui/icons-material/OpenInNew'
import { DraggableAttributes } from '@dnd-kit/core/dist/hooks/useDraggable'
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import { useTheme } from "@mui/material/styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ActionsMenu, MenuAction } from 'common/components/actionsMenu/ActionsMenu'



type Props = {
	title: string
	onChange: (newTitle: string) => Promise<any>
	onOpen?: () => void
	removeItemHandler: () => void
	disabled?: boolean
	availableActions: MenuAction[]
	attributes?: DraggableAttributes
	listeners?: Record<string, Function>
}


export const EditableSpan = (
	{ title, 
		disabled, 
		onChange,
		onOpen,
		removeItemHandler,
		availableActions,
		attributes, 
		listeners,
	 }: Props) => {

	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string | null>(null)
	const [error, setError] = useState<null | string>(null)
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const theme = useTheme()
	const onInputBlur = () => {
		if (titleValue && titleValue.trim()) {
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

	const onEdit = () => {
		setEditMode(true)
		setTitleValue(title)
	}


	const spanClickHandler = (e: MouseEvent<HTMLLIElement>) => {
		e.stopPropagation()
		onOpen?.()
	}

	const onDelete = () => {
		setDeleteModal(true)
	}

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	return (
		<ListItem disablePadding sx={ItemWithHoverStyle(theme)} 
			onClick={spanClickHandler} style={{ cursor: !availableActions.includes('open') ? 'default' : 'pointer'}}
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
						<span className={s.spanText}>{titleValue ?? title}</span>
						<div className={s.buttonsContainer}>
							{listeners && <IconButton {...listeners} {...attributes} style={{ cursor: 'grab' }}>
								<DragHandleOutlinedIcon fontSize="medium" />
							</IconButton>}

							<IconButton size="small" onClick={handleMenuOpen}>
								<MoreVertIcon fontSize="small" />
							</IconButton>

							<ActionsMenu 
								anchorEl={anchorEl}
								availableActions={availableActions} 
								onMenuClose={handleMenuClose}
								onOpen={onOpen}
								onDelete={onDelete}
								onEdit={onEdit}
								/>
						</div>
					</>
			)}
			{deleteModal &&
				<DeleteConfirmationModal openModal={deleteModal} setOpenModal={setDeleteModal} removeItemHandler={removeItemHandler} />}
		</ListItem>
	)
}

