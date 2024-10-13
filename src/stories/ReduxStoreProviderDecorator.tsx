import { ReactNode } from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import { combineReducers, createStore, legacy_createStore } from "redux";

import React from "react";
import { tasksReducer } from "../store/slices/tasksSlice";
import { todolistReducer } from "../store/slices/todolistSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
});

const initialGlobalState = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: "taskId1",
        title: "HTML&CSS",
        isDone: true,
      },
      {
        id: "taskId2",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        isDone: false,
      },
      {
        id: v1(),
        title: "React Book",
        isDone: true,
      },
    ],
  },
};
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
