import passport from "passport";
import { Request, Response } from "express";
import { get, controller, post, bodyValidator, use } from "../decorators";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Profile, VerifyCallback } from "passport-google-oauth20";

@controller<typeof AuthController>("/auth")
export class AuthController {
  @get("/google")
  @use(
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )
  getAuth(req: Request, res: Response) {}

  @get("/google/callback")
  @use(passport.authenticate("google"))
  googleCallback(req: Request, res: Response) {
    console.log("successful");
    res.redirect("/");
  }

  @get("/")
  basicAuth(req: Request, res: Response) {
    res.send("hi");
  }
}
