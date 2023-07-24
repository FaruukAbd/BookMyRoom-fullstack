import React from 'react'
import {  } from "./MailList.css";
const MailList = () => {
  return (
    <div class="maillist">
      <img class="imagee" src="https://images.unsplash.com/photo-1560067174-e553b3647603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="" />
      <div className="mailContainer">
        <h1 class="mailTitle">Save Time,Save Money</h1>
        <p class="maildesc">Subscribe and we will send the best deals to you</p>
        <div className="mailInputContainer">
            <input type="text" placeholder='Type your email'/>
            <button>Subscribe</button>
        </div>
      </div>
    </div>
    
  )
}

export default MailList
