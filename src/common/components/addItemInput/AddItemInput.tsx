import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import { ResultCode } from "common/enums/enum"

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

	const addItemHandler = () => {
		if (itemValue.trim()) {
			addItem(itemValue.trim())
				.then((res) => {
					if (res.resultCode === ResultCode.Success || res.data.resultCode === ResultCode.Success) {
						setItemValue("")
					}
				})
		} else {
			setError("Field is required")
		}
	}

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
