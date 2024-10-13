import { addTask, updateTask, removeTask, tasksReducer, TaskStateType } from "store/slices/tasksSlice";
import { TaskPriorities, TaskStatuses } from "features/lib/enums/enums";
import { addTodolist, removeTodolist } from "./todolistSlice";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        taskEntityStatus: "idle",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        taskEntityStatus: "idle",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        taskEntityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        taskEntityStatus: "idle",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        taskEntityStatus: "idle",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        taskEntityStatus: "idle",
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTask({taskId: "2", todolistId: "todolistId2"});

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"][1].id).toBe("3");
});

test("correct task should be added to correct array", () => {
  const action = addTask({
		task: {
			id: "1",
			title: "juce",
			status: TaskStatuses.New,
			description: "",
			priority: TaskPriorities.Low,
			startDate: "",
			deadline: "",
			todoListId: "todolistId2",
			order: 0,
			addedDate: "",
		},
	})

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const action = updateTask({todolistId: "todolistId2", taskId: "2", model: {
    status: TaskStatuses.New,
  }});

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test("title of specified task should be changed", () => {
  const action = updateTask({todolistId: "todolistId2", taskId:  "2", model:{
    title: "juice",
  }});

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("juice");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

///////////////////////////////////////////////////

test("new array should be added when new todolist is added", () => {
  const action = addTodolist({
		todolist: {
			id: "todolistId3",
			title: "new todolist",
			addedDate: "",
			order: 0,
		},
	})

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = removeTodolist({id: "todolistId2"});

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

// test("tasks should be set to state", () => {
//   const action = setTasks(
//     [
//       {
//         id: "4",
//         title: "bread",
//         status: TaskStatuses.New,
//         description: "",
//         priority: TaskPriorities.Low,
//         startDate: "",
//         deadline: "",
//         todoListId: "todolistId2",
//         order: 0,
//         addedDate: "",
//       },
//     ],
//     "todolistId2",
//   );

//   const endState = tasksReducer(
//     {
//       todolistId1: [
//         {
//           id: "1",
//           title: "CSS",
//           status: TaskStatuses.New,
//           description: "",
//           priority: TaskPriorities.Low,
//           startDate: "",
//           deadline: "",
//           todoListId: "todolistId1",
//           order: 0,
//           addedDate: "",
//           taskEntityStatus: "idle",
//         },
//         {
//           id: "2",
//           title: "JS",
//           status: TaskStatuses.Completed,
//           description: "",
//           priority: TaskPriorities.Low,
//           startDate: "",
//           deadline: "",
//           todoListId: "todolistId1",
//           order: 0,
//           addedDate: "",
//           taskEntityStatus: "idle",
//         },
//         {
//           id: "3",
//           title: "React",
//           status: TaskStatuses.New,
//           description: "",
//           priority: TaskPriorities.Low,
//           startDate: "",
//           deadline: "",
//           todoListId: "todolistId1",
//           order: 0,
//           addedDate: "",
//           taskEntityStatus: "idle",
//         },
//       ],
//       todolistId2: [],
//     },
//     action,
//   );

//   const keys = Object.keys(endState);

//   expect(keys.length).toBe(2);
//   expect(endState["todolistId1"].length).toBe(3);
//   expect(endState["todolistId2"].length).toBe(1);
// });
