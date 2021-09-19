const express = require('express');

const router = express.Router();

router.get('/rain/:id', async (req, res, next) => {
    try{
        console.log("나는야");
    }catch{
        console.log("나는야 catch");
    }
  });
  

module.exports = router;