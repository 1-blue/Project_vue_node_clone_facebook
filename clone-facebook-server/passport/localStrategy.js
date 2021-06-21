const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        // 2. req.body에서 값읽음
        usernameField: 'id',        // req.id
        passwordField: 'password'   // req.password
    }, async (id, password, done) => {
        // 3. 읽은 값으로 인증처리
        try {
            // 4. 아이디 존재 확인
            const exUser = await User.findOne({ where: { id } });
            if (exUser) {
                // 5. 비밀번호 일치 확인
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    // 6. done()호출 => authenticte()로 이동
                    done(null, exUser);
                } else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                }
            }
            else{
                done(null, false, { message: "가입되지않은 유저입니다." });
            }
        } catch (error) {
            done(error);
        }
    }));
};