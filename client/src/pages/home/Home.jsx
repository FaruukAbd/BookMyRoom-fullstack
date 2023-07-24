import React from 'react'
import Navber from '../../components/navber/Navber'
import Header from '../../components/header/Header'
import Body from '../../components/body/Body'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import {  } from "./Home.css";

const Home = () => {
  
  return (
    <div class="navhead" >
     <Navber/>
     <Header/>
     <Body/>
     <MailList/>
     <Footer/>
    </div>
  )
}

export default Home
