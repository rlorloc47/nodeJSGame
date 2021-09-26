const passport = require('passport');
const local = require('./localStrategy');
const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.serializeUser((nickUser, done) => {
    done(null, nickUser.nickname);
  });

  passport.deserializeUser((nickname, done) => {
    NickVo.findOne({ where: { nickname } })
      .then(nickUser => done(null, nickUser))
      .catch(err => done(err));
  });

  local();
};
