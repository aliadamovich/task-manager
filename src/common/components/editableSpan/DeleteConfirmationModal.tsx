import React, { MouseEvent } from 'react'
import { ModalContainer } from '../modal/Modal'
import { Button, Typography } from '@mui/material'

type Props = {
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
	removeItemHandler: () => void
}

export const DeleteConfirmationModal = (props: Props) => {
	const { openModal, setOpenModal, removeItemHandler } = props

	const removeItemCallback = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		removeItemHandler()
	}

	const cancelRemoveItem = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setOpenModal(false) 
	}

	return (
		<ModalContainer openModal={openModal} setOpenModal={setOpenModal}>
			<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
				Delete this item?
			</Typography>
			<Button onClick={removeItemCallback}>Yes</Button>
			<Button color="secondary" onClick={cancelRemoveItem}>No</Button>
		</ModalContainer>
	)
}
