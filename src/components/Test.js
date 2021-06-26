import axios from "axios"
function Test (){

let token = localStorage.getItem("token")

//create new axious req obj
let apiURL = "http://localhost:5000"
 const axiosReq=axios.create({
		baseURL: apiURL,
     headers:{
			Authorization: `Bearer ${token}`
			}

}) 
const makeReqToProtectedRoute=() =>{
    axiosReq.get("/user/testing")
    .then(res=>{
        alert(res.data.message)
    })
}








    return(
        <div>
           <h1>Test api purpose</h1>
           <button onClick={()=> makeReqToProtectedRoute } >Get token</button>
        </div>
    )
}
export default Test;