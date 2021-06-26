import {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
//import { json } from 'express';

function Register(){
    const { register,handleSubmit} =useForm();
    const history = useHistory();
    const [file,setFile] = useState(null)

    //form submit
    const onFormSubmit =(userObj) =>{
        //formdata object creation
        let formData = new FormData();
        // append file to form data
        formData.append('photo',file,file.name)

        formData.append("userObj",JSON.stringify(userObj))
        //console.log(userObj)
        
        
       //post request using axios
       axios.post("/user/createuser", formData)
       .then(res =>{
           let resObj= res.data;
           alert(resObj.message)
           history.push('/login')
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
            <h1>Add comment to header</h1>
            <form className="form-label w-50 mx-auto m-5" onSubmit={handleSubmit(onFormSubmit)}>

            {/* username */}
           <label htmlFor="un">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:4})}  className="form-control mb-3"/>
        
            
           

            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true,minLength:2})}  className="form-control mb-3"/>
            
            {/* Select email */}
            <label htmlFor="em">Email</label>
            <input type="email" id="em" {...register('email',{required:true,minLength:2})}  className="form-control mb-3"/>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" {...register('dob')}  className="form-control mb-3"/>


            <input type="file" name="photos" className="form-control mt-3 mb-3" onChange={(e)=>{onFileSelect(e)}}></input>
            

          
            



            

         

        <button type="submit" className="btn btn-danger">Register</button>
        </form>
        </div>
    )
}

export default Register;

