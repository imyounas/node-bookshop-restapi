// lib/app.ts
import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import errorMiddleware from "./application/middlewares/errorMiddleware";
import IRoutes from "./application/interfaces/IRoute";
import Morgan from "morgan";
import Helmet from "helmet";
import mongoose from 'mongoose';
import hpp from "hpp";
import Cors from "cors";
import fs from "fs";
import path from "path";

class ExpressApp {
  public expApp: express.Application;
  public port: string | number;
  public isProdEnv: boolean;
  public mongoUser: string;
  public mongoPassword: string;
  public mongoUrl: string;
  public mongoDB: string;

  constructor(routes: IRoutes[]) {
    this.expApp = express();
    this.port = process.env.SERVER_PORT || 3000;
    this.isProdEnv = process.env.NODE_ENV === "production" ? true : false;
    this.mongoUser = process.env.MONGO_USER || "sa";
    this.mongoPassword = process.env.MONGO_PASSWORD || "ABC123ssi";
    this.mongoUrl = process.env.MONGO_PATH || "@localhost:27017";
    this.mongoDB = process.env.MONGO_DATABASE || "ProductsDB";

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.expApp.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.expApp;
  }

  private initializeMiddlewares() {
    var accessLogStream = fs.createWriteStream(
      path.join(__dirname, "access.log"),
      { flags: "a" }
    );
    this.expApp.use(Morgan("combined", { stream: accessLogStream }));

    if (this.isProdEnv) {
      this.expApp.use(hpp());
      this.expApp.use(Helmet());
      // this.expApp.use(Morgan('combined'));
      this.expApp.use(Cors({ origin: "your.domain.com", credentials: true }));
    } else {
      // this.expApp.use(Morgan('dev'));
      this.expApp.use(Cors({ origin: true, credentials: true }));
    }

    this.expApp.use(express.json());
    this.expApp.use(express.urlencoded({ extended: true }));

  }

  private initializeRoutes(routes: IRoutes[]) {
    this.expApp.get("/", function (req, res) {
      res.send("welcome to my book shop");
    });

    routes.forEach((route) => {
      console.log(route.router.name);
      this.expApp.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.expApp.use(errorMiddleware);
  }

  private connectToDatabase() {

    try {
      const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

      mongoose.connect(`mongodb://${this.mongoUser}:${this.mongoPassword}${this.mongoUrl}/${this.mongoDB}?authSource=admin`, { ...options });
    } catch (ex) {
      console.log("Error connecting mongoDB Server ", ex)
    }

  }
}

export default ExpressApp;
