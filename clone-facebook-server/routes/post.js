require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.js");
const { Post } = require("../models/index.js");

// 게시글 업로드
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
  // 한번에 가져갈 포스트 개수
  const { fetchPostCount } = req.query;

  try {
    // 게시글 찾기
    const response = await Post.findAll({ limit: +fetchPostCount });

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
    return res.status(503).json({ message: "서버측 에러입니다. by put => /post", error });
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

// 게시글총개수 가져오기
router.get("/count", isLoggedIn, async (req, res) => {
  try {
    const response = await Post.count();
    res.json(response)
  } catch (error) {
    res.json(error)
  }
});

module.exports = router;