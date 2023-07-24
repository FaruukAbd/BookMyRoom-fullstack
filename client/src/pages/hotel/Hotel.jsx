import React, { useContext } from 'react'
import {  } from "./Hotel.css";
import Navber from '../../components/navber/Navber'
import Footer from '../../components/footer/Footer'
import MoreSerachItem from "../../components/moreSearchItem/MoreSerachItem";
import MailList from "../../components/mailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBed,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faCity,
  faHouse,
  faLocationDot,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import {  useLocation, useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../components/context/SearchContext';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { AuthContext } from '../../components/context/AuthContext';
import Reserve from '../../components/reserve/Reserve';
const baseURL=process.env.REACT_APP_BACKEND_URL;
const Hotel = () => {
  const location = useLocation();
  const id=location.pathname.split("/")[2];
 const navigate=useNavigate();
  const { data, loading, error } = useFetch(
    `${baseURL}/hotels/find/${id}`
  );
 
  
  const [openDate, setOpenDate] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {city,checkin,checkout,adult,child,room,changeDestination,changeCheckin,changeCheckout,changeAdult,changeChild,changeRoom,dispatch}=useContext(SearchContext);
  
  
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  
  
  
  console.log(checkin);
  console.log(checkout);
  const MILLISECONDS_PER_DAY=1000*60*60*24;
  function daydifferences(date1,date2){
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const timeDiff=Math.abs(d2.getTime()-d1.getTime());
      const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
      return diffDays;
  }
  const days=daydifferences(checkout ,checkin);
  const price=days*data.cheapestPrice*room;
  // console.log(dates[0].startDate);
  // console.log(dates[0].endDate);
  // console.log(days);
  // console.log(destination);
  // console.log(datess);
  // console.log(adults);
  const {user}=useContext(AuthContext)
  // const date=format(dates[0].startDate, "MM/dd/yyyy");
  // console.log(date)
  // console.log(city);
  const {data: fetchedData} = useFetch(
    `${baseURL}/hotels?city=${city}&min=${min || 0 }&max=${max || 999}`
  );
  // console.log(fetchedData);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  
  

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
   const handleClick=()=>{
      if(user){
        setOpenModal(true)
      }
      else{
        navigate("/login")
      }
   }
   
  return (
    <div>
      <Navber/>
      <div className="hotelpage">
        <img className='hotelimage' src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" />
        <h2 className='hotelnamee'>{data.name}</h2>
      </div>
      {loading?"loading":<>
     
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            
            <div className="hotelDetailsTexts">
            <div className="hoteldetailsdesc">
              <div className="descIcon">
              <FontAwesomeIcon className='icon' icon={faBed} />
              <span>
                <p className="IconTitle">Bed</p>
                <p className="IconDesc">1 King  Bed</p>
              </span>
              </div>
              <div className="descIcon">
              <FontAwesomeIcon className='icon' icon={faPeopleGroup} />
              <span>
                <p className="IconTitle">Max Guest</p>
                <p className="IconDesc">3 Guests</p>
              </span>
              </div>
              <div className="descIcon">
              <FontAwesomeIcon className='icon' icon={ faHouse} />
              <span>
                <p className="IconTitle">Room Space</p>
                <p className="IconDesc">38 sqm</p>
              </span>
              </div><div className="descIcon">
              <FontAwesomeIcon className='icon' icon={faCity} />
              <span>
                <p className="IconTitle">Room View</p>
                <p className="IconDesc">City view</p>
              </span>
              </div>
             </div>
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                
                {data.desc}
              </p>
            </div>

            <div className="hotelDetailsPrice">
              <div className="againcheck">
              <div className="lsItem">
              <label >Check-In</label>
              <input type="date" value={checkin}onChange={(e)=>changeCheckin(e.target.value)}/>
            </div>
            <div className="lsItem">
              <label >Check-Out</label>
              <input type="date" value={checkout}onChange={(e)=>changeCheckout(e.target.value)}/>
            </div>
              <div className="lsItem">
                 <label>Options</label>
                  <div className="lsOptions">

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
               </div>
                  <h1>Perfect for a {days}-night stay!</h1> 
                  <h2><b>${price}</b> ({days}nights)</h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
                
              
             
              </div>
            </div>
           
        </div>
        </>}

        <div className="morehotels">
           <span class="morerooms">More Rooms</span>
          <div className="morehotel">
            <Carousel responsive={responsive}>
            {fetchedData.map((item)=>(
               
                  <MoreSerachItem  item={item} key={item._id}/>
                
            ))}
             
            </Carousel>
          </div>
        </div>
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} price={price} />}
        <MailList/>
        <Footer/>
    </div>
  )
}

export default Hotel
