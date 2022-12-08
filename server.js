"use strict";
import express from 'express';
import server from 'http'
import * as dotenv from 'dotenv'
import path from 'path';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert { type: "json" };
import routes from './routes/index.routes.js'

var app = express();
const __dirname = path.resolve();
app.use(express.json());
dotenv.config()
const Port = process.env.APP_PORT || 3000
/* Set headers */
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(
    session({ secret: "voxo-secret", resave: true, saveUninitialized: true })
);
app.use('/', routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
/* Bind server on default port of https */
var Server = server.createServer(app);
Server.listen(Port, function () {
    console.log('Server listening on port ' + process.env.PUBLIC_URL);
});