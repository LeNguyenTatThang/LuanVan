import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import initApiRouter from './route/api';
import session from "express-session";
import cors from 'cors';
import auth from "./middelware/auth";
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

app.use(auth.isLogin, (req, res) => {
    return res.render('404.ejs')
})





let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("backend is runing:" + port)
})