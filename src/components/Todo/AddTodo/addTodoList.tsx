import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../redux/features/todo/todoSlice";
import { TODO_STATUS_OPTIONS } from "../../../utity/constants";
import styles from "./style.module.scss";

interface Props {
  showAddTaskPopup: boolean;
  setShowAddTaskPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoPopup: React.FC<Props> = ({
  showAddTaskPopup,
  setShowAddTaskPopup,
}) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Item cannot be empty");
      return;
    }
    dispatch(
      addTodo({
        id: Date.now(),
        title,
        status: TODO_STATUS_OPTIONS?.[0],
      })
    );
    setTitle("");
    setShowAddTaskPopup(false);
  };

  return (
    <>
      {showAddTaskPopup && (
        <div className={`${styles.overlay} ${styles.show}`}>
          <div className={styles.mainContainerForAddTodo}>
            <div className={styles.innerPopupContainer}>
              <h5 className={styles.addItemText}>Add New Item : </h5>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={styles.addTodoButtonContainer}>
                <button onClick={handleSubmit} className="btn-primary">
                  Add Todo
                </button>
                <button
                  onClick={() => setShowAddTaskPopup(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoPopup;
