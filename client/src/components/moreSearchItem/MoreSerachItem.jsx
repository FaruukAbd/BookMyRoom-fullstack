import React from 'react'
import {  } from "./MoreSerachItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const MoreSerachItem = ({item,place}) => {
  
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate(`/hotels/${item._id}`,{state:{place}})
  }
   
  return (
    <div>
        <div className="ItemContainer">
            
           <img className='ItemImage' src={item.photos[0]} alt="" />
           <div className="ItemPrice">From ${item.cheapestPrice} <small>/night</small></div>
        <span className='ItemName'>{item.name}</span>
        <div className="ItemDesc">
            <div className="ItemDesssss">
            <FontAwesomeIcon className='ItemIcon' icon={faBed}/>
            <span className='ItemDesccc'>1 King Bed</span>
            </div>

            <div className="ItemDesccc">
            <FontAwesomeIcon className='ItemIcon' icon={faPeopleGroup}/>
            <span className='ItemDesccc'>3 Guests</span>
           </div>
        </div>
        <button className='ItemBtn'  >Book Now</button>
        </div>
    </div>
  )
}

export default MoreSerachItem
