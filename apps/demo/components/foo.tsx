// import "@leaf/types" - another way to define global types
import { Link } from '@router';

export const Foo = (props: { message: string }) => {
  return (
    <div tw="text-[red]">
      {props.message}
      <Link to="/">Go back</Link>
    </div>
  );
};
