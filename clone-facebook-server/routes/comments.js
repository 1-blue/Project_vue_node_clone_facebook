require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Comment, Post } = require("../models/index.js");
const sequelize = require("sequelize");

// 댓글 업로드
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

// 게시글의 댓글개수 가져오기
router.get("/count", isLoggedIn, async (req, res) => {
  const { PostId } = req.query;

  try {
    // 게시글 찾기
    const response = await Post.findOne({
      where: { _id: PostId },
      attributes: ["_id"],
      include: {
        // 게시글의 댓글
        model: Comment,
        attributes: [[sequelize.fn("count", "_id"), "commentCount"]],
      },
    });
    res.json(response)
  } catch (error) {
    res.json(error)
  }
});

module.exports = router;