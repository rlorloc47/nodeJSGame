const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('rain',{title:'레인게임'});
});

module.exports = router;