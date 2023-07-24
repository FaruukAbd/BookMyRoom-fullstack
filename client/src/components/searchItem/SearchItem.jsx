import React, { useState } from 'react'
import "./SearchItem.css"
import { useNavigate } from 'react-router-dom'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {format } from "date-fns";
const SearchItem = ({item,place}) => {


    const navigate=useNavigate();
    const [destination, setDestination]=useState("");
    const [openDate, setOpenDate]=useState(false);
    const [date, setDate] = useState([
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
    const handleClickchek=()=>{
        navigate(`/hotels/${item._id}`,{state:{place}} )
    }
    // console.log(element);
  return (
    <div>
      <div className="searchItem">
            <img src={item.photos[0]} alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}m from center, {item.city}</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">
                    {item.title}
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating || 3.2}</button>
                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">  <b>${item.cheapestPrice }</b></span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <button className="siCheckButton" onClick={handleClickchek}>See availability</button>
                </div>
            </div>
        </div>


      </div>
  )
}

export default SearchItem
