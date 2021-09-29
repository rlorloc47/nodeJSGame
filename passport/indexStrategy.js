const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password',
  }, async (nickname, password, done) => {
    try {
      const exNickVo = await NickVo.findOne({ where: { nickname } });
      if (exNickVo) {
        const result = await bcrypt.compare(password, String(exNickVo.password));
        if (result) {
          done(null, exNickVo);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
