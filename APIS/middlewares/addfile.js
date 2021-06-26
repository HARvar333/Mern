const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const {CloudinaryStorage} = require("multer-storage-cloudinary")



//configure cloudinary
cloudinary.config({
    cloud_name: 'doswrwqh6',
    api_key: '269294637511473',
    api_secret: 'YZcDdNvc5bBDiawDqUcuJzyYPSw'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})




module.exports = multerObj;