const exp=require("express")
const adminApi=exp.Router()
adminApi.use(exp.json())
const jwt =require('jsonwebtoken')
const expressErrorHandler=require("express-async-handler")


adminApi.post("/login",expressErrorHandler( async(req,res,next) =>{

    //getting collectionObject from server.js

    let adminCollectionObject =req.app.get("adminCollectionObject")
     
        let credentials = req.body;
         
        //verify username
         let user = await adminCollectionObject.findOne({ username:credentials.username })
        //if user is not existed
    
        if(user===null){
            res.send({message :"Invalid password"})
        }
        else{
            //let result = await bcryptjs.compare(credentials.password,user.password)
            //console.log(result)
            //if pass not matched
            if(credentials.password!==user.password){
                res.send({message: "Invalid password"})
            }
            else{
                let token = await jwt.sign({ username : credentials.username},'abcdef',{expiresIn: 120})
               delete user.password
                res.send({message: "login-success",
                 token: token,
                 username: credentials.username
            })
            }
        }
    
    }))















//export
module.exports=adminApi;