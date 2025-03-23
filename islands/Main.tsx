import { useEffect } from "preact/hooks";

const init = async () => {
  console.log("Initializing...");
};

const Main = () => {
  useEffect(() => {
    init();
  }, []);

  return <div></div>;
};

export default Main;
