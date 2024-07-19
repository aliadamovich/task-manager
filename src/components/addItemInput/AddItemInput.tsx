import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from '../../Button'
import s from './../../TodoList.module.css';

type AddItemInputType = {
	addItem: (value: string) => void
}

export const AddItemInput = ({ addItem }: AddItemInputType) => {

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
		<div>
			<input value={itemValue} 
			onChange={onChangeHandler} 
			onKeyUp={onKeyPressHandler} 
			className={error ? s.error : ''}
			// ref={inputRef}
			/>
			<Button title="+" onClick={addItemHandler} />
			{error && <div className={s.errorMessage}>{error}</div>}
		</div>
	)
}

