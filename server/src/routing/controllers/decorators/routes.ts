import { RequestHandler } from "express";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

import "reflect-metadata";
import { initializePassportStrategies } from "../auth";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    // the decorator function
    /*
      In a decorator, 
      The target is: 

    */

    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      /* for defineMetadata = 
        the key, 
        the value, 
        the object we're applying the metadata to
        the key of the object that we're applying the metadata to

        Here, 
        target is the prototype of the class.
        key is the name of the method itself
        desc is the property descriptor

        So in defining the metadata, we are creating a metadata key called "get", with a value of what the path is, on the [methodName] of the prototype.
      */

      initializePassportStrategies();
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
