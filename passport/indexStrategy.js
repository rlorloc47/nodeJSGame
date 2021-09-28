const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.use(new LocalStrategy({
    nicknameField : 'nickname',
  }, async (nickname, done) => {
    console.log("나는야 여기는 와");
    try {
      const exNickVo = await NickVo.findOne({ where: { nickname } });
      if (exNickVo) {
        done(null, exNickVo);
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
