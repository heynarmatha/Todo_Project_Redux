import { TodoStatus } from "../constants";

export interface Todo {
  id: number;
  title: string;
  status: "New Task" | "In-Progress" | "Completed" | "Backlog";
}

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export interface EditTodo {
  id: number;
  title: string;
  status: TodoStatus;
}
