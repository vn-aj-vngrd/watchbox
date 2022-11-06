import Controls from "./Controls";
import Components from "./Components";
import Header from "./Header";
import Canvas from "./Canvas";
import { useState } from "react";

const BoxPage = () => {
  const [sidePanel, setSidePanel] = useState(true);

  return (
    <div className="flex h-full w-full border-t border-b dark:border-darkColor">
      <div
        className={`flex h-full w-12 flex-col border-r transition-all ease-in-out dark:border-darkColor ${
          !sidePanel ? "md:w-12" : "md:w-72"
        }`}
      >
        <Controls sidePanel={sidePanel} setSidePanel={setSidePanel} />
        <Components sidePanel={sidePanel} />
      </div>
      <div className="flex h-full grow flex-col">
        <Header />
        <Canvas />
      </div>
    </div>
  );
};

export default BoxPage;
