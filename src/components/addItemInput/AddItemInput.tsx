import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { IconButton, TextField } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

export type AddItemInputType = {
	addItem: (value: string) => void
	label: string
	disabled?: boolean
}

export const AddItemInput = React.memo(({ addItem, label, disabled }: AddItemInputType) => {

	const [itemValue, setItemValue] = useState<string>('');
	const [error, setError] = useState<null | string>(null);

	//изменения в инпуте
	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setItemValue(e.currentTarget.value)
	}, [])

	//добавление таски
	const addItemHandler = useCallback(() => {
		if (itemValue.trim()) {
			addItem(itemValue.trim())
			setItemValue('')
		} else {
			setError('Field is required')
		}
	}, [addItem, itemValue])

	//добавление таски по нажатию на Enter
	const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
		if (error ) {
			setError(null)
		}

		if (e.key === 'Enter') {
			addItemHandler()
		}
	}, [])

	return (
		<div style={{ display: 'flex', width: '100%' }}>
		
			<TextField 
				label={label} variant="standard" color='secondary'
				value={itemValue}
				onChange={onChangeHandler} 
				onKeyUp={onKeyPressHandler} 
				helperText={error}
				error={!!error}
				disabled={disabled}
				fullWidth
			/>
			<IconButton title="+" onClick={addItemHandler} color="secondary" disabled={disabled}>
				<ControlPointIcon />
			</IconButton>
			</div>
	)
})

