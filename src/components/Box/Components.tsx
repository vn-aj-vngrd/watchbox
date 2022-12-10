import { useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { trpc } from "../../utils/trpc";
import { calculatePoint } from "./Helpers";

type Props = {
  id: string;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  sidePanel: boolean;
  refetch: () => void;
};

const Components: React.FC<Props> = ({ id, canvasRef, canvasSizeRef, sidePanel, refetch }) => {
  const componentsDiv = useRef<HTMLDivElement>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const createComponent = trpc.useMutation("component.createComponent");

  // TODO: mobile optimization
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
            edgeOffset: number;
            offset: number;
          };
          y: {
            componentHalf: number;
            componentFull: number;
            edgeOffset: number;
            offset: number;
          };
        };
      } = {
        Text: {
          x: { componentHalf: 34.5, componentFull: 69, edgeOffset: 116, offset: 100 },
          y: { componentHalf: 18, componentFull: 36, edgeOffset: 40, offset: 30 },
        },
        Entry: {
          x: { componentHalf: 144, componentFull: 288, edgeOffset: 116, offset: 0 },
          y: { componentHalf: 40, componentFull: 80, edgeOffset: 40, offset: 0 },
        },
        Divider: {
          x: { componentHalf: 160, componentFull: 320, edgeOffset: 116, offset: -10 },
          y: { componentHalf: 1.25, componentFull: 2.5, edgeOffset: 40, offset: 41 },
        },
      };
      await createComponent.mutateAsync({
        boxId: id,
        componentName: component,
        xAxis: snapTo(
          calculatePoint(
            canvasRect.x,
            canvasRef.current.scrollLeft,
            info.point.x,
            componentDetails[component]?.x.componentHalf,
            componentDetails[component]?.x.componentFull,
            componentDetails[component]?.x.edgeOffset,
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
            componentDetails[component]?.y.edgeOffset,
            componentDetails[component]?.y.offset,
          ),
        ),
      });
      refetch();
    } else {
      if (canvasSizeRef.current && canvasRef.current) {
        canvasSizeRef.current.style.width = "auto";
        canvasSizeRef.current.style.height = "auto";
        canvasSizeRef.current.style.width =
          canvasRef.current.scrollWidth +
          (canvasRef.current.scrollWidth > canvasRef.current.clientWidth ? 16 : 0) +
          "px";
        canvasSizeRef.current.style.height =
          canvasRef.current.scrollHeight +
          (canvasRef.current.scrollHeight > canvasRef.current.clientHeight ? 16 : 0) +
          "px";
      }
    }
  };

  // TODO: mobile optimization
  // TODO: Add padding to left and bottom
  const scrollEdge = (info: PanInfo) => {
    // right
    if (canvasRect && canvasRef.current && info.point.x > canvasRect.width + 200) {
      if (canvasSizeRef.current)
        canvasSizeRef.current.style.width =
          canvasRef.current?.scrollWidth <=
          canvasRef.current?.clientWidth + canvasRef.current.scrollLeft
            ? canvasSizeRef.current?.clientWidth + 20 + "px"
            : canvasSizeRef.current.style.width;
      canvasRef.current.scrollLeft += 20;
    }
    // left
    if (
      canvasRect &&
      canvasRef.current &&
      canvasRect.x - info.point.x < 0 &&
      canvasRect.x - info.point.x > -200
    ) {
      if (canvasSizeRef.current)
        canvasSizeRef.current.style.width =
          parseInt(canvasSizeRef.current.style.width) === canvasRef.current.scrollWidth
            ? canvasSizeRef.current?.clientWidth - 20 + "px"
            : canvasRef.current?.scrollWidth + "px";

      canvasRef.current.scrollLeft -= 20;
    }
    // bottom
    if (canvasRect && canvasRef.current && info.point.y > canvasRect.height + 40) {
      if (canvasSizeRef.current)
        canvasSizeRef.current.style.height =
          canvasRef.current?.scrollHeight <=
          canvasRef.current?.clientHeight + canvasRef.current.scrollTop
            ? canvasSizeRef.current?.clientHeight + 20 + "px"
            : canvasSizeRef.current.style.height;
      canvasRef.current.scrollTop += 15;
    }
    // top
    if (
      canvasRect &&
      canvasRef.current &&
      canvasRect.y - info.point.y < 0 &&
      canvasRect.y - info.point.y > -40
    ) {
      if (canvasSizeRef.current)
        canvasSizeRef.current.style.height =
          parseInt(canvasSizeRef.current.style.height) === canvasRef.current.scrollHeight
            ? canvasSizeRef.current?.clientHeight - 15 + "px"
            : canvasRef.current?.scrollHeight + "px";

      canvasRef.current.scrollTop -= 15;
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
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0}
          whileDrag={{ scale: 0.5 }}
          onDrag={(e, info) => {
            if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
            scrollEdge(info);
          }}
          onDragStart={() => {
            componentsDiv.current?.classList.remove("scrollbar-thin");
          }}
          onDragEnd={(e, info) => {
            componentsDiv.current?.classList.add("scrollbar-thin");
            addComponent(info, "Text");
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 dark:bg-darkColor dark:text-white ${
            !sidePanel
              ? "md:h-10 md:w-10 md:rounded-md md:p-2"
              : "md:h-28 md:w-28 md:rounded-lg md:p-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M5 3a1 1 0 0 0 0 2h6v15a1 1 0 1 0 2 0V5h6a1 1 0 1 0 0-2H5Z"
              />
            </g>
          </svg>
        </motion.div>
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0}
          whileDrag={{ scale: 0.5 }}
          onDrag={(e, info) => {
            if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
            scrollEdge(info);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M12 2c5.523 0 10 4.477 10 10a9.982 9.982 0 0 1-3.76 7.814l-.239.186H20a1 1 0 0 1 .117 1.993L20 22h-8C6.477 22 2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm0 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-4-4a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm8 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-4-4a2 2 0 1 1 0 4a2 2 0 0 1 0-4Z"
              />
            </g>
          </svg>
        </motion.div>
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0}
          whileDrag={{ scale: 0.5 }}
          onDrag={(e, info) => {
            if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
            scrollEdge(info);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            width="36"
            height="36"
          >
            <path d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Components;
