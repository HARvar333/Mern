import React from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import axios from 'axios'

function Login(props){
    const { register,handleSubmit,formState: {errors}} =useForm();
    const history= useHistory();
   // console.log('history is',history)

    const onFormSubmit =(credentials) =>{
        console.log(credentials)
        
        axios.post(`/${credentials.type}/login`,credentials)
        .then(res =>{

            // get res obj.
            let resObj = res.data;
            if(resObj.message === 'login-success'){
                //save token in local storage
                localStorage.setItem("token",resObj.token)
                localStorage.setItem("username",resObj.username)
                localStorage.setItem("user",JSON.stringify( resObj.userObj))
                //update userlogin status
                props.setUserLoginStatus(true)
                
                if(credentials.type === "user"){

                //navigate to user profile
                history.push(`/userprofile/${resObj.username}`)
            }
            if(credentials.type === "admin"){
                history.push(`/adminprofile/${resObj.username}`)
            }
        }
            else {
                alert(resObj.message)
            }
            
        })
        .catch(err =>{
            console.log(err)
            alert("wrong login or password")
        })

    
      
    }



    return(
        <div>
            <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <label htmlFor="un">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:4})}  className="form-control mb-3"/>
            {errors.username?.type==='required' && <p className="text-danger"> username is required</p>}
            {errors.username?.type==='minLength' && <p className="text-danger"> please provide at least 4 char</p>}

            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true,minLength:2})}  className="form-control mb-3"/>
            {errors.password?.type==='required' && <p className="text-danger"> username is required</p>}
            {errors.password?.type==='minLength' && <p className="text-danger">Set min 2 char password</p>}


            <div className="form-check" >
            <input className="form-check-input" type="radio" id="admin" {...register("type")} value="admin"/>
            <label className="form-check-label" htmlFor="admin" >
                admin
            </label>
            </div>
            <div className="form-check">
                <input type="radio" className="form-check-input" id="user" {...register("type")} value="user"/>
                <label className="form-check-label" htmlFor="user" >
                  user
                </label>

            </div>
            

         

        <button type="submit" className="btn btn-danger">Submit</button>
        </form>
        </div>
    )
}
export default Login;