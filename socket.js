const SocketIO = require('socket.io');
const RainCommand = require('./models/rainCommand');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const rain = io.of('/rain');

  rain.on('connection', (socket) => {
    //console.log('나는야 rain 네임스페이스에 접속');
    socket.on('disconnect', () => {
      //console.log('나는야 rain 네임스페이스 접속 해제');
    });
    socket.on("pullNewRainCommand",()=>{
        const rainCommands = RainCommand.findOne({});
        console.log("나는야"+rainCommands.command);
        socket.emit('pushnewRainCommand',"단어");
    });
  });
};
