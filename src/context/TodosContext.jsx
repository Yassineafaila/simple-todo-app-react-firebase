import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
const TodoContext = createContext();
const initialState = {
  todos: [],
  todo: {},
  message: "",
  error: false,
  isLoading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "todos/loaded":
      return { ...state, isLoading: false, todos: action.payload };
    case "todo/loaded":
      return {
        ...state,
        todo: action.payload,
      };
    case "todo/added":
      return { ...state, message: "the task Added successfully!" };
    case "todo/updated":
      return { ...state, todo: {}, message: "the task updated successfully!" };
    case "todo/deleted":
      return { ...state, todo: {}, message: "the task deleted successfully!" };
    case "rejected":
      return { ...state, todo: {}, message: action.payload, error: true };
  }
}
const todosCollectionRef = collection(db, "tasks");
function TodoProvider({ children }) {
  const { user } = useAuth();
  const [{ todos, todo, message, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //Add Task to firebase
  async function addTodo(newTodo) {
    try {
      await addDoc(todosCollectionRef, newTodo);
      dispatch({ type: "todo/added" });
      console.log("Added!");
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There was an error durning add the task!",
      });
      console.error(e);
    }
  }
  //Delete Task From firebase
  async function deleteTodo(id) {
    try {
      const todoDoc = doc(todosCollectionRef, id);
      await deleteDoc(todoDoc); //await for the task to be deleted
      dispatch({ type: "todo/deleted" });
      console.log("Deleted!");
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There was an error durning delete the task!",
      });
      console.error(e);
    }
  }
  async function getTodo(id) {
    try {
      const todoDoc = doc(todosCollectionRef, id);
      const docSnap = await getDoc(todoDoc);
      const todoUpdate = docSnap.data();
      dispatch({ type: "todo/loaded", payload: todoUpdate });
      console.log("getting data for a single task successfully!");
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error fetching todo" });
      console.log("Error fetching todo", error);
    }
  }
  async function updatedTodo(id, updateTodo) {
    try {
      const todoDoc = doc(todosCollectionRef, id);
      await updateDoc(todoDoc, updateTodo);
      console.log("updated!");
      dispatch({ type: "todo/updated" });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There was an error durning update the task!",
      });
      console.error("Error", e);
    }

    return;
  }
  //Get All the Todos from firebase
  async function getAllTodos() {
    dispatch({ type: "isLoading" });
    try {
      const response = await getDocs(todosCollectionRef);
      const filterData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: "todos/loaded",
        payload: filterData.filter((doc) => doc.userId === user?.uid),
      });
      console.log("data has been successfully retrieve ");
    } catch (e) {
      console.error("Error fetching todos:", e);
    }
  }
  //refresh the data the comes from firebase after each event (add/delete/update)
  const handleEffectTrigger = async () => {
    try {
      await getAllTodos();
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "Error while trying to refresh data",
      });
      console.error(e);
    }
  };
  return (
    <TodoContext.Provider
      value={{
        addTodo,
        updatedTodo,
        deleteTodo,
        isLoading,
        todos,
        getAllTodos,
        todo,
        getTodo,
        handleEffectTrigger,
        message,
        error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
function useTodo() {
  return useContext(TodoContext);
}
export { TodoProvider, useTodo };
