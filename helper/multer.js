const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/images");
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.split(".");
    cb(null, `${fileName[0]}-${new Date().getTime()}.${file.originalname}`);
    // cb(null, `${fileName[0]}-${new Date().getTime()}.${fileName[1]}`);
    // cb(null, `${fileName[0]}-${new Date().toDateString()}.${fileName[1]}`);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldName + "-" + uniqueSuffix);
  },
});

const formUpload = multer({
  storage: storage,
  // dest: { dest: 'uploads/', }
});

module.exports = formUpload;
