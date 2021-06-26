import {useState,useEffect} from 'react'
import axios from 'axios'
function UserCart(){
  let [products,setProducts] =useState('')

  
  useEffect(() => {
    axios.get('/product/viewproducts')
        .then(res => {
            setProducts(res.data.message)
            
        })
        .catch(err => {
            console.log("err in get products ", err)
            alert("Something went wrong")
        })
}, [])

    return(
        <div>
          <h1>user cart is thier</h1>
          <table className="table bg-success">
            <thead>
              <tr>
             <th>Model</th>
             <th> ProductName</th>
             <th> productDescription</th>
             <th>ProductImage</th>
            
             </tr>
            </thead>
            <tbody>
                 {products &&
                   products.map((product,key)=>
                   {
                     return(
                       <tr key="key">
                         <td>{product.model}</td>
                         <td>{product.productname}</td>
                         <td>{product.description}</td>
                         <td> <img src={product.productImage} width="60px" alt="..." /></td>

                       </tr>
                     )

                   })
                 }
            </tbody>
          </table>
        </div>
    )
}
export default UserCart;