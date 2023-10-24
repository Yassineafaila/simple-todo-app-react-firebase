import React, {useState } from "react";
import { useTodo } from "../../context/TodosContext";
import TodoFrom from "./TodoFrom";
import TodoList from "./TodoList";

function Todo() {
  
  const [id,setId]=useState(null)
  const {
    message,
  } = useTodo();
  return (
    <main>
      <div>{message && <p>{message}</p>}</div>
      <TodoFrom id={id} setId={setId} />
      <TodoList setId={setId} />
    </main>
  );
}

export default Todo;
