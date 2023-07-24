import React, { useContext, useState } from 'react'
import {}from './Register.css'
import Navber from '../../components/navber/Navber'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../components/context/AuthContext'
const baseURL=process.env.REACT_APP_BACKEND_URL;

const Register = () => {
    const navigate=useNavigate();
    const handleClickLog=()=>{
        navigate("/login")
   }

     const [credentials,setCredentials]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
     });
     const [confirmPass,setConfirmPass]=useState();
     const [err,setErr]=useState();
     const [msg,setMsg]=useState();
     const handleChange=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}));
      }
      const {user,loading,error,dispatch}=useContext(AuthContext)

      const handleClick=async(e)=>{
            e.preventDefault();
              if(confirmPass!==credentials.password){
                setErr("Password didn't match");
              }
              else{
                  try {
                  
                  const res=  await axios.post(`${baseURL}/auth/register`,credentials);
                  
                    dispatch({ type: "LOGIN_SUCCESS", payload:res.data.details});
                    if (res.data.message) {
                      setMsg(res.data.message);
                    }
                    setTimeout(() => {
                      navigate("/");
                    }, 1000);
                  
              
                    } catch (error) {
                      
                        setErr("user or email already exist");
                    
                    }
            
               }
       }
     console.log(credentials.username);
     console.log(confirmPass);
     console.log(err);
     console.log(msg);
  return (
    <div>
      <Navber/>
      <div className="registerpage">

        <img className='registerbg' src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />

        <div className="registerContainer">
              <div className="loginItems">
                <h2>Create Account</h2>
               
              </div>
              <input id='username' className='registerInput' type="text" placeholder='username' onChange={handleChange}/>
              <input id='email' className='registerInput' type="email" placeholder='email'onChange={handleChange}/>
              <input id='phone' className='registerInput' type="number" placeholder='phone number'onChange={handleChange}/>
              <input id='password' className='registerInput' type="password" placeholder='password'onChange={handleChange}/>
              <input className='registerInput' type="password" placeholder='confirm password' onChange={(e)=>setConfirmPass(e.target.value)}/>
              {err && <span className='err'>{err}</span>}
              {msg && <span className='err'>{msg}</span>}
              <button className='registerBtn'onClick={handleClick}>Sign Up</button>

              <span className='account'>
                <p>Already have an Account !</p>
                <p className='logg' onClick={handleClickLog} >log In</p>

              </span>

         </div>

      </div>
    </div>
  )
}

export default Register
