import { v1 } from "uuid"
import {
	addTodolistTC,
	changeTodolistFilter,
	changeTodolistTitleTC,
	removeTodolistTC,
	setTodolistsTC,
	TodolistDomainType,
	todolistReducer,
	TodolistsInitialState,
} from "features/todolostsList/model/todolistSlice"
import { TestAction } from "common/types/types"

let todolistId1: string
let todolistId2: string
let startState: TodolistsInitialState

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	// 1. Стартовый state
	startState = [
		{
			id: todolistId1,
			title: "What to learn",
			filter: "All",
			addedDate: "",
			order: 0,
			entityStatus: "idle",
		},
		{
			id: todolistId2,
			title: "What to buy",
			filter: "All",
			addedDate: "",
			order: 0,
			entityStatus: "idle",
		},
	]
})

test("correct todolist should be removed", () => {
	// 2. Действие
	const action: TestAction<typeof removeTodolistTC.fulfilled> = {
		type: removeTodolistTC.fulfilled.type,
		payload: {
			id: todolistId1,
		},
	}
	const endState = todolistReducer(startState, action)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
	// в массиве останется один тудулист
	expect(endState.length).toBe(1)
	// удалится нужный тудулист, а не любой
	expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
	const todolistTitle = "New todo"

	const action: TestAction<typeof addTodolistTC.fulfilled> = {
		type: addTodolistTC.fulfilled.type,
		payload: {
			todolist: {
				id: "todolistId3",
				title: todolistTitle,
				addedDate: "",
				order: 0,
			},
		},
	}

	const endState = todolistReducer(startState, action)

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(todolistTitle)
	expect(endState[2].title).toBe("What to buy")
})

test("correct todolist should change its name", () => {
	const action: TestAction<typeof changeTodolistTitleTC.fulfilled> = {
		type: changeTodolistTitleTC.fulfilled.type,
		payload: {
			todolistId: todolistId2,
			title: "New Todolist",
		},
	}

	const endState = todolistReducer(startState, action)

	expect(endState[0].title).toBe("What to learn")
	expect(endState[1].title).toBe(action.payload.title)
})

test("correct filter of todolist should be changed", () => {
	const endState = todolistReducer(startState, changeTodolistFilter({ id: todolistId2, filter: "Completed" }))

	expect(endState[0].filter).toBe("All")
	expect(endState[1].filter).toBe("Completed")
})

test("todolists should be set to state", () => {
	const action: TestAction<typeof setTodolistsTC.fulfilled> = {
		type: setTodolistsTC.fulfilled.type,
		payload: {
			todolists: [
				{
					id: "todolistId1",
					title: "What to learn",
					addedDate: "",
					order: 0,
				},
			],
		},
	}
	const endState = todolistReducer([], action)

	expect(endState.length).toBe(1)
})
