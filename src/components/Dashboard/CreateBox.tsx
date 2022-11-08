import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { CubeIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import router from "next/router";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";

type Inputs = {
  title: string;
};

type Props = {
  onBoxCreated: () => void;
  isFirstBox?: boolean;
};

const CreateBox = ({ onBoxCreated, isFirstBox }: Props) => {
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
    return (
      <div
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-lg border  border-gray-100  bg-white p-[6px] shadow-sm focus:outline-none dark:border-transparent dark:bg-grayColor"
      >
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isFirstBox ? (
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-1.5 font-medium  text-white focus:outline-none hover:bg-blue-700"
        >
          Create your first box
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="inline-flex items-center rounded-lg border border-gray-100 bg-white p-3 focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor"
        >
          <PencilSquareIcon className="h-5 w-5 fill-gray-700 dark:fill-blue-50" />
        </button>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex min-h-screen items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
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
                className="inline-block w-[90%] transform overflow-hidden rounded-lg bg-white p-10 text-left align-bottom shadow-xl transition-all dark:bg-darkerColor sm:my-8 sm:w-[90%] sm:align-middle md:w-[35rem]"
              >
                <div className="mb-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-grayColor">
                    <CubeIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-center text-2xl font-semibold text-gray-700 dark:text-white"
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
                            className="input"
                            {...register("title", {
                              required: {
                                value: true,
                                message: "Title is required",
                              },
                              minLength: {
                                value: 4,
                                message: "Title must be at least 4 characters",
                              },
                            })}
                          />
                          {errors.title && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
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
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none hover:bg-red-600"
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
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none hover:bg-blue-700"
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

export default CreateBox;
