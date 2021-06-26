const exp=require("express")
const productApi=exp.Router();
productApi.use(exp.json())
const expressErrorHandler= require('express-async-handler')
const multerObj=require('./middlewares/addfile')


productApi.post('/createproduct',multerObj.single('photo') , expressErrorHandler(async(req,res,next)=>{
    let productCollectionObject=req.app.get("productCollectionObject")

    const newProduct= JSON.parse( req.body.productobj) ;

    //check product by model no
    let product = await productCollectionObject.findOne({model:newProduct.model})

    //if model already existed
    if(product!==null){
        res.send({message:"product already existed"})
    }
    else{
        newProduct.productImage=req.file.path;
        await productCollectionObject.insertOne(newProduct)
        res.send({message:"New product added"})
    }
}))



// read user by username using async
productApi.get('/viewproducts', expressErrorHandler( async(req,res,next)=>{

    let productCollectionObject=req.app.get("productCollectionObject")

    let product= await productCollectionObject.find().toArray()

    res.send({message:product})

}))











//export
module.exports= productApi;