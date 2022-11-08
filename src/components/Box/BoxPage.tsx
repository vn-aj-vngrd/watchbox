import { FavoriteBox } from "@prisma/client";
import { useState } from "react";
import Canvas from "./Canvas";
import Components from "./Components";
import Controls from "./Controls";
import Header from "./Header";

type Props = {
  box:
    | {
        id: string;
        username: string | null;
        boxes: { id: string; created_at: Date; updated_at: Date; boxTitle: string }[];
      }
    | null
    | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
  refetch: () => void;
};

const BoxPage = ({ box, favoriteBox, id, refetch }: Props) => {
  const [sidePanel, setSidePanel] = useState(true);

  return (
    <div className="flex h-full w-full">
      <div
        className={`flex h-full w-12 flex-col border-r transition-all ease-in-out dark:border-darkColor ${
          !sidePanel ? "md:w-12" : "md:w-72"
        }`}
      >
        <Controls sidePanel={sidePanel} setSidePanel={setSidePanel} />
        <Components sidePanel={sidePanel} />
      </div>
      <div className="flex h-full grow flex-col">
        <Header box={box} favoriteBox={favoriteBox} id={id} refetch={refetch} />
        <Canvas />
      </div>
    </div>
  );
};

export default BoxPage;
