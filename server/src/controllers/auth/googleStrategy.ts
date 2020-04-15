import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Profile, VerifyCallback } from "passport-google-oauth20";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
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
