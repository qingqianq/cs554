"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dataCollection_1 = require("./dataCollection");
// TODO import database setting
class apiRouter {
    constructor() {
        this.collections = new dataCollection_1.dataCollection();
        this.router = express.Router();
        this.apiRoutes();
    }
    routes(app) {
        app.use("/api", this.router);
        app.use("*", (req, res) => {
            let errMsg = "Not found ".concat(req.originalUrl);
            res.status(400).json({ err: errMsg });
        });
    }
    apiRoutes() {
        this.router.get("/tasks", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let tasks = yield this.collections.getTasks(req.query.skip, req.query.take);
                res.json(tasks);
            }
            catch (err) {
                res.status(400).json({ error: err });
            }
        }));
        this.router.get("/tasks/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let task = yield this.collections.getTaskById(req.params.id);
                res.json(task);
            }
            catch (err) {
                console.log("get tasks err");
                res.status(404).json({ err: err });
            }
        }));
        this.router.post("/tasks", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let task = yield this.collections.createTask(req.body.title, req.body.description, req.body.hoursEstimated, req.body.completed);
                res.json(task);
            }
            catch (err) {
                res.status(400).json({ err: err });
            }
        }));
        this.router.put("/tasks/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let task = yield this.collections.updateAll(req.params.id, req.body.title, req.body.description, req.body.hoursEstimated, req.body.completed);
                res.json(task);
            }
            catch (err) {
                res.status(400).json({ err: err });
            }
        }));
        this.router.patch("/tasks/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let args = [req.params.id, req.body.title, req.body.description,
                    req.body.hoursEstimated, req.body.completed];
                let task = yield this.collections.updateAtr(args);
                res.json(task);
            }
            catch (err) {
                res.status(400).json({ err: err });
            }
        }));
        this.router.post("/tasks/:id/comments", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.collections.getTaskById(req.params.id);
            }
            catch (err) {
                res.status(400).json({ err: err });
                return;
            }
            try {
                let comment = yield this.collections.createComment(req.body.name, req.body.comment);
                let task = yield this.collections.addComment(req.params.id, comment);
                res.json(task);
            }
            catch (err) {
                res.status(400).json({ err: err });
            }
        }));
        this.router.delete("/tasks/:taskId/:commentId", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let task = yield this.collections.deleteCommentInTask(req.params.taskId, req.params.commentId);
                yield this.collections.deleteComment(req.params.commentId);
                res.json(task);
            }
            catch (err) {
                res.status(404).json({ err: err });
                return;
            }
        }));
    }
}
exports.apiRouter = apiRouter;
