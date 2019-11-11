"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter_1 = require("./apiRouter");
class App {
    constructor() {
        this.apiRoute = new apiRouter_1.apiRouter();
        this.loggingMap = new Map();
        this.Logger = (req, res, next) => {
            console.log('The last request came from: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
            next();
        };
        this.LoggingMap = (req, res, next) => {
            if (!this.loggingMap.get(req.originalUrl))
                this.loggingMap.set(req.originalUrl, 1);
            else {
                let times = this.loggingMap.get(req.originalUrl) + 1;
                this.loggingMap.set(req.originalUrl, times);
            }
            console.log(req.originalUrl + ` visit times: ` + this.loggingMap.get(req.originalUrl));
            console.log("------------------");
            next();
        };
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(this.Logger);
        this.app.use(this.LoggingMap);
    }
    routes() {
        this.apiRoute.routes(this.app);
    }
}
exports.default = new App().app;
