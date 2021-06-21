const passport = require('passport');
const local = require('./localStrategy.js');
const { User } = require('../models/index.js');
require('dotenv').config();

module.exports = () => {
  // 최초 로그인시 실행하고 session에다가 done의 인수값을 저장함
  passport.serializeUser((user, done) => {
    done(null, user.id);  // session에 user.id 저장
  });

  // 로그인완료후 route에 접근할 때 마다 실행하고 done()의 인수를 req.user에 저장해둠
  // 그리고 req.user의 존재유무에 따라서 req.isAuthenticated()값이 정해짐
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });   // req.user와 req.isAuthenticated()값을 생성함
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // localStrategy등록
  local();
};