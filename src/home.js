import React, { useContext, useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import axios from'axios';
import { useNavigate } from 'react-router-dom';
import { showcontext } from './sidebar';

function Home() {
  const navigate= useNavigate();
  const [isLoggedin,setisLoggedin]=useState(false)
  const[show,setShow]=useContext(showcontext)

useEffect(() => {
  setShow(true)
  const user= localStorage.getItem("user")
  if(user){
   setisLoggedin(true)
   navigate('/home')
   }
   else{
    setShow(false)
    navigate('/login')
   }

}, [])


  const logout =()=>{  
    const user= localStorage.removeItem("user");
     if(!user) {
      setShow(false)
      navigate("/login")  }  
}



  return (
    <div>
  {isLoggedin ?
 <button onClick={logout}>Logout</button> : " "}
    </div>
  )
}

export default Home