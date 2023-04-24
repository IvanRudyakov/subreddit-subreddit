import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import session from "express-session";
import commentsController from './controllers/comments-controller.js';
import reportsController from './controllers/reports-controller.js';
import usersController from './controllers/users-controller.js';

mongoose.connect('mongodb://127.0.0.1:27017/reddit-for-reddit');
const app = express();
app.use(
    session({
        secret: 'long_string_which_is_hard_to_crack',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:4200",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // origin: 'http://localhost:4200', 
        // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // allowedHeaders: [
        //     'Content-Type', 
        //     'Authorization', 
        //     'Origin', 
        //     'x-access-token', 
        //     'XSRF-TOKEN'
        // ], 
        // preflightContinue: false 
    })
);
app.use(express.json());
commentsController(app);
reportsController(app);
usersController(app);
console.log('iodfsdubibi');
app.listen(4000);