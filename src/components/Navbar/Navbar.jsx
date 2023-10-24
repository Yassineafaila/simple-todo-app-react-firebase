import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../Ui/button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg position-relative ">
      <div className="container pb-3">
        <div className="brand-container">
          <Link className="navbar-brand fw-bold" to="/">
            Todo Task
          </Link>
          <div className="d-md-none d-lg-none d-xl-none">
            {!showMenu ? (
              <Button HandlerClick={() => setShowMenu(!showMenu)}>
                <AiOutlineMenu size={25} />
              </Button>
            ) : (
              <Button HandlerClick={() => setShowMenu(!showMenu)}>
                <AiOutlineClose size={25} />
              </Button>
            )}
          </div>
        </div>
        <div className={`navbar-container  ${showMenu ? "show" : ""}`}>
          <ul className="navbar-nav flex-md-row gap-2 gap-md-5 gap-lg-4 gap-xl-4 ">
            <li className="nav-item  py-1 px-3">
              <Link className="nav-link fw-medium" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item py-1 px-3">
              <Link className="nav-link fw-medium" to="/todo">
                Todo
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item py-1 px-3">
                <Link className="nav-link fw-medium" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item py-1 px-3">
                <Link className="nav-link fw-medium" to="/sign-in">
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
