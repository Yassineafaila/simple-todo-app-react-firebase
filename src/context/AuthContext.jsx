import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth, db,googleProvider } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  message: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        message: "user Logged in successfully",
      };
    case "login/google":
      return {...state,user:action.payload,isAuthenticated:true,message:"sign in with google successfully"}
    case "register":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        message: "you have been successfully register",
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false ,message:""};
    case "rejected":
      return { ...state, message: action.payload };
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, message }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // alert("Logged in successfully");
        auth.onAuthStateChanged((user) => {
          dispatch({ type: "login", payload: user });
        })
        
        return true; // Return a promise that resolves to true
      })
      .catch((err) => {
        dispatch({
          type: "rejected",
          payload: "There's no user with this email and password",
        });
        return false; // Return a promise that resolves to false
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  async function signInWithGoogleAuth() {
    try {
      await signInWithPopup(auth, googleProvider);
      auth.onAuthStateChanged((user) => {
        dispatch({ type: "login/google", payload: user });
      });
    } catch (e) {
      dispatch({ type: "rejected", payload: "something happened with google" });
      console.log(e);
    }
  }
  async function register(fullName, email, password) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result) {
        const docRef = await addDoc(collection(db, "users"), {
          fullName,
          email,
          password: `${result.user.reloadUserInfo.passwordHash}`,
          userId: `${result.user.uid}`,
        });
      }
      dispatch({ type: "register", payload: user });
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function logout() {
    const user = await signOut(auth);
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        message,
        login,
        register,
        logout,
        signInWithGoogleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  return useContext(AuthContext);
}
export { AuthProvider, useAuth };
