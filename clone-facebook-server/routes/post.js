require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { User, Post } = require("../models/index.js");

// 포스트 업로드
router.post("/", isLoggedIn, async (req, res) => {
  const { title, contents } = req.body;

  try {
    const response = await Post.create({
      title,
      contents,
      UserId: req.user._id,
    });

    return res.json({ response });
  } catch (error) {
    return res.status(500).json({ message: "서버측 에러입니다. 잠시후에 다시 시도해주세요.", error });
  }
});

// 포스트 가져오기
router.get("/", isLoggedIn, async (req, res) => {
  // const { pageNumber } = req.body;
  // 이거 스크롤 내릴때마다 호출하고 5 ~ 10개씩 추가적으로 호출되도록 수정필요

  try {
    const response = await Post.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    return res.json({ response });
  } catch (error) {
    return res.status(500).json({ message: "서버측 에러입니다. 잠시후에 다시 시도해주세요.", error });
  }
});

module.exports = router;