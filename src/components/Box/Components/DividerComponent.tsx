import { Component } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";

type Props = {
  dividerComponent: Component;
  canvasRef: React.RefObject<HTMLDivElement>;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const DividerComponent = ({ dividerComponent, canvasRef, shift, setShift, refetch }: Props) => {
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

  const updateTextComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      await updateComponent.mutateAsync({
        id: dividerComponent.id,
        xAxis: snapTo(info.point.x - (canvasRect?.x ?? 0)),
        yAxis: snapTo(info.point.y - (canvasRect?.y ?? 0)),
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
        updateTextComponent(info);
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
      <div className="w-10 resize-y border-b border-gray-400"></div>
    </motion.div>
  );
};

export default DividerComponent;
