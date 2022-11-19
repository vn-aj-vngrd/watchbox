import { FavoriteBox } from "@prisma/client";
import { useState } from "react";
import { boxRouter } from "../../server/router/box";
import Components from "../Box/Components";
import Controls from "../Box/Controls";
import Header from "../Box/Header";

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

const EntryPage = (/*{ box, favoriteBox, id, refetch }: Props*/) => {
  const [sidePanel, setSidePanel] = useState(false);

  return (
    <div className="flex h-full w-full">
      <div
        className={`flex h-full w-12 flex-col border-r transition-all ease-in-out dark:border-darkColor ${
          !sidePanel ? "md:w-12" : "md:w-72"
        }`}
      >
        <Controls sidePanel={sidePanel} setSidePanel={setSidePanel} />
      </div>
      <div className="flex h-full grow flex-col"></div>
    </div>
  );
};

export default EntryPage;
