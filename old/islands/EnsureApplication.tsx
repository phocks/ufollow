import { useEffect, useId } from "preact/hooks";

export default () => {
  useEffect(() => {
    console.log("ApplicationRegister mounted");
  }, []);

  return <div></div>;
};
