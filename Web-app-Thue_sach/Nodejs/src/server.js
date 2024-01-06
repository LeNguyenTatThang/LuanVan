import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import initApiRouter from './route/api';
import session from "express-session";
import cors from 'cors';
import auth from "./middelware/auth";
const path = require('path');
var flash = require('connect-flash');
require('dotenv').config();
const http = require('http');
const socketIO = require('socket.io');
let app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/node_modules'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(flash());
viewEngine(app);
initWebRoutes(app);
initApiRouter(app);


io.on('connection', (socket) => {
    socket.on('updateData', () => {
        // MySQL query to get updated data
        // Emit updated data to all connected clients
        console.log('data', results)
        io.emit('updateData', results);

    });

    socket.on('disconnect', () => {
    });
});



app.use(auth.isLogin, (req, res) => {
    return res.render('404.ejs')
})

let port = process.env.PORT || 6969;

server.listen(port, () => {
    console.log("backend is runing:" + port)
})



