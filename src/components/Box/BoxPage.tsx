import { Box, FavoriteBox } from "@prisma/client";
import { useState, useRef } from "react";
import Canvas from "./Canvas";
import Components from "./Components";
import Controls from "./Controls";
import Header from "./Header";

type Props = {
  box: Box | null | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
};

const BoxPage = ({ box, favoriteBox, id }: Props) => {
  const [sidePanel, setSidePanel] = useState(true);
  const canvasDiv = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full w-full border-t border-b dark:border-darkColor">
      <div
        className={`flex h-full w-12 flex-col border-r transition-all ease-in-out dark:border-darkColor ${
          !sidePanel ? "md:w-12" : "md:w-72"
        }`}
      >
        <Controls sidePanel={sidePanel} setSidePanel={setSidePanel} />
        <Components canvasDiv={canvasDiv} sidePanel={sidePanel} />
      </div>
      <div className="flex h-full grow flex-col">
        <Header boxTitle={box?.boxTitle} favoriteBox={favoriteBox} id={id} />
        <Canvas canvasDiv={canvasDiv} />
      </div>
    </div>
  );
};

export default BoxPage;
