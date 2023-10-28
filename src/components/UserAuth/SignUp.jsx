// import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Ui/Input";
import Button from "../Ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import "./SignUp.css";
function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register,signInWithGoogleAuth } = useAuth();
  const navigate = useNavigate();
  const singUp = () => {
    if (fullName === "" || email === "" || password === "") {
      setError("please fill this the field");
      return;
    }
    if (password.length <= 6) {
      setError("please the password need to be at least 8 character");
      return;
    }
    register(fullName, email, password);
    navigate("/sign-in");
  };
  const handleSignUpWithGoogle = async () => {
    try {
      await signInWithGoogleAuth()
      console.log("successfully sign up with google")
    } catch (e) {
      console.log("Error",e)
    }
    navigate("/",{replace:true})
  }
  return (
    <main className="sign-up container mx-auto w-100 px-2 position-relative">
      <section className="container mx-auto d-flex justify-content-center flex-column my-4 mx-auto py-5 px-3 rounded shadow-lg gap-4">
        <h2 className="fw-bolder text-center">Sign Up</h2>

        <Input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          className={"border-0 w-100 "}
          error={error}
          value={fullName}
          HandlerChange={(e) => setFullName(e.target.value)}
        >
          <HiOutlineUser />
        </Input>

        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className={"border-0 w-100 "}
          error={error}
          value={email}
          HandlerChange={(e) => setEmail(e.target.value)}
        >
          <CgMail />
        </Input>

        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          className={"border-0 w-100 "}
          error={error}
          value={password}
          HandlerChange={(e) => setPassword(e.target.value)}
        >
          <RiLockPasswordLine />
        </Input>

        <Button
          type={"submit"}
          className={
            "border-0 bg-primary py-2 px-3 rounded shadow-sm text-white fw-medium"
          }
          HandlerClick={singUp}
        >
          Sign Up
        </Button>
        <Button  HandlerClick={handleSignUpWithGoogle}
          type={"button"}
          className={
            "d-flex align-items-center justify-content-center gap-2 py-2 px-3 fw-medium rounded border-0  bg-dark text-white "
          }
        >
          <FcGoogle />
          Sign Up With Google
        </Button>
        <p className="text-center fw-light">
          Already have an account {"?"}
          <Link className="text-decoration-none fw-medium" to="/sign-in">
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignUp;
