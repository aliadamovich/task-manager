import { Box, Typography, Modal, Button, useTheme } from '@mui/material'
import React from 'react'

type Props = {
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
	children: React.ReactNode
}
export const ModalContainer = ({ openModal, children, setOpenModal }: Props) => {

	const handleClose = (e: any) => {
		e.stopPropagation()
		setOpenModal(false)
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		minWidth: 400,
		bgcolor: 'background.paper',
		borderRadius: '6px',
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
			<Box sx={style}>{children}</Box>
		</Modal>
	)
}

