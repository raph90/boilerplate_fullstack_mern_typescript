import { Connection } from "./models/Connection";
import passport from "passport";
import { AppRouter } from "./routing/AppRouter";
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import "./routing/controllers";

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}

dotenv.config();

const PORT = process.env.PORT || 5000;

// if (!process.env.PORT) {
//   process.exit(1);
// }

const app = express();

Connection.connect();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
