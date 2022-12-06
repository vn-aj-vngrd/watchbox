import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Box, Component, Entry } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import Spinner from "./Spinner";
import OutsideClickHandler from "react-outside-click-handler";

type BoxType = (Box & { components: (Component & { entry: Entry | null })[] })[] | undefined;

const Search = () => {
  const [take] = useState(10);
  const [data, setData] = useState<BoxType>();
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const dynamicRoute = router.asPath;

  const getGlobalBoxes = trpc.useMutation(["box.getGlobalBoxes"]);
  const getGlobalBoxesCount = trpc.useMutation(["box.getGlobalBoxesCount"]);

  useEffect(() => {
    if (getGlobalBoxes.isSuccess) {
      setData(getGlobalBoxes.data);
    }
  }, [getGlobalBoxes.data, getGlobalBoxes.isSuccess]);

  useEffect(() => {
    setIsShow(false);
    setInput("");
  }, [dynamicRoute]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsShow(false);
      }}
    >
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="nav-icon" />
        </div>
        <input
          type="text"
          value={input}
          className="block w-full rounded-lg border border-gray-100 bg-gray-100 p-1.5 pl-10 text-sm text-black placeholder-gray-500 outline-none dark:border-transparent dark:bg-darkColor dark:text-white dark:placeholder-gray-300"
          placeholder="Search WatchBox"
          onClick={() => {
            setIsShow(true);
          }}
          onChange={(event) => {
            setIsShow(event.target.value ? true : false);
            setInput(event.target.value);

            getGlobalBoxes.mutateAsync({
              searchInput: event.target.value,
              take,
            });
            getGlobalBoxesCount.mutateAsync({
              searchInput: event.target.value,
            });
          }}
          autoComplete="off"
        />
      </div>

      {isShow && (
        <div className="scroll-bar absolute mt-[8px] flex w-[206px] flex-shrink-0 origin-top-right flex-col overflow-y-auto rounded-md border border-gray-100 bg-white shadow-sm dark:border-transparent dark:bg-darkColor">
          {data?.map((box) => (
            <div key={box.id}>
              <button
                onClick={() => router.push(`/box/${box.id}`)}
                className="flex w-full items-center space-x-4 rounded p-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-[#616161]"
              >
                <div
                  className={`grid ${
                    box?.components.filter((x) => x.componentName === "Entry" && x.entry !== null)
                      .length > 1
                      ? "grid-cols-2 grid-rows-2"
                      : "grid-cols-1"
                  } bg-white-50 aspect-square w-12 gap-1 rounded-lg border border-gray-100 bg-white p-1 transition duration-150 ease-in-out group-hover:scale-105 dark:border-transparent dark:bg-grayColor`}
                >
                  {box?.components.filter((x) => x.componentName === "Entry" && x.entry !== null)
                    .length == 1 ? (
                    <div className="overflow-hidden rounded bg-white">
                      <Image
                        className="object-cover"
                        src={
                          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${box?.components[0]?.entry?.image}` ||
                          ""
                        }
                        alt=""
                        width="1080"
                        height="1080"
                        layout="responsive"
                        priority={true}
                      />
                    </div>
                  ) : (
                    <>
                      {box?.components
                        .filter((x) => x.componentName === "Entry" && x.entry !== null)
                        .slice(0, 4)
                        .map((component, index) => (
                          <div key={index} className="overflow-hidden rounded bg-white">
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
                              priority={true}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </div>

                <div>
                  <p className="text-start text-sm">
                    {box.boxTitle.length > 12 ? (
                      <>{box?.boxTitle?.substring(0, 12)}...</>
                    ) : (
                      <>{box?.boxTitle}</>
                    )}
                  </p>
                </div>
              </button>
            </div>
          ))}

          <div
            className={`flex w-full items-center justify-center ${
              getGlobalBoxes?.data &&
              getGlobalBoxes?.data?.length !== 0 &&
              getGlobalBoxesCount?.data &&
              getGlobalBoxesCount?.data > getGlobalBoxes?.data?.length
                ? "flex"
                : "hidden"
            }`}
          >
            <button
              onClick={() => {
                getGlobalBoxes.mutateAsync({
                  searchInput: input,
                  take: take + 5,
                });
              }}
              className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
            >
              See More
            </button>
          </div>

          {getGlobalBoxes?.isLoading && (
            <div className={`flex w-full items-center justify-center p-2 text-sm`}>
              <Spinner isSmall={true} />
            </div>
          )}

          {getGlobalBoxes?.data?.length === 0 && (
            <div className="flex w-full items-center justify-center p-2 text-sm dark:text-white">
              <p>No boxes found.</p>
            </div>
          )}

          {!data && (
            <div
              className={`flex w-full items-center justify-center p-2 text-sm dark:text-white ${
                getGlobalBoxes?.isLoading ? "hidden" : null
              }`}
            >
              <p>No boxes found.</p>
            </div>
          )}
        </div>
      )}
    </OutsideClickHandler>
  );
};

export default Search;
