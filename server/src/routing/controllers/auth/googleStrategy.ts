import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Profile, VerifyCallback } from "passport-google-oauth20";
import keys from "../../../config/keys";

const googleStrategy = new GoogleStrategy(
  {
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
  },
  (
    token: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => {
    console.log("token", token);
    console.log("refresh token", refreshToken);
    console.log("profile", profile);
  }
);

passport.use(googleStrategy);
