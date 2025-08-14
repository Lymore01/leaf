import { h, Fragment } from "./h.js";

export { Fragment };

export function jsx(type: any, props: any, key?: any) {
  const safeProps = props || {};
  const { children, ...restProps } = safeProps;
  
  const finalProps = key !== undefined ? { ...restProps, key } : restProps;
  
  if (children) {
    if (Array.isArray(children)) {
      return h(type, finalProps, ...children);
    } else {
      return h(type, finalProps, children);
    }
  }
  
  return h(type, finalProps);
}

export const jsxs = jsx;
export const jsxDEV = jsx;