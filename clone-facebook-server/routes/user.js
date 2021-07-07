require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { User, Post, Image } = require("../models/index.js");

// 유저와 관련된 정보 가져오기 ( 유저정보, 게시글정보, 이미지정보 )
router.get("/", isLoggedIn, async (req, res) => {
  const response = await User.findOne({
    // 현재 로그인한 유저 찾고
    where: { _id: req.user._id },
    include: [
      // 해당 유저의 게시글들 가져오고
      {
        model: Post,
        include: {
          model: Image,
          attributes: ["name"],
        }
      },
      // 해당 유저의 이미지들 가져옴
      {
        model: Image,
        attributes: ["name", "kinds"],
      }
    ],
  });

  res.json(response)
});

// 게시글작성자 정보 가져오기
router.get("/info", isLoggedIn, async (req, res) => {
  const { postId } = req.query;

  try {
    // 게시글 찾기
    const response = await Post.findOne({
      where: { _id: postId },
      attributes: ["_id", "updatedAt"],
      include: {
        // 게시글작성 유저
        model: User,
        attributes: ["name"],
        include: {
          // 게시글작성 유저의 프로필이미지
          model: Image,
          attributes: ["name"],
          where: {
            kinds: 0,
          },
        },
      },
    });

    return res.json(response);
  } catch (error) {
    return res.status(503).json({ message: "서버측 에러입니다. by get => /post/userinfo", error });
  }
});

module.exports = router;