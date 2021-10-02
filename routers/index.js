const express = require('express');
const RainCommand = require('../models/rainCommand');
const Room = require('../models/room');

const passport = require('passport');
const bcrypt = require('bcrypt');

const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const nickVo = require('../models/nickVo');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

router.get('/',async (req,res)=>{
    //res.render('index',{title:'안내페이지'});
    res.redirect("/joinLogin");
});

router.get('/joinLogin',async (req,res)=>{
    res.render('joinLogin',{title:'로그인회원가입페이지'});
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError,nickUser,info)=>{
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!nickUser) {
            console.log("나는야 여기로 오는건가?");
            return res.redirect(`/joinLogin?loginError=${info.message}`);
        }
        return req.login(nickUser, (loginError) => {
            console.log("나는야 여기로 오는건가?2"+loginError);
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/joinLogin');
        });
    })(req,res,next);
});

router.post('/join',isNotLoggedIn,async (req,res,next)=>{
    const { nickname, password } = req.body;
    try{
        const exNickVo = await nickVo.findOne({where : {nickname:nickname,del_flag:'N'}});
        if(exNickVo){
            return res.redirect('/joinLogin?error=이미 존재하는 닉네임입니다.');
        }
        const hash = await bcrypt.hash(password, 12);
        await nickVo.create({
            nickname,
            password: hash,
        });
        return res.redirect('/joinLogin');
    }catch(error){
        console.log(error);
        return next(error);
    }
});

//21.09.30 로그아웃버튼
router.get('/logout',isLoggedIn,async(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/joinLogin');
});

module.exports = router;