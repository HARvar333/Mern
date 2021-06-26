import React from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import ViewProduct from "./ViewProduct";
import UserCart from './UserCart';
import axios from 'axios';

function UserProfile(){

    const history = useHistory();
;


   let [user,setUser] = useState('');
   let [usercart,setUserCart] = useState('');
   let [products,setProducts] =useState('')

   //function to make post to user api
   const addProductToCart =(productObj)=>{
   
    //get username from Localstorage
    let username=localStorage.getItem("username")
  
    //add username to product object
   // productObj.username=username;

    let newObj={username,productObj}
    console.log("product added by user ",newObj)
   
     //make post request
    axios.post("/user/addtocart",newObj)
    .then(res=>{
       let responceObj =res.data
        alert(responceObj.message)
    })
    .catch(err=>{
       console.log("err in adding to cart",err)
        alert("something went wrong")
    })
   }







   
     // get username from url
     let paramsObj = useParams()
     // fetch user data from api
    useEffect(()=>{
      
        let userObj= JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})
    },[paramsObj.username])
    

   
   
   




    return(
        <div>
            <h2 className="text-end ">welcome {paramsObj.username}
            <img  src={user.profileImage} width="60px" alt=""/>
            </h2>
            

            <BrowserRouter>
            <ul className="nav bg-success">

     <li className="nav-item">
       <Link to="/view-products" className="nav-link">viewproduct</Link>
     </li>



     <li className="nav-item">
      <Link to="/user-cart" className="nav-link" > cart</Link>
     </li>
     </ul>

     <Switch>


         <Route path="/view-products">
         <ViewProduct  addProductToCart={addProductToCart}/>
        </Route>

        <Route path="/user-cart">
        <UserCart />
        </Route>

     </Switch>




















            </BrowserRouter>
            
                
               

            



        </div>
    )
}

export default UserProfile