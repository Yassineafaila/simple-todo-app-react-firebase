import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../Ui/button'
import {AiOutlineMenu} from "react-icons/ai"
function Navbar() {
   const {isAuthenticated}=useAuth()
  return (
    <nav className="navbar navbar-expand-lg position-relative">
      <div className="container">
        <div>
          <Link className="navbar-brand" to="/">
            Todo Task
          </Link>
          <Button>
            <AiOutlineMenu/>
          </Button>
        </div>
        <div className="navbar-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todo">
                Todo
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
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

export default Navbar