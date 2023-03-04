const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images/"); //mulainya dari ttik root folder (coffeshop_be)
  },
  filename: (req, file, cb) => {
    // let fileName = file.originalname.split('.')
    // cb(null, `${fileName[0]}-${new Date().getTime()}.${fileName[1]}`)
    // resiko, ketika ada . dua kali di file name nya, pengambilan split tidak bekerja dengan baik
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const formUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let formatType = path.extname(file.originalname);
    if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
      cb(null, true);
    } else {
      cb("Image not valid", false);
    }
  },
  limits: {
    fileSize: 1048576 * 5, // 5 mb
  },

  // dest: { dest: 'uploads/', }
});

module.exports = formUpload;
