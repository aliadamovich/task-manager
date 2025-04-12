import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'

export type MenuAction = 'open' | 'edit' | 'remove'

type Props = {
	availableActions: MenuAction[]
	anchorEl: null | HTMLElement
	onMenuClose: () => void
	onOpen?: () => void
	onEdit: () => void
	onDelete: () => void
}

export const ActionsMenu = ({ anchorEl, availableActions, onMenuClose, onDelete, onEdit, onOpen }: Props) => {

	const handleItemClick = (callback?: () => void) => {
		if (callback) callback()
		onMenuClose()
	}

	return (
		<Menu
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={onMenuClose}
			onClick={(e) => e.stopPropagation()}
		>
			{availableActions.includes('open') && <MenuItem onClick={() => { handleItemClick(onOpen) }}>Open</MenuItem>}
			{availableActions.includes('edit') && <MenuItem onClick={() => { handleItemClick(onEdit) }}>Edit</MenuItem>}
			{availableActions.includes('remove') && <MenuItem onClick={() => { handleItemClick(onDelete) }}>Remove</MenuItem>}
		</Menu>
	)
}

