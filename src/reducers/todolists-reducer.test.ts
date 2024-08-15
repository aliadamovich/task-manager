
import { v1 } from "uuid";
import { ChangeTodolistFilterActionType, ChangeTodolistTitleActionType, todolistReducer } from "./todolist-reducer";
import { TodoListsType } from "../App";
import { addTodolistAС, changeTodolistTitleAС, changeTodolistFilterAС, removeTodolistAС } from "./todolist-reducer";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // 1. Стартовый state
  const startState: TodoListsType[] = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  // 2. Действие

  const endState = todolistReducer(startState, removeTodolistAС(todolistId1));

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();

	const todolistTitle = 'New todo';

  const startState: TodoListsType[] = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const endState = todolistReducer(startState, addTodolistAС( todolistTitle ));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(todolistTitle);
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: TodoListsType[] = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const action: ChangeTodolistTitleActionType = {
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
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: TodoListsType[] = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const action: ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id: todolistId2,
      filter: "Completed",
    },
  };
  const endState = todolistReducer(startState, changeTodolistFilterAС(todolistId2, "Completed"));

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe("Completed");
}); 