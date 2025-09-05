import { LinkProps } from '@core';
import { navigate } from '../index.js';

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
