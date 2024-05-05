import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodos,
  deleteTodo,
  updateTodo,
} from "../../../redux/features/todo/todoSlice";
import { TodoStatus, TODO_STATUS_OPTIONS } from "../../../utity/constants";
import { EditTodo } from "../../../utity/typescript";
import AddTodoPopup from "../AddTodo/addTodoList";
import styles from "./style.module.scss";
import { FiChevronDown, FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const TodoListDashboard: React.FC = () => {
  const todos = useSelector(selectTodos);
  const [filter, setFilter] = useState<TodoStatus | "all">("all");
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [editTodo, setEditTodo] = useState<EditTodo | null>(null);
  const dispatch = useDispatch();

  const toggleAddTaskPopup = () => {
    setShowAddTaskPopup(!showAddTaskPopup);
  };

  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    if (editTodo?.id === id) {
      setEditTodo(null);
    }
  };

  const handleEdit = (todo: EditTodo) => {
    setEditTodo(todo);
  };

  const handleSaveChanges = (editedTodo: EditTodo) => {
    if (editedTodo.title.trim() === "") {
      alert("Item cannot be empty");
      return;
    }
    dispatch(
      updateTodo({
        id: editedTodo.id,
        title: editedTodo.title,
        status: editedTodo.status,
      })
    );
    setEditTodo(null);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTodo) {
      setEditTodo({
        ...editTodo,
        title: e.target.value,
      });
    }
  };

  return (
    <div className={styles.dashboardContainerTodo}>
      <div className={styles.subContainerForTodo}>
        <div className={styles.headerContainer}>
          <h4>My Todo List</h4>
          <button className="btn-primary" onClick={toggleAddTaskPopup}>
            Add New Todo
          </button>
        </div>
        <div className={styles.flexStyleForFilter}>
          <h5 className={styles.lableStyle}>Filter by status :</h5>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as TodoStatus | "all");
              setEditTodo(null);
            }}
          >
            <option value="all">All</option>
            {TODO_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <ul className={styles.cardList}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={styles.card}
                style={{ display: editTodo?.id === todo.id ? "unset" : "flex" }}
              >
                <div>
                  {editTodo?.id === todo.id ? (
                    <div
                      className={styles.flexStyle}
                      style={{
                        marginBottom: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5
                        className={styles.lableStyle}
                        style={{
                          width: editTodo?.id === todo.id ? "20%" : "unset",
                        }}
                      >
                        Item :
                      </h5>
                      <div style={{ width: "80%" }}>
                        <input
                          type="text"
                          value={editTodo.title}
                          onChange={handleTitleChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <h3 className={styles.todoTitle}>{todo.title}</h3>
                  )}

                  <div className={`${styles.flexStyle}`}>
                    <h5
                      className={styles.lableStyle}
                      style={{
                        width: editTodo?.id === todo.id ? "20%" : "unset",
                      }}
                    >
                      Status :
                    </h5>
                    {editTodo?.id === todo.id ? (
                      <select
                        value={editTodo.status}
                        onChange={(e) =>
                          setEditTodo({
                            ...editTodo,
                            status: e.target.value as TodoStatus,
                          })
                        }
                        style={{ width: "80%" }}
                      >
                        {TODO_STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <h5>{todo.status} </h5>
                    )}
                  </div>
                  {editTodo?.id === todo.id && (
                    <div className={styles.btnContainerSaveEdit}>
                      <button
                        onClick={() => handleSaveChanges(editTodo)}
                        className="btn-primary"
                      >
                        Save
                      </button>
                      <button onClick={handleCancelEdit} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                {editTodo?.id !== todo.id && (
                  <div className={styles.btnContainer}>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="edit-btn"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="delete-btn"
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddTodoPopup
        showAddTaskPopup={showAddTaskPopup}
        setShowAddTaskPopup={setShowAddTaskPopup}
      />
    </div>
  );
};

export default TodoListDashboard;
