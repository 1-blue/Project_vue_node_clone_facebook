const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 폴더 생성
const makeFolder = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
const multerConfig = () => {
  makeFolder("./uploads");
  makeFolder("./uploads/profile");
  makeFolder("./uploads/cover");
}

// profileImage multer설정
const profileImageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profile/');   // 파일을 저장할 곳
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));   // 저장할 파일명 결정
    }
  }),
});
// coverImage multer설정
const coverImageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/cover/');   // 파일을 저장할 곳
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));   // 저장할 파일명 결정
    }
  }),
});

module.exports = {
  multerConfig,
  profileImageUpload,
  coverImageUpload,
}