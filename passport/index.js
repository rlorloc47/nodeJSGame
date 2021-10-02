const passport = require('passport');
const local = require('./indexStrategy');
const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.serializeUser((nickUser, done) => {
    console.log("나는야 se :: "+nickUser.nickname);
    done(null, String(nickUser.nickname));
  });

  passport.deserializeUser((nickname, done) => {
    console.log("나는야 dese :: "+nickname);
    NickVo.findOne({ where: { nickname : nickname } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
