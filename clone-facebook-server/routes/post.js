require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { User, Post, Image, Like, Comment } = require("../models/index.js");
const sequelize = require("sequelize");

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
    return res.status(500).json({ message: "서버측 에러입니다. by post => /post", error });
  }
});

// 게시글 가져오기
router.get("/", isLoggedIn, async (req, res) => {
  // 한번에 가져갈 포스트 개수 및 댓글 개수
  const { fetchPostNumber, fetchCommentsNumber } = req.query;

  try {
    // 게시글 찾기
    const response = await Post.findAll({
      limit: +fetchPostNumber,
      include: [
        {
          // 게시글의 유저
          model: User,
          attributes: ["name"],
          include: {
            // 게시글의 유저의 프로필이미지
            model: Image,
            attributes: ["name", "kinds"],        // =============================== 이거확인 =========================
          },
        },
        {
          // 게시글의 좋아요
          model: Like,
          include: {
            // 게시글의 좋아요를 누른 유저
            model: User,
            attributes: ["name"],
          },
        },
        {
          // 게시글의 댓글
          model: Comment,
          limit: +fetchCommentsNumber,
          include: {
            // 게시글의 댓글을 쓴 유저
            model: User,
            attributes: ["name"],
            include: {
              // 게시글의 댓글을 쓴 유저의 프로필이미지
              model: Image,
              attributes: ["name"],
              where: {
                kinds: 0,
              },
            },
          },
        }
      ]
    });

    return res.json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "서버측 에러입니다. by get => /post", error });
  }
});

// 게시글 수정
router.put("/", isLoggedIn, async (req, res) => {
  const { _id, title, contents } = req.body;

  try {
    await Post.update(
      {
        title,
        contents
      },
      { where: { _id } }
    )

    return res.json({ message: "delete success" });
  } catch (error) {
    return res.status(500).json({ message: "서버측 에러입니다. by put => /post", error });
  }
});

// 게시글 삭제
router.delete("/", isLoggedIn, async (req, res) => {
  // 게시글 아이디 받기
  const { postId } = req.query;

  try {
    // 게시글삭제
    await Post.destroy({ where: { _id: postId } });

    return res.json({ message: "delete success" });
  } catch (error) {
    return res.status(500).json({ message: "서버측 에러입니다. by delete => /post", error });
  }
});

// 게시글의 댓글개수 가져오기
router.get("/count", isLoggedIn, async (req, res) => {
  try {
    // 게시글 찾기
    const response = await Post.count();
    res.json(response)
  } catch (error) {
    res.json(error)
  }
});

module.exports = router;