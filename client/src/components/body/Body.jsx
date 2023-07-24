import React, { useContext } from 'react'
import {  } from "./Body.css";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
const baseURL=process.env.REACT_APP_BACKEND_URL;
const Body = () => {
    const { data, loading, error } = useFetch(
        `${baseURL}/hotels/getTopHotels`
      );
      console.log(data);
    const {city,checkin,checkout,adult,child,room,changeDestination,changeCheckin,changeCheckout,changeAdult,changeChild,changeRoom,dispatch}=useContext(SearchContext);
    const navigate=useNavigate();
    const handleClick=(id,c)=>{
        changeDestination(c);
        navigate(`/hotels/${id}`);
    }
    

  return (
    <div className="bodyContainer">
        <div className="bodyText">
            <span class="Titile">Our Top Hotels</span>
            <span class="subTitile">view all hotels</span>
        </div>


        <div className="bodyHotels">
            {loading?"loading":<>
            
            {data?.map(item=>(
            
            <div className="bodyHotel"  key={item._id} onClick={() => handleClick(item._id,item.city)}>
               <img  class="img" src={item.photos[0]}  alt="" />
             
               <div className="hotelname">{item.name}</div>
               <div className="hotellocation">
               < FontAwesomeIcon icon={faLocationDot} className="BodyIcon"/>
                <span class="LocationText" >{item.city}</span>
                </div>
               <div className="hotelprice">From &nbsp;<b>₹{item.cheapestPrice}</b>  </div>
               <div className="hotelrating"> <b>{item.rating}</b>/5 (Superb 5 reviews)</div>
            </div>
            ))}
            </>}
            
            
            
        </div>
        <div className="bodyText">
             <span class="Titile">Popular Locations</span>
            <span class="subTitile">view all locations</span>
        </div>
        <div className="bodyLocations">
            <div className="bodyLocation" >
              
              <img class="place" src="https://images.unsplash.com/photo-1499462994724-775b2edaf559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
              
              <h2 class="placeName">Mumbai</h2>
             
            
            </div>
            <div className="bodyLocation">
                <img class="place" src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                <h2 class="placeName">Bengaluru</h2>
            </div>
            <div className="bodyLocation">
                <img class="place" src="https://images.unsplash.com/photo-1570168305673-42708ac64073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=634&q=80" alt="" />
                <h2 class="placeName">Delhi</h2>
            </div>
            <div className="bodyLocation">
                <img class="place" src="https://images.unsplash.com/photo-1486607303850-bc051a4ffad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80" alt="" />
                <h2 class="placeName">Chennai</h2>
             </div>
                
        </div>
        <div className="bodyText">
             <span class="Titile">Why Choose BookMyRoom for your Hotel Booking?</span>
            
        </div>
        <div className="bodyQuestions">
            <div className="bodyQuestion">
                <span class="que">Extensive Hotel Options</span>
                <p class="ans">Best hotels available for different destinations to offer you the stay of a lifetime.</p>
            </div>
            <div className="bodyQuestion">
                <span class="que">Savings on Hotel Booking</span>
                <p class="ans">Enjoy hotel bookings with the best offers and discounts and make your stay unforgettable.</p>
            </div>
            <div className="bodyQuestion">
                <span class="que">Hotel Ratings</span>
                <p class="ans">All our hotels have good ratings on Trip Advisor and are recommended by users.</p>
            </div>
            <div className="bodyQuestion">
                <span class="que">Best Price</span>
                <p class="ans">Get excellent hotels/resorts at the best prices to pamper your desires.</p>
            </div>
            
        </div>
        
    </div>
  )
}

export default Body
