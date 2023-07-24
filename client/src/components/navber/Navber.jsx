import React, { useContext, useState } from 'react'
import "./Navber.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BiSolidUserCircle, faBed, faPen, faPenClip, faRightFromBracket, faUser, faUserCircle
} from "@fortawesome/free-solid-svg-icons";
const Navber = () => {
  const [openOptions, setOpenOption] = useState(false);
  const {user,dispatch}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleClickLog=()=>{
       navigate("/login")
  }
  const handleClickRegister=()=>{
     navigate("/register")
  }
  const handleClick=()=>{
    navigate("/")
  }
  
  
  const logout=()=>{
    dispatch({ type: "LOGOUT"});
    
    // window.location.reload();
    navigate("/")
  }
  const handleprofile=()=>{
    navigate("/profile")
  }
  return (
    <div className="navbar">
    <div className="navContainer">

      <span onClick={handleClick}  className='logo'>BookMyRoom</span>

      <div className="navItem">
      {user? ( 
           <div className="userr">
              {/* <span className='username' >{user.username}</span>   */}
              <FontAwesomeIcon className='userIcon' icon={faUserCircle} onClick={()=>setOpenOption(!openOptions)}/>
              {openOptions && ( <div className="profiletab">
                   <div className="row" onClick={handleprofile}>
                     <FontAwesomeIcon icon={faUser}/>
                      <span>My Profile</span>  
                   </div>
                   <div className="row" onClick={handleprofile}>
                   <FontAwesomeIcon icon={faBed}/>
                      <span>My Booking</span>   
                   </div>
                   <div className="row" onClick={handleprofile}>
                   <FontAwesomeIcon icon={faPen}/>
                       <span>Edit profile</span> 
                   </div>
                   <div className="row" onClick={logout}>
                   <FontAwesomeIcon icon={faRightFromBracket}/>
                      <span>log out</span>   
                   </div>
                   
              </div>)}
           </div>

      )
      :(<div className="navItem">
          <button className='navButton' onClick={handleClickRegister} >Register</button>
          <button className='navButton' onClick={handleClickLog}>Log in</button>
        </div>)}
      </div>


    </div>
  </div>
  )
}

export default Navber

