import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ModalContainer } from "../../../../../common/components/modal/Modal"
import bg from 'assets/images/back_task.jpg'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css'
import * as Emoji from "quill-emoji";
import { TaskDomainType } from "features/todolostsList/model/tasksSlice"
import styles from './TaskModal.style.module.scss'
import { TaskSelects } from "./taskSelects/TaskSelects"
import { updateTaskApiModel } from "features/todolostsList/lib/utils/updateTaskModel"
import { useUpdateTaskMutation } from "features/todolostsList/api/tasksApi"

type Props = {
	openModal: boolean
	setOpenModal: (openModal: boolean) => void
	task: TaskDomainType
	todolistId: string
}

Quill.register('modules/emoji', Emoji);


export const TaskModal = ({ task, todolistId, openModal, setOpenModal}: Props) => {
	const { id: taskId, title, status, taskEntityStatus, description, priority } = task;

	const [isExpanded, setIsExpanded] = useState(false);
	const [text, setText] = useState(description || '');
	const [updateTask] = useUpdateTaskMutation()
	
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
			['emoji'], 
		],
		'emoji-toolbar': true,
		'emoji-shortname': true,
	}

	const changeDescriptionHandler = () => {
		const updatedModel = updateTaskApiModel(task, {description: text})
		updateTask({ taskId, todolistId, apiModel: updatedModel })
			.then(() => {
				setIsExpanded(false)
			})
	}


	return (
		<ModalContainer openModal={openModal} setOpenModal={setOpenModal}>
			<Card sx={{ minWidth: 450, maxWidth: 850, overflow: 'auto'}}>
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
					<Typography variant="body2" component="p" sx={{ margin: '15px 0 10px' }}>Description:</Typography>
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
					
					<TaskSelects task={task} todolistId={todolistId}/>
					
				</CardContent>
				<CardActions>
					{isExpanded &&
						<Button
							size="small"
							onClick={changeDescriptionHandler}
							disabled={taskEntityStatus === 'loading'}
							variant='contained'
						>Add description
					</Button>}
				</CardActions>
				
			</Card>
			
		</ModalContainer>
	)
}
