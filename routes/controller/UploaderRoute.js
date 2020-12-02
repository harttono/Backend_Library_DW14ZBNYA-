const baseUrl = `http://localhost:5000/files/`;
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadFile = require('../../middleware/upload');

exports.upload = async (req,res) =>{
    try{
        await uploadFile(req,res,(err) =>{
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                  return res.status(400).send({
                    status: 'fail',
                    message: `Max file sized 2mb`,
                    code: 400,
                  });
                }
                return res.status(400).send(err);
            }

            if(req.file === undefined){
                return res.status(400).send({
                    status: 'check',
                    message:'Please upload a file !',
                    code: 400
                })
            }
            
            cloudinary.config({
                cloud_name:'harttonz',
                api_key:'652211497259339',
                api_secret:'0Tk8LUBf-e8IE8NqkXinCcSqKRU'
            })
        
            const path = req.file.path
            const uniqueFilename = new Date().toISOString()
        
            cloudinary.uploader.upload(
              path,
              { public_id: `library/${uniqueFilename}`, tags: `library` }, 
              function(err, image) {
                if (err) return res.send(err)
                fs.unlinkSync(path)
                res.status(200).send({
                    status:'uploaded',
                    message:`Uploaded the ${req.file.originalname} successfully.`,
                    url:`${image.url}`
                })
              }
            )
        });     
    }
    catch(err){
        res.status(500).send({
            message:`Could not upload the file : ${req.file.originalname}. ${err}`
        })
    }
}


exports.getListFiles = (req,res) =>{
    const directoryPath = __basedir+"/public/file";
    fs.readdir(directoryPath,function(err,files){
        if(err){
            res.status(500).send({
                message:'Unable to scan files !.'
            })
        }

        let fileInfos = [];
        files.forEach( file =>{
            fileInfos.push({
                name:file,
                url:baseUrl+file
            })
        })

        res.status(200).send(fileInfos)
    })
}

