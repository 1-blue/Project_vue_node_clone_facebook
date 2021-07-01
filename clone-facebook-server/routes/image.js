const multer = require("multer");
const router = require("express").Router();
const path = require("path")
const fs = require("fs");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/auth.js");
const { Image } = require("../models/index.js");

// 폴더 생성
const makeFolder = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
makeFolder("./uploads/profile");
makeFolder("./uploads/cover");

// profileImage multer설정
const profileUpload = multer({
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
const coverUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/cover/');   // 파일을 저장할 곳
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));   // 저장할 파일명 결정
    }
  }),
});

// 프로필이미지 저장 ( 회원가입시 )
router.post("/profile", isNotLoggedIn, profileUpload.single("profileImage"), async (req, res) => {
  const profileImage = req.file.filename;

  // 이미지 저장 실패
  if (!profileImage) {
    return res.status(400).json({ message: "not found image" });
  }

  // 이미지 저장 성공시 이미지 저장해둔 path전송
  res.status(200).json({ message: "success", profileImage });
});

// 프로필이미지 변경 ( 내정보페이지에서 이미지 변경시 )
router.put("/profile", isLoggedIn, profileUpload.single("profileImage"), async (req, res) => {
  const profileImage = req.file.filename;

  // 이미지 저장 실패
  if (!profileImage) {
    return res.status(400).json({ message: "not found image" });
  }

  try {
    // 로그인한 유저의 프로필이미지 가져오고
    const image = await Image.findOne({
      where: {
        UserId: req.user._id,
        kinds: 0,
      },
    });

    // 기존 프로필이미지 삭제
    fs.unlink(`./uploads/profile/${image.name}`, error => {
      if (error) {
        console.error("router/profile > image.js > put >>", error);
      }
    });

    // 기존 프로필이미지에서 변경
    image.update({
      name: profileImage
    });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "image change fail", error });
  }
});

// 커버이미지 저장 ( 내정보페이지에서 이미지 변경시 )
router.put("/cover", isLoggedIn, coverUpload.single("coverImage"), async (req, res) => {
  const coverImage = req.file.filename;

  if (!coverImage) {
    return res.status(400).json({ message: "not found image" });
  }

  try {
    // 로그인한 유저의 커버이미지 가져오고
    const image = await Image.findOne({
      where: {
        UserId: req.user._id,
        kinds: 1,
      },
    });

    // 기존 커버이미지 삭제
    fs.unlink(`./uploads/cover/${image.name}`, error => {
      if (error) {
        console.error("router/cover > image.js > put >>", error);
      }
    });

    // 기존 커버이미지에서 변경
    image.update({
      name: coverImage
    });

    res.json({ message: "success", coverImage });
  } catch (error) {
    res.status(400).json({ message: "image change fail", error });
  }
});



// 이미지 가져오기인데 안써가지고 일단 주석처리
// router.get("/", (req, res) => {
//   const { imageFilename } = req.query;
//   const fullfilepath = path.join(path.resolve(), 'uploads/' + imageFilename);
//   res.status(200).sendFile(fullfilepath);
// });

module.exports = router;