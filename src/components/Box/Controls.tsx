import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useHotkeys } from "react-hotkeys-hook";
import { Icon } from "@iconify/react";
import boldFill from "@iconify/icons-mingcute/bold-fill";
import italicFill from "@iconify/icons-mingcute/italic-fill";
import underlineFill from "@iconify/icons-mingcute/underline-fill";
import alignLeftFill from "@iconify/icons-mingcute/align-left-fill";
import alignCenterFill from "@iconify/icons-mingcute/align-center-fill";
import alignRightFill from "@iconify/icons-mingcute/align-right-fill";

type Props = {
  sidePanel: boolean;
  setSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Contols = ({ sidePanel, setSidePanel }: Props) => {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [alignment, setAlignment] = useState(0);

  useHotkeys("ctrl+b", () => setBold((bold) => !bold), {
    preventDefault: true,
    enableOnFormTags: true,
  });
  useHotkeys("ctrl+i", () => setItalic((italic) => !italic), {
    preventDefault: true,
    enableOnFormTags: true,
  });
  useHotkeys("ctrl+u", () => setUnderline((underline) => !underline), {
    preventDefault: true,
    enableOnFormTags: true,
  });
  useHotkeys("ctrl+l", () => setAlignment(0), { preventDefault: true, enableOnFormTags: true });
  useHotkeys("ctrl+e", () => setAlignment(1), { preventDefault: true, enableOnFormTags: true });
  useHotkeys("ctrl+r", () => setAlignment(2), { preventDefault: true, enableOnFormTags: true });
  useHotkeys("ctrl+[,ctrl+]", () => setSidePanel((sidePanel) => !sidePanel), {
    preventDefault: true,
    enableOnFormTags: true,
  });

  return (
    <div
      className={`flex h-fit flex-col items-center justify-center gap-3 border-b py-2 transition-all duration-500 ease-in-out dark:border-darkColor ${
        !sidePanel ? "md:h-fit md:flex-col md:py-2" : "md:h-12 md:flex-row md:py-0"
      }`}
    >
      <button
        onClick={() => setBold(!bold)}
        className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${
          bold ? "bg-gray-200 dark:bg-darkColor" : ""
        }`}
      >
        <Icon icon={boldFill} />
      </button>
      <button
        onClick={() => setItalic(!italic)}
        className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${
          italic ? "bg-gray-200 dark:bg-darkColor" : ""
        }`}
      >
        <Icon icon={italicFill} />
      </button>
      <button
        onClick={() => setUnderline(!underline)}
        className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${
          underline ? "bg-gray-200 dark:bg-darkColor" : ""
        }`}
      >
        <Icon icon={underlineFill} />
      </button>
      <button
        onClick={() => setAlignment(alignment < 2 ? alignment + 1 : 0)}
        className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor"
      >
        {
          {
            0: <Icon icon={alignLeftFill} />,
            1: <Icon icon={alignCenterFill} />,
            2: <Icon icon={alignRightFill} />,
          }[alignment]
        }
      </button>
      <button
        onClick={() => setSidePanel(!sidePanel)}
        className={`hidden h-8 w-8 items-center justify-center rounded-md border font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:border-grayColor dark:text-white dark:hover:bg-darkColor md:flex ${
          !sidePanel ? "md:order-first" : "md:order-none"
        }`}
      >
        <ChevronLeftIcon
          className={`h-4 w-4 fill-black transition-transform ease-in-out dark:fill-white ${
            !sidePanel ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Contols;
