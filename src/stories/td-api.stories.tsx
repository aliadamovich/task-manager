import { useEffect, useState } from "react"
import axios from 'axios'
import React from 'react'
import { todolistsAPI, TodolisType } from "../api/todolists-api"

export default {
	title: "API"
}


export const GetTodolists = () => {

	const [state, setState] = useState<any>(null)

	useEffect( () => {
		todolistsAPI.getTodolists()
			.then( (res) => {
				// debugger
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

	const [state, setState] = useState(null)

	useEffect(() => {

		todolistsAPI.createTodolists('bla bla bla')
			.then((res) => {
				// debugger
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {

	const [state, setState] = useState(null)

	useEffect(() => {
		const todolistId = 'efc40e89-accd-4446-9903-6b0ae57f098b'
		todolistsAPI.deleteTodolist(todolistId)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {

	const [state, setState] = useState(null)

	useEffect(() => {
		const todolistId = '3955828a-2d0d-48bf-8234-293a098890ad'
		todolistsAPI.updateTodolist(todolistId, 'new title')
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

//!=============================================================================//

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todolistId = '6ca24bbe-6112-4bfc-830c-7f694726df4f'
		todolistsAPI.getTasks(todolistId)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}