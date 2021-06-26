const exp = require('express')
const userApi = exp.Router();
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const expressErrorHandler = require('express-async-handler');
const multerObj =require('./middlewares/addfile')



//body parser middleware
userApi.use(exp.json())



/*userApi.post('/createuser',(req,res,next) =>{
    let newUser = req.body;

    databaseObject.collection("usercollection").insertOne(newUser,(err,success) =>{
        if(err){
            console.log('error in user creation',err);
        }
        else{
            console.log({message:"user created"})
        }
    })
})*/

// read all data


// create user using async
userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler( async(req,res,next) =>{
   
    //getting collectionObject from server.js
    let userCollectionObject = req.app.get("userCollectionObject");

    let newUser = JSON.parse(req.body.userObj);
    
    let user= await userCollectionObject.findOne({username:newUser.username})
    if(user!==null){
        res.send({message: "user already existed"})
    }
        else{
            //hash the password
            let hashPassword = await bcryptjs.hash(newUser.password,7)
            //replace plain password with hashpassword
            newUser.password= hashPassword;
            newUser.profileImage = req.file.path;
            await userCollectionObject.insertOne(newUser)
            res.send({message: "user created"})

        }
    
}))






// read all user using async and await
userApi.get("/getusers",expressErrorHandler( async (req,res,next) =>{
    let userList= await userCollectionObject.find().toArray();
    res.send({message : userList})

}))







// read user by username using async
userApi.get("/getuser/:username",expressErrorHandler( async (req,res,next)=>{
     let un = req.params.username;
     let user = await userCollectionObject.findOne({username:un})

     if(user === null){
         res.send({message: "User not existed"})
     }
     else{
         res.send({ message: user})
     }
}))








//update user using async and await

userApi.put("/updateuser/:username", expressErrorHandler( async(req,res,next) =>{

    let modifiedUser = req.body;
     await userCollectionObject.updateOne({username:modifiedUser.username},{ $set: { ...modifiedUser }})
     res.send({message: "user updated"})
}))

// delete user using async and await

userApi.delete("/deleteuser/:username",expressErrorHandler( async(req,res,next) =>{
    //get user by url params
    let un = req.params.username;
    //first find required user

    let user = await userApi.findOne({username: un})
    if(user===null){
        res.send({message: "user not existed"})
    }
    else{
        await userCollectionObject.deleteOne({username : un})
        res.send({message:"user deleted"})
    }

}))

//user login

userApi.post("/login",expressErrorHandler( async(req,res,next) =>{

//getting collectionObject from server.js
let userCollectionObject = req.app.get("userCollectionObject");
 

    let credentials = req.body;
     
    //verify username
     let user = await userCollectionObject.findOne({ username:credentials.username })
    //if user is not existed

    if(user===null){
        res.send({message :"Invalid password"})
    }
    else{
        let result = await bcryptjs.compare(credentials.password,user.password)
        //console.log(result)
        //if pass not matched
        if(result===false){
            res.send({message: "Invalid password"})
        }
        else{
            let token = await jwt.sign({ username : credentials.username},process.env.SECRET,{expiresIn: 120})
           delete user.password
            res.send({message: "login-success",
             token: token,
             username: credentials.username,
             userObj : user})
        }
    }

}))
userApi.post("/addtocart",expressErrorHandler(async(req,res,next)=>{

    let userCartCollectionObject  =req.app.get("userCartCollectionObject")

    //get user cart obj
    let userCartObj= req.body;

    console.log(userCartObj)

   //find user in usercartcollection

    let userInCart =await userCartCollectionObject.findOne({username:userCartObj.username})
    
     //if user not existed in cart
     if(userInCart === null){
          
        //new usercartObject
        
       let products=[];
       products.push(userCartObj.productObj)
       let newUserCartObject ={username:userCartObj.username,products:products}
      
       
       //insert
       await userCartCollectionObject.insertOne(newUserCartObject)
       res.send({message:"product added to cart"})
     }
     //if user already existed incart
     else{
             
        userInCart.products.push(userCartObj.productObj)
        console.log(userInCart)

        //update operation
          await userCartCollectionObject.updateOne({username:userCartObj.username},{$set:{...userInCart}})
          res.send({message:"product added to cart"})
     }
}))


module.exports = userApi;