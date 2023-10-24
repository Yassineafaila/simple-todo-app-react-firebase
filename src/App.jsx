import SignUp from "./components/UserAuth/SignUp";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TodoProvider } from "./context/TodosContext";
import SignIn from "./components/UserAuth/SignIn";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import RequiredAuth from "./components/RequiredAuth/RequiredAuth";
import Todo from "./components/Todo/Todo";
import "./components/Navbar/Navbar.css"
function App() {
  return (
    <div className="App py-4 px-3">
      <AuthProvider>
        <TodoProvider>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route
              path="/profile"
              element={
                <RequiredAuth>
                  <Profile />
                </RequiredAuth>
              }
            />
            <Route path="/todo" element={<RequiredAuth><Todo/></RequiredAuth>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </TodoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
