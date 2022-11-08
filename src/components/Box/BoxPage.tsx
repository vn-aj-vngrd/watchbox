import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import PageAlert from "../Common/PageAlert";
import Spinner from "../Common/Spinner";
import Canvas from "./Canvas";
import Components from "./Components";
import Controls from "./Controls";
import Header from "./Header";

const BoxPage = () => {
  const [sidePanel, setSidePanel] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const getBox = trpc.useQuery(["box.getBox", { id: id as string }]);
  const getFavoriteBox = trpc.useQuery(["favorite.getFavoriteBox", { boxId: id as string }]);

  if (getBox.isLoading || getFavoriteBox.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getBox.isError || getFavoriteBox.isError) {
    return (
      <PageAlert
        title="Something went wrong"
        elem={
          <h2 className="mb-10 flex justify-center">
            <XCircleIcon className="h-12 w-12 text-red-500" />
          </h2>
        }
        description={["There's a problem on our side. Please try again."]}
        btnTitle="Go back to home"
      />
    );
  }

  const refetch = () => {
    getBox.refetch();
    getFavoriteBox.refetch();
  };

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
        <Header
          box={getBox?.data}
          favoriteBox={getFavoriteBox?.data}
          id={id as string}
          refetch={refetch}
        />
        <Canvas />
      </div>
    </div>
  );
};

export default BoxPage;
