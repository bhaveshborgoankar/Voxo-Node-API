"use strict";
import express from 'express';
import server from 'http';
import * as dotenv from 'dotenv';
import path from "path";
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.routes.js';
import { connectDB } from './connection/db.js';
import { readFile } from 'fs/promises';
import cors from 'cors'
const swaggerDocument = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)));
const __dirname = path.resolve();

var app = express();

app.use(express.static(path.join(__dirname, "public/")));
app.use(cors())
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DOT env configure
dotenv.config();

// Connect DB
connectDB();

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

app.use(session({ secret: "voxo-secret", resave: true, saveUninitialized: true }));

// Routes
app.use('/api', routes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Path Not Found
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    });
});

/* Bind server on default port of https */
var Server = server.createServer(app);
Server.listen(3000, function () {
    console.log('Server listening on port ' + 3000);
});