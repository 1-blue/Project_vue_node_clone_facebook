const multer = require("multer");
const router = require("express").Router();
const path = require("path")

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

// 프로필이미지 저장
router.post("/profile", upload.single("profileImage"), async (req, res) => {
  const imageFilename = req.file.filename;

  // 이미지 저장 실패
  if (!imageFilename) {
    return res.status(400).json({ message: "not found image" });
  }

  // 이미지 저장 성공시 이미지 저장해둔 path전송
  res.status(200).json({ message: "success", imageFilename });
});

// 커버이미지 저장
router.post("/cover", upload.single("coverImage"), async (req, res) => {
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