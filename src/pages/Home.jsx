import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Home.css"
function Home() {
  const { user, isAuthenticated } = useAuth();
  return (
    <main className="py-2 container my-4 d-flex align-items-center justify-content-center">
      {isAuthenticated ? (
        <div className="text-center">
          <h1 className="fw-bolder">
            Welcome Back , <span>{user?.email}</span>
          </h1>
          <p className="fw-regular">You Can Now Use Our ToDo App</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="fw-bolder">Welcome To Our Todo App</h1>
          <p className="fw-regular">To Use Our Todo App You Need To logged In Or Sign Up </p>
        </div>
      )}
    </main>
  );
}

export default Home;
