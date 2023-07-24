import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";

import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {
   
  const ProtectedRoute=({children})=>{
      const {user}=useContext(AuthContext);
      if(!user){
        return <Navigate  to="/login"/>
      }
      return children;
  }
  
  return (
   
    <BrowserRouter>
    <Routes>
       <Route path="/" element={ <Home/> }/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/hotels" element={<List/>}/>
       <Route path="/hotels/:id" element={<Hotel/>}/>
       <Route path="/profile" element={  <ProtectedRoute><Profile/> </ProtectedRoute> }/>

    </Routes>  
    </BrowserRouter>
  );
}

export default App;
