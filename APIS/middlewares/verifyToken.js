const jwt=require('jsonwebtoken')


const checkToken=(req,res,next) =>{
   
    try{
    let token=req.headers.authorization.spilt(" ")[1]
    jwt.verify(token,'abcdef')
    next()
    }
    catch(err){
                   res.send({message:err.message})
    }
}

module.exports=checkToken;