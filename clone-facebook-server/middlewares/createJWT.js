const jwt = require("jsonwebtoken");
require("dotenv").config();

// 관리자 인증용 jwt발급
function createJWT() {
  return jwt.sign({}, process.env.JWT_SERECT_KEY, {
    issuer: process.env.JWT_ISSUER,
    expiresIn: "24h",
  });
}

module.exports = createJWT;
