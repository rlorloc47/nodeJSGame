const express = require('express');
const bingoVo = require('../models/bingoVo');
const bingoCommandVo = require('../models/bingoCommandVo');

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/:id',isLoggedIn, async (req,res)=>{
    res.render('bingo',{title:'빙고게임'});
});

module.exports = router;