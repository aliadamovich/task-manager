import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from '../../all_study_comp/Button'
import s from './../../TodoList.module.css';
import { IconButton, TextField } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

type AddItemInputType = {
	addItem: (value: string) => void
	label: string
}

export const AddItemInput = ({ addItem, label }: AddItemInputType) => {

	const [itemValue, setItemValue] = useState<string>('');
	const [error, setError] = useState<null | string>(null);

	//изменения в инпуте
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setItemValue(e.currentTarget.value)
	}

	//добавление таски
	const addItemHandler = () => {
		if (itemValue.trim()) {
			addItem(itemValue.trim())
			setItemValue('')
		} else {
			setError('Field is required')
		}
	}

	//добавление таски по нажатию на Enter
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === 'Enter') {
			addItemHandler()
		}
	}

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			
				<TextField 
				label={label} variant="standard" color='secondary'
				// sx={{flexGrow: 1}}
				value={itemValue} 
				onChange={onChangeHandler} 
				onKeyUp={onKeyPressHandler} 
				helperText={error}
				error={!!error}
				fullWidth
				/>
				<IconButton title="+" onClick={addItemHandler} color="secondary">
					<ControlPointIcon />
				</IconButton>
				</div>
			
	)
}

