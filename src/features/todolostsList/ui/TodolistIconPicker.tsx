import { Popover, IconButton, Box } from '@mui/material'
import { EmojiEmotions } from '@mui/icons-material'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import React, { useState } from 'react'
import AddReactionIcon from '@mui/icons-material/AddReaction';


const getEmojiFromLS = (todolistId: string) => {
	const items = localStorage.getItem('todolistIcons')
	if(!items) return undefined
	const parsed = JSON.parse(items)
	return parsed[todolistId]
}

const setItemToLS = (emoji: string, todolistId : string) => {
	const items = localStorage.getItem('todolistIcons')
	const parsed = items ? JSON.parse(items) : {}
	const updated = { ...parsed, [todolistId]: emoji}
	localStorage.setItem('todolistIcons', JSON.stringify(updated))
}

export const TodolistIconPicker = ({ todolistId }: {todolistId: string}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [titleIcon, setTitleIcon] = useState(getEmojiFromLS(todolistId));
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleEmojiSelect = (emojiData: EmojiClickData) => {
		setTitleIcon(emojiData.emoji)
		setItemToLS(emojiData.emoji, todolistId)
		handleClose()
	}

	const open = Boolean(anchorEl)

	return (
		<>
			<IconButton onClick={handleClick} sx={{color: 'gray'}} >
				{titleIcon || <AddReactionIcon fontSize="small" />}
			</IconButton>
			<Popover

				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				<EmojiPicker onEmojiClick={handleEmojiSelect} height={350} width={300} />
			</Popover>
		</>
	)
}
