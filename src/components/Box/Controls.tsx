import { useState } from "react";
import Hotkeys from "react-hot-keys";
import { HotkeysEvent } from "hotkeys-js";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// https://icon-sets.iconify.design/mingcute/

type Props = {
  sidePanel: boolean;
  setSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Contols = ({ sidePanel, setSidePanel }: Props) => {
  const alignments = [
    {
      id: "left",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M14 17.5a1.5 1.5 0 0 1 .144 2.993L14 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5h10Zm6-5a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3h16Zm-6-5a1.5 1.5 0 0 1 .144 2.993L14 10.5H4a1.5 1.5 0 0 1-.144-2.993L4 7.5h10Zm6-5a1.5 1.5 0 0 1 .144 2.993L20 5.5H4a1.5 1.5 0 0 1-.144-2.993L4 2.5h16Z"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "center",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M17 17.5a1.5 1.5 0 0 1 .144 2.993L17 20.5H7a1.5 1.5 0 0 1-.144-2.993L7 17.5h10Zm3-5a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3h16Zm-3-5a1.5 1.5 0 0 1 .144 2.993L17 10.5H7a1.5 1.5 0 0 1-.144-2.993L7 7.5h10Zm3-5a1.5 1.5 0 0 1 .144 2.993L20 5.5H4a1.5 1.5 0 0 1-.144-2.993L4 2.5h16Z"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "right",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H10a1.5 1.5 0 0 1-.144-2.993L10 17.5h10Zm0-5a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3h16Zm0-5a1.5 1.5 0 0 1 .144 2.993L20 10.5H10a1.5 1.5 0 0 1-.144-2.993L10 7.5h10Zm0-5a1.5 1.5 0 0 1 .144 2.993L20 5.5H4a1.5 1.5 0 0 1-.144-2.993L4 2.5h16Z"
            />
          </g>
        </svg>
      ),
    },
  ];

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [alignment, setAlignment] = useState(0);

  interface KeyMap {
    [key: string]: () => void;
  }

  const shortcuts = {
    "ctrl+b": () => setBold(!bold),
    "ctrl+i": () => setItalic(!italic),
    "ctrl+u": () => setUnderline(!underline),
    "ctrl+l": () => setAlignment(0),
    "ctrl+e": () => setAlignment(1),
    "ctrl+r": () => setAlignment(2),
    "ctrl+[": () => setSidePanel(!sidePanel),
    "ctrl+]": () => setSidePanel(!sidePanel),
  } as KeyMap;

  function onKeyUp(keyName: string, e: KeyboardEvent, handle: HotkeysEvent) {
    console.log(keyName, e, handle);
  }

  function onKeyDown(keyName: string, e: KeyboardEvent) {
    e.preventDefault();
    shortcuts[keyName]?.();
  }

  return (
    <Hotkeys
      keyName="ctrl+b,ctrl+i,ctrl+u,ctrl+l,ctrl+e,ctrl+r,ctrl+[,ctrl+]"
      onKeyDown={onKeyDown.bind(this)}
      onKeyUp={onKeyUp.bind(this)}
    >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M13 2.5a5.5 5.5 0 0 1 4.213 9.036a5.5 5.5 0 0 1-2.992 9.96L14 21.5H6.1a1.6 1.6 0 0 1-1.593-1.454L4.5 19.9V4.1a1.6 1.6 0 0 1 1.454-1.593L6.1 2.5H13Zm1 11H7.5v5H14a2.5 2.5 0 0 0 0-5Zm-1-8H7.5v5H13a2.5 2.5 0 0 0 0-5Z"
              />
            </g>
          </svg>
        </button>
        <button
          onClick={() => setItalic(!italic)}
          className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${
            italic ? "bg-gray-200 dark:bg-darkColor" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M16 2.5h-6a1.5 1.5 0 0 0 0 3h1.3l-1.624 13H8a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3h-1.3l1.624-13H16a1.5 1.5 0 0 0 0-3Z"
              />
            </g>
          </svg>
        </button>
        <button
          onClick={() => setUnderline(!underline)}
          className={`flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor ${
            underline ? "bg-gray-200 dark:bg-darkColor" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M18 18.5a1.5 1.5 0 0 1 .144 2.993L18 21.5H6a1.5 1.5 0 0 1-.144-2.993L6 18.5h12Zm-1-16a1.5 1.5 0 0 1 1.493 1.356L18.5 4v7a6.5 6.5 0 0 1-12.996.233L5.5 11V4a1.5 1.5 0 0 1 2.993-.144L8.5 4v7a3.5 3.5 0 0 0 6.995.192L15.5 11V4A1.5 1.5 0 0 1 17 2.5Z"
              />
            </g>
          </svg>
        </button>
        <button
          onClick={() => setAlignment(alignment < 2 ? alignment + 1 : 0)}
          className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:text-white dark:hover:bg-darkColor"
        >
          {alignments[alignment]?.icon}
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
    </Hotkeys>
  );
};

export default Contols;
