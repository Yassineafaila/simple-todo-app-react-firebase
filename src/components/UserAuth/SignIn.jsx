import React, { useState } from "react";
import Input from "../Ui/Input";
import Button from "../Ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc"
import { CgMail } from "react-icons/cg"
import {RiLockPasswordLine} from "react-icons/ri"
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, message, signInWithGoogleAuth } = useAuth();
  const  signIn =() => {
    if (email === "" || password === "") {
      setError("please fill all the field");
      return;
    }
    if (password.length <= 6) {
      setError("please the password need to be at least 8 character");
      return;
    }
    login(email, password).then(result => {
      if (result) {
        console.log("logged in successfully")
        navigate("/",{replace:true});
      }
    }).catch(erro => {
      console.log("Unexpted Error",erro)
    });
    

    
  };
  //sign in with google :
  const signInWithGoogle=async () => {
    try {
      await signInWithGoogleAuth()
      console.log("logged in with google successfully!")
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
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
        <RiLockPasswordLine/>
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          HandlerChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type={"button"} HandlerClick={signIn}>
        Sign In
      </Button>
      <Button type={"button"} HandlerClick={signInWithGoogle}>
        <FcGoogle />
        Sign In With Google
      </Button>
      <p>
        You don&apos;t have an account <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
