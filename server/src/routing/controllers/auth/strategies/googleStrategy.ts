import passport from "passport";
import { AuthMethods } from "./../../../../models/User";
import { DB } from "./../../../../models/DB";
import { IUser } from "./../../../../models/User";

import {
  Profile,
  VerifyCallback,
  Strategy as GoogleStrategy,
} from "passport-google-oauth20";
import keys from "../../../../config/keys";

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  DB.Models.User.findById(id).then((user) => {
    done(undefined, user);
  });
});

export const googleStrategy = new GoogleStrategy(
  {
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
  },
  googleCallback
);

async function googleCallback(
  token: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  const user = DB.Models.User.findOne({
    "google.googleId": profile.id,
  }).then((existingUser) => {
    if (existingUser) {
      done(undefined, existingUser);
    } else {
      if (profile.emails && profile.name) {
        new DB.Models.User({
          method: AuthMethods.google,
          google: {
            googleId: profile.id,
            email: profile.emails[0].value,
          },
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
        })
          .save()
          .then((user) => done(undefined, user));
      }
    }
  });
}
