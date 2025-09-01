import { h } from "../../jsx/h";
import { Link } from "../../packages/leaf-router/src";

export const Foo = (props: { message: string }) => {
  return (
    <div tw="text-[red]">
      {props.message}
      <Link to="/">Go back</Link>
    </div>
  );
};
