const express = require('express');
const RainCommand = require('../models/rainCommand');
const Room = require('../models/room');

const router = express.Router();

router.get('/',async (req,res)=>{
    //res.render('index',{title:'안내페이지'});
    res.redirect("/rain");
});

module.exports = router;