 import {useParams} from 'react-router-dom'
import axios from 'axios';
import {useEffect, useState} from 'react'

function ViewProduct(props){
    let [products,setProducts] =useState('')

    //get username from url
    //let paramsObj=useParams();
   
    //fetch userdata from upi
     //axios.get(`/user/getuser/${paramObj.username}`)
        //.then(res =>{

          //  let userObj =res.data.message;
           // setUser({...userObj})
       // })
   
    
      // useEffect(()=>{
        // axios.get(`/product/getproduct/${paramsObj.model}`)
         //.then(res =>{
           //  let productObj = res.data.message;
            // setProduct({ ...productObj })
       //  })
    // })     
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
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
        {products &&
            products.map((product, index) => {
                return (
                    <div class="col" key={index}>
                        <div class="card">
                            <img src={product.productImage} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{product.productname}</h5>
                                <p class="card-text">{product.description}</p>
                                <button className="btn btn-primary" onClick={()=> props.addProductToCart(product)}>add</button>
                            </div>
                        </div>
                    </div>

                )
            })
        }
    </div>

        
    )
}

export default ViewProduct;