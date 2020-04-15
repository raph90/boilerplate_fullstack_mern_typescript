import passport from "passport";
import { AppRouter } from "./routing/AppRouter";
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import keys from "./config/keys";
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

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(AppRouter.getInstance());

import "./routing/controllers";

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
