import { useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { trpc } from "../../utils/trpc";
import { calculatePoint, resetCanvasSize, scrollEdge } from "./Helpers";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";
import textLine from "@iconify/icons-mingcute/text-line";
import movieLine from "@iconify/icons-mingcute/movie-line";
import minimizeLine from "@iconify/icons-mingcute/minimize-line";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  addStateComponent: (component: Component) => Promise<void>;
  updateStateComponent: (component: Component) => Promise<void>;
  sidePanel: boolean;
  setTemp: React.Dispatch<React.SetStateAction<string[]>>;
};

const Components: React.FC<Props> = ({
  id,
  canvasRef,
  canvasSizeRef,
  addStateComponent,
  updateStateComponent,
  sidePanel,
  setTemp,
}) => {
  const componentsDiv = useRef<HTMLDivElement>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const createComponent = trpc.useMutation("component.createComponent");

  // TODO: Optimize for mobile
  const addComponent = async (info: PanInfo, component: string) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      const componentDetails: {
        [key: string]: {
          x: {
            componentHalf: number;
            componentFull: number;
            offset: number;
          };
          y: {
            componentHalf: number;
            componentFull: number;
            offset: number;
          };
        };
      } = {
        Text: {
          x: { componentHalf: 48, componentFull: 96, offset: 210 },
          y: { componentHalf: 14, componentFull: 28, offset: 70 },
        },
        Entry: {
          x: { componentHalf: 144, componentFull: 288, offset: 116 },
          y: { componentHalf: 40, componentFull: 80, offset: 40 },
        },
        Divider: {
          x: { componentHalf: 148, componentFull: 296, offset: 88 },
          y: { componentHalf: 10, componentFull: 20, offset: 20 },
        },
      };

      const uuid = "tmp-" + uuidv4();
      const tempComponent = {
        id: uuid,
        boxId: id,
        componentName: component,
        xAxis: snapTo(
          calculatePoint(
            canvasRect.x,
            canvasRef.current.scrollLeft,
            info.point.x,
            componentDetails[component]?.x.componentHalf,
            componentDetails[component]?.x.componentFull,
            componentDetails[component]?.x.offset,
          ),
        ),
        yAxis: snapTo(
          calculatePoint(
            canvasRect.y,
            canvasRef.current.scrollTop,
            info.point.y,
            componentDetails[component]?.y.componentHalf,
            componentDetails[component]?.y.componentFull,
            componentDetails[component]?.y.offset,
          ),
        ),
        text: null,
        entry: null,
        divider: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      addStateComponent(tempComponent).then(() => {
        setTemp((prev) => [...prev, uuid]);
        resetCanvasSize(canvasSizeRef, canvasRef);
      });

      await createComponent
        .mutateAsync({
          boxId: id,
          componentName: component,
          xAxis: snapTo(
            calculatePoint(
              canvasRect.x,
              canvasRef.current.scrollLeft,
              info.point.x,
              componentDetails[component]?.x.componentHalf,
              componentDetails[component]?.x.componentFull,
              componentDetails[component]?.x.offset,
            ),
          ),
          yAxis: snapTo(
            calculatePoint(
              canvasRect.y,
              canvasRef.current.scrollTop,
              info.point.y,
              componentDetails[component]?.y.componentHalf,
              componentDetails[component]?.y.componentFull,
              componentDetails[component]?.y.offset,
            ),
          ),
        })
        .then(async (res) => {
          updateStateComponent(
            Object.assign(tempComponent, {
              id: res.id,
              created_at: res.created_at,
              updated_at: res.updated_at,
            }),
          ).then(() => {
            setTemp((prev) => prev.filter((item) => item !== uuid));
          });
        });
    } else {
      resetCanvasSize(canvasSizeRef, canvasRef);
    }
  };

  return (
    <div
      ref={componentsDiv}
      className="flex h-full justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      <div
        className={`my-3 grid h-fit grid-cols-1 gap-3 ${
          !sidePanel ? "md:my-3 md:grid-cols-1 md:gap-3" : "md:my-4 md:grid-cols-2 md:gap-4"
        }`}
      >
        {/* Text Component */}
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0}
          whileDrag={{ scale: 0.5 }}
          onDrag={(e, info) => {
            if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
            scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);
          }}
          onDragStart={() => {
            componentsDiv.current?.classList.remove("scrollbar-thin");
          }}
          onDragEnd={async (e, info) => {
            componentsDiv.current?.classList.add("scrollbar-thin");
            addComponent(info, "Text");
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 dark:bg-darkColor dark:text-white ${
            !sidePanel
              ? "md:h-10 md:w-10 md:rounded-md md:p-2"
              : "md:h-28 md:w-28 md:rounded-lg md:p-0"
          }`}
        >
          <Icon icon={textLine} width="36" />
        </motion.div>

        {/* Entry Component */}
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0}
          whileDrag={{ scale: 0.5 }}
          onDrag={(e, info) => {
            if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
            scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);
          }}
          onDragStart={() => {
            componentsDiv.current?.classList.remove("scrollbar-thin");
          }}
          onDragEnd={(e, info) => {
            componentsDiv.current?.classList.add("scrollbar-thin");
            addComponent(info, "Entry");
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 dark:bg-darkColor dark:text-white ${
            !sidePanel
              ? "md:h-10 md:w-10 md:rounded-md md:p-2"
              : "md:h-28 md:w-28 md:rounded-lg md:p-0"
          }`}
        >
          <Icon icon={movieLine} width="36" />
        </motion.div>

        {/* Divider Component */}
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0}
          whileDrag={{ scale: 0.5 }}
          onDrag={(e, info) => {
            if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
            scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);
          }}
          onDragStart={() => {
            componentsDiv.current?.classList.remove("scrollbar-thin");
          }}
          onDragEnd={(e, info) => {
            componentsDiv.current?.classList.add("scrollbar-thin");
            addComponent(info, "Divider");
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 dark:bg-darkColor dark:text-white ${
            !sidePanel
              ? "md:h-10 md:w-10 md:rounded-md md:p-2"
              : "md:h-28 md:w-28 md:rounded-lg md:p-0"
          }`}
        >
          <Icon icon={minimizeLine} width="36" />
        </motion.div>
      </div>
    </div>
  );
};

export default Components;
