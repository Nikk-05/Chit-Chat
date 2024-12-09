import multer from 'multer'

// The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploader = multer({storage: storage})