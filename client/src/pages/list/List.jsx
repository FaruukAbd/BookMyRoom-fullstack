import React, { useContext } from 'react'
import {  } from "./List.css";
import Navber from '../../components/navber/Navber'
import SearchItem from "../../components/searchItem/SearchItem";
import Footer from '../../components/footer/Footer'
import MailList from "../../components/mailList/MailList";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../components/context/SearchContext';
const baseURL=process.env.REACT_APP_BACKEND_URL;
const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    
    const {city,checkin,checkout,adult,child,room,changeDestination,changeCheckin,changeCheckout,changeAdult,changeChild,changeRoom,dispatch}=useContext(SearchContext);
    const { data, loading, error, reFetch } = useFetch(
      `${baseURL}/hotels?city=${city}&min=${min || 0 }&max=${max || 999}`
    );
    
    const handleClick=()=>{
      // dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}});
      reFetch();  
    }
    
    data.sort((a, b) => b.rating - a.rating);
    // console.log(data);
    // console.log(options);
  return (
    <div className='list'>
      <Navber/>
      <div className="listpage">
        <img className=" listimage" src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />

       <h2 className='listTitle'>Find Your Best Stay</h2>
      </div>
      <div className="listContainer">
        <div className="listWrapper">
            <div className="listSearch"> 
            <h1 className="lsTitle">Search</h1>
            
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={city}onChange={(e)=>changeDestination(e.target.value )}/>
            </div>
            <div className="lsItem">
              <label >Check-In</label>
              <input type="date" value={checkin} onChange={(e)=>changeCheckin(e.target.value)}/>
            </div>
            <div className="lsItem">
              <label >Check-Out</label>
              <input type="date"  value={checkout} onChange={(e)=>changeCheckout(e.target.value)}/>
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={adult}
                    onChange={(e)=>changeAdult(e.target.value )}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={child}
                    onChange={(e)=>changeChild(e.target.value )}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={room}
                    onChange={(e)=>changeRoom(e.target.value )}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick} >Search</button>
          </div>
          
          <div className="listResult">

          {loading ?"loading":<>
          
          {/* {!data?"there is no hotel": */}

          {data.length==0?"Sorry we dont have the Hotel based on your requirement"
          
          :data.map(item=>(
            <SearchItem item={item}key={item._id}  />
            ))}

          {/* } */}
          
          </>}
          
          </div>

        </div>
      </div>
      <MailList/>
      <Footer/>
    </div>
  )
}

export default List
