import {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
//import { json } from 'express';

function AddProduct(){
    const { register,handleSubmit} =useForm();
    const history = useHistory();
    const [file,setFile] = useState(null)

    //form submit
    const onFormSubmit =(productobj) =>{
        //formdata object creation
        let formData = new FormData();
        // append file to form data
        formData.append('photo',file,file.name)

        formData.append("productobj",JSON.stringify(productobj))
        //console.log(Productobj)
        
        
       //post request using axios
       axios.post("/product/createproduct", formData)
       .then(res =>{
           let resObj= res.data;
           alert(resObj.message)
           history.push('/view-products')
       })
       .catch(err =>{
           console.log(err);
           alert("something is not right")
       })
        
    }
    // file to get selected
    const onFileSelect =(e) =>{
        //console.log(e.target.files[0]);
        setFile(e.target.files[0])
    }
        



    return(
        <div>
            <form className="form-label w-50 mx-auto m-5" onSubmit={handleSubmit(onFormSubmit)}>

            {/* username */}
           <label htmlFor="un">Productname</label>
            <input type="text" id="un" {...register('productname',{required:true,minLength:4})}  className="form-control mb-3"/>
        
            
           

            <label htmlFor="mo">Model</label>
            <input type="text" id="mo" {...register('model',{required:true,minLength:2})}  className="form-control mb-3"/>
            
            {/* Select email */}
            <label htmlFor="pr">Price</label>
            <input type="number" id="pr" {...register('price',{required:true,minLength:2})}  className="form-control mb-3"/>
            <label htmlFor="ta">Description</label>
            <input type="textarea" id="ta" {...register('description')}  className="form-control mb-3"/>


            <input type="file" name="photos" className="form-control mt-3 mb-3" onChange={(e)=>{onFileSelect(e)}}></input>
            

          
            



            

         

        <button type="submit" className="btn btn-danger">Register</button>
        </form>
        </div>
    )
}

export default AddProduct;