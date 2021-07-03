const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Like } = require("../models/index.js");

// 좋아요 추가
router.post("/", isLoggedIn, async (req, res) => {
  const { PostId } = req.body;

  try {
    const response = await Like.create({
      UserId: req.user._id,
      PostId,
    });

    return res.json({ response });
  } catch (error) {
    return res.status(503).json({ message: "좋아요 추가 서버 에러 by like.js", error });
  }
});

// 좋아요 삭제
router.delete("/", isLoggedIn, async (req, res) => {
  const { likeId } = req.query;

  try {
    await Like.destroy({ where: { _id: likeId } });

    return res.json({ message: "Likes deleted" });
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: "좋아요 삭제 서버 에러 by like.js", error });
  }
});

module.exports = router;