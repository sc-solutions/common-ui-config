import propertyOf from "lodash/propertyOf";
export const dig = (obj: any, key: string) => {
  return propertyOf(obj)(key);
};
