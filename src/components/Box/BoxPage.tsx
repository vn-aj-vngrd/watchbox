import Controls from "./Controls";
import Components from "./Components";
import Header from "./Header";
import Canvas from "./Canvas";

const BoxPage = () => {
  return (
    <div className="flex h-full w-full border-t border-b dark:border-darkColor">
      <div className="flex h-full w-12 flex-col border-r dark:border-darkColor md:w-72">
        <Controls />
        <Components />
      </div>
      <div className="flex h-full grow flex-col">
        <Header />
        <Canvas />
      </div>
    </div>
  );
};

export default BoxPage;
