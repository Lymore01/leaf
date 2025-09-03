export {};

declare namespace JSX {
  interface IntrinsicElements {
    Fragment: {};
    [elemName: string]: {
      [key: string]: any;
      tw?: string;
      class?: string;
      className?: string;
      style?: string | { [key: string]: string | number };
      children?: any;
      id?: string;
      onClick?: (e: Event) => void;
      onMount?: () => void;
      onUnmount?: () => void;
      onUpdate?: () => void;
      [key: `on${string}`]: ((e: Event) => void) | (() => void) | undefined;
    };
  }

  interface ElementAttributesProperty {
    props: {};
  }

  interface ElementChildrenAttribute {
    children: {};
  }

  type Element = any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Fragment: {};
      [elemName: string]: {
        [key: string]: any;
        tw?: string;
        class?: string;
        className?: string;
        style?: string | { [key: string]: string | number };
        children?: any;
        id?: string;
        onClick?: (e: Event) => void;
        onMount?: () => void;
        onUnmount?: () => void;
        onUpdate?: () => void;
        [key: `on${string}`]: ((e: Event) => void) | (() => void) | undefined;
      };
    }
  }
}
