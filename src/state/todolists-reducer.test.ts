import { todoListsType } from './../App';
import { v1 } from "uuid";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './todolists-reducer';

test('correct todolist sould be deleted', () => {

	const todoList1 = v1();
	const todoList2 = v1();
	const todoList3 = v1();
	const todoList4 = v1();
	const todoList5 = v1();
	const todoList6 = v1();

	const startState: todoListsType[] = [
		{ id: todoList1, title: "What to learn:", filter: "All" },
		{ id: todoList2, title: "What to buy:", filter: "All" },
		{ id: todoList3, title: "What to read:", filter: "All" },
		{ id: todoList4, title: "What to do:", filter: "All" },
		{ id: todoList5, title: "What to clean:", filter: "All" },
		{ id: todoList6, title: "Where to go:", filter: "All" },
	];

	const endState = todolistsReducer( startState, RemoveTodolistAC(todoList1) )

	expect(endState.length).toBe(5)
	expect(endState[0].id).toBe(todoList2);
})

test("correct todolist sould be added", () => {
  const todoList1 = v1();
  const todoList2 = v1();
  const todoList3 = v1();
  const todoList4 = v1();
  const todoList5 = v1();
  const todoList6 = v1();

	const newTodoList = 'New Todolist';

  const startState: todoListsType[] = [
    { id: todoList1, title: "What to learn:", filter: "All" },
    { id: todoList2, title: "What to buy:", filter: "All" },
    { id: todoList3, title: "What to read:", filter: "All" },
    { id: todoList4, title: "What to do:", filter: "All" },
    { id: todoList5, title: "What to clean:", filter: "All" },
    { id: todoList6, title: "Where to go:", filter: "All" },
  ];

  const endState = todolistsReducer(startState, AddTodolistAC(newTodoList));

  expect(endState.length).toBe(7);
  expect(endState[6].title).toBe(newTodoList);
  expect(endState[6].filter).toBe('All');
});


test("correct todolist sould change its name", () => {
  const todoList1 = v1();
  const todoList2 = v1();
  const todoList3 = v1();
  const todoList4 = v1();
  const todoList5 = v1();
  const todoList6 = v1();

  const newTodoList = "New Todolist";

  const startState: todoListsType[] = [
    { id: todoList1, title: "What to learn:", filter: "All" },
    { id: todoList2, title: "What to buy:", filter: "All" },
    { id: todoList3, title: "What to read:", filter: "All" },
    { id: todoList4, title: "What to do:", filter: "All" },
    { id: todoList5, title: "What to clean:", filter: "All" },
    { id: todoList6, title: "Where to go:", filter: "All" },
  ];

  const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todoList4, newTodoList));

  expect(endState.length).toBe(6);
  expect(endState[3].title).toBe(newTodoList);
  expect(endState[4].title).toBe("What to clean:");
});

test("correct todolist filter should be changed", () => {
  const todoList1 = v1();
  const todoList2 = v1();
  const todoList3 = v1();
  const todoList4 = v1();
  const todoList5 = v1();
  const todoList6 = v1();

  const newFilter = "Completed";

  const startState: todoListsType[] = [
    { id: todoList1, title: "What to learn:", filter: "All" },
    { id: todoList2, title: "What to buy:", filter: "All" },
    { id: todoList3, title: "What to read:", filter: "All" },
    { id: todoList4, title: "What to do:", filter: "All" },
    { id: todoList5, title: "What to clean:", filter: "All" },
    { id: todoList6, title: "Where to go:", filter: "All" },
  ];


  const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todoList4, newFilter));

  expect(endState[3].filter).toBe(newFilter);
  expect(endState[4].filter).toBe("All");
});