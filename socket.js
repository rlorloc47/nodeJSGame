const express = require('express');
const SocketIO = require('socket.io');
const fs = require("fs");

const RainVo = require('./models/rainVo');
const RainCommand = require('./models/rainCommand');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const rain = io.of('/rain');

  rain.on('connection', (socket) => {
    console.log('rain 네임스페이스에 접속');
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
      const values = ({sessionID:socket.id,score: data});
      await RainVo.findOne({where:{sessionID:socket.id}})
      .then(function(obj) {
        if(obj)
          obj.update(values);
        else
        RainVo.create(values);
        });
      const tomato = await RainVo.findAll({where:{del_flag:'N'}});
      //점수 리스트 출력
      socket.emit('selectRainScoreList',tomato);
    });
  });
};
