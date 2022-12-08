import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/');
    },
    filename(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadImg = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.err = "That file extension is not accepted!"; // this part is important, I'm attaching the err to req (which gets passed to the next middleware function => saveImage)
            cb(null, false);
        }
    }
});

export default uploadImg;