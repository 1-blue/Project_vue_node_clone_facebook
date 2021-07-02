require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares/auth.js");
const { User, Image } = require("../models/index.js");

// 회원가입
router.post("/register", isNotLoggedIn, async (req, res) => {
  const { name, id, password, email, gender, birthday, profileImageName } = req.body;

  const hashPassword = await bcrypt.hash(password, 6);

  try {
    // 유저 생성
    const response = await User.create({
      name,
      id,
      password: hashPassword,
      email,
      gender,
      birthday,
    });

    // 프로필 이미지 생성
    await Image.create({
      kinds: 0,
      name: profileImageName,
      UserId: response._id,
    });

    // 커버 이미지 생성
    await Image.create({
      kinds: 1,
      name: null,
      UserId: response._id,
    });
  
    res.json(response);
  } catch (error) {
    // unique-key 중복에러
    if (error.errors[0].type === "unique violation") {
      // 아이디 중복
      if (error.errors[0].path === "users.id") {
        return res.status(409).json({ message: "이미 가입된 아이디입니다." })
      }
      // 이메일 중복
      else if (error.errors[0].path === "users.email") {
        return res.status(409).json({ message: "이미 가입된 이메일입니다." })
      }
    }
    return res.status(500).json(error);
  }
});

// 로그인
router.post("/login", isNotLoggedIn, async (req, res) => {
  passport.authenticate("local", (DBError, user, info) => {
    // 1. localStrategy로 이동

    // 7. localStrategy에서 인증완료후 여기로 이동
    if (DBError) {
      return res.status(500).send("DB error")
    }
    if (info) {
      return res.status(409).json({ message: info.message })
    }

    // 8. serializeUser()로 이동
    return req.login(user, loginError => {
      if (loginError) {
        return res.send(loginError);
      }
      return res.send(user.name);
    });
  })(req, res);
});

// 로그아웃
router.get("/logout", isLoggedIn, async (req, res) => {
  try {
    req.logOut();
    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;