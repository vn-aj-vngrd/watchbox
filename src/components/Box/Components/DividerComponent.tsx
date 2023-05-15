import { Prisma } from "@prisma/client";
import { TrashIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { Resizable } from "re-resizable";
import { useRef, forwardRef, LegacyRef } from "react";
import { calculatePoint, resetCanvasSize } from "../Helpers";

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
  setDisablePan: React.Dispatch<React.SetStateAction<boolean>>;
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
  setDisablePan,
  setShift,
  setTemp,
}: Props) => {
  const dividerRef = useRef<Resizable>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

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

  const handleRotate = async () => {
    if (temp.includes(dividerComponent.id)) return;

    const { height = 2, width = 320 } = dividerRef.current?.size || {};

    if (!dividerComponent.divider) {
      setTemp((prev) => [...prev, dividerComponent.id]);

      updateStateComponent(
        Object.assign(dividerComponent, {
          divider: {
            componentId: dividerComponent.id,
            orientation: "vertical",
            height: width,
            width: height,
          },
        }),
      );

      await createDivider
        .mutateAsync({
          componentId: dividerComponent.id,
          orientation: "vertical",
          height: width,
          width: height,
        })
        .then((res) => {
          updateStateComponent(
            Object.assign(dividerComponent, {
              divider: {
                ...dividerComponent.divider,
                id: res.id,
                componentId: res.componentId,
                orientation: res.orientation,
                height: res.height,
                width: res.width,
                created_at: res.created_at,
                updated_at: res.updated_at,
              },
            }),
          );
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== dividerComponent.id));
        });

      return;
    }

    setTemp((prev) => [...prev, dividerComponent.divider?.id ?? dividerComponent.id]);

    updateStateComponent(
      Object.assign(dividerComponent, {
        divider: {
          ...dividerComponent.divider,
          orientation:
            dividerComponent.divider?.orientation === "horizontal" ? "vertical" : "horizontal",
          height: width,
          width: height,
          updated_at: new Date(),
        },
      }),
    );

    updateDivider
      .mutateAsync({
        id: dividerComponent.divider.id,
        orientation: dividerComponent.divider.orientation,
        height: width,
        width: height,
      })
      .then(() => {
        setTemp((prev) =>
          prev.filter((item) => item !== dividerComponent.divider?.id ?? dividerComponent.id),
        );
      });
  };

  const handleResize = async () => {
    if (temp.includes(dividerComponent.id)) return;

    const { height = 2, width = 320 } = dividerRef.current?.size || {};

    if (!dividerComponent.divider) {
      setTemp((prev) => [...prev, dividerComponent.id]);

      updateStateComponent(
        Object.assign(dividerComponent, {
          divider: {
            componentId: dividerComponent.id,
            orientation: "horizontal",
            height: height,
            width: width,
          },
        }),
      );

      await createDivider
        .mutateAsync({
          componentId: dividerComponent.id,
          orientation: "horizontal",
          height: height || 2,
          width: width || 320,
        })
        .then((res) => {
          updateStateComponent(
            Object.assign(dividerComponent, {
              divider: {
                ...dividerComponent.divider,
                id: res.id,
                componentId: res.componentId,
                orientation: res.orientation,
                height: res.height,
                width: res.width,
                created_at: res.created_at,
                updated_at: res.updated_at,
              },
            }),
          );
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== dividerComponent.id));
        });

      return;
    }

    setTemp((prev) => [...prev, dividerComponent.divider?.id ?? dividerComponent.id]);

    updateStateComponent(
      Object.assign(dividerComponent, {
        divider: {
          ...dividerComponent.divider,
          height: height,
          width: width,
          updated_at: new Date(),
        },
      }),
    );

    updateDivider
      .mutateAsync({
        id: dividerComponent.divider?.id,
        orientation: dividerComponent.divider?.orientation,
        height: height,
        width: width,
      })
      .then(() => {
        setTemp((prev) =>
          prev.filter((item) => item !== dividerComponent.divider?.id ?? dividerComponent.id),
        );
      });
  };

  const ResizableDiv = forwardRef((props, ref: LegacyRef<Resizable>) => {
    const { divider } = dividerComponent;
    const { orientation = "horizontal", height = 2, width = 320 } = divider || {};

    return (
      <Resizable
        ref={ref}
        {...props}
        className={`flex items-center justify-center rounded-lg bg-gray-200 dark:bg-darkColor 
          ${orientation === "horizontal" ? "max-h-[2px] w-full" : "h-full max-w-[2px]"}
          ${shift && "group-hover:bg-blue-500 dark:group-hover:bg-blue-500"}`}
        size={{ height, width }}
        enable={{
          right: orientation === "horizontal",
          bottom: orientation === "vertical",
        }}
        grid={[10, 10]}
        onResizeStop={handleResize}
      />
    );
  });

  ResizableDiv.displayName = "ResizableDiv";

  return (
    <motion.div
      drag={
        shift && !temp.includes(dividerComponent.id.startsWith("tmp-") ? dividerComponent.id : "")
      }
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0}
      dragConstraints={canvasRef}
      data-testid="dividerComponent"
      onDrag={() => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
      }}
      onDragEnd={(e, info) => {
        updateDividerComponent(info);
      }}
      {...bind()}
      style={{ top: dividerComponent?.yAxis - 9.25, left: dividerComponent?.xAxis - 168 }}
      onMouseEnter={() => {
        setDisablePan(true);
      }}
      onMouseLeave={() => {
        setDisablePan(true);
      }}
      className={`group absolute py-2 ${shift && "hover:cursor-move"}`}
    >
      {shift && (
        <div className="absolute -right-3 -top-3 z-20 flex items-center justify-center rounded-full bg-gray-200 shadow-md shadow-gray-300 dark:bg-darkColor dark:shadow-black/20">
          <button
            disabled={
              !shift ||
              temp.includes(dividerComponent.id) ||
              temp.includes(dividerComponent.divider?.id as string)
            }
            onClick={() => {
              handleRotate();
            }}
            className="group py-1.5 pl-2.5 pr-1 outline-none"
          >
            <ArrowPathRoundedSquareIcon
              className={`${
                dividerComponent.divider?.orientation === "vertical" && "rotate-90"
              } h-4 w-4 transition-transform ease-in-out group-disabled:opacity-50`}
            />
          </button>
          <button
            disabled={
              !shift ||
              temp.includes(dividerComponent.id) ||
              temp.includes(dividerComponent.divider?.id as string)
            }
            data-testid="removeButton"
            onClick={() => {
              if (!deleteComponent.isLoading) removeComponent(dividerComponent.id);
            }}
            className="group py-1.5 pl-1 pr-2.5 outline-none"
          >
            <TrashIcon className="h-4 w-4 text-red-500 group-disabled:opacity-50" />
          </button>
        </div>
      )}
      <ResizableDiv ref={dividerRef} />
    </motion.div>
  );
};

export default DividerComponent;
