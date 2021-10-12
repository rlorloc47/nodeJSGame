const passport = require('passport');
const local = require('./indexStrategy');
const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.serializeUser((nickUser, done) => {
    done(null, String(nickUser.nickname));
  });

  passport.deserializeUser((nickname, done) => {
    NickVo.findOne({ where: { nickname : nickname } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
