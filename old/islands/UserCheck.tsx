import { useEffect } from "preact/hooks";

interface Props {
  username: string;
  domain: string;
}

export default ({ username, domain }: Props) => {
  useEffect(() => {
    console.log(username, domain);
    return () => {};
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};
