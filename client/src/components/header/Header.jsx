import React, { useContext } from 'react'
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react'
import {format } from "date-fns";
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'
const baseURL=process.env.REACT_APP_BACKEND_URL;
const Header = () => {
    const [destination, setDestination]=useState("");
    const [openDate, setOpenDate]=useState(false);
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
   
     const [openOptions, setOpenOption] = useState(false);
     const [options, setOptions] = useState({
           adult: 1,
           children: 0,
            room: 1,
     });
      const navigate=useNavigate()    
     const handleOption = (name, operation) => {
        setOptions((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
          };
        });
      };
     
      const {city,checkin,checkout,adult,child,room,changeDestination,changeCheckin,changeCheckout,changeAdult,changeChild,changeRoom,dispatch}=useContext(SearchContext);
      

      const handleSearch=()=>{
        changeAdult(options.adult); 
        changeChild(options.children); 
        changeRoom(options.room); 
        // dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}});
        navigate("/hotels",{state:{destination,dates,options}});
      };
  return (
    <div class="header" >
     <img class=  "image"src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />
     
     { <>
     <div className="text">
        <span >Wherever you go,</span>
        <span >stay only in our room</span>
        <button class="btn">Book Now</button>
     </div>
     
     <div className="headerSearch">
            <div className="headerSearchItem">
                < FontAwesomeIcon icon={faBed} className="headerIcon"/>
                <input type="text" placeholder='where are you going?' className='headerSearchInput'
                onChange={e=>changeDestination(e.target.value)}
                />
            </div>
            <div className="headerSearchItem">
                           <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <div className="ItemNamee"> 
                          <span>Check-In</span>
                          <input type="date" placeholder='Check-in' className='headerSearchInput'
                           onChange={(e)=>changeCheckin(e.target.value)}/>
                        </div>
                       <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                          <div className="ItemNamee">
                            < span>Check-Out</span>
                            <input type="date" placeholder='Check-out'   className='headerSearchInput'
                            onChange={(e)=>changeCheckout(e.target.value)}/>
                        </div>
                        </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                <span onClick={()=>setOpenOption(!openOptions)} className='headerSearchText'>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && ( <div className="options">
                    <div className="optionsItem">
                        <span className="optionText">Adult:</span>
                        <div className="optionCounter">

                        <button disabled={options.adult<=1} className='optionsCounterBtn' onClick={()=>handleOption("adult","d")}>-</button>
                        <span className='optionCounterNumber'>{options.adult}</span>
                        <button className='optionsCounterBtn'onClick={()=>handleOption("adult","i")}>+</button>
                        </div>
                    </div>
                    <div className="optionsItem">
                        <span className="optionText">Children:</span>
                        <div className="optionCounter">
                        <button disabled={options.children<=0} className='optionsCounterBtn' onClick={()=>handleOption("children","d")}>-</button>
                        <span className='optionCounterNumber'>{options.children}</span>
                            
                        <button className='optionsCounterBtn' onClick={()=>handleOption("children","i")}>+</button>
                        </div>
                    </div>
                    <div className="optionsItem">
                        <span className="optionText">Room:</span>
                        <div className="optionCounter">
                        <button disabled={options.room<=1}className='optionsCounterBtn'onClick={()=>handleOption("room","d")}>-</button>
                        <span className='optionCounterNumber'>{options.room}</span>
                        <button className='optionsCounterBtn' onClick={()=>handleOption("room","i")}>+</button>
                            
                        </div>
                    </div>
                </div>)}
            </div>
            <div className="headerSearchItem">
                <button className='headerBtn' onClick={()=>handleSearch()}>Search</button>
            </div>
        </div>
        </>}
    </div>
  )
}

export default Header
