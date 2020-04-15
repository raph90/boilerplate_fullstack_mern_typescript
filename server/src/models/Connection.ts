import keys from "../config/keys";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export class Connection {
  private static dbURI = `mongodb+srv://${keys.MONGO_USER}:${keys.MONGO_PASSWORD}@raphcluster-apijd.mongodb.net/${keys.MONGO_COLLECTION_NAME}?retryWrites=true&w=majority`;

  static connect(): void {
    mongoose.connect(Connection.dbURI, { useUnifiedTopology: true });

    mongoose.connection.on("connected", function () {
      console.log("Mongoose DB connected");
    });
  }

  static testConnection(): void {
    mongoose.connect(Connection.dbURI, { useUnifiedTopology: true });
  }
}
