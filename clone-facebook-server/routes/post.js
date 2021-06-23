require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Post } = require("../models/index.js");

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

module.exports = router;