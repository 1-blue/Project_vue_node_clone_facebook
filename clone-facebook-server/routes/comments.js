require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Comment, Post, User, Image } = require("../models/index.js");
const sequelize = require("sequelize");
const { IMAGE } = require("../global/globalVariable.js");

// 댓글 정보 가져오기
router.get("/", isLoggedIn, async (req, res) => {
  const { postId, commentsCount } = req.query;

  try {
    // 게시글 찾기
    const response = await Post.findOne({
      where: { _id: postId },
      attributes: ["_id"],
      include: {
        // 게시글의 댓글
        model: Comment,
        limit: +commentsCount,
        include: {
          // 게시글의 댓글을 쓴 유저
          model: User,
          attributes: ["name"],
          include: {
            // 게시글의 댓글을 쓴 유저의 프로필이미지
            model: Image,
            attributes: ["name"],
            where: {
              kinds: IMAGE.PROFILE_IMAGE,
            },
          },
        },
      }
    });

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: "서버측 에러입니다. by get => /like", error });
  }
});

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
    return res.status(503).json({ message: "서버측 에러입니다. by /comments의 post", error });
  }
});

// 댓글 삭제
router.delete("/", isLoggedIn, async (req, res) => {
  // 댓글 아이디 받기
  const { commentsId } = req.query;

  try {
    // 댓글 삭제
    await Comment.destroy({ where: { _id: commentsId } });

    return res.json({ message: "delete success" });
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by delete => /comments", error });
  }
});

// 댓글 수정
router.put("/", isLoggedIn, async (req, res) => {
  const { commentsId, contents } = req.body;

  try {
    // 댓글찾기
    const comments = await Comment.findOne({ where: { _id: commentsId } });
    // 댓글 삭제
    await comments.update({ contents });

    return res.json({ message: "edit success" });
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by put => /comments", error });
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
        attributes: [[sequelize.fn("count", "_id"), "totalCommentsNumber"]],
      },
    });
    res.json(response)
  } catch (error) {
    res.json(error)
  }
});


module.exports = router;