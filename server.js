"use strict";
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import server from 'http';
import swagger from './swagger.json' assert { type: "json" };
import router from './routes/index.routes.js';

var app = express();
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
app.use(
    session({ secret: "voxo-secret", resave: true, saveUninitialized: true })
);
app.use('/', router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
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
Server.listen(3000, function () {
    console.log("Server listening on port 3000");
});