import passport from "passport";
import { googleStrategy } from "./strategies/googleStrategy";
import { Request, Response, NextFunction } from "express";
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
  @use(passport.authenticate("google", { failureRedirect: "/auth/failure" }))
  googleCallback(req: Request, res: Response) {
    res.redirect("/auth/success");
  }

  @get("/")
  basicAuth(req: Request, res: Response) {
    res.send("hi");
  }

  @get("/test")
  @use(accessProtectionMiddleware)
  testRoute(req: Request, res: Response) {
    res.send(req.user);
  }

  @get("/success")
  success(req: Request, res: Response) {
    res.send("you are successful");
  }
  @get("/failure")
  failure(req: Request, res: Response) {
    res.send("you have failed");
  }

  @get("/logout")
  logoutRoute(req: Request, res: Response) {
    req.logout();
    res.send(req.user);
  }
}

function accessProtectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: "must be logged in to continue",
    });
  }
}
