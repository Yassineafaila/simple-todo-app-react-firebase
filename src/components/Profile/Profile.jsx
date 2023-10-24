import React from 'react'
import Button from '../Ui/button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const navigate=useNavigate()
    const {user,logout}=useAuth()
    const signOut = () => {
      logout();
      navigate("/",{replace:true,relative:true})
  };
  console.log(user)
  return (
    <div>
      email:{user?.email}
      <Button type="button" HandlerClick={signOut}>
        log out
      </Button>
    </div>
  );
}

export default Profile;