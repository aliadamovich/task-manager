import { IconButton, ListItem, TextField } from "@mui/material"
import React, { useCallback, useState } from "react"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {  ItemWithHoverStyle } from "../../styles/Todolost.styles";
import BorderColorIcon from '@mui/icons-material/BorderColor';


type EditableSpanType = {
	title: string
	onChange: (newTitle: string) => void
	removeItem: () => void
}

export const EditableSpan = React.memo(({ title, onChange, removeItem }: EditableSpanType) => {
	console.log('editable');
	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>('')

	const onBlurHandler = useCallback(() => {
		setEditMode(false)
		onChange(titleValue)
	}, [onChange])

	const onEditButtonClick = useCallback(() => {
		setEditMode(true)
		setTitleValue(title)
	}, [title])

	const onRemoveButtonClick = useCallback(() => {
		removeItem()
	}, [removeItem])

	return (

		<ListItem disablePadding sx={ItemWithHoverStyle}>
			
			{editMode ?
				<>
					<TextField type="text" variant="standard" color="secondary" autoFocus
						value={titleValue}
						onBlur={onBlurHandler}
						onChange={(e) => { setTitleValue(e.currentTarget.value) }}
					/>
					<IconButton sx={{ display: 'block', p: '2px' }}
						onClick={onEditButtonClick}
					>
						<BorderColorIcon fontSize="small" />
					</IconButton>
				</>
			:
				<>
					<span>{title}</span>
					<div style={{display: 'flex', gap: '7px'}}>
						<IconButton sx={{ display: 'none', p: '2px' }}
							onClick={onEditButtonClick}
						>
							<BorderColorIcon fontSize="small" />
						</IconButton>
	
						<IconButton sx={{ display: 'none', p: '2px' }}
							onClick={onRemoveButtonClick}
						>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton>
					</div>
				</>
			}
		
		</ListItem>
			
	)
})