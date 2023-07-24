import React, { useContext, useState } from 'react'
import {  } from "./Login.css";
import Navber from '../../components/navber/Navber'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/AuthContext';
import axios from 'axios';
const baseURL=process.env.REACT_APP_BACKEND_URL;
const Login = () => {
    const navigate=useNavigate();
    const handleClickRegister=()=>{
        navigate("/register")
     }
     const [credentials,setCredentials]=useState({
        username:undefined,
        password:undefined
      });
     const [msg,setMsg]=useState();
     const {user,loading,error,dispatch}=useContext(AuthContext)
     const handleChange=(e)=>{
         setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}));
      }
    const handleClick= async (e)=>{
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post(`${baseURL}/auth/login`, credentials);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

          if(res.data.message){
            setMsg(res.data.message);
          }
          setTimeout(() => {
            navigate("/");
          }, 200);
        
        } catch (error) {
          dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
        }
    };
   console.log(user)
  return (
    <div>
       <Navber/>
       <div className="loginpage">

       <img className='loginbg' src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />
         
         <div className="loginContainer">
              <div className="loginItems">
                <h2>Log In</h2>
              </div>
              <input className='logInput' type="text" placeholder='username' id='username' onChange={handleChange}/>
              <input className='logInput' type="password" placeholder='password'id='password' onChange={handleChange}/>
              {error && <span className='err'>{error.match(/Error: (.*?)<br>/)[1]}</span>}
              {msg && <span className='err'>{msg}</span>}
              <button  disabled={loading} className='logBtn' onClick={handleClick} >Log In</button>
              <span className='noaccount'>
                <p>You don't have an Account !</p>
                <p className='logg' onClick={handleClickRegister}>Create new Account</p>
              </span>

         </div> 
       </div>
    </div>
  )
}

export default Login
