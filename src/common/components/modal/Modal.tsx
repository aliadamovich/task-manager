import { Box, Typography, Modal, Button, useTheme } from '@mui/material'
import React from 'react'

type Props = {
	modalText: string
	modalClickHandler: () => void
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
}
export const ModalContainer = ({ modalText: text, modalClickHandler, openModal, setOpenModal }: Props) => {

	const handleClose = () => setOpenModal(false);
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	};


	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: 2}}>
					{text}
				</Typography>
				<Button onClick={modalClickHandler}>Yes</Button>
				<Button variant='contained' color="secondary" onClick={handleClose}>No</Button>
			</Box>
		</Modal>
	)
}

