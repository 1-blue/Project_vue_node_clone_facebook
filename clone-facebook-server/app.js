require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require('passport');
const passportConfig = require('./passport/index.js');
const { multerConfig } = require('./multer/index.js');
const app = express();

// 포트설정
app.set("port", process.env.PORT || 8081);

// 기본설정
app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors처리
const corsOptions = {
  origin: process.env.CORS_LOCAL_URL,   // 프론트측의 url  ( process.env.CORS_HOME_SERVER )
  credentials: true                     // 정확하게 뭔지모르겠음
}
app.use(cors(corsOptions));

// 세션옵션값지정
const sessionOption = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

// 세션설정
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
}
app.use(session(sessionOption));

// 모건설정
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// 시퀄라이즈 설정 ( DB )
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

// passport 설정 ( login )
app.use(passport.initialize());   // passport 구동
app.use(passport.session());      // 세션 연결
passportConfig();

// multer 기본 폴더 생성
multerConfig();

// 라우팅
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");
const imageRouter = require("./routes/image.js");
const userRouter = require("./routes/user.js");
const likeRouter = require("./routes/like.js");
const commentsRouter = require("./routes/comments.js");

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/image", imageRouter);
app.use("/user", userRouter);
app.use("/like", likeRouter);
app.use("/comments", commentsRouter);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 대기중`);
});
