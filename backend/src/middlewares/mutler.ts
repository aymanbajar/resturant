//  multer for upload images from frontend to backend 
import multer from 'multer';

const storage = multer.diskStorage({
    // specify destination to store image
    destination: (req,file,cb) => {
        cb(null,'./public/images');
    },
    // specify filename for the uploaded image
    filename: (req,file,callback) => {
        callback(null, Date.now() + '-' + file.fieldname);
    }
})
// initialize multer with the defined storage
const upload = multer({storage});

export default upload;