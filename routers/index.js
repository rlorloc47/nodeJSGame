const express = require('express');
const RainCommand = require('../models/rainCommand');
const Room = require('../models/room');

const passport = require('passport');
const bcrypt = require('bcrypt');
const NickUser = require('../models/nickVo');
const nickVo = require('../models/nickVo');

const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//나는야 확인용
router.use((req,res,next)=>{
    console.log("나는야 확인용 : "+req.body.nickname);
    res.locals.nickVo = req.nickVo;
    res.locals.nickUser = req.nickUser;
    res.locals.tomatochip = req.tomatochip;
    console.log("나는야"+res.locals.nickVo);
    console.log("나는야"+req.nickVo);

    next();
});

router.get('/',async (req,res)=>{
    //res.render('index',{title:'안내페이지'});
    res.redirect("/rain");
});

router.get('/join',async (req,res)=>{
    const {nick} = req.body;
    console.log("나는야asdasd나는야asdasd"+nick);
    res.render('join',{title:'로그인페이지'});
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    console.log("나는야 여기가 시작"+NickUser.nickname);
    const {nickname} = req.body;
    nickVo.nickname = nickname;
    console.log("나는야=-------------"+NickUser.nickname);
    passport.authenticate('local',(authError,NickUser,info)=>{
        //console.log("나는야"+NickUser);
        console.log("나는야"+info.message);
        if(authError){
            return next(authError);
        }
        console.log("나는야 여기가 끝");
    })(req,res,next);
});

module.exports = router;