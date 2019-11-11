import * as express from 'express';
import * as bodyParser from 'body-parser';
import {apiRouter} from './apiRouter';
class App {
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    public app: express.Application;
    public apiRoute: apiRouter = new apiRouter();
    public loggingMap = new Map();
    Logger = (req: express.Request, res: express.Response, next: Function) =>{
        console.log('The last request came from: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
        next();
    };
    LoggingMap = (req : express.Request, res: express.Response, next: Function) =>{
        if(!this.loggingMap.get(req.originalUrl))
            this.loggingMap.set(req.originalUrl,1);
        else{
            let times: number = this.loggingMap.get(req.originalUrl)+1;
            this.loggingMap.set(req.originalUrl, times);
        }
        console.log(req.originalUrl + ` visit times: ` + this.loggingMap.get(req.originalUrl));
        console.log("------------------");
        next();
    };
    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(this.Logger);
        this.app.use(this.LoggingMap);
    }
    private routes():void{
        this.apiRoute.routes(this.app);
    }
}
export default new App().app;
