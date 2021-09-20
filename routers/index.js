const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    //res.render('index',{title:'안내페이지'});
    res.redirect("/rain");
});

module.exports = router;