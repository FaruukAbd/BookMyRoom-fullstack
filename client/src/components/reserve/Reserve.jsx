import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import useFetch from "../../hooks/useFetch"
import "./Reserve.css"
import { SearchContext } from "../context/SearchContext"
import { AuthContext } from "../context/AuthContext"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const baseURL=process.env.REACT_APP_BACKEND_URL;

const Reserve = ({setOpen,hotelId,price}) => {
    const [selectedRooms,setSelectedRooms]=useState([]);
    const { data, loading, error } = useFetch(`${baseURL}/hotels/room/${hotelId}`);
    const {data:hotel}=useFetch(`${baseURL}/hotels/find/${hotelId}`);
    const {city,checkin,checkout,adult,child,room,changeDestination,changeCheckin,changeCheckout,changeAdult,changeChild,changeRoom,dispatch}=useContext(SearchContext);
    const {user}=useContext(AuthContext);
    const [amount,setAmount]=useState();
  

    const [credentials,setCredentials]=useState({
      userId:user._id,
      city:city,
      checkIn:checkin,
      checkOut:checkout,
      adult:adult,
      child:child,
      Hotel:"",
      RoomNoId:[],
      Price:price,
      PaymentDone:false
    });
   
    useEffect(() => {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        Hotel: hotel.name,
      }));
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        RoomNoId: selectedRooms,
      }));
       setCredentials((prevCredentials) => ({
        ...prevCredentials,
        Price: amount,
      }));
      
    }, [hotel, selectedRooms,amount]);

    const getDatesRange=(startDate,endDate)=>{
        const start=new Date(startDate);
        const end=new Date(endDate);
        const date=new Date(start.getTime());
        let list=[];
        while(date<=end){
            list.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return list;
    }
    const alldates=(getDatesRange(checkin,checkout));
    console.log(alldates)
    const isAvailable=(roomNumber)=>{
        const isFound= roomNumber.unavailableDates.some((date)=>
        alldates.includes(new Date(date).getTime()));

        return !isFound;
    }
     
    const MILLISECONDS_PER_DAY=1000*60*60*24;
    function daydifferences(date1,date2){
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const timeDiff=Math.abs(d2.getTime()-d1.getTime());
        const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days=daydifferences(checkout ,checkin);

    const handleSelect = (roomNumber,price) => (e) => {
      const checked = e.target.checked;
      const roomId = roomNumber._id;
      const roomNum = roomNumber.number;
    
      setSelectedRooms(
        checked
          ? [...selectedRooms,{roomId,roomNum}]
          : selectedRooms.filter((room) => room.roomId !== roomId)
      );
      
      setAmount(
        days*selectedRooms.length*price
      )
    };
    console.log(amount)
    const navigate=useNavigate();
    const handleClick= async(e)=>{
       try {
        await Promise.all(
            selectedRooms.map((room)=>{
                const res=axios.put(`${baseURL}/rooms/availability/${room.roomId}`,{
                    dates:alldates
                });
                return res.data;
            })
        );
       
        await axios.post(`${baseURL}/bookings`,credentials);
        setOpen(false);
        navigate("/");
       } catch (error) {
        
       }
    };
    
  return (
   

    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>{setOpen(false)}}/>
        <span className="reserveTitle" >Select Your Room:</span>
        <div className="roomss">

        
        { data.length===0?"loading...":  data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max Guest: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    // onChange={handleSelect}
                    onChange={handleSelect(roomNumber,item.price)}
                    disabled={!isAvailable(roomNumber)}
                    />
                </div>
              ))}
            </div>
          </div>
        ))}
        </div> 
        

      
        <button onClick={handleClick} className="rButton">Reserve Now</button>
        
      </div>
    </div>
      
  )
}

export default Reserve
