const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('rain',{title:'레인게임'});
    //나는야 req.params.id 참고하기 위해 추가함
    //req.app.get('io').of('/').to(req.params.id).emit('tomato',req.params.id);
});

module.exports = router;