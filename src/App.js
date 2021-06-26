//import logo from './logo.svg';
import './App.css';

import {BrowserRouter,Switch,Link, Route} from 'react-router-dom'
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import AdminProfile from './components/AdminProfile'


function App() {

let[userLoginStatus,setUserLoginStatus] = useState('')

const logOutUser =() =>{
  localStorage.clear();
  setUserLoginStatus(false);
}



  return (
    <BrowserRouter>
    <div>

    <ul className="nav bg-light justify-content-end">
      <li className="nav-item">
        {/* <a className="nav-link" href="#">Home</a>  */}
         <Link to ="/home" className="nav-link">Home</Link> 

      </li>
      { !userLoginStatus ?
      <li className="nav-item">
      <Link to ="/login" className="nav-link" >Login</Link>
      </li> :
      <li className="nav-item">
      <Link to ="/login" className="nav-link" onClick ={()=>logOutUser()}>Logout</Link>
      </li>

}
      <li className="nav-item">
      <Link to ="/register" className="nav-link">Register</Link>
      </li>
     
      
      </ul>


      <Switch>
        {/* route for home component  */}
         <Route path="/home"> 
         <Home /> 
        </Route> 
        <Route path="/login"> 
         <Login  setUserLoginStatus={setUserLoginStatus}/> 
        </Route> 
        <Route path="/register"> 
         <Register /> 
        </Route> 
        
        
        <Route path="/userprofile/:username"> 
         <UserProfile /> 
        </Route> 

        <Route path="/adminprofile/:username">
          <AdminProfile/>
        </Route>
       
       </Switch> 

      </div>
      
      </BrowserRouter>
    
  );
}

export default App;
