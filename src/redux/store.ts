import { configureStore } from "@reduxjs/toolkit";
import { Todo } from "../utity/typescript";
import todoReducer from "./features/todo/todoSlice";

const loadState = (): { todo: { todos: Todo[] } } | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: { todo: { todos: Todo[] } }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error("Error", err);
  }
};

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    todo: {
      todos: store.getState().todo.todos,
    },
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
