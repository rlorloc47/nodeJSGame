const passport = require('passport');
const local = require('./indexStrategy');
const NickVo = require('../models/nickVo');

module.exports = () => {
  passport.serializeUser((nickUser, done) => {
    console.log("나는야 se"+nickUser.nickname);
    done(null, nickUser.nickname);
  });

  passport.deserializeUser((nickname, done) => {
    console.log("나는야 dese");
    //NickVo.findOne({ where: { nickname : String(nickname) } })
    //21.09.29 user가 아닌 다른 명으로 하면 진행안됨
    NickVo.findOne({ where: { nickname : 'nick' } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
