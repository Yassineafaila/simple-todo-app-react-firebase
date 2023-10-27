import React, { useEffect, useState } from "react";
import Button from "../Ui/button";
import { useTodo } from "../../context/TodosContext";

function TodoList({ setId }) {
  const {
    isLoading,
    todos,
    getAllTodos,
    deleteTodo,
    getTodo,
    handleEffectTrigger,
  } = useTodo();
  ///
  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);

      handleEffectTrigger();
    } catch (e) {
      console.error("Error While Trying To Delete Task", e);
    }
  };
  ///
  const getTaskForUpdating = async (id) => {
    console.log("the id document that want to update:", id);
    try {
      await getTodo(id);
      setId(id);
      console.log("task id retrieve successfully for updating process");
    } catch (e) {
      console.error("Error", e);
    }
  };
  //this useEffect will run one time to get the data
  useEffect(() => {
    getAllTodos();
  }, []);
  return (
    <section className="todo-list d-flex px-2 justify-content-md-center justify-content-lg-center">
      {isLoading ? (
        "loading..."
      ) : (
        <div className="w-100 list-container">
          {todos?.map((todo, index) => {
            return (
              <div
                key={index}
                className="d-flex align-items-center w-100 my-2 justify-content-between gap-4"
              >
                <p className="m-0 fw-normal">{todo.taskName}</p>
                <div>
                  <Button
                    type="button"
                    className={"border-0 btn btn-success me-2 fw-medium"}
                    HandlerClick={() => getTaskForUpdating(todo.id)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    className={"border-0 btn btn-danger fw-medium"}
                    HandlerClick={() => deleteTask(todo.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default TodoList;
