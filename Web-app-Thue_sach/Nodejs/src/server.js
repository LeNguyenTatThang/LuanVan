import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import initApiRouter from './route/api';
import session from "express-session";
import cors from 'cors';
var flash = require('connect-flash');
require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'keyboard cat'
}));
app.use(flash());
viewEngine(app);
initWebRoutes(app);
initApiRouter(app);

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("backend is runing:" + port)
})