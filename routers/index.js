const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    const sessionID = req.sessionID;
    console.log("나는야"+sessionID);
    //router.get('/rain');
    res.render('index');
});

module.exports = router;