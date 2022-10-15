import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  PencilSquareIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import Spinner from "./Spinner";
import router from "next/router";

type Inputs = {
  title: string;
};

type Props = {
  onBoxCreated: () => void;
};

const AddBox: React.FC<Props> = ({ onBoxCreated }) => {
  const { mutateAsync, isLoading } = trpc.useMutation("box.createBox", {
    onSuccess: () => {
      onBoxCreated();
      document.dispatchEvent(new Event("visibilitychange"));
      router.push("/");
    },
  });

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setOpen(false);
    mutateAsync({
      boxTitle: data.title.charAt(0).toUpperCase() + data.title.slice(1),
    });
    reset();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none border dark:bg-grayColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
      >
        <PencilSquareIcon className="w-5 h-5 fill-gray-700 dark:fill-blue-50" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="inline-block p-10 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-darkerColor rounded-lg shadow-xl sm:my-8 sm:align-middle w-[90%] sm:w-[90%] md:w-[35rem]"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                    <CubeIcon
                      className="w-6 h-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold text-center text-gray-700 dark:text-white"
                    >
                      Create Box
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Title
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="text"
                            className={
                              errors.title
                                ? "block w-full px-3 py-2 placeholder-red-400 border border-red-400 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-blue-500 sm:text-sm"
                                : "block w-full px-3 py-2 ng-white placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkColor dark:bg-darkColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                            }
                            {...register("title", {
                              required: {
                                value: true,
                                message: "Title is required",
                              },
                            })}
                          />
                          {errors.title && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <ExclamationCircleIcon
                                className="w-5 h-5 text-red-500"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-red-600">
                          {errors.title && errors.title.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
                    onClick={() => {
                      setOpen(false);
                      reset();
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                  >
                    Create
                  </button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddBox;
