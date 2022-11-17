import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { CubeIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import router from "next/router";
import { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";

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

  return (
    <>
      {isFirstBox ? (
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="inline-flex items-center space-x-3 rounded-lg bg-blue-600 px-4 py-1.5 font-medium text-white focus:outline-none hover:bg-blue-700"
        >
          {isLoading ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5 animate-spin fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <>
              {" "}
              <PencilSquareIcon className="h-5 w-5 fill-white" /> <p> Create your first box</p>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="inline-flex items-center rounded-lg border border-gray-100 bg-white p-3 focus:outline-none hover:bg-gray-100 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor"
        >
          {isLoading ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <PencilSquareIcon className="h-5 w-5 fill-gray-800 dark:fill-blue-50" />
          )}
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-darkColor">
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
                              maxLength: {
                                value: 20,
                                message: "Title must be at most 20 characters",
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
