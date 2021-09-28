const express = require('express');
const RainCommand = require('../models/rainCommand');
const Room = require('../models/room');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/',async (req,res)=>{
    //res.render('index',{title:'안내페이지'});
    res.redirect("/rain");
});

router.get('/join',async (req,res)=>{
    res.render('join',{title:'로그인페이지'});
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    console.log("나는야 여기가 시작");
    passport.authenticate('local',(authError,nickUser,info)=>{
        if(authError){
            console.log("나는야"+authError);
            return next(authError);
        }
        console.log("나는야 여기가 끝");
    });
});

module.exports = router;