import { propertyOf } from "lodash";

export const dig = (obj: any, key: string) => {
  return propertyOf(obj)(key);
};

export { isEmpty } from "lodash";
