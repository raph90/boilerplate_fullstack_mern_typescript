import passport from "passport";
import { AppRouter } from "./routing/AppRouter";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
const keys = require("./config/keys");

const PORT = process.env.PORT || 9000;

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
