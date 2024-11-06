import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import { unwrapResult } from "@reduxjs/toolkit"

type Props = {
	addItem: (value: string) => Promise<any>
	label: string
	disabled?: boolean
}

export const AddItemInput = React.memo(({ addItem, label, disabled }: Props) => {
	const [itemValue, setItemValue] = useState<string>("")
	const [error, setError] = useState<null | string>(null)

	const changeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setItemValue(e.currentTarget.value)
	}, [])

	const addItemHandler = useCallback(() => {
		if (itemValue.trim()) {
			addItem(itemValue.trim())
				.then(unwrapResult)
				.then(() => {
					setItemValue("")
				})
				.catch((err) => {
					if(err.messages) {
					setError(err.messages[0])
					}
				})
		} else {
			setError("Field is required")
		}
	}, [addItem, itemValue])

	//добавление таски по нажатию на Enter
	const keyPressHandler = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (error) {
				setError(null)
			}
			if (e.key === "Enter") {
				addItemHandler()
			}
		},
		[error, addItemHandler],
	)

	return (
		<div style={{ display: "flex", width: "100%" }}>
			<TextField
				label={label}
				variant="standard"
				color="secondary"
				value={itemValue}
				onChange={changeInputHandler}
				onKeyUp={keyPressHandler}
				helperText={error}
				error={!!error}
				disabled={disabled}
				fullWidth
			/>
			<IconButton title="+" onClick={addItemHandler} color="secondary" disabled={disabled} style={{ minWidth: "60px" }}>
				<ControlPointIcon />
			</IconButton>
		</div>
	)
})
