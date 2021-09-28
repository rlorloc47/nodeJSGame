const passport = require('passport');
const local = require('./indexStrategy');
const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.serializeUser((nickUser, done) => {
    console.log("나는야1"+nickUser);
    done(null, nickUser.nickname);
  });

  passport.deserializeUser((nickname, done) => {
    console.log("나는야2"+nickname);
    NickVo.findOne({ where: { nickname } })
      .then(nickUser => done(null, nickUser))
      .catch(err => done(err));
  });

  local();
};
