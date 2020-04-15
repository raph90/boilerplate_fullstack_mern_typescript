import { UserModel, User } from "./User";
import keys from "../config/keys";
const mongoose = require("mongoose");
import { connect, connection, Connection } from "mongoose";
mongoose.Promise = global.Promise;

interface Models {
  User: UserModel;
}

// note: thanks to Nicholas Mordecai for this blog post:
// https://know-thy-code.com/mongoose-schemas-models-typescript/

export class DB {
  private static dbURI = `mongodb+srv://${keys.MONGO_USER}:${keys.MONGO_PASSWORD}@raphcluster-apijd.mongodb.net/${keys.MONGO_COLLECTION_NAME}?retryWrites=true&w=majority`;

  private static instance: DB;

  private _db: Connection;

  private _models: Models;

  private constructor() {
    connect(DB.dbURI, { useUnifiedTopology: true });
    this._db = connection;
    this._db.on("open", this.connected);
    this._db.on("error", this.error);

    this._models = {
      User: new User().model,
      // this is where we initialise all models
    };
  }

  public static get Models(): Models {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance._models;
  }

  private connected() {
    console.log("Mongoose has connected");
  }

  private error(error: Error) {
    console.log("Mongoose has errored", error);
  }

  static connect(): void {
    mongoose.connection.on("connected", function () {
      console.log("Mongoose DB connected");
    });
  }
}
