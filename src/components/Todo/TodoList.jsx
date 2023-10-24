import React, { useEffect, useState } from "react";
import Button from "../Ui/button";
import { useTodo } from "../../context/TodosContext";
import { useAuth } from "../../context/AuthContext";

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
    <>
      <div>
        {isLoading ? (
          "loading..."
        ) : (
          <div>
            {todos?.map((todo, index) => {
              return (
                <div key={index}>
                  <p>{todo.taskName}</p>
                  <Button
                    type="button"
                    HandlerClick={() => getTaskForUpdating(todo.id)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    HandlerClick={() => deleteTask(todo.id)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default TodoList;
