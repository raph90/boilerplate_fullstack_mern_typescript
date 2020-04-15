import { NextFunction, Request, Response, RequestHandler } from "express";
import { AppRouter } from "../../router/AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";
import "reflect-metadata";

// this is a middleware that checks that the body contains all the correct properties
function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller<T extends Function>(routePrefix: string) {
  return function (target: T) {
    const router = AppRouter.getInstance();

    // when the controller is called the following happens:

    /*
    we go over every key in the prototype. 
    target here is the constructor for the class.

    routeHandler is the actual handler we want to call.

    */

    // routes
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      // middleware
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        // create the actual route.
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
