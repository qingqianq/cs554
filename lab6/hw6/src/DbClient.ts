import { MongoClient, Db } from "mongodb";
export class DbClient{
    public db: Db;
    public async connect(){
        let connection = await MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true, useUnifiedTopology: true });
        this.db = connection.db("Qing-Guangqi-CS554-Lab6");
        return this.db;
    }
}

