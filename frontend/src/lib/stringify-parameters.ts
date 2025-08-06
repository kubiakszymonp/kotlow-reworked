import qs from "qs";

export const stringifyParameters = (parameters: Record<string, unknown>) => {
  return qs.stringify(parameters, { encode: true });
};
