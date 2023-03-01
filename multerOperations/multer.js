const path=require("path")
const multer=require('multer');
const multerS3=require('multer-s3');
const dotenv=require('dotenv');
const { S3Client } = require('@aws-sdk/client-s3');
dotenv.config();

let s3 = new S3Client({
    region: process.env.AWS_REGION_NAME,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket:process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString()+file.originalname);
        }
    })
})


// var storage=multer.diskStorage({
//     destination:function(req,File,cb){
//         cb(null,'multerOperations/uploads')
//     },
//     filename:(req,File,cb)=>{
//         cb(null,File.originalname)
//     }
// })
 


// var  upload=multer({storage:storage});

module.exports={upload};

