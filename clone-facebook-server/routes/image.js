const multer = require("multer");
const router = require("express").Router();
const path = require("path")
const fs = require("fs");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/auth.js");
const { Image } = require("../models/index.js");

// multer 기본설정
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');   // 파일을 저장할 곳
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));   // 저장할 파일명 결정
    }
  }),
});

// 프로필이미지 저장 ( 회원가입시 )
router.post("/profile", isNotLoggedIn, upload.single("profileImage"), async (req, res) => {
  const profileImage = req.file.filename;

  // 이미지 저장 실패
  if (!profileImage) {
    return res.status(400).json({ message: "not found image" });
  }

  // 이미지 저장 성공시 이미지 저장해둔 path전송
  res.status(200).json({ message: "success", profileImage });
});

// 프로필이미지 변경 ( 내정보페이지에서 이미지 변경시 )
router.put("/profile", isLoggedIn, upload.single("profileImage"), async (req, res) => {
  const profileImage = req.file.filename;

  // 이미지 저장 실패
  if (!profileImage) {
    return res.status(400).json({ message: "not found image" });
  }

  try {
    // 로그인한 유저의 이미지 가져오고
    const image = await Image.findOne({
      where: { UserId: req.user._id },
    });

    // 기존 이미지 삭제
    fs.unlink(`./uploads/${image.name}`, error => {
      if (error) {
        console.error("router > image.js > put >>", error);
      }
    });

    // 기존 이미지에서 변경
    image.update({
      name: profileImage
    });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "image change fail", error });
  }
});



// 커버이미지 저장 ( 내정보페이지에서 이미지 변경시 )
router.post("/cover", isLoggedIn, upload.single("coverImage"), async (req, res) => {
  const image = req.file.path;

  if (!image) {
    return res.status(400).json({ message: "not found image" });
  }

  res.json({ message: "success", image });
});



// 이미지 가져오기인데 안써가지고 일단 주석처리
// router.get("/", (req, res) => {
//   const { imageFilename } = req.query;
//   const fullfilepath = path.join(path.resolve(), 'uploads/' + imageFilename);
//   res.status(200).sendFile(fullfilepath);
// });

module.exports = router;