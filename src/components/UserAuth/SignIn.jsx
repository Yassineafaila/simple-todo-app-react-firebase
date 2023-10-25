import React, { useState } from "react";
import Input from "../Ui/Input";
import Button from "../Ui/button";
import Modal from "../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import "./SignIn.css";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const { login, message, signInWithGoogleAuth } = useAuth();
  const signIn = () => {
    if (email === "" || password === "") {
      setError({
        ...error,
        email: "please fill this field",
        password: "please fill this field",
      });
      return;
    }
    if (password.length <= 6) {
      setError({
        ...error,
        email:"",
        password: "please the password need to be at least 8 character",
      });
      return;
    }
    login(email, password)
      .then((result) => {
        if (result) {
          console.log("logged in successfully");
          navigate("/", { replace: true });
        }
      })
      .catch((erro) => {
        console.log("Unexpted Error", erro);
      });
  };
  //sign in with google :
  const signInWithGoogle = async () => {
    try {
      await signInWithGoogleAuth();
      console.log("logged in with google successfully!");
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {message && (
        <Modal>
          <p>{message}</p>
        </Modal>
      )}
      <main className="sign-in container mx-auto w-100 px-2 position-relative">
        <section className="container mx-auto d-flex justify-content-center flex-column my-4 mx-auto py-5 px-3 rounded shadow-lg gap-4">
          <h2 className="fw-bolder text-center">Sign In</h2>

          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            className={"border-0 "}
            error={error.email}
            HandlerChange={(e) => setEmail(e.target.value)}
          >
            <CgMail />
          </Input>

          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border-0 "
            value={password}
            error={error.password}
            HandlerChange={(e) => setPassword(e.target.value)}
          >
            <RiLockPasswordLine />
          </Input>
          <Button
            type={"button"}
            className={
              "border-0 bg-primary py-2 px-3 rounded shadow-sm text-white fw-medium"
            }
            HandlerClick={signIn}
          >
            Sign In
          </Button>
          <Button
            type={"button"}
            className={
              "d-flex align-items-center justify-content-center gap-2 py-2 px-3 fw-medium rounded border-0  bg-dark text-white "
            }
            HandlerClick={signInWithGoogle}
          >
            <FcGoogle />
            Sign In With Google
          </Button>
          <p className="text-center fw-light">
            You don&apos;t have an account {"?"}
            <Link className="text-decoration-none fw-medium" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default SignIn;
