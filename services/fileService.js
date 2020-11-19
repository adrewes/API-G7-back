// Gettign the Newly created Mongoose Model we just created 
var UserImg = require('../models/UserImg.model');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

//configurar cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'fund-pyme-back', //reemplazar con sus credenciales
    api_key: '244984474466848', 
    api_secret: 'kGw-IB1uPMJhkxrOqNLQWdExZ9M'
});

exports.createUserImg = async function (file) {
    
    //subir imagen a cloudinary
    console.log("file",file)
    let urlImg;
    let imagen = process.env.UPLOAD_DIR + userImg.file;
    cloudinary.uploader.upload(imagen, function(result) { 
        console.log("Resultado",result);
        //urlImg=result.url;
        // Creating a new Mongoose Object by using the new keyword
        var newUserImg = new UserImg({      
            mail: userImg.email,
            date: new Date(),
            nombreImagen: result.url
        })
        
        savedUserImg(newUserImg);
    });
    
    
    
    
    
}



