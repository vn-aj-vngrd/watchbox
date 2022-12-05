import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import Image from "next/image";

const Search = () => {
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const dynamicRoute = router.asPath;

  useEffect(() => {
    setIsShow(false);
    setInput("");
  }, [dynamicRoute]);

  useEffect(() => {
    document.body.addEventListener("click", () => setIsShow(false));
  });

  const getGlobalBoxes = trpc.useMutation(["box.getGlobalBoxes"]);
  console.log(getGlobalBoxes.data);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="nav-icon" />
      </div>
      <input
        type="text"
        value={input}
        className="block w-full rounded-lg border border-gray-100 bg-gray-100 p-1.5 pl-10 text-sm text-black placeholder-gray-500 outline-none dark:border-transparent dark:bg-darkColor dark:text-white dark:placeholder-gray-300"
        placeholder="Search WatchBox"
        onChange={(event) => {
          setIsShow(event.target.value ? true : false);
          setInput(event.target.value);
          getGlobalBoxes.mutateAsync({
            searchInput: event.target.value,
          });
        }}
        autoComplete="off"
      />

      {isShow ? (
        <div className="absolute mt-2 w-full space-y-2 rounded-lg bg-white p-3 dark:bg-darkColor">
          {getGlobalBoxes?.data?.map((box) => (
            <button
              key={box.id}
              onClick={() => router.push(`/box/${box.id}`)}
              className="flex w-full items-center justify-between rounded p-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-grayColor"
            >
              <p className="text-start"> {box.boxTitle}</p>

              <div
                className={`grid ${
                  box?.components.filter((x) => x.componentName === "Entry" && x.entry !== null)
                    .length > 1
                    ? "grid-cols-2 grid-rows-2"
                    : "grid-cols-1"
                } bg-white-50 aspect-square w-12 gap-3 rounded-lg border border-gray-100 bg-white p-4  transition duration-150 ease-in-out group-hover:scale-105 dark:border-transparent dark:bg-darkColor lg:w-14`}
              >
                {" "}
                {box?.components
                  .filter((x) => x.componentName === "Entry" && x.entry !== null)
                  .slice(0, 4)
                  .map((component, index) => (
                    <div key={index} className="overflow-hidden rounded-md bg-white">
                      <Image
                        className="object-cover"
                        src={
                          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${component?.entry?.image}` ||
                          ""
                        }
                        alt=""
                        width="1080"
                        height="1080"
                        layout="responsive"
                      />
                    </div>
                  ))}
              </div>
            </button>
          ))}

          {getGlobalBoxes?.isLoading && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}

          {getGlobalBoxes?.data?.length === 0 && (
            <p className="text-center text-sm">No boxes found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
