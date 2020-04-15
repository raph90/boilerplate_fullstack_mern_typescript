import passport from "passport";
import { googleStrategy } from "./googleStrategy";

export function initializePassportStrategies() {
  passport.use(googleStrategy);
}
