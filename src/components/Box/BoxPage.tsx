import { useState, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Meta from "../Common/Meta";
import PageAlert from "../Common/PageAlert";
import Spinner from "../Common/Spinner";
import Canvas from "./Canvas";
import Components from "./Components";
import Controls from "./Controls";
import Header from "./Header";

const description = [
  "The page you are looking for does not exist.",
  "Please check the URL and try again.",
];

const BoxPage = () => {
  const [sidePanel, setSidePanel] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { id } = router.query;

  const getBox = trpc.useQuery(["box.getBox", { id: id as string }]);
  const getFavoriteBox = trpc.useQuery(["favorite.getFavoriteBox", { boxId: id as string }]);
  const getComponents = trpc.useQuery(["component.getComponents", { id: id as string }]);
  // TODO: add isLoading to loader
  const { mutateAsync, isLoading } = trpc.useMutation("component.deleteComponent");

  const deleteComponent = async (id: string) => {
    await mutateAsync({
      id: id,
    }).then(() => {
      getComponents.refetch();
    });
  };

  if (getBox.isLoading || getFavoriteBox.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getBox.isSuccess && !getBox.data) {
    return (
      <>
        <Meta title="Watchbox | 404" />
        <PageAlert
          elem={<p className="text-4xl font-extrabold text-red-600 sm:text-5xl">404</p>}
          title="Page not found"
          description={description}
          btnTitle="Go back to home"
        />
      </>
    );
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

  const refetchBox = () => {
    getBox.refetch();
    getFavoriteBox.refetch();
  };

  const refetchCanvasElements = () => {
    getComponents.refetch();
  };

  return (
    <div className="flex h-full w-full">
      <div
        className={`flex h-full w-12 flex-col border-r transition-all duration-500 ease-in-out dark:border-darkColor ${
          !sidePanel ? "md:w-12" : "md:w-[17rem]"
        }`}
      >
        <Controls sidePanel={sidePanel} setSidePanel={setSidePanel} />
        <Components
          id={id as string}
          canvasRef={canvasRef}
          sidePanel={sidePanel}
          refetch={refetchCanvasElements}
        />
      </div>
      <div className="flex h-full grow flex-col">
        <Header
          box={getBox?.data}
          favoriteBox={getFavoriteBox?.data}
          id={id as string}
          refetch={refetchBox}
        />
        <Canvas
          id={id as string}
          canvasRef={canvasRef}
          canvasElements={getComponents?.data}
          isFetching={getComponents.isFetching}
          deleteComponent={deleteComponent}
        />
      </div>
    </div>
  );
};

export default BoxPage;
