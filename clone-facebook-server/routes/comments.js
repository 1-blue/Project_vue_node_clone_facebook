require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Comment } = require("../models/index.js");

// 포스트 업로드
router.post("/", isLoggedIn, async (req, res) => {
  const { contents, PostId } = req.body;

  try {
    const response = await Comment.create({
      UserId: req.user._id,
      PostId,
      contents,
    });

    return res.json({ response });
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by comments => /post", error });
  }
});

module.exports = router;