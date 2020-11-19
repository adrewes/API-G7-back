// Saving the context of this module inside the _the variable
_this = this

//configurar cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'fund-pyme-back', //reemplazar con sus credenciales
    api_key: '244984474466848', 
    api_secret: 'kGw-IB1uPMJhkxrOqNLQWdExZ9M'
});

exports.createFile = async function (fileName) {
    
    //subir imagen a cloudinary
    console.log("file",fileName)
    let urlFile;
    let fileUpload = process.env.UPLOAD_DIR + fileName;
    await cloudinary.uploader.upload(fileUpload, function(result) { 
        console.log("Resultado",result);
        urlFile=result.url;
    });
    return urlFile;
    
    
    
    
    
}



