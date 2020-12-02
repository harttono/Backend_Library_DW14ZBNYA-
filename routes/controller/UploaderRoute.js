const fs = require('fs');
const baseUrl = `http://localhost:5000/files/`;


const uploadFile = require('../../middleware/upload');

exports.upload = async (req,res) =>{
    try{
        await uploadFile(req,res);
        if(req.file == undefined){
            return res.status(400).send({
                message:'Please upload a file !'
            })
        }
        
        res.status(200).send({
            message:`Uploaded the ${req.file.originalname} successfully.`,
            filename:`${req.file.originalname}`,
            url:`http://localhost:5000/files/${req.file.filename}`
        })
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

