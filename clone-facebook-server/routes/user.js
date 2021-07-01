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


module.exports = router;