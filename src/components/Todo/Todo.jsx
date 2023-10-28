import React, {useState } from "react";
import { useTodo } from "../../context/TodosContext";
import TodoFrom from "./TodoFrom";
import TodoList from "./TodoList";
import "./Todo.css"
import  Modal  from "../Modal/Modal";
function Todo() {
  
  const [id,setId]=useState(null)
  const {
    message,
  } = useTodo();
  return (
    <main className="container mx-auto  position-relative d-flex  justify-content-center flex-column">
      {message == "" ? null : (
        <Modal message={message}>
          <p>{message}</p>
        </Modal>
      )}
      <TodoFrom id={id} setId={setId} />
      <TodoList setId={setId} />
    </main>
  );
}

export default Todo;
