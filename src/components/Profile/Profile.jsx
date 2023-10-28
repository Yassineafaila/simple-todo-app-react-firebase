import React, { useState } from "react";
import Button from "../Ui/button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../Ui/Input";
import "./Profile.css";
import Uploader from "../Uploader/Uploader";
function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile, getUser, userDetails } = useAuth();
  const [fname, setFname] = useState(userDetails?.first_name);
  const [lname, setLname] = useState(userDetails?.last_name);
  const [address, setAddress] = useState(userDetails?.address);
  const [email, setEmail] = useState(user?.email);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [error, setError] = useState();
  const signOut = () => {
    logout();
    navigate("/", { replace: true, relative: true });
  };
  const updateHandler = async () => {
    if (!fname || !lname || !address) {
      setError("please fill all the fields");
      return;
    }
    try {
      await getUser(user.uid);
      await updateProfile(fname, lname, address,fileName, user.uid);
      console.log("updated successfully!");
    } catch (e) {
      console.log("Error", e);
    }
  };
  return (
    <main className="container mx-auto  position-relative d-flex  justify-content-center flex-column p-2 mt-4">
      <h1>Profile</h1>
      <div className="container d-flex align-items-center flex-column">
        {user?.reloadUserInfo?.photoUrl ? (
          <img
            className="rounded-circle mx-auto d-block my-3"
            src={user?.reloadUserInfo?.photoUrl}
            alt="user-profile"
          />
        ) : (
          <Uploader
            image={image}
            fileName={fileName}
            setImage={setImage}
            setFileName={setFileName}
          />
        )}
      </div>
      <div className="d-flex flex-column gap-4 container">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          label={"First Name :"}
          value={fname}
          error={error}
          HandlerChange={(e) => setFname(e.target.value)}
          className={"border-0 w-100 "}
        ></Input>
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          label={"Last Name :"}
          className={"border-0 w-100 "}
          value={lname}
          error={error}
          HandlerChange={(e) => setLname(e.target.value)}
        ></Input>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          label={"address :"}
          className={"border-0 w-100 "}
          value={address}
          error={error}
          HandlerChange={(e) => setAddress(e.target.value)}
        ></Input>
        <Input
          type="text"
          name="email"
          placeholder="email..."
          label={"Email :"}
          className={"border-0 w-100 "}
          value={email}
          error={error}
          HandlerChange={(e) => setEmail(e.target.value)}
        ></Input>

        <div className="d-flex align-items-center gap-3">
          <Button
            type="button"
            className={"border-0 btn btn-primary"}
            HandlerClick={signOut}
          >
            log out
          </Button>
          <Button
            type="button"
            className={"border-0 btn btn-success"}
            HandlerClick={updateHandler}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
