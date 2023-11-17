import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import initApiRouter from './route/api';
import session from "express-session";
import cors from 'cors';
import auth from "./middelware/auth";

import mysql from 'mysql2/promise';
const MySQLEvents = require('@rodrigogs/mysql-events');

var flash = require('connect-flash');
require('dotenv').config();


let app = express();


app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
viewEngine(app);
initWebRoutes(app);
initApiRouter(app);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', async (socket) => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'thuesach',
    })

    const instance = new MySQLEvents(pool, {
        startAtEnd: true,
    });
    await instance.start();

    instance.addTrigger({
        name: 'checkSach',
        expression: 'thuesach.sach',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (event) => {
            if (event) {
                const [rows, err] = pool.execute(sql)
                if (err) throw err;
                console.log(rows)
                io.emit('test', { data: rows })
            }
        },
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

    const sql = "selcect * from sach"
    const [rows, err] = pool.execute(sql)
    if (err) throw err;
    socket.emit('test1', rows)
});

app.use(auth.isLogin, (req, res) => {
    return res.render('404.ejs')
})

let port = process.env.PORT || 6969;

server.listen(port, () => {
    console.log("backend is runing:" + port)
})