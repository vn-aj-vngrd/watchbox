import { Component } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { calculatePoint } from "../Helpers";

type Props = {
  dividerComponent: Component;
  canvasRef: React.RefObject<HTMLDivElement>;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const DividerComponent = ({ dividerComponent, canvasRef, shift, setShift, refetch }: Props) => {
  const [state, setState] = useState({ width: 320, height: 2 });
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const deleteComponent = trpc.useMutation("component.deleteComponent");
  const updateComponent = trpc.useMutation("component.updateComponent");

  const bind = useLongPress(
    () => {
      setShift(!shift);
    },
    {
      detect: LongPressDetectEvents.TOUCH,
    },
  );

  const removeComponent = async (id: string) => {
    await deleteComponent
      .mutateAsync({
        id: id,
      })
      .then(() => {
        refetch();
      });
  };

  const updateDividerComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      await updateComponent.mutateAsync({
        id: dividerComponent.id,
        xAxis: snapTo(
          calculatePoint(
            canvasRect.x,
            canvasRef.current.scrollLeft,
            info.point.x,
            160,
            320,
            116,
            -10,
          ),
        ),
        yAxis: snapTo(
          calculatePoint(
            canvasRect.y,
            canvasRef.current.scrollTop,
            info.point.y,
            1.25,
            2.5,
            40,
            41,
          ),
        ),
      });
    }
  };

  return (
    <motion.div
      drag={shift}
      dragMomentum={false}
      onDrag={() => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
      }}
      onDragEnd={(e, info) => {
        updateDividerComponent(info);
      }}
      {...bind()}
      style={{ top: dividerComponent?.yAxis - 40, left: dividerComponent?.xAxis - 144 }}
      className="absolute"
    >
      {shift && (
        <div className="absolute -right-5 -top-5 z-20">
          <button
            onClick={() => {
              if (!deleteComponent.isLoading) removeComponent(dividerComponent.id);
            }}
            className="rounded-full bg-gray-200 p-[6px] shadow-md shadow-gray-300 outline-none dark:bg-darkColor dark:shadow-black/20"
          >
            <TrashIcon className="h-[18px] w-[18px] text-red-500" />
          </button>
        </div>
      )}
      <Resizable
        className="h-[2.5px] w-80 resize-y bg-gray-200"
        size={{ width: state.width, height: state.height }}
        enable={{
          right: true,
          bottom: false,
          top: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStop={(e, direction, ref, d) => {
          setState({
            width: state.width + d.width,
            height: state.height + d.height,
          });
        }}
      ></Resizable>
    </motion.div>
  );
};

export default DividerComponent;
