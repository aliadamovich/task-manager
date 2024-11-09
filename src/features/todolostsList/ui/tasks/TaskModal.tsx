import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, ListItem, Modal, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { unwrapResult } from "@reduxjs/toolkit"
import s from './EditableSpan.styles.module.scss'
import { ModalContainer } from "../../../../common/components/modal/Modal"
import { DraggableAttributes } from "@dnd-kit/core/dist/hooks/useDraggable"
import { EditableSpan } from "common/components"
import bg from 'assets/images/back_task.jpg'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css'
import * as Emoji from "quill-emoji";
type Props = {
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
	taskHeader: string
	rest: any
}
Quill.register('modules/emoji', Emoji);


export const TaskModal = (props: Props) => {
	
	const taskCkickHandler = (e: any) => {
		props.setOpenModal(true)
	}

	const [text, setText] = useState('');

	const handleChange = (html: any) => {
		setText(html);
	}

	const formats = [
		'font', 'size',
		'bold', 'italic', 'underline', 'strike',
		'color', 'background',
		'script',
		'header', 'blockquote', 'code-block',
		'indent', 'list',
		'direction', 'align',
		'link', 'image', 'video', 'formula',
	]

	const modules = {
		toolbar: {
			container: "#toolbar",
		}
	}
	return (

		<ModalContainer {...props} >
				<Card sx={{ minWidth: 345, height: 600}}>
					<CardMedia
						component="img"
						alt="green iguana"
						height="120"
						image={bg}
					/>
					<CardContent>
						<Typography gutterBottom variant="h4" component="h2">
						{props.taskHeader}
						</Typography>
					<Typography>
						{/* {props.description} */}
					</Typography>
					<ReactQuill
						value={text}
						onChange={handleChange}
						// modules={modules}
						modules={{
							toolbar: [
								[{ 'font': [] }],
								[{ 'header': [1, 2, false] }],
								['bold', 'italic', 'underline'],
								[{ 'list': 'ordered' }, { 'list': 'bullet' }],
								['link', 'image'],
								['emoji'], // добавляем кнопку эмодзи
							],
							'emoji-toolbar': true,
							'emoji-textarea': true,
							'emoji-shortname': true,
						}}
					/>
					</CardContent>
					<CardActions>
						<Button size="small">Share</Button>
						<Button size="small">Learn More</Button>
					</CardActions>
				</Card>
			
		</ModalContainer>
	)
}
