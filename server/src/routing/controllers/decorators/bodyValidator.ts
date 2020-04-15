import { MetadataKeys } from "./MetadataKeys";

import "reflect-metadata";

export function bodyValidator(...keys: string[]) {
  return function (
    objectPrototype: any,
    methodName: string,
    desc: PropertyDescriptor
  ) {
    Reflect.defineMetadata(
      MetadataKeys.validator,
      keys,
      objectPrototype,
      methodName
    );
  };
}
