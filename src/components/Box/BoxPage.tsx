import { useState, useRef, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import PageAlert from "../Common/PageAlert";
import Spinner from "../Common/Spinner";
import Canvas from "./Canvas";
import Components from "./Components";
import Controls from "./Controls";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { useHotkeys } from "react-hotkeys-hook";
import { Prisma } from "@prisma/client";
import { resetCanvasSize } from "./Helpers";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

const description = [
  "The page you are looking for does not exist.",
  "Please check the URL and try again.",
];

const BoxPage = () => {
  const { data: session } = useSession();
  const [controls, setControls] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignment: 0,
  });
  const [sidePanel, setSidePanel] = useState(true);
  const [shift, setShift] = useState(false);
  const [temp, setTemp] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasSizeRef = useRef<HTMLDivElement>(null);
  const [canvasElements, setCanvasElements] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | undefined>();

  useHotkeys("shift", () => setShift(true), { keydown: true, keyup: false }, [shift]);
  useHotkeys("shift", () => setShift(false), { keydown: false, keyup: true }, [shift]);

  const router = useRouter();
  const { id } = router.query;

  const getBox = trpc.useQuery(["box.getBox", { id: id as string }]);
  const getFavoriteBox = trpc.useQuery(["favorite.getFavoriteBox", { boxId: id as string }]);
  const getComponents = trpc.useQuery(["component.getComponents", { id: id as string }]);

  useEffect(() => {
    if (selectedComponent?.text) {
      setControls({
        bold: selectedComponent.text.bold,
        italic: selectedComponent.text.italic,
        underline: selectedComponent.text.underline,
        alignment: selectedComponent.text.alignment,
      });
    }
  }, [
    selectedComponent?.text,
    selectedComponent?.text?.bold,
    selectedComponent?.text?.italic,
    selectedComponent?.text?.underline,
    selectedComponent?.text?.alignment,
  ]);

  useEffect(() => {
    resetCanvasSize(canvasSizeRef, canvasRef);
  }, [canvasSizeRef, canvasRef]);

  useEffect(() => {
    if (getComponents.isSuccess) {
      setCanvasElements(getComponents.data);
    }
  }, [getComponents.isSuccess, getComponents.data]);

  const addComponent = (component: Component) => {
    return new Promise<void>((resolve) => {
      setCanvasElements((prev) => [...prev, component]);
      resolve();
    });
  };

  const deleteComponent = (id: string) => {
    return new Promise<void>((resolve) => {
      setCanvasElements((prev) => prev?.filter((component) => component.id !== id));
      resolve();
    });
  };

  const updateComponent = (component: Component) => {
    return new Promise<void>((resolve) => {
      setCanvasElements((prev) =>
        prev?.map((prevComponent) => {
          if (prevComponent.id === component.id) {
            return component;
          }
          return prevComponent;
        }),
      );
      resolve();
    });
  };

  const refetch = () => {
    getBox.refetch();
    getFavoriteBox.refetch();
  };

  if (getBox.isLoading || getFavoriteBox.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getBox.isSuccess && !getBox.data) {
    return (
      <PageAlert
        elem={<p className="text-4xl font-extrabold text-red-600 sm:text-5xl">404</p>}
        title="Page not found"
        description={description}
        btnTitle="Go back to home"
      />
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

  return (
    <div className="flex h-full w-full">
      {session?.user?.id === getBox.data?.id && (
        <div
          className={`flex h-full w-12 flex-col border-r transition-all duration-500 ease-in-out dark:border-darkColor ${
            !sidePanel ? "md:w-12" : "md:w-[17rem]"
          }`}
        >
          <Controls
            controls={controls}
            setControls={setControls}
            sidePanel={sidePanel}
            setSidePanel={setSidePanel}
            selectedComponent={selectedComponent}
            updateComponent={updateComponent}
          />
          <Components
            id={id as string}
            canvasRef={canvasRef}
            canvasSizeRef={canvasSizeRef}
            addStateComponent={addComponent}
            updateStateComponent={updateComponent}
            sidePanel={sidePanel}
            setTemp={setTemp}
          />
        </div>
      )}

      <div className="flex h-full grow flex-col">
        <Header
          box={getBox?.data}
          favoriteBox={getFavoriteBox?.data}
          id={id as string}
          temp={temp}
          refetch={refetch}
        />
        <Canvas
          id={id as string}
          userId={getBox?.data?.id as string}
          canvasRef={canvasRef}
          canvasSizeRef={canvasSizeRef}
          canvasElements={canvasElements}
          shift={shift}
          temp={temp}
          setTemp={setTemp}
          removeStateComponent={deleteComponent}
          updateStateComponent={updateComponent}
          setShift={setShift}
          setSelectedComponent={setSelectedComponent}
        />
      </div>
    </div>
  );
};

export default BoxPage;
