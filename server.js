// create express app
const exp = require('express');
const app = exp()
const path = require("path")
require('dotenv').config()


// creating build of react with current user

app.use(exp.static(path.join(__dirname,'./build/')))

const userApi = require("./APIS/users-api")
const adminApi =require("./APIS/admin-api")
const productApi =require("./APIS/product-api")



const mongoClient = require('mongodb').MongoClient;

const dburl =process.env.DATABASE_URL;

//database obj
//let databaseObject;

mongoClient.connect(dburl,{ useNewUrlParser:true, useUnifiedTopology: true },(err,client)=>{
    if(err){
        console.log("error in db connect",err)
    }
    else{
        let databaseObject = client.db("harsh123")

        //create indivisual collection object
       let  userCollectionObject = databaseObject.collection("usercollection")
       let adminCollectionObject  = databaseObject.collection("admincollection")
       let productCollectionObject =databaseObject.collection("productcollection")
       let userCartCollectionObject =databaseObject.collection("usercartcollection")
       
       //sharing collection object
       app.set("userCollectionObject",userCollectionObject)
       app.set("adminCollectionObject",adminCollectionObject)
       app.set("productCollectionObject",productCollectionObject)
       app.set("userCartCollectionObject",userCartCollectionObject)

        console.log("DB connection is successful")
    }
})


//middleware to use 
app.use('/user', userApi);
app.use('/admin',adminApi)
app.use('/product',productApi)
//if /user then call userapi

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })












// assign port 
const port =process.env.PORT||8080;
app.listen(port,()=> console.log(`server listening on port ${port}..`)) 