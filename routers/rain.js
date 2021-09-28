const express = require('express');
const RainCommand = require('../models/rainCommand');

const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/',isNotLoggedIn, async (req,res)=>{
    //나는야 req.params.id 참고하기 위해 추가함
    //req.app.get('io').of('/').to(req.params.id).emit('tomato',req.params.id);
    
    res.render('rain',{title:'레인게임'});
});

module.exports = router;