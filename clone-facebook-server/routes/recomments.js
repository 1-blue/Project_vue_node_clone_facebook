require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Recomment, Comment, User, Image } = require("../models/index.js");
const { IMAGE } = require("../global/globalVariable.js");
const sequelize = require("sequelize")

// 대댓글 정보 가져오기
router.get("/", isLoggedIn, async (req, res) => {
  const { commentId, recommentsCount } = req.query;

  try {
    // 댓글 찾기
    const response = await Comment.findOne({
      where: { _id: commentId },
      attributes: ["_id"],
      include: {
        // 댓글의 대댓글
        model: Recomment,
        limit: +recommentsCount,
        include: {
          // 댓글의 대댓글을 쓴 유저
          model: User,
          attributes: ["name"],
          include: {
            // 댓글의 대댓글을 쓴 유저의 프로필이미지
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

// 대댓글 업로드
router.post("/", isLoggedIn, async (req, res) => {
  const { CommentId, contents } = req.body;

  try {
    const response = await Recomment.create({
      UserId: req.user._id,
      CommentId,
      contents,
    });

    return res.json({ response });
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by recomments => /post", error });
  }
});

// 대댓글 삭제
router.delete("/", isLoggedIn, async (req, res) => {
  // 대댓글 아이디 받기
  const { recommentsId } = req.query;

  try {
    // 대댓글 삭제
    await Recomment.destroy({ where: { _id: recommentsId } });

    return res.json({ message: "delete success" });
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by delete => /comments", error });
  }
});

// 대댓글 수정
router.put("/", isLoggedIn, async (req, res) => {
  const { recommentsId, contents } = req.body;

  try {
    // 대댓글찾기
    const recomments = await Recomment.findOne({ where: { _id: recommentsId } });
    // 대댓글 삭제
    await recomments.update({ contents });

    return res.json({ message: "edit success" });
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by put => /comments", error });
  }
});

// 댓글의 대댓글개수 가져오기
router.get("/count", isLoggedIn, async (req, res) => {
  const { CommentId } = req.query;

  try {
    // 댓글 찾기
    const response = await Comment.findOne({
      where: { _id: CommentId },
      attributes: ["_id"],
      include: {
        // 댓글의 대댓글
        model: Recomment,
        attributes: [[sequelize.fn("count", "_id"), "recommentCount"]],
      },
    });
    res.json(response)
  } catch (error) {
    res.json(error)
  }
});

module.exports = router;