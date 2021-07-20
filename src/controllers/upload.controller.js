const Player = require('../models/player');
const { config } = require("../config/index");
const AWS = require('aws-sdk');

exports.uploadThumbnail = async (req, res) => {
    try {
        const { _id } = req.params;

        const uploadThumbnail = await uploadFile(req.file, 'thumbnail-players/');
        const thumbnail = uploadThumbnail.Location;

        const args = await Player.find({
            _id, username, score, thumbnail
        });
        if (args.length > 0) {
            args.forEach(async Player => {
                await Player.findByIdAndUpdate({
                    thumbnail
                })
            })
        }
        return res.json({
            message: 'Thumbnail upload successfully',
            data: args
        });
    } catch (error) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Something goes wrong ' + error
            }
        })
    }
};

exports.uploadFile = async (req, path)=>{
    return new Promise(resolve => {
        const AWS_BUCKET_NAME = config.AWS_BUCKET_NAME;
        const AWS_ID = config.AWS_ID;
        const AWS_SECRET = config.AWS_SECRET;

        let s3bucket = new AWS.S3({
            accessKeyId: AWS_ID,
            secretAccessKey: AWS_SECRET,
            BUCKET: AWS_BUCKET_NAME
        });
    
        s3bucket.createBucket(function(){
            var params = {
                Bucket: AWS_BUCKET_NAME,
                ACL: 'public-read',
                ContentType: req.mimetype,
                Key: path+req.originalname,
                Body: req.buffer
            };
            s3bucket.upload(params, function (err, data) {
                if(err){
                    console.log('error in callback');
                    console.log(err);
                }
                console.log('cargado');
                resolve(data);            
            });
        });
    });
}
    

