import { TaskPriorities, TaskStatuses } from "../../api/todolists-api";
import { addTaskAС, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer, TaskStateType } from "./tasks-reducer";
import { addTodolistAС, removeTodolistAС } from "./todolist-reducer";

let startState: TaskStateType;

beforeEach(()=> {
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
       },
       { id: "2", title: "milk", status: TaskStatuses.Completed,  description: "",
         priority: TaskPriorities.Low,
         startDate: "",
         deadline: "",
         todoListId: "todolistId2",
         order: 0,
         addedDate: "", },
       { id: "3", title: "tea", status: TaskStatuses.New,  description: "",
         priority: TaskPriorities.Low,
         startDate: "",
         deadline: "",
         todoListId: "todolistId2",
         order: 0,
         addedDate: "", },
     ],
   };
})

test("correct task should be deleted from correct array", () => {

  const action = removeTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(2)
	expect(endState['todolistId2'][1].id).toBe('3')
});


test('correct task should be added to correct array', () => {

    const action = addTaskAС( "todolistId2", "juce");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("todolistId2", "2", TaskStatuses.New);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("todolistId2", "2", "juice");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('juice');
    expect(endState["todolistId1"][1].title).toBe('JS');
})


///////////////////////////////////////////////////

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAС("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAС("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test("tasks should be set to state", () => {
  const action = setTasksAC(
    [
      {
        id: "4",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
    "todolistId2"
  );

  const endState = tasksReducer(
		{
		todolistId1:  [{
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
       }],
		todolistId2: []
			},
			 action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(1);
});

