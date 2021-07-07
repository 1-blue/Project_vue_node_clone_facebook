const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Like, Post, User } = require("../models/index.js");

// 게시글좋아요 정보 및 좋아요를 누른 유저 이름 가져오기
router.get("/", isLoggedIn, async (req, res) => {
  const { postId } = req.query;

  try {
    // 게시글 찾기
    const response = await Post.findOne({
      where: { _id: postId },
      attributes: ["_id"],
      include: {
        // 게시글의 좋아요
        model: Like,
        attributes: ["_id", "UserId"],
        include: {
          // 게시글의 좋아요를 누른 유저
          model: User,
          attributes: ["name"],
        },
      },
    });

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: "서버측 에러입니다. by get => /like", error });
  }
});

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