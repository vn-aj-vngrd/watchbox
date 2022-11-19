import { useRef } from "react";
import { motion } from "framer-motion";
import { snap } from "popmotion";

type CanvasElement = {
  component: string;
  x: number;
  y: number;
};

type Props = {
  canvasRef: React.RefObject<HTMLDivElement>;
  sidePanel: boolean;
  canvasElements: CanvasElement[];
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
};

const Components: React.FC<Props> = ({
  canvasRef,
  sidePanel,
  canvasElements,
  setCanvasElements,
}) => {
  const componentsDiv = useRef<HTMLDivElement>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

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
            canvasRect = canvasRef.current?.getBoundingClientRect();
            console.log(info, canvasRect, canvasRef.current?.scrollLeft);
          }}
          onDragStart={() => {
            componentsDiv.current?.classList.remove("scrollbar-thin");
          }}
          onDragEnd={(e, info) => {
            componentsDiv.current?.classList.add("scrollbar-thin");
            // add element to canvas
            if (
              canvasRef.current &&
              canvasRect?.x &&
              info.point.x - (canvasRect?.x ?? 0) > 0 &&
              info.point.y - (canvasRect?.y ?? 0) > 0
            ) {
              setCanvasElements([
                ...canvasElements,
                {
                  component: "text",
                  x: snapTo(
                    canvasRect.x + canvasRef.current.scrollLeft - info.point.x < 128 &&
                      canvasRect.x - info.point.x > -128
                      ? info.point.x - 256 + (256 - (info.point.x - canvasRect.x + 128))
                      : info.point.x - (canvasRect.x ?? 0) + canvasRef.current.scrollLeft,
                  ),
                  y: snapTo(
                    canvasRect.y + canvasRef.current.scrollTop - info.point.y < 40 &&
                      canvasRect.y - info.point.y > -40
                      ? info.point.y - 90 + (80 - (info.point.y - canvasRect.y + 40))
                      : info.point.y - (canvasRect?.y ?? 0) + canvasRef.current.scrollTop,
                  ),
                },
              ]);
            }
            // scroll canvas at the edge
            if (canvasRect && info.point.x > canvasRect.width + 100) {
              canvasRef.current?.scrollTo({
                left: canvasRef.current.scrollLeft + info.point.x - canvasRect.width - 100,
                behavior: "smooth",
              });
            } else if (
              canvasRect &&
              canvasRect.x - info.point.x < 100 &&
              canvasRect.x - info.point.x > -150
            ) {
              canvasRef.current?.scrollTo({
                left: canvasRef.current.scrollLeft - 70 - (100 - info.point.x + canvasRect.x),
                behavior: "smooth",
              });
            }
            if (canvasRect && info.point.y > canvasRect.height + 100) {
              canvasRef.current?.scrollTo({
                top: canvasRef.current.scrollTop + info.point.y - canvasRect.height - 30,
                behavior: "smooth",
              });
            } else if (
              canvasRect &&
              canvasRect.y - info.point.y < 100 &&
              canvasRect.y - info.point.y > -150
            ) {
              canvasRef.current?.scrollTo({
                top: canvasRef.current.scrollTop - (60 - info.point.y + canvasRect.y),
                behavior: "smooth",
              });
            }
          }}
          className={`flex h-10 w-10 select-none items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 dark:bg-darkColor dark:text-white ${
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
          onDragStart={() => {
            componentsDiv.current?.classList.remove("scrollbar-thin");
            canvasRect = canvasRef.current?.getBoundingClientRect();
          }}
          onDragEnd={(e, info) => {
            componentsDiv.current?.classList.add("scrollbar-thin");
            if (
              canvasRef.current &&
              info.point.x - (canvasRect?.x ?? 0) > 0 &&
              info.point.y - (canvasRect?.y ?? 0) > 0
            ) {
              setCanvasElements([
                ...canvasElements,
                {
                  component: "entry",
                  x: snapTo(info.point.x - (canvasRect?.x ?? 0) + canvasRef.current.scrollLeft),
                  y: snapTo(info.point.y - (canvasRect?.y ?? 0) + canvasRef.current.scrollTop),
                },
              ]);
            }
          }}
          className={`flex h-10 w-10 select-none items-center justify-center rounded-md bg-gray-200 p-2 text-gray-700 dark:bg-darkColor dark:text-white ${
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
      </div>
    </div>
  );
};

export default Components;
