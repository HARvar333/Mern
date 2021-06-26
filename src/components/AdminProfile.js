import ViewProduct from "./ViewProduct";
import AddProduct from "./AddProduct";
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
function AdminProfile(){


    return(
        <div>
            <BrowserRouter>
            <ul className="nav bg-success">

     <li className="nav-item">
       <Link to="/add-product" className="nav-link">Add product</Link>
     </li>



     <li className="nav-item">
      <Link to="/view-products" className="nav-link" >View product</Link>
     </li>
     </ul>

     <Switch>
     <Route path="/add-product">
           <AddProduct/>
         </Route>


         <Route path="/view-products">
         <ViewProduct/>
        </Route>



     </Switch>




















            </BrowserRouter>
         
        </div>
    )
}

export default AdminProfile;