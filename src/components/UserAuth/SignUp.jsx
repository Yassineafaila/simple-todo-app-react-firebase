// import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Ui/Input";
import Button from "../Ui/button";
import { useAuth } from "../../context/AuthContext";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import {HiOutlineUser} from "react-icons/hi"
function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("")
  const { register } = useAuth()
  const navigate=useNavigate()
  const singUp = () => {
    if (fullName === "" || email === "" || password === "") {
      setError("please fill all the field");
      return;
    }
    if (password.length <= 6) {
      setError("please the password need to be at least 8 character");
      return;
    }
    register(fullName, email, password);
    navigate("/sign-in")
  }
  return (
    <main>
      <div>
        {error && <p>{error}</p>}
        <div>
          <HiOutlineUser />
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            HandlerChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <CgMail />
          <Input
            type="email"
            name="email"
            placeholder="email..."
            value={email}
            HandlerChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <RiLockPasswordLine />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            HandlerChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type={"submit"} HandlerClick={singUp}>
          Sign Up
        </Button>
        <p>
          Already have an account <Link to="/sign-in">Sign In</Link>
        </p>
      </div>
    </main>
  );
}

export default SignUp;
