import { h } from "../../jsx/h";

export const Foo = (props: {
    message: string
}) => {
  return <div tw="text-[white]">{props.message}</div>;
};
