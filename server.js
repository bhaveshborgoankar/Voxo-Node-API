"use strict";
import express from 'express';
import server from 'http';
import * as dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };
import routes from './routes/index.routes.js';
import { connectDB } from './connection/db.js';

var app = express();
var upload = multer({ dest: 'uploads/' });

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     try {
//         console.log("🚀 ~ file: server.js:19 ~ res", res)
//         console.log("🚀 ~ file: server.js:19 ~ req", req)
//         res.status(200).send('Done')
//     } catch (err) {
//         console.log("🚀 ~ file: server.js:24 ~ err", err)
//         res.status(400).send('fail')
//     }
// })
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    try {
        console.log("🚀 ~ file: server.js:19 ~ res", res)
        console.log("🚀 ~ file: server.js:19 ~ req", req)
        console.log(req.body)
        res.status(200).send('Done')
    } catch (err) {
        console.log("🚀 ~ file: server.js:24 ~ err", err)
        console.log(req.file, req.body)
        res.status(400).send('fail')
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const __dirname = path.resolve();

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

app.use(upload.array());
app.use(cookieParser());

app.use(session({ secret: "voxo-secret", resave: true, saveUninitialized: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));

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
            message: error.message
        }
    });
});

/* Bind server on default port of https */
var Server = server.createServer(app);
Server.listen(process.env.APP_PORT || 3000, function () {
    console.log('Server listening on port ' + process.env.PUBLIC_URL);
});