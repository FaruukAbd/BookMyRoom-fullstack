import { createContext, useReducer, useState } from "react";

const INTIAL_STATE ={
    city:undefined,
    checkin:new Date(),
    checkout:new Date(),
    adult:undefined,
    child:undefined,
    room:undefined   
    
};
export const SearchContext=createContext(INTIAL_STATE);

const SearchReducer=(state,action)=>{
    switch (action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEACRH":
            return INTIAL_STATE;
        case "NEW_CITY":
            return {...state,city:action.payload}
        case "NEW_CHECKIN":
            return {...state,checkin:action.payload}   
        case "NEW_CHECKOUT":
            return {...state,checkout:action.payload}
        case "NEW_ADULT":
          return {...state,adult:action.payload}
           case "NEW_CHILD":
          return {...state,child:action.payload} 
          case "NEW_ROOM":
          return {...state,room:action.payload}
        default:
            return state;
    }
};

export const SearchContextProvider =({children})=>{
    const [state,dispatch]=useReducer(SearchReducer,INTIAL_STATE);
    // const [adult,setAdult]=useState(1);
    // const [child,setChild]=useState(0);
    // const [room,setRoom]=useState(1);

    const changeDestination=(e)=>{
      dispatch({type:"NEW_CITY",payload:e});
    }
    const changeCheckin=(e)=>{
      dispatch({type:"NEW_CHECKIN",payload:e});
    }
    const changeCheckout=(e)=>{
      dispatch({type:"NEW_CHECKOUT",payload:e});
    }
    // const updateAdultValue = (newValue) => {
    //   setAdult(newValue);
    // };
    // const updateChildValue = (newValue) => {
    //   setChild(newValue);
    // };
    // const updateRoomValue = (newValue) => {
    //   setRoom(newValue);
    // };
    const changeAdult=(e)=>{
      dispatch({type:"NEW_ADULT",payload:e});
    }
    const changeChild=(e)=>{
      dispatch({type:"NEW_CHILD",payload:e});
    }
    const changeRoom=(e)=>{
      dispatch({type:"NEW_ROOM",payload:e});
    }

    return (
        <SearchContext.Provider 
        value={{
            city:state.city,
            checkin:state.checkin,
            checkout:state.checkout,
            // adult,
            // updateAdultValue,
            // child,
            // updateChildValue,
            // room,
            // updateRoomValue,
            adult:state.adult,
            child:state.child,
            room:state.room,
            changeDestination,
            changeCheckin,
            changeCheckout,
            changeAdult,
            changeChild,
            changeRoom,
            dispatch
        }}
        >
            {children}
        </SearchContext.Provider>
    );
};

