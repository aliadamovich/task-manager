import { v1 } from "uuid";
import { setTodolistsAC, TodolistDomainType, todolistReducer } from "./todolist-reducer";
import { addTodolistAС, changeTodolistTitleAС, changeTodolistFilterAС, removeTodolistAС } from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[];


beforeEach(() => {
	 todolistId1 = v1();
  	todolistId2 = v1();

   // 1. Стартовый state
  startState = [
     { id: todolistId1, title: "What to learn", filter: "All", addedDate: '', order: 0, },
     { id: todolistId2, title: "What to buy", filter: "All", addedDate: '', order: 0,  },
   ];
})

test("correct todolist should be removed", () => {
  // 2. Действие

  const endState = todolistReducer(startState, removeTodolistAС(todolistId1));

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {

	const todolistTitle = 'New todo';

  const endState = todolistReducer(
    startState,
    addTodolistAС({
      id: "todolistId3",
      title: todolistTitle,
      addedDate: "",
      order: 0,
    })
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolistTitle);
  expect(endState[2].title).toBe("What to buy");
});

test("correct todolist should change its name", () => {

  const action = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id: todolistId2,
      title: "New Todolist",
    },
  };

	const endState = todolistReducer(startState, changeTodolistTitleAС(todolistId2, "New Todolist"));

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(action.payload.title);
});

test("correct filter of todolist should be changed", () => {

  const endState = todolistReducer(startState, changeTodolistFilterAС(todolistId2, "Completed"));

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe("Completed");
}); 

test("todolists should be set to state", () => {

  const endState = todolistReducer(
    [],
    setTodolistsAC([{
      id: 'todolistId1',
      title: "What to learn",
      addedDate: "",
      order: 0,
    }])
  );

  expect(endState.length).toBe(1);
  
}); 