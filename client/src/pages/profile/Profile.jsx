import React, { useContext, useEffect, useState } from 'react'
import {  } from "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPen, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { saveAs } from "file-saver";
import html2pdf from 'html2pdf.js';
// import { updateRoomAvailabiltyonCancel } from '../../../../api/controllers/room';
const Profile = () => {
  const [profile,setProfile]=useState(true);
  const [booking,setBooking]=useState(false);
  const [editprofile,setEditProfile]=useState(false);
  const navigate=useNavigate();
  const {user,dispatch}=useContext(AuthContext);
  const baseURL=process.env.REACT_APP_BACKEND_URL;
  const logout=()=>{
    dispatch({ type:"LOGOUT"}); 
    navigate("/")
  }
  
  const clickprofile=()=>{
     setProfile(true);
     setBooking(false);
     setEditProfile(false);
  }
  const clickbooking=()=>{
    setProfile(false);
    setBooking(true);
    setEditProfile(false);
  } 
  const clickeditprofile=()=>{
    setProfile(false);
    setBooking(false);
    setEditProfile(true);
  } 
  
 
  const { data, loading, error } = useFetch(`${baseURL}/users/${user._id}`);
  const [credentials,setCredentials]=useState({
    name:data.name ,
    email:data.email,
    phone:data.phone ,
    city:data.city,
    country:data.country,
    img:data.img 
  });
  console.log(data);
  const {data:fetchedData}=useFetch(`${baseURL}/bookings/find/${user._id}`);
  const [list,setList]=useState([]);

  useEffect(()=>{
    setList(fetchedData);
  },[fetchedData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/bookings/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleChange=(e)=>{
    setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}));
  }
  const updatedata=async()=>{
    await axios.put(`${baseURL}/users/${user._id}`,credentials);
    window.location.reload();
    clickprofile();
  }
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
// const alldates=(getDatesRange(fetchedData[0].checkIn,fetchedData[0].checkOut));
  const cancelBooking = async (item) => {
     
    const alldates=(getDatesRange(item.checkIn,item.checkOut));
    try {
      const confirmed = window.confirm('Are you sure you want to cancel this booking?');
      if(confirmed){

        await Promise.all(
          item.RoomNoId.map((room)=>{
            const res=axios.put(`${baseURL}/rooms/availabilityoncalcel/${room.roomId}`,{
              dates:alldates
            })
            return res.data;
          })
          )
          // await axios.delete(`/bookings/${item._id}`);
          handleDelete(item._id)
        }
    

    } catch (error) {
      
    }
    

  };
  
  
  const generatePDF = (item) => {
    // Create an HTML template for the PDF content
    const checkInDate = new Date(item.checkIn);
    const checkOutDate = new Date(item.checkOut);
    const formattedCheckInDate = checkInDate.toISOString().slice(0, 10);
    const formattedCheckOutDate = checkOutDate.toISOString().slice(0, 10);
    const roomNumbersString = item.RoomNoId.map((room) => room.roomNum).join(', ');                
    
    const pdfTemplate = `   
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        
      .header{
        background-color:#dfebfd;
        text-align: center;
        font-size: 28px;
      }
      .userDetails{
        font-size: 20px;
        margin: 20px;
       
       display: inline;
       padding: 0px 20px;
      }
      .userDetailsBox{
        display: flex;
        flex-direction: row;
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 20px 40px;
        margin: 10px 20px;
        border-bottom: 2px solid #dfebfd;
        
      }
      .smbox{
        
        height: 30px;
      
       display: flex;
       flex-direction: row;
        
      }
      .tagname{
        width: 30%;
      
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .actualname{
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .termsbox{
        height: 250px;
        
        
      }
      .terms{
        padding: 10px 0px;
        font-size: 18px;
      }
    </style>
</head>
<body>
    <h2 class="header">Book My Room</h2>
    <h3 class="userDetails">User Details</h3>

    <div class="userDetailsBox">
        
        <div class="smbox">
            <div class="tagname">username</div>
            <div class="actualname">: &nbsp;${data.username}</div>
        </div>
        <div class="smbox">
            <div class="tagname">full name</div>
            <div class="actualname">: &nbsp;${data.name}</div>
        </div>
        <div class="smbox"></div>

        <div class="smbox">
            <div class="tagname">email</div>
            <div class="actualname">: &nbsp;${data.email}</div>
        </div>
        <div class="smbox">
            <div class="tagname">phone no</div>
            <div class="actualname">: &nbsp;${data.phone}</div>
        </div>
        <div class="smbox"></div>
        <div class="smbox">
            <div class="tagname">city</div>
            <div class="actualname">: &nbsp;${data.city}</div>
        </div>
        <div class="smbox">
            <div class="tagname">country</div>
            <div class="actualname">: &nbsp;${data.country}</div>
        </div>
        <div class="smbox"></div>
       
    </div>
    <h3 class="userDetails">Booking Details</h3>
    <div class="userDetailsBox">
        
        <div class="smbox">
            <div class="tagname">Booking Id</div>
            <div class="actualname">: &nbsp;${item._id}</div>
        </div>
        <div class="smbox">
            <div class="tagname">Amount</div>
            <div class="actualname">: &nbsp;₹${item.Price}</div>
        </div>
        <div class="smbox"></div>
        <div class="smbox">
            <div class="tagname">CheckIn</div>
            <div class="actualname">: &nbsp;${formattedCheckInDate}</div>
        </div>
        <div class="smbox">
            <div class="tagname">CheckOut</div>
            <div class="actualname">: &nbsp;${formattedCheckOutDate}</div>
        </div>
        <div class="smbox"></div>

        <div class="smbox">
            <div class="tagname">city</div>
            <div class="actualname">: &nbsp;${item.city}</div>
        </div>
        <div class="smbox">
            <div class="tagname">hotel</div>
            <div class="actualname">: &nbsp;${item.Hotel}</div>
        </div>
        <div class="smbox"></div>
        <div class="smbox">
            <div class="tagname">room no</div>
            <div class="actualname">: &nbsp;${roomNumbersString}</div>
        </div>
        <div class="smbox">
            <div class="tagname">Adult</div>
            <div class="actualname">: &nbsp;${item.adult}</div>
        </div>
        <div class="smbox"></div>
       <div class="smbox">
            <div class="tagname">Child</div>
            <div class="actualname">: &nbsp;${item.child}</div>
        </div>
        <div class="smbox">
            <div class="tagname">Payemnt</div>
            <div class="actualname">: &nbsp;pending</div>
        </div>
        <div class="smbox"></div>
       
    </div>
    <h3 class="userDetails">Terms & Conditions</h3>
       <div class="termsbox">
           <ul>
            <li class="terms">By using our booking website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</li>
            <li class="terms">All bookings made through our website are subject to confirmation. We reserve the right to reject or cancel any booking at our discretion.</li>
            <li class="terms">You must provide accurate and complete information when making a booking. Any false or misleading information may result in the cancellation of your booking.</li>
            <li  class="terms">Payment for bookings must be made in accordance with our payment terms. We accept various payment methods, and you are responsible for any applicable fees or charges.</li>
            <li  class="terms">Cancellation and refund policies may vary depending on the booking and service. Please review the specific cancellation and refund policy associated with your booking.</li>
           </ul>
        </div>
</body>
</html>
  `;
    // Options for html2pdf.js
    const options = {
      margin: 10,
      filename: 'booking_reciept.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Convert the HTML template to a PDF and save it
    // html2pdf().from(pdfTemplate).set(options).save();
    html2pdf().from(pdfTemplate).set(options).save()
  };
  
  // console.log(alldates);
  // console.log(credentials);
 
  // console.log(credentials);
  
  // console.log(data);
  // console.log(fetchedData[0].);
 
  return (
    <div className='myprofile'>
      <div className="upperbar">
            <div className="corner">
              <img className='profileimage' src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1689960578~exp=1689961178~hmac=50af986abf980e2df27e21b390d1c3d5ed1f3a78f951ffb52693276491212354" alt="" />
              <span className='profilename' >{data.username}</span>
            </div>
            <div className="webname">
              <span>Book My Room</span>
            </div>
      </div>
       <div className="sidebar">
            <div className={profile?"rows on":"rows"} onClick={clickprofile}>
              <FontAwesomeIcon icon={faUser}/>
              <span>My Profile</span>
            </div> 
            <div className={booking?"rows on":"rows"} onClick={clickbooking}>
              <FontAwesomeIcon icon={faBed}/>
              <span>My Booking</span>
            </div> 
            <div className={editprofile?"rows on":"rows"}  onClick={clickeditprofile}>
              <FontAwesomeIcon icon={faPen}/>
              <span>Edit Profile</span>
            </div>
            <div className="rows log" onClick={logout}>
            <FontAwesomeIcon icon={faRightFromBracket}/>
              <span>Log out</span>
            </div>
       </div>
       <div className="content">
          {profile && <div className="profileContent" >
           
           <h3>My Profile</h3>
            
            <div className="field">
              <span className='fieldname'>full name</span>
              <span className='actname'>: &nbsp;{data.name?data.name:"your name"}  </span>
            </div>
            <div className="field">
              <span className='fieldname'>Email</span>
              <span className='actname'>: &nbsp; {data.email?data.email :"your email"} </span>
            </div>
            <div className="field">
               <span className='fieldname'>Phone Number</span>
               <span className='actname'>: &nbsp; {data.phone?data.phone :"your phone number"}</span>
            </div>
            <div className="field">
                <span className='fieldname'>city</span>
                <span className='actname'>: &nbsp; {data.city?data.city :"your city"}</span>
            </div>
            <div className="field">
                <span className='fieldname'>country</span>
                <span className='actname'>: &nbsp; {data.country?data.country :"your country"}</span>
           </div>
          </div>}


          {booking && <div className="bookingContent" >
               <h3>My Booking</h3>
               <div className="bookingheader">
                  <span className='Id'>booking ID</span>
                  <span className='checkin'>check In</span>
                  <span className='checkout'>Check out</span>
                  <span className='checkout'>City</span>
                  <span className='hname'>Hotel Name</span>
                  <span className='roomno'>Room No</span>
                  <span></span>
               </div>
               {list.length===0 ?"you have no booking right now" : 
                  
                  list.map(item=>{
                    const checkInDate = new Date(item.checkIn);
                    const checkOutDate = new Date(item.checkOut);
                    const formattedCheckInDate = checkInDate.toISOString().slice(0, 10);
                    const formattedCheckOutDate = checkOutDate.toISOString().slice(0, 10);
                    const roomNumbersString = item.RoomNoId.map((room) => room.roomNum).join(', ');
                    return(
                    <div key={item._id} className="bookings">
                 <span className='Id'>{item._id}</span>
                 <span className='checkin'>{formattedCheckInDate}</span>
                 <span className='checkout'>{formattedCheckOutDate}</span>
                 <span className='checkout'>{item.city}</span>
                 <span className='hname'>{item.Hotel}</span>
                  
                 <span className='roomno'>{roomNumbersString}</span>
                 <button className='download' onClick={()=>generatePDF(item)}>download</button>
                 <button className='cancel' onClick={() => cancelBooking(item)}>canel</button>
              </div>)})}
          





          </div>}
          {editprofile && <div className="editprofileContent">
          <h3>Edit Profile</h3>

            
            <div className="field">
              <span className='fieldname'>full name </span>
             
              <input type="text" id='name' className='inuputfield' placeholder={data.name?data.name:"your name"} onChange={handleChange} />
            </div>
            <div className="field">
              <span className='fieldname'>Email</span>
              <input type="text" id='email' className='inuputfield' placeholder={data.email?data.email :"your email"} onChange={handleChange}/>
            </div>
            <div className="field">
               <span className='fieldname'>Phone Number</span>
               <input type="text" id='phone' className='inuputfield' placeholder={data.phone?data.phone :"your phone number"}onChange={handleChange} />
            </div>
            <div className="field">
                <span className='fieldname' >city</span>
                <input type="text" id='city' className='inuputfield' placeholder={data.city?data.city :"your city"}onChange={handleChange} />
            </div>
            <div className="field">
                <span className='fieldname'>country</span>
                <input type="text"id='country' className='inuputfield' placeholder={data.country?data.country :"your country"} onChange={handleChange}/>
           </div>
           <div className=" butttons">
            {/* <div className="profilepic"> */}

               {/* <span className=''>profile pic</span> */}
               {/* <input type="file" id='img' placeholder='upload profile pic' className='inputpic'onChange={handleChange}/> */}
            {/* </div> */}
                <button  className='btnn'onClick={updatedata} >Save</button>
           </div>
          </div>}
       </div>
     
    </div>
  )
}

export default Profile
