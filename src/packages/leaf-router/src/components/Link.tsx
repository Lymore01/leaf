import { LinkProps } from "../../../../core/vnode/types.js";
import { h } from "../../../../jsx/h.js";
import { navigate } from "../index.js";

export const Link = (props: LinkProps) => {
  const handleNavigation = (e: Event) => {
    e.preventDefault();
    navigate(props.to);
  };
  return (
    <a href={props.to} onClick={handleNavigation}>
      {props.children}
    </a>
  );
};
