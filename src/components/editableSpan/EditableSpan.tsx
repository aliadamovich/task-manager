import { IconButton, ListItem, TextField } from "@mui/material"
import React, { useState } from "react"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ItemWithHoverStyle } from "../../styles/Todolost.styles";
import BorderColorIcon from '@mui/icons-material/BorderColor';


type EditableSpanType = {
	title: string
	onChange: (newTitle: string) => void
	removeItem: () => void
	disabled?: boolean
}

export const EditableSpan = React.memo(({ title, disabled, onChange, removeItem }: EditableSpanType) => {
	const [editMode, setEditMode] = useState(false)
	const [titleValue, setTitleValue] = useState<string>('')
	
	const onBlurHandler = () => {
		setEditMode(false)
		onChange(titleValue)
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
			
			{editMode ?
				<>
					<TextField type="text" variant="standard" color="secondary" autoFocus
						value={titleValue}
						sx={{width: '100%'}}
						onBlur={onBlurHandler}
						onChange={(e) => { setTitleValue(e.currentTarget.value) }}
					/>
					<IconButton sx={{ display: 'block', p: '2px' }}
					>
						<BorderColorIcon fontSize="small" />
					</IconButton>
				</>
			:
				<>
					<span style={{ wordBreak: 'break-word' }}>{title}</span>
						<div style={{flex: '0 0 auto', padding: '0 2px'}}>
							<IconButton 
								onClick={onEditButtonClick}
								disabled={disabled}
							>
								<BorderColorIcon fontSize="small" />
							</IconButton>
		
							<IconButton 
								onClick={onRemoveButtonClick}
								disabled={disabled}
							>
								<DeleteOutlineIcon fontSize="small" />
							</IconButton>
						</div>
				</>
			}
		
		</ListItem>
			
	)
})