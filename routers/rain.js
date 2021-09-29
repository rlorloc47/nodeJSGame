const express = require('express');
const RainCommand = require('../models/rainCommand');

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/',isLoggedIn, async (req,res)=>{
    //나는야 req.params.id 참고하기 위해 추가함
    //req.app.get('io').of('/').to(req.params.id).emit('tomato',req.params.id);
    
    res.render('rain',{title:'레인게임'});
});

router.get('/rainBefore',isLoggedIn, async (req,res)=>{
    res.render('rainBefore',{title:'레인게임대기화면'});
});

module.exports = router;