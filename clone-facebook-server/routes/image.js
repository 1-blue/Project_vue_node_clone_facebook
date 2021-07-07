const router = require("express").Router();
const fs = require("fs");
const { profileImageUpload, coverImageUpload } = require("../multer/index.js");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/auth.js");
const { Image } = require("../models/index.js");

// 프로필이미지 저장 ( 회원가입시 )
router.post("/profile", isNotLoggedIn, profileImageUpload.single("profileImage"), async (req, res) => {
  const profileImageName = req.file.filename;

  // 이미지 저장 실패
  if (!profileImageName) {
    return res.status(503).json({ message: "Failed to save profileImage" });
  }

  // 이미지 저장 성공시 이미지 저장해둔 path전송
  res.status(200).json({ message: "success", profileImageName });
});

// 프로필이미지 변경 ( 내정보페이지에서 이미지 변경시 )
router.put("/profile", isLoggedIn, profileImageUpload.single("profileImage"), async (req, res) => {
  const profileImageName = req.file.filename;

  // 프로필이미지 저장 실패
  if (!profileImageName) {
    return res.status(503).json({ message: "Failed to save profileImage" });
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
      name: profileImageName
    });

    res.json({ message: "success" });
  } catch (error) {
    // DB에 저장된 이미지명 변경 실패
    res.status(500).json({ message: "Failed to change profileImage By Database" });
  }
});

// 커버이미지 저장 ( 내정보페이지에서 이미지 변경시 )
router.put("/cover", isLoggedIn, coverImageUpload.single("coverImage"), async (req, res) => {
  const coverImageName = req.file.filename;

  if (!coverImageName) {
    return res.status(503).json({ message: "Failed to save coverImage" });
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
      name: coverImageName
    });

    res.json({ message: "success", coverImageName });
  } catch (error) {
    res.status(500).json({ message: "Failed to change coverImage By Database" });
  }
});

// 프로필이미지 제거
router.delete("/profile", isLoggedIn, async (req, res) => {
  try {
    // 로그인한 유저의 프로필이미지 가져오고
    const image = await Image.findOne({
      where: {
        UserId: req.user._id,
        kinds: 0,
      },
    });

    // 기존 프로필이미지 삭제 ( 이미지 파일제거 )
    fs.unlink(`./uploads/profile/${image.name}`, error => {
      if (error) {
        console.error("router/profile > image.js > delete >>", error);
      }
    });

    // 기존 프로필이미지 제거 ( DB에 저장된 값 제거 )
    image.update({
      name: null
    });

    res.json({ message: "success" });
  } catch (error) {
    // DB에 저장된 이미지명 변경 실패
    res.status(500).json({ message: "Failed to change profileImage By Database" });
  }
});

// 커버이미지 제거
router.delete("/cover", isLoggedIn, async (req, res) => {
  try {
    // 로그인한 유저의 프로필이미지 가져오고
    const image = await Image.findOne({
      where: {
        UserId: req.user._id,
        kinds: 1,
      },
    });

    // 기존 프로필이미지 삭제 ( 이미지 파일제거 )
    fs.unlink(`./uploads/cover/${image.name}`, error => {
      if (error) {
        console.error("router/cover > image.js > delete >>", error);
      }
    });

    // 기존 프로필이미지 제거 ( DB에 저장된 값 제거 )
    image.update({
      name: null
    });

    res.json({ message: "success" });
  } catch (error) {
    // DB에 저장된 이미지명 변경 실패
    res.status(500).json({ message: "Failed to change coverImage By Database" });
  }
});

// 로그인한 유저의 프로필이미지 가져오기
router.post("/userProfileImage", isLoggedIn, async (req, res) => {
  try {
    // 게시글 찾기
    const response = await Image.findOne({
      where: { UserId: req.user._id },
      attributes: ["name"],
    });

    return res.json(response);
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by get => /post/userinfo", error });
  }
});

module.exports = router;