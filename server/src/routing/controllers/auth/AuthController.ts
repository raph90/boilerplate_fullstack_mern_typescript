import passport from "passport";
import { googleStrategy } from "./strategies/googleStrategy";
import { Request, Response } from "express";
import { get, controller, post, bodyValidator, use } from "../decorators";

passport.use(googleStrategy);
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
  // @use(passport.authenticate("google"))
  googleCallback(req: Request, res: Response) {
    console.log("successful");
    res.redirect("/auth/success");
  }

  @get("/")
  basicAuth(req: Request, res: Response) {
    res.send("hi");
  }

  @get("/success")
  success(req: Request, res: Response) {
    res.send("you are successful");
  }
}
