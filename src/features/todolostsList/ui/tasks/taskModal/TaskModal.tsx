import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, ListItem, Modal, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { ItemWithHoverStyle } from "styles/Todolost.styles"
import { unwrapResult } from "@reduxjs/toolkit"
import s from './EditableSpan.styles.module.scss'
import { ModalContainer } from "../../../../../common/components/modal/Modal"
import { DraggableAttributes } from "@dnd-kit/core/dist/hooks/useDraggable"
import { EditableSpan } from "common/components"
import bg from 'assets/images/back_task.jpg'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css'
import * as Emoji from "quill-emoji";
import { useAppDispatch } from "app/store"
import { TaskDomainType, updateTaskTC } from "features/todolostsList/model/tasksSlice"
import styles from './TaskModal.style.module.scss'
import { TaskSelects } from "./taskSelects/TaskSelects"

type Props = {
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
	task: TaskDomainType
	todolistId: string
}

Quill.register('modules/emoji', Emoji);


export const TaskModal = ({ task, todolistId, openModal, setOpenModal}: Props) => {
	const { id: taskId, title, status, taskEntityStatus, description, priority } = task;
	const taskCkickHandler = (e: any) => {
		setOpenModal(true)
	}
	const [isExpanded, setIsExpanded] = useState(false);
	const [text, setText] = useState(description || '');
	const dispatch = useAppDispatch();

	const handleQuillChange = (value: string) => {
		setText(value)
	}
	useEffect(() => {
		setText(description || '');
	}, [description]);
	
	const modules = {
		toolbar: [
			[{ 'font': [] }],
			[{ 'header': [1, 2, false] }],
			['bold', 'italic', 'underline'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			['link', 'image'],
			['emoji'], // Добавляем кнопку эмодзи
		],
		'emoji-toolbar': true,
		'emoji-shortname': true,
	}

	const changeDescriptionHandler = () => {
		dispatch(updateTaskTC({taskId, todolistId, model: {description: text}})).then(() => {
			setIsExpanded(false)
		})
	}

	const changeSelectHandler = (v: string) => {
	}

	return (
		<ModalContainer openModal={openModal} setOpenModal={setOpenModal}>
			<Card sx={{ minWidth: 450, maxWidth: 850, height: 600 }}>
				<CardMedia
					component="img"
					alt="green iguana"
					height="120"
					image={bg}
				/>

				<CardContent>
					<Typography variant="h5" component="h2" className={styles.descriptionTitle} >
						{title}
					</Typography>
					<Typography variant="body2" component="span" sx={{ margin: '15px 0 5px' }}>Description:</Typography>
					{isExpanded ?
						<ReactQuill
							className={styles.editor}
							value={text}
							onChange={handleQuillChange}
							modules={modules}
						/>
						:
						<div className={styles.descriptionBlock}
							onClick={() => setIsExpanded(true)}
							dangerouslySetInnerHTML={{ __html: text || 'Add description here...' }}
						></div>}
					
					<TaskSelects status={status} priority={priority} taskId={taskId} todolistId={todolistId}/>
					
				</CardContent>
				<CardActions>
					{isExpanded &&
						<Button
							size="small"
							onClick={changeDescriptionHandler}
							disabled={taskEntityStatus === 'loading'}
							variant='contained'
						>Add description</Button>}
				</CardActions>
				
			</Card>
			
		</ModalContainer>
	)
}
