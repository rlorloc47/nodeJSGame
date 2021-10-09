const express = require('express');
const SocketIO = require('socket.io');
const fs = require("fs");

const RainVo = require('./models/rainVo');
const RainCommand = require('./models/rainCommand');

const bingoCommandVo = require('./models/bingoCommandVo');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const rain = io.of('/rain');

  rain.on('connection', (socket) => {
    //console.log('rain 네임스페이스에 접속');
    socket.on('disconnect', () => {
      //console.log('rain 네임스페이스 접속 해제');
    });
    socket.on("pullNewRainCommand",async ()=>{
      var randomNum = Math.floor(Math.random() * await RainCommand.count({where:{del_flag:'N'}}));
      const newWord = await RainCommand.findAll({offset:randomNum,limit:1,where:{del_flag:'N'}});
      //limit 1이기 때문에 [0] 사용해도 됨.
      socket.emit('pushnewRainCommand',String(newWord[0].dataValues.command));
    });
    socket.on("updateScore",async (data)=>{
      const values = ({nickname:data.nickname,score: data.rainScoreOwn});
      await RainVo.findOne({ where: { nickname : data.nickname } })
      .then(async function(obj) {
        if(obj)
          await obj.update(values);
        else
          await RainVo.create(values);
        });
      //const tomato = await RainVo.findAll({where:{del_flag:'N'}});
      const tomato = await RainVo.findAll({where:{del_flag:'N'},order:[['score', 'DESC']]});
      //점수 리스트 출력
      socket.emit('selectRainScoreList',tomato);
    });
  });

  
  const bingo = io.of('/bingo');
  bingo.on('connection', async (socket) => {
    console.log('bingo 네임스페이스에 접속');
    const bingoCommandDistinctList = await bingoCommandVo.findAll({where:{del_flag:'N'},group:['bingoDesc']});
    socket.emit('getBingoCommandList',bingoCommandDistinctList);
    socket.on('disconnect', () => {
      //console.log('bingo 네임스페이스 접속 해제');
    });
    socket.on('checkBingoDesc',async (data)=>{
      var bingoCommandList = await bingoCommandVo.findAll({where:{del_flag:'N',bingoDescCode:data}});
      console.log("나는야"+bingoCommandList);
      socket.emit('pushNewBingoCommand',bingoCommandList);
    });
  });

};
