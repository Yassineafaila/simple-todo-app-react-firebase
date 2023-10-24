import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Home.css"
function Home() {
  const { user, isAuthenticated } = useAuth();
  return (
    <main className="py-2 container my-4 d-flex align-items-center justify-content-center">
      {isAuthenticated ? (
        <div className="text-center">
          <h1>
            Welcome Back , <span>{user?.email}</span>
          </h1>
        </div>
      ) : (
        <div className="text-center">
          <h1>Welcome To Our Todo App</h1>
          <p>To Use Our Todo App You Need To logged In Or Sign Up </p>
        </div>
      )}
    </main>
  );
}

export default Home;
