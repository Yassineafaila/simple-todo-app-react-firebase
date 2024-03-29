import React, { useState } from "react";
import Input from "../Ui/Input";
import Button from "../Ui/button";
import { useTodo } from "../../context/TodosContext";
import { useAuth } from "../../context/AuthContext";
function TodoFrom({ id, setId }) {
  const { addTodo, todo, updatedTodo, handleEffectTrigger } = useTodo();
  const [taskName, setTaskName] = useState("");
  const [errorForm, setErrorForm] = useState();
  
  const { user } = useAuth();
  const addTask = async () => {
    if (!taskName) {
      setErrorForm("All The Filed Are Mandatory!");
      return;
    } else {
      setErrorForm("")
    }

    const task = {
      taskName: taskName,
      taskCreatedAt: new Date().toISOString(), // Standardize date format
      userId: user?.uid || "",
    };
    try {
      if (id !== undefined && id !== "" && id !== null) {
        await updatedTodo(id, task);
        handleEffectTrigger();
        setTaskName(""); //empty the task input
        setId(null); //empty the id of the updated document
      } else {
        await addTodo(task);
        setErrorForm("");
        setTaskName(""); //empty the task input
        handleEffectTrigger(); //call the refresh the data
      }
    } catch (e) {
      console.error("Error While Trying To Add Task!", e);
    }
  };

  return (
    <section className="d-flex justify-content-center gap-2 my-4 align-items-center">
      <Input
        type="text"
        placeholder={`${id ? "new task name to update" : "add task"}`}
        value={taskName}
        className="border-0 w-100 "
        HandlerChange={(e) => setTaskName(e.target.value)}
        error={errorForm}
      />
      <Button
        type="button"
        className={
          "border-0 btn bg-primary py-2 px-2 rounded shadow-sm text-white fw-medium"
        }
        HandlerClick={addTask}
      >
        add task
      </Button>
    </section>
  );
}

export default TodoFrom;
