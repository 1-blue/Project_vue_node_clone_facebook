const jwt = require("jsonwebtoken");
require("dotenv").config();

// 관리자인지 인증
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SERECT_KEY);

  if (decoded) {
    next();
  } else {
    res.status(401).json({ msg: "유효하지 않은 토큰 사용" });
  }
};

module.exports = adminAuth;
