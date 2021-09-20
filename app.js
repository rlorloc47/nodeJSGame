const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const webSocket = require('./socket');
const indexRouter = require('./routers');
const rainRouter = require('./routers/rain');
const {sequelize} = require('./models');

const app = express();
app.use('/favicon.ico',  () => {}); //파비콘 무시
app.set('port',process.env.PORT || 8080);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true,
});

sequelize.sync({force:false})
.then(()=>{
    console.log('데이터베이스 연결 성공');
})
.catch((err)=>{
    console.error(err);
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));

app.use('/',indexRouter);
app.use('/rain',rainRouter);    //레인게임으로 이동

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});

webSocket(server,app);