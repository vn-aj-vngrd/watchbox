import { Prisma } from "@prisma/client";
import { TrashIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { Resizable } from "re-resizable";
import { useState, useRef, forwardRef, LegacyRef } from "react";
import { calculatePoint, resetCanvasSize, scrollEdge } from "../Helpers";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  dividerComponent: Component;
  removeStateComponent: (id: string) => Promise<void>;
  updateStateComponent: (component: Component) => Promise<void>;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  temp: string[];
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  setTemp: React.Dispatch<React.SetStateAction<string[]>>;
};

const DividerComponent = ({
  dividerComponent,
  removeStateComponent,
  updateStateComponent,
  canvasRef,
  canvasSizeRef,
  temp,
  shift,
  setShift,
  setTemp,
}: Props) => {
  const [, setDimensions] = useState({ width: 320, height: 3 });
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);
  const dividerRef = useRef<Resizable>(null);

  const deleteComponent = trpc.useMutation("component.deleteComponent");
  const updateComponent = trpc.useMutation("component.updateComponent");
  const createDivider = trpc.useMutation("divider.createDivider");
  const updateDivider = trpc.useMutation("divider.updateDivider");

  const bind = useLongPress(
    () => {
      setShift(!shift);
    },
    {
      detect: LongPressDetectEvents.TOUCH,
    },
  );

  const removeComponent = async (id: string) => {
    setTemp((prev) => [...prev, dividerComponent.id]);
    removeStateComponent(id).then(() => {
      resetCanvasSize(canvasSizeRef, canvasRef);
    });
    await deleteComponent
      .mutateAsync({
        id: id,
      })
      .then(() => {
        setTemp((prev) => prev.filter((item) => item !== dividerComponent.id));
      });
  };

  const updateDividerComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      setTemp((prev) => [...prev, dividerComponent.id]);
      updateStateComponent(
        Object.assign(dividerComponent, {
          xAxis: snapTo(
            calculatePoint(canvasRect.x, canvasRef.current.scrollLeft, info.point.x, 148, 296, 88),
          ),
          yAxis: snapTo(
            calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 10, 20, 20),
          ),
        }),
      ).then(() => {
        resetCanvasSize(canvasSizeRef, canvasRef);
      });

      await updateComponent
        .mutateAsync({
          id: dividerComponent.id,
          xAxis: snapTo(
            calculatePoint(canvasRect.x, canvasRef.current.scrollLeft, info.point.x, 168, 336, 88),
          ),
          yAxis: snapTo(
            calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 9.25, 18.5, 20),
          ),
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== dividerComponent.id));
        });
    }
  };

  const ResizableDiv = forwardRef((props, ref: LegacyRef<Resizable>) => (
    <Resizable
      ref={ref}
      {...props}
      className={`group flex cursor-auto resize-y items-center justify-center py-2.5 ${
        shift && "hover:cursor-move"
      }`}
      size={{
        width: dividerComponent.divider ? dividerComponent.divider?.length : "320",
        height: "3",
      }}
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
      onResizeStop={() => handleResize()}
    >
      <div
        className={`h-[3px] w-full rounded-full bg-gray-200 dark:bg-darkColor ${
          shift && "group-hover:bg-blue-500"
        }`}
      />
    </Resizable>
  ));

  ResizableDiv.displayName = "ResizableDiv";

  const handleResize = async () => {
    if (temp.includes(dividerComponent.id)) return;
    if (dividerRef.current?.size.width.toString() === dividerComponent.divider?.length) return;

    if (dividerRef.current?.size.width) {
      setDimensions((prev) => ({
        ...prev,
        width: prev.width,
        height: prev.height,
      }));
    }

    if (dividerComponent.divider === null && dividerRef.current?.size.width) {
      await createDivider
        .mutateAsync({
          componentId: dividerComponent.id,
          orientation: "horizontal",
          length: dividerRef.current?.size.width,
        })
        .then((res) => {
          updateStateComponent(
            Object.assign(dividerComponent, {
              divider: {
                ...dividerComponent.divider,
                id: res.id,
                componentId: res.componentId,
                orientation: res.orientation,
                length: res.length,
                created_at: res.created_at,
                updated_at: res.updated_at,
              },
            }),
          );
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== dividerComponent.divider?.id));
        });
    } else {
      if (dividerRef.current?.size.width && dividerComponent.divider) {
        setTemp((prev) => [...prev, dividerComponent.id]);
        updateStateComponent(
          Object.assign(dividerComponent, {
            divider: {
              ...dividerComponent.divider,
              length: dividerRef.current?.size.width,
            },
          }),
        );

        updateDivider
          .mutateAsync({
            id: dividerComponent.divider?.id,
            orientation: dividerComponent.divider?.orientation,
            length: dividerRef.current?.size.width,
          })
          .then(() => {
            setTemp((prev) => prev.filter((item) => item !== dividerComponent.id));
          });
      }
    }
  };

  return (
    <motion.div
      drag={
        shift && !temp.includes(dividerComponent.id.startsWith("tmp-") ? dividerComponent.id : "")
      }
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0}
      dragConstraints={canvasRef}
      onDrag={(e, info) => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
        scrollEdge(info, canvasRect, canvasSizeRef, canvasRef);
      }}
      onDragEnd={(e, info) => {
        updateDividerComponent(info);
      }}
      {...bind()}
      style={{ top: dividerComponent?.yAxis - 9.25, left: dividerComponent?.xAxis - 168 }}
      className="absolute"
    >
      {shift && (
        <div className="absolute -top-3 -right-3 z-20 flex items-center justify-center rounded-full bg-gray-200 shadow-md shadow-gray-300 dark:bg-darkColor dark:shadow-black/20">
          <button
            disabled={!shift || temp.includes(dividerComponent.id)}
            onClick={() => {
              // TODO: Add Rotate divider functionality
            }}
            className="group py-1.5 pl-2.5 pr-1 outline-none"
          >
            <ArrowPathRoundedSquareIcon className="h-4 w-4 group-disabled:opacity-50" />
          </button>
          <button
            disabled={!shift || temp.includes(dividerComponent.id)}
            onClick={() => {
              if (!deleteComponent.isLoading) removeComponent(dividerComponent.id);
            }}
            className="group py-1.5 pl-1 pr-2.5 outline-none"
          >
            <TrashIcon className="h-4 w-4 text-red-500 group-disabled:opacity-50" />
          </button>
        </div>
      )}
      {/* TODO: Fix divider resize direction (left)*/}
      <ResizableDiv ref={dividerRef} />
    </motion.div>
  );
};

export default DividerComponent;
