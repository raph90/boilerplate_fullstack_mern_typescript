import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";
import "reflect-metadata";

// we use factory decorators when we want to take in an argument
export function use(middleware: RequestHandler) {
  return function (
    objectPrototype: any,
    methodName: string,
    desc: PropertyDescriptor
  ) {
    //here we are looking at all the middlewares already applied to this methodName
    const middlewares =
      Reflect.getMetadata(
        MetadataKeys.middleware,
        objectPrototype,
        methodName
      ) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      objectPrototype,
      methodName
    );
  };
}
